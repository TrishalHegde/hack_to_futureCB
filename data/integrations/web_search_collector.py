import os
import json
import requests
import sqlite3
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

SERPER_API_KEY = os.getenv('SERPER_API_KEY')
DB_PATH = 'data/db/anveshak.db'

# Legit domains to restrict search for high-quality verification
LEGIT_DOMAINS = [
    "pib.gov.in",
    "snopes.com",
    "factcheck.org",
    "altnews.in",
    "who.int",
    "reuters.com",
    "fullfact.org",
    "boomlive.in"
]

def search_web_for_verification(claim, limit=3):
    if not SERPER_API_KEY:
        print("Error: SERPER_API_KEY not found in .env")
        return []

    print(f"Performing live web verification for: {claim}...")
    
    # Constructing a targeted search query
    # Example: "claim text" (site:pib.gov.in OR site:snopes.com ...)
    site_query = " OR ".join([f"site:{site}" for site in LEGIT_DOMAINS])
    full_query = f"{claim} ({site_query})"

    url = "https://google.serper.dev/search"
    payload = json.dumps({
        "q": full_query,
        "num": limit
    })
    headers = {
        'X-API-KEY': SERPER_API_KEY,
        'Content-Type': 'application/json'
    }

    try:
        response = requests.request("POST", url, headers=headers, data=payload)
        results = response.json()
        
        found_evidence = []
        
        # Process organic search results
        for result in results.get('organic', []):
            evidence = {
                "id": f"web_{result.get('position', '0')}",
                "title": result.get('title'),
                "content": result.get('snippet'),
                "source": result.get('link').split('/')[2], # Extract domain
                "source_url": result.get('link'),
                "category": "Live Search",
                "published_date": result.get('date', 'Recent'),
                "credibility_score": 1.0 # High credibility because we restricted domains
            }
            found_evidence.append(evidence)

        if found_evidence:
            save_to_db(found_evidence)
            print(f"Found {len(found_evidence)} legit evidence sources online.")
            return found_evidence
        else:
            print("No direct fact-checks found on legit sites for this claim.")
            return []

    except Exception as e:
        print(f"Search error: {e}")
        return []

def save_to_db(articles):
    if not articles:
        return
        
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    art_tuples = [
        (
            a['id'] + "_" + str(os.urandom(2).hex()), # Unique ID for search results
            a['title'],
            a['content'],
            a['source'],
            a['source_url'],
            a['category'],
            a['published_date'],
            a['credibility_score']
        ) for a in articles
    ]
    
    cursor.executemany(
        "INSERT OR REPLACE INTO trusted_news (id, title, content, source, source_url, category, published_date, credibility_score) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        art_tuples
    )
    
    conn.commit()
    conn.close()

if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser(description="Live Web Search Verifier.")
    parser.add_argument("--claim", type=str, required=True, help="Claim to verify")
    
    args = parser.parse_args()
    results = search_web_for_verification(args.claim)
    
    if results:
        print("\n--- LIVE SEARCH EVIDENCE ---")
        for r in results:
            print(f"Source: {r['source']}")
            print(f"Title: {r['title']}")
            print(f"Link: {r['source_url']}\n")
