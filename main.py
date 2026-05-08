from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database.config import Base, engine
from api.routes import router

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="AI-Powered Misinformation Verification Platform",
    description="Backend API for verifying claims and managing fact-check data.",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict this to the frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routes
app.include_router(router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Misinformation Verification Platform API"}
