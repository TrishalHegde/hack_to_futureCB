import os
import json
import sqlite3
import requests
from datetime import datetime

# Path to the database
DB_PATH = 'data/db/anveshak.db'

def collect_sharechat_data(topic="trending", limit=10):
    print(f"Attempting REAL-TIME extraction from ShareChat for: {topic}...")
    
    posts = []
    try:
        # Real attempt to fetch from the web version
        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36'}
        response = requests.get(f"https://sharechat.com/tag/{topic}", headers=headers, timeout=10)
        
        if response.status_code == 200:
            print("Successfully reached ShareChat. Note: Advanced scraping may require Playwright/Selenium for JS content.")
            # In a production environment with JS rendering, we would extract real posts here.
            # For now, we remain 100% honest: if the page doesn't return raw JSON/HTML posts, we return empty.
        else:
            print(f"Could not reach ShareChat (Status: {response.status_code})")
            
    except Exception as e:
        print(f"Real-time collection error: {e}")

    if posts:
        save_to_db(posts)
        # ... rest of the code ...
        save_to_db(posts)
        
        # Save to JSON for verification
        os.makedirs('data/datasets', exist_ok=True)
        with open('data/datasets/collected_sharechat.json', 'w', encoding='utf-8') as f:
            json.dump(posts, f, indent=2)
            
        print(f"Collected {len(posts)} posts from ShareChat.")
    else:
        print("No posts collected.")

def save_to_db(posts):
    if not posts:
        return
        
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        
        post_tuples = [
            (
                p['post_id'],
                p['caption'],
                p['author_name'],
                p['views'],
                p['shares'],
                p['timestamp'],
                p['tags'],
                p['post_url']
            ) for p in posts
        ]
        
        cursor.executemany(
            "INSERT OR REPLACE INTO sharechat_posts (post_id, caption, author_name, views, shares, timestamp, tags, post_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            post_tuples
        )
        
        conn.commit()
        conn.close()
        print(f"Saved {len(posts)} posts to {DB_PATH}")
    except sqlite3.Error as e:
        print(f"Database error: {e}")

if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser(description="Collect posts from ShareChat.")
    parser.add_argument("--topic", type=str, default="trending", help="Topic or tag to search")
    parser.add_argument("--limit", type=int, default=5, help="Max results")
    
    args = parser.parse_args()
    collect_sharechat_data(args.topic, args.limit)
