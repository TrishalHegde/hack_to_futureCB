import re

# Linguistic analysis patterns
LINGUISTIC_PATTERNS = {
    "fear_language": [
        r"dangerous", r"warning", r"scary", r"death", r"killed", r"terror", 
        r"threat", r"attack", r"poison", r"harm", r"khatra", r"savdhan"
    ],
    "urgency": [
        r"forward urgently", r"share immediately", r"breaking news", 
        r"as soon as possible", r"don't wait", r"turant", r"jaldi", 
        r"share before deleted", r"deleted soon"
    ],
    "conspiracy": [
        r"government hiding", r"secret agenda", r"they don't want you to know", 
        r"hidden truth", r"mainstream media is lying", r"propaganda", 
        r"conspiracy", r"exposed", r"parda-faash"
    ],
    "manipulation": [
        r"must watch", r"100% true", r"verified by experts", 
        r"don't trust them", r"wake up", r"shocking", r"incredible"
    ]
}

def analyze_linguistics(text: str):
    """
    Analyzes text for manipulation patterns, fear language, urgency, and conspiracy.
    """
    text = text.lower()
    results = {
        "fear_language": 0,
        "urgency": 0,
        "conspiracy": 0,
        "manipulation": 0
    }
    
    matches_found = []
    
    for category, patterns in LINGUISTIC_PATTERNS.items():
        count = 0
        for pattern in patterns:
            matches = re.findall(pattern, text)
            if matches:
                count += len(matches)
                matches_found.append({"category": category, "pattern": pattern})
        results[category] = count

    # Calculate a linguistic risk score (0-100)
    # Total matches weighted
    total_matches = sum(results.values())
    linguistic_score = min(total_matches * 15, 100)  # Each match adds 15% risk, cap at 100
    
    return {
        "details": results,
        "matches": matches_found,
        "risk_score": linguistic_score
    }
