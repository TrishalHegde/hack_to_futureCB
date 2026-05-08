import re
from langdetect import detect, DetectorFactory
from .linguistic import analyze_linguistics
from .similarity import engine
import os

# Set seed for reproducible language detection
DetectorFactory.seed = 0

SUPPORTED_LANGUAGES = {
    'en': 'English',
    'hi': 'Hindi',
    'ta': 'Tamil',
    'te': 'Telugu',
    'kn': 'Kannada',
    'bn': 'Bengali',
    'mr': 'Marathi'
}

def clean_text(text: str) -> str:
    """
    Cleans text by:
    - lowercasing
    - removing emojis (simple regex)
    - removing URLs
    - removing symbols
    """
    # Lowercase
    text = text.lower()
    # Remove URLs
    text = re.sub(r'http\S+|www\S+|https\S+', '', text, flags=re.MULTILINE)
    # Remove Emojis and special characters/symbols (basic approach)
    text = re.sub(r'[^\w\s\d,.]', '', text)
    # Remove extra whitespace
    text = re.sub(r'\s+', ' ', text).strip()
    return text

def detect_language(text: str) -> str:
    """Detects the language of the text."""
    try:
        lang_code = detect(text)
        return lang_code
    except:
        return 'unknown'

def verify_claim(text: str):
    """
    Complete AI verification pipeline.
    """
    # Step 1: Clean text
    cleaned_text = clean_text(text)
    
    # Step 2: Detect Language
    lang_code = detect_language(cleaned_text)
    language = SUPPORTED_LANGUAGES.get(lang_code, 'unknown')
    
    # Step 3: Linguistic Analysis
    linguistic_results = analyze_linguistics(cleaned_text)
    
    # Step 4: Semantic Similarity Matching
    # (Assuming datasets are loaded in the engine)
    fact_check_matches = engine.find_matches(cleaned_text, "fact_checks")
    trusted_news_matches = engine.find_matches(cleaned_text, "trusted_news")
    telegram_matches = engine.find_matches(cleaned_text, "telegram_data")
    youtube_matches = engine.find_matches(cleaned_text, "youtube_data")
    
    # Scoring Logic
    # trusted_source_score * 0.4 + fact_check_score * 0.3 + linguistic_score * 0.2 + spread_score * 0.1
    
    # Calculate component scores (0-100)
    # If match found in trusted news, trusted_source_score is high (indicating credibility)
    trusted_source_score = max([m['similarity_score'] for m in trusted_news_matches]) * 100 if trusted_news_matches else 0
    
    # If match found in fact checks, fact_check_score is high (indicating it's BEEN checked, 
    # but we need to check the verdict of the fact check)
    # For simplicity, if it matches a fact check, we lower the credibility if the fact check says it's false
    fact_check_val = 0
    if fact_check_matches:
        # If any fact check says 'false', it's a high risk
        # Here we just use the max similarity to weight it
        fact_check_val = max([m['similarity_score'] for m in fact_check_matches]) * 100
        
    # Linguistic score (inverse of risk score because we want CREDIBILITY score)
    linguistic_credibility = 100 - linguistic_results['risk_score']
    
    # Spread score (from telegram/youtube) - if found on social platforms but not news, high spread risk
    spread_risk = max([m['similarity_score'] for m in (telegram_matches + youtube_matches)]) * 100 if (telegram_matches + youtube_matches) else 0
    spread_score = 100 - spread_risk

    # Final Credibility Score calculation
    # Formula provided: trusted*0.4 + fact_check*0.3 + linguistic*0.2 + spread*0.1
    # Note: If it's in fact-checks, it usually means it's FALSE in our context.
    # So let's adjust: if matches fact check, it's a PENALTY.
    
    credibility_score = (
        (trusted_source_score * 0.4) + 
        ((100 - fact_check_val) * 0.3) + 
        (linguistic_credibility * 0.2) + 
        (spread_score * 0.1)
    )
    
    # Generate Verdict
    verdict = "Likely True"
    risk_level = "LOW"
    confidence = 0
    
    if credibility_score < 40:
        verdict = "Likely False"
        risk_level = "HIGH"
    elif credibility_score < 70:
        verdict = "Unverified / Mixed"
        risk_level = "MEDIUM"
        
    # Confidence is based on the strength of matches
    all_similarities = [m['similarity_score'] for m in (fact_check_matches + trusted_news_matches + telegram_matches + youtube_matches)]
    if all_similarities:
        confidence = int(max(all_similarities) * 100)
    else:
        # If no semantic matches, confidence is based on linguistic analysis
        confidence = int(100 - abs(50 - linguistic_credibility)) # Closer to 50 is less confident

    return {
        "verdict": verdict,
        "confidence": min(confidence, 100),
        "risk_level": risk_level,
        "credibility_score": int(credibility_score),
        "language_detected": language,
        "linguistic_analysis": linguistic_results,
        "matches": {
            "fact_checks": fact_check_matches,
            "trusted_news": trusted_news_matches,
            "social_platforms": telegram_matches + youtube_matches
        }
    }
