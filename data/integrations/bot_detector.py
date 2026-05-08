import sqlite3
from collections import Counter
import json

DB_PATH = 'data/db/anveshak.db'

def run_bot_detection():
    print("--- ANVESHAK BOT & COORDINATED BEHAVIOR REPORT ---")
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    # 1. ANALYZE SHARECHAT FOR HIGH-FREQUENCY POSTERS
    print("\n[Analyzing ShareChat for Bot Activity...]")
    cursor.execute("""
        SELECT author_name, COUNT(*) as post_count 
        FROM sharechat_posts 
        GROUP BY author_name 
        ORDER BY post_count DESC
    """)
    sc_authors = cursor.fetchall()
    
    for author, count in sc_authors:
        if count > 2: # Threshold for prototype
            print(f"[FLAG] High Frequency User found: {author} ({count} posts detected)")

    # 2. ANALYZE TELEGRAM FOR COORDINATED MESSAGE SPREAD
    print("\n[Analyzing Telegram for Coordinated Messaging...]")
    cursor.execute("SELECT message_text FROM telegram_messages")
    all_msgs = [m[0] for m in cursor.fetchall()]
    
    # Check for duplicate text across different messages
    counts = Counter(all_msgs)
    duplicates = {text: count for text, count in counts.items() if count > 1}
    
    if duplicates:
        for text, count in duplicates.items():
            print(f"[ALERT] Coordinated Text detected {count} times!")
            print(f"   Text Snippet: \"{text[:60]}...\"")
    else:
        print("[OK] No immediate coordinated text patterns found on Telegram.")

    # 3. CROSS-PLATFORM RUMOR VELOCITY
    # (Checking if the same topic is hitting multiple platforms at once)
    print("\n[Analyzing Cross-Platform Velocity...]")
    
    # Get all content text
    cursor.execute("SELECT caption FROM sharechat_posts")
    sc_text = [t[0].lower() for t in cursor.fetchall()]
    
    cursor.execute("SELECT message_text FROM telegram_messages")
    tg_text = [t[0].lower() for t in cursor.fetchall()]

    keywords = ["unesco", "nasa", "pm", "vaccine", "government", "lockdown"]
    
    for kw in keywords:
        sc_hits = sum(1 for t in sc_text if kw in t)
        tg_hits = sum(1 for t in tg_text if kw in t)
        
        if sc_hits > 0 and tg_hits > 0:
            velocity_score = sc_hits + tg_hits
            print(f"[SPEED] HIGH VELOCITY TOPIC: '{kw.upper()}' is spreading across BOTH ShareChat and Telegram!")
            print(f"   Intensity Score: {velocity_score}")

    # 4. SOURCE REPUTATION SUMMARY
    print("\n--- SOURCE REPUTATION SUMMARY ---")
    total_suspicious_sources = len([a for a, c in sc_authors if c > 2])
    if total_suspicious_sources > 0:
        print(f"[RESULT] Identified {total_suspicious_sources} suspicious accounts likely to be bots.")
    else:
        print("[OK] All sources currently appear within normal human behavior limits.")

    conn.close()

if __name__ == "__main__":
    run_bot_detection()
