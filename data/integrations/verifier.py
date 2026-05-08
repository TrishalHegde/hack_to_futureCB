import sqlite3
import json

DB_PATH = 'data/db/anveshak.db'

def verify_data_correctness():
    print("--- ANVESHAK DATA VERIFICATION REPORT ---")
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    # 1. Get Social Media Data (Potential Misinfo)
    cursor.execute("SELECT post_id, caption, author_name FROM sharechat_posts")
    sc_posts = cursor.fetchall()
    
    cursor.execute("SELECT message_id, message_text, channel_name FROM telegram_messages")
    tg_msgs = cursor.fetchall()
    
    cursor.execute("SELECT video_id, title, channel FROM youtube_videos")
    yt_videos = cursor.fetchall()

    # 2. Get Trusted Data (Ground Truth)
    cursor.execute("SELECT title, source FROM trusted_news")
    trusted_articles = cursor.fetchall()

    social_data = []
    for p in sc_posts: social_data.append({"id": p[0], "text": p[1], "source": f"ShareChat ({p[2]})"})
    for m in tg_msgs: social_data.append({"id": m[0], "text": m[1], "source": f"Telegram ({m[2]})"})
    for v in yt_videos: social_data.append({"id": v[0], "text": v[1], "source": f"YouTube ({v[2]})"})

    conflicts = []
    verified = []

    # Simple Keyword Matching Logic (Prototype)
    keywords_to_check = ["UNESCO", "NASA", "5G", "Vaccine", "500 rupee", "virus"]

    for item in social_data:
        text = item['text'].lower()
        match_found = False
        
        # Check against trusted news
        for art_title, art_source in trusted_articles:
            # If a trusted source mentions the key topic but the social post is "viral/clickbaity"
            for kw in keywords_to_check:
                if kw.lower() in text and kw.lower() in art_title.lower():
                    # We found a topic overlap!
                    # Logic: If social text contains "Breaking" or "NASA says" but trusted news is calm
                    if "breaking" in text or "warning" in text or "declared" in text:
                        conflicts.append({
                            "claim": item['text'],
                            "platform": item['source'],
                            "evidence": art_title,
                            "trusted_source": art_source,
                            "verdict": "SUSPICIOUS / POTENTIAL MISINFORMATION"
                        })
                    else:
                        verified.append(item)
                    match_found = True
                    break
            if match_found: break

    # Display Results
    print(f"\nAnalyzed {len(social_data)} social media entries.")
    print(f"Detected {len(conflicts)} potential misinformation cases.")
    
    print("\n--- DETECTED CONFLICTS ---")
    for c in conflicts:
        print(f"\n[!] ALERT: {c['verdict']}")
        print(f"    Claim: \"{c['claim']}\"")
        print(f"    Platform: {c['platform']}")
        print(f"    Counter-Evidence: {c['evidence']} (Source: {c['trusted_source']})")

    conn.close()

if __name__ == "__main__":
    verify_data_correctness()
