from sqlalchemy import Column, Integer, String, Float, Text, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from .config import Base

class Claim(Base):
    __tablename__ = "claims"

    id = Column(Integer, primary_key=True, index=True)
    raw_text = Column(Text, nullable=False)
    normalized_text = Column(Text)
    language = Column(String)
    verdict = Column(String)
    credibility_score = Column(Float)
    created_at = Column(DateTime, default=datetime.utcnow)

    evidence_sources = relationship("EvidenceSource", back_populates="claim")
    fact_checks = relationship("FactCheck", back_populates="claim")
    platform_posts = relationship("PlatformPost", back_populates="claim")

class EvidenceSource(Base):
    __tablename__ = "evidence_sources"

    id = Column(Integer, primary_key=True, index=True)
    claim_id = Column(Integer, ForeignKey("claims.id"))
    source_type = Column(String)
    source_url = Column(String)
    similarity_score = Column(Float)
    extracted_text = Column(Text)

    claim = relationship("Claim", back_populates="evidence_sources")

class FactCheck(Base):
    __tablename__ = "fact_checks"

    id = Column(Integer, primary_key=True, index=True)
    claim_id = Column(Integer, ForeignKey("claims.id"))
    organization_name = Column(String)
    verdict = Column(String)
    explanation = Column(Text)
    reference_url = Column(String)

    claim = relationship("Claim", back_populates="fact_checks")

class PlatformPost(Base):
    __tablename__ = "platform_posts"

    id = Column(Integer, primary_key=True, index=True)
    claim_id = Column(Integer, ForeignKey("claims.id"))
    platform = Column(String)
    author_name = Column(String)
    post_url = Column(String)
    engagement_score = Column(Float)

    claim = relationship("Claim", back_populates="platform_posts")

class Analytics(Base):
    __tablename__ = "analytics"

    id = Column(Integer, primary_key=True, index=True)
    total_verifications = Column(Integer, default=0)
    avg_processing_time = Column(Float, default=0.0)
    false_claim_count = Column(Integer, default=0)
    timestamp = Column(DateTime, default=datetime.utcnow)
