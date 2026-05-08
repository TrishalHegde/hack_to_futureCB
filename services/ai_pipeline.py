from langdetect import detect
import re

# We will try to import sentence_transformers, but provide a fallback if it's too heavy or fails to load.
try:
    from sentence_transformers import SentenceTransformer, util
    model = SentenceTransformer('all-MiniLM-L6-v2')
    HAS_TRANSFORMERS = True
except Exception as e:
    print(f"Warning: Could not load sentence-transformers. Using stub semantic similarity. Error: {e}")
    HAS_TRANSFORMERS = False

def clean_text(text: str) -> str:
    text = text.lower()
    text = re.sub(r'http\S+', '', text) # strip URLs
    text = re.sub(r'[^\w\s]', '', text) # strip punctuation
    return text.strip()

def detect_language(text: str) -> str:
    try:
        return detect(text)
    except:
        return "unknown"

def calculate_similarity(claim_text: str, evidence_text: str) -> float:
    """
    Calculates semantic similarity.
    If SentenceTransformers is available, it uses it. Otherwise, returns a stub value.
    """
    if HAS_TRANSFORMERS:
        emb1 = model.encode(claim_text, convert_to_tensor=True)
        emb2 = model.encode(evidence_text, convert_to_tensor=True)
        cosine_scores = util.cos_sim(emb1, emb2)
        return float(cosine_scores[0][0])
    else:
        # Simple stub for environments where transformers fail to load or install
        return 0.75 

def generate_verdict(credibility_score: float) -> str:
    if credibility_score > 0.8:
        return "Likely True"
    elif credibility_score > 0.5:
        return "Mixed Evidence"
    elif credibility_score > 0.3:
        return "Likely Misleading"
    else:
        return "Insufficient Evidence"

async def process_claim(claim_text: str, evidence_list: list) -> dict:
    cleaned = clean_text(claim_text)
    lang = detect_language(cleaned)
    
    total_score = 0
    scored_evidence = []
    
    for ev in evidence_list:
        sim_score = calculate_similarity(cleaned, ev.get("extracted_text", ""))
        ev["similarity_score"] = sim_score
        total_score += sim_score
        scored_evidence.append(ev)
        
    avg_score = total_score / len(evidence_list) if evidence_list else 0.0
    # Normalize or apply weights in a real scenario
    credibility_score = avg_score 
    
    verdict = generate_verdict(credibility_score)
    
    return {
        "normalized_text": cleaned,
        "language": lang,
        "credibility_score": credibility_score,
        "verdict": verdict,
        "scored_evidence": scored_evidence
    }
