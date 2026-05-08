import feedparser
import json
import argparse
import sqlite3
import os
from datetime import datetime

FEEDS = {
    "reuters": "https://www.reutersagency.com/feed/", # Note: Real feeds might vary, these are placeholders
    "bbc": "http://feeds.bbci.co.uk/news/rss.xml",
    "who": "https://www.who.int/rss-feeds/news-english.xml",
    "ndtv": "https://feeds.feedburner.com/ndtvnews-top-stories",
    "indianexpress": "https://indianexpress.com/feed/"
}

DB_PATH = 'data/db/anveshak.db'

def collect_rss(sources):
    all_articles = []
    
    for source in sources:
        url = FEEDS.get(source.lower())
        if not url:
            print(f"Unknown source: {source}")
            continue
            
        print(f"Collecting from {source}...")
        feed = feedparser.parse(url)
        
        for entry in feed.entries:
            article = {
                "id": entry.get('id', entry.link),
                "title": entry.title,
                "content": entry.get('summary', entry.get('description', '')),
                "source": source.upper(),
                "source_url": entry.link,
                "category": "general",
                "published_date": entry.get('published', datetime.now().isoformat()),
                "credibility_score": 0.9, # Default high for trusted sources
                "keywords": "[]"
            }
            all_articles.append(article)

    # Save to SQLite
    save_to_db(all_articles)
    
    # Save to JSON
    with open('data/datasets/collected_news.json', 'w') as f:
        json.dump(all_articles, f, indent=2)
        
    print(f"Collected {len(all_articles)} articles.")

def save_to_db(articles):
    if not articles:
        return
        
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    art_tuples = [
        (
            a['id'],
            a['title'],
            a['content'],
            a['source'],
            a['source_url'],
            a['category'],
            a['published_date'],
            a['credibility_score'],
            a['keywords']
        ) for a in articles
    ]
    
    cursor.executemany(
        "INSERT OR REPLACE INTO trusted_news (id, title, content, source, source_url, category, published_date, credibility_score, keywords) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        art_tuples
    )
    
    conn.commit()
    conn.close()
    print(f"Saved {len(articles)} articles to {DB_PATH}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Collect news from RSS feeds.")
    parser.add_argument("--sources", type=str, help="Comma-separated list of sources (reuters, bbc, who, ndtv, indianexpress)")
    
    args = parser.parse_args()
    
    if not args.sources:
        print(f"Available sources: {', '.join(FEEDS.keys())}")
    else:
        sources_list = [s.strip() for s in args.sources.split(',')]
        collect_rss(sources_list)
