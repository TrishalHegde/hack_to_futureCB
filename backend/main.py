from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import sys
import os

# Internal imports
from .api.endpoints import router as api_router
from .database.session import init_db
from .services.similarity import engine

# Add project root for data integrations
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Data integrations imports
from data.integrations.web_search_collector import search_web_for_verification
from data.integrations.bot_detector import run_bot_detection

app = FastAPI(
    title="Anveshak AI Backend",
    description="Misinformation Analysis Engine"
)

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# Request Models
# -----------------------------
class ClaimRequest(BaseModel):
    claim: str


# -----------------------------
# Startup Event
# -----------------------------
@app.on_event("startup")
def startup_event():
    # Initialize database
    init_db()

    # Load datasets into similarity engine
    base_path = os.path.dirname(__file__)

    engine.load_dataset(
        "fact_checks",
        os.path.join(base_path, "data", "fact_checks.json")
    )

    engine.load_dataset(
        "trusted_news",
        os.path.join(base_path, "data", "trusted_news.json")
    )

    engine.load_dataset(
        "telegram_data",
        os.path.join(base_path, "data", "telegram_data.json")
    )

    # Optional YouTube dataset
    youtube_path = os.path.join(base_path, "data", "youtube_data.json")

    if os.path.exists(youtube_path):
        engine.load_dataset("youtube_data", youtube_path)

    print("✅ Database initialized")
    print("✅ Similarity engine datasets loaded")


# -----------------------------
# Root Endpoint
# -----------------------------
@app.get("/")
def read_root():
    return {
        "status": "Anveshak AI Backend is running",
        "message": "Welcome to Anveshak AI Misinformation Analysis Engine"
    }


# -----------------------------
# Verification Endpoint
# -----------------------------
@app.post("/verify")
async def verify_claim(request: ClaimRequest):

    if not request.claim.strip():
        raise HTTPException(
            status_code=400,
            detail="Claim cannot be empty"
        )

    # Live Web Search
    evidence = search_web_for_verification(
        request.claim,
        limit=5
    )

    # Advanced Scoring Logic
    fake_keywords = [
        "fake",
        "hoax",
        "false",
        "debunked",
        "misleading",
        "scam",
        "rumor",
        "incorrect",
        "not true",
        "untrue",
        "unconfirmed"
    ]

    true_keywords = [
        "confirmed",
        "true",
        "official",
        "verified",
        "authentic",
        "truth",
        "correct",
        "win",
        "beat",
        "victory",
        "won",
        "yes"
    ]

    fact_check_identifiers = [
        "fact check",
        "fact-check",
        "busted",
        "myth",
        "debunk"
    ]

    fake_score = 0
    true_score = 0

    for e in evidence:

        title = e.get("title", "").lower()
        content = e.get("content", "").lower()

        # Detect fact-check sources
        is_fact_check = any(
            fc in title for fc in fact_check_identifiers
        )

        if is_fact_check:
            fake_score += 3

        # Fake indicators
        for kw in fake_keywords:
            if kw in title:
                fake_score += 2

            if kw in content:
                fake_score += 1

        # True indicators
        for kw in true_keywords:
            if kw in title:
                true_score += 2

            if kw in content:
                true_score += 1

    # Verdict logic
    verdict = "UNVERIFIED"
    confidence = 0.50

    if fake_score > true_score:
        verdict = "FALSE / MISINFORMATION"
        confidence = min(0.60 + (fake_score * 0.05), 0.99)

    elif true_score > fake_score:
        verdict = "TRUE / VERIFIED"
        confidence = min(0.60 + (true_score * 0.05), 0.98)

    elif evidence:
        verdict = "PARTIALLY VERIFIED / CONTEXT REQUIRED"
        confidence = 0.65

    return {
        "claim": request.claim,
        "verdict": verdict,
        "confidence": confidence,
        "fake_score": fake_score,
        "true_score": true_score,
        "evidence": evidence,
        "analysis_summary": (
            f"Analyzed {len(evidence)} authoritative sources. "
            f"Found {fake_score} misinformation indicators and "
            f"{true_score} verification indicators."
        )
    }


# -----------------------------
# Bot Detection Endpoint
# -----------------------------
@app.get("/bot-report")
async def get_bot_report():

    try:
        result = run_bot_detection()

        return {
            "status": "success",
            "message": "Bot detection completed",
            "result": result
        }

    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }


# -----------------------------
# Include API Routes
# -----------------------------
app.include_router(api_router, prefix="/api/v1")


# -----------------------------
# Run Server
# -----------------------------
if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        app,
        host="0.0.0.0",
        port=8000
    )