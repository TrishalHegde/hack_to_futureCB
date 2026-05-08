from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database.config import get_db
from database.models import Claim, EvidenceSource, Analytics
from schemas.claim import ClaimRequest, ClaimResponse, AnalyticsResponse
from services.ai_pipeline import process_claim
from services.external_apis import get_all_evidence

router = APIRouter(prefix="/api/v1")

@router.get("/health")
def health_check():
    return {"status": "ok"}

@router.get("/analytics", response_model=AnalyticsResponse)
def get_analytics(db: Session = Depends(get_db)):
    analytics = db.query(Analytics).order_by(Analytics.timestamp.desc()).first()
    if not analytics:
        # Return default if no analytics row exists yet
        return {"total_verifications": 0, "avg_processing_time": 0.0, "false_claim_count": 0, "timestamp": "2000-01-01T00:00:00"}
    return analytics

@router.get("/claim/{id}", response_model=ClaimResponse)
def get_claim(id: int, db: Session = Depends(get_db)):
    claim = db.query(Claim).filter(Claim.id == id).first()
    if not claim:
        raise HTTPException(status_code=404, detail="Claim not found")
    return claim

@router.post("/verify", response_model=ClaimResponse)
async def verify_claim(request: ClaimRequest, db: Session = Depends(get_db)):
    import time
    start_time = time.time()
    
    # 1. Check if claim exists
    existing_claim = db.query(Claim).filter(Claim.raw_text == request.claim).first()
    if existing_claim:
        return existing_claim
        
    # 2. Gather Evidence
    evidence_list = await get_all_evidence(request.claim)
    
    # 3. Process with AI pipeline
    processed_result = await process_claim(request.claim, evidence_list)
    
    # 4. Save to DB
    new_claim = Claim(
        raw_text=request.claim,
        normalized_text=processed_result["normalized_text"],
        language=processed_result["language"],
        verdict=processed_result["verdict"],
        credibility_score=processed_result["credibility_score"]
    )
    db.add(new_claim)
    db.commit()
    db.refresh(new_claim)
    
    # Save Evidence
    for ev in processed_result["scored_evidence"]:
        new_ev = EvidenceSource(
            claim_id=new_claim.id,
            source_type=ev.get("source_type"),
            source_url=ev.get("source_url"),
            similarity_score=ev.get("similarity_score"),
            extracted_text=ev.get("extracted_text")
        )
        db.add(new_ev)
    db.commit()
    db.refresh(new_claim)
    
    # Update Analytics
    processing_time = time.time() - start_time
    analytics = db.query(Analytics).order_by(Analytics.timestamp.desc()).first()
    if not analytics:
        analytics = Analytics()
        db.add(analytics)
    
    analytics.total_verifications += 1
    # Moving average
    analytics.avg_processing_time = ((analytics.avg_processing_time * (analytics.total_verifications - 1)) + processing_time) / analytics.total_verifications
    
    if new_claim.verdict == "Likely Misleading":
        analytics.false_claim_count += 1
        
    db.commit()
    
    return new_claim
