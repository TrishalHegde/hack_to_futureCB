import requests
import json

def test_verify_claim():
    url = "http://127.0.0.1:8000/api/v1/verify"
    
    claims = [
        "FORWARDED: The government is shutting down the internet tomorrow at 10 PM. Share before it's too late!!",
        "The Reserve Bank of India has announced a new repo rate hike of 25 basis points.",
        "Drinking boiled garlic water cures COVID-19 immediately."
    ]
    
    for claim in claims:
        print(f"Testing claim: {claim}")
        payload = {"text": claim}
        try:
            response = requests.post(url, json=payload)
            response.raise_for_status()
            result = response.json()
            print(f"Verdict: {result['verdict']} (Confidence: {result['confidence']}%)")
            print(f"Risk Level: {result['risk_level']}")
            print(f"Credibility Score: {result['credibility_score']}")
            print("-" * 40)
        except Exception as e:
            print(f"Error testing claim: {e}")

if __name__ == "__main__":
    test_verify_claim()
