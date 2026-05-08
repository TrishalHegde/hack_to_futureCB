from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database.session import get_db
from ..services.ai_pipeline import verify_claim
from ..database import models
from pydantic import BaseModel
from typing import List, Optional, Dict, Any

router = APIRouter()

class ClaimRequest(BaseModel):
    text: str

class EvidenceResponse(BaseModel):
    source_type: str
    text: str
    similarity_score: float

class VerificationResponse(BaseModel):
    verdict: str
    confidence: int
    risk_level: str
    credibility_score: int
    language_detected: str
    linguistic_analysis: Dict[str, Any]
    matches: Dict[str, List[Any]]

@router.post("/verify", response_model=VerificationResponse)
def verify_text_claim(request: ClaimRequest, db: Session = Depends(get_db)):
    if not request.text.strip():
        raise HTTPException(status_code=400, detail="Text cannot be empty")
    
    # Run the AI Pipeline
    results = verify_claim(request.text)
    
    # Store in database
    db_claim = models.Claim(
        text=request.text,
        language=results['language_detected'],
        verdict=results['verdict'],
        confidence=results['confidence'],
        risk_level=results['risk_level'],
        credibility_score=results['credibility_score'],
        linguistic_analysis=results['linguistic_analysis']
    )
    db.add(db_claim)
    db.commit()
    db.refresh(db_claim)
    
    # Store evidence matches
    for source_type, matches in results['matches'].items():
        for match in matches:
            db_evidence = models.EvidenceSource(
                claim_id=db_claim.id,
                source_type=source_type,
                text=match.get('text', ''),
                similarity_score=match.get('similarity_score', 0.0)
            )
            db.add(db_evidence)
    
    db.commit()
    
    return results

@router.get("/history", response_model=List[VerificationResponse])
def get_verification_history(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    # This is a simplified history fetch. 
    # In a real app, you'd join with evidence sources.
    claims = db.query(models.Claim).offset(skip).limit(limit).all()
    # Formatting for response
    # (Omitted complex join logic for brevity in V1)
    return [] # Placeholder for history endpoint
