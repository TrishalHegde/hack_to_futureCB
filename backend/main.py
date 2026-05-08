from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api.endpoints import router as api_router
from .database.session import init_db
from .services.similarity import engine
import os

app = FastAPI(title="Anveshak AI API", description="Misinformation Analysis Engine")

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Database and Similarity Engine on startup
@app.on_event("startup")
def startup_event():
    # Create tables
    init_db()
    
    # Load datasets into the similarity engine
    base_path = os.path.dirname(__file__)
    engine.load_dataset("fact_checks", os.path.join(base_path, "data", "fact_checks.json"))
    engine.load_dataset("trusted_news", os.path.join(base_path, "data", "trusted_news.json"))
    engine.load_dataset("telegram_data", os.path.join(base_path, "data", "telegram_data.json"))
    # (Optional) youtube_data if exists
    youtube_path = os.path.join(base_path, "data", "youtube_data.json")
    if os.path.exists(youtube_path):
        engine.load_dataset("youtube_data", youtube_path)

@app.get("/")
def read_root():
    return {"message": "Welcome to Anveshak AI Misinformation Analysis Engine"}

# Include routes
app.include_router(api_router, prefix="/api/v1")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
