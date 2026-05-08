import os
import argparse
import json
import sqlite3
from googleapiclient.discovery import build
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

API_KEY = os.getenv('YOUTUBE_API_KEY')
DB_PATH = 'data/db/anveshak.db'

def collect_videos(query, max_results=25):
    if not API_KEY:
        print("Error: YOUTUBE_API_KEY must be set in .env file.")
        return

    youtube = build('youtube', 'v3', developerKey=API_KEY)
    
    print(f"Searching YouTube for: {query}...")
    search_response = youtube.search().list(
        q=query,
        part='id,snippet',
        maxResults=max_results,
        type='video'
    ).execute()

    video_ids = [item['id']['videoId'] for item in search_response.get('items', [])]
    
    if not video_ids:
        print("No videos found.")
        return

    # Get detailed statistics
    stats_response = youtube.videos().list(
        id=','.join(video_ids),
        part='snippet,statistics'
    ).execute()

    all_videos = []
    for item in stats_response.get('items', []):
        snippet = item['snippet']
        stats = item['statistics']
        
        video_data = {
            "video_id": item['id'],
            "title": snippet['title'],
            "views": int(stats.get('viewCount', 0)),
            "likes": int(stats.get('likeCount', 0)),
            "comments_count": int(stats.get('commentCount', 0)),
            "channel": snippet['channelTitle'],
            "publish_date": snippet['publishedAt'],
            "risk_level": "unverified",
            "flagged_reasons": "[]",
            "thumbnail_url": snippet['thumbnails']['high']['url']
        }
        all_videos.append(video_data)

    # Save to SQLite
    save_to_db(all_videos)
    
    # Save to JSON for verification
    with open('data/datasets/collected_youtube.json', 'w') as f:
        json.dump(all_videos, f, indent=2)
        
    print(f"Collected {len(all_videos)} videos.")

def save_to_db(videos):
    if not videos:
        return
        
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    video_tuples = [
        (
            v['video_id'],
            v['title'],
            v['views'],
            v['likes'],
            v['comments_count'],
            v['channel'],
            v['publish_date'],
            v['risk_level'],
            v['flagged_reasons'],
            v['thumbnail_url']
        ) for v in videos
    ]
    
    cursor.executemany(
        "INSERT OR REPLACE INTO youtube_videos (video_id, title, views, likes, comments_count, channel, publish_date, risk_level, flagged_reasons, thumbnail_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        video_tuples
    )
    
    conn.commit()
    conn.close()
    print(f"Saved {len(videos)} videos to {DB_PATH}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Collect video metadata from YouTube.")
    parser.add_argument("--query", type=str, help="Search query")
    parser.add_argument("--limit", type=int, default=25, help="Max results")
    
    args = parser.parse_args()
    
    if not args.query:
        print("Please provide a query using --query flag.")
    else:
        collect_videos(args.query, args.limit)
