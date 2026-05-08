import requests
import json
import time

BASE_URL = "http://localhost:8000"

def test_system():
    print("=== ANVESHAK AI: FINAL SYSTEM STRESS TEST (100% REAL DATA) ===\n")
    
    test_cases = [
        {
            "type": "TRUE NEWS",
            "claim": "India beat South Africa to win T20 World Cup 2024"
        },
        {
            "type": "FAMOUS HOAX",
            "claim": "UNESCO declared Indian National Anthem as the best in the world"
        },
        {
            "type": "HEALTH MISINFO",
            "claim": "COVID-19 vaccines contain liquid magnetic microchips"
        },
        {
            "type": "SPACE RUMOR",
            "claim": "NASA released photos of India fully lit up on Diwali 2024"
        }
    ]

    for case in test_cases:
        print(f"--- TESTING {case['type']} ---")
        print(f"Claim: '{case['claim']}'")
        
        try:
            start_time = time.time()
            response = requests.post(f"{BASE_URL}/verify", json={"claim": case["claim"]}, timeout=30)
            elapsed = time.time() - start_time
            
            if response.status_code == 200:
                data = response.json()
                print(f"Verdict: {data['verdict']}")
                print(f"Confidence: {data['confidence'] * 100:.1f}%")
                print(f"Analysis: {data['analysis_summary']}")
                print(f"Time Taken: {elapsed:.2f}s")
                
                # Show top evidence source
                if data['evidence']:
                    top = data['evidence'][0]
                    print(f"Top Source: {top['source']} - {top['title']}")
            else:
                print(f"Error: Received status code {response.status_code}")
                
        except Exception as e:
            print(f"Connection Error: {e}")
            
        print("\n" + "="*50 + "\n")

if __name__ == "__main__":
    # Wait a second for backend to be ready if needed
    time.sleep(1)
    test_system()
