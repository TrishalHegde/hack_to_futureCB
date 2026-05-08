from sqlalchemy import Column, Integer, String, Float, DateTime, JSON, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
import datetime

Base = declarative_base()

class Claim(Base):
    __tablename__ = "claims"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, nullable=True) # For future auth
    text = Column(String, nullable=False)
    cleaned_text = Column(String)
    language = Column(String)
    verdict = Column(String)
    confidence = Column(Integer)
    risk_level = Column(String)
    credibility_score = Column(Integer)
    linguistic_analysis = Column(JSON)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    
    evidence = relationship("EvidenceSource", back_populates="claim")

class EvidenceSource(Base):
    __tablename__ = "evidence_sources"

    id = Column(Integer, primary_key=True, index=True)
    claim_id = Column(Integer, ForeignKey("claims.id"))
    source_type = Column(String) # fact_check, news, telegram, youtube
    text = Column(String)
    url = Column(String, nullable=True)
    similarity_score = Column(Float)
    
    claim = relationship("Claim", back_populates="evidence")

class Analytics(Base):
    __tablename__ = "analytics"
    
    id = Column(Integer, primary_key=True, index=True)
    event_type = Column(String) # verification_request, auth_event, etc.
    details = Column(JSON)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)
