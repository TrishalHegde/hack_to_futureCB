from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class ClaimRequest(BaseModel):
    claim: str

class EvidenceResponse(BaseModel):
    id: int
    source_type: Optional[str]
    source_url: Optional[str]
    similarity_score: Optional[float]
    extracted_text: Optional[str]

    class Config:
        from_attributes = True

class ClaimResponse(BaseModel):
    claim_id: int
    verdict: Optional[str]
    credibility_score: Optional[float]
    evidence: List[EvidenceResponse] = []

    class Config:
        from_attributes = True

class AnalyticsResponse(BaseModel):
    total_verifications: int
    avg_processing_time: float
    false_claim_count: int
    timestamp: datetime

    class Config:
        from_attributes = True
