import os
import argparse
import json
import sqlite3
from datetime import datetime
from telethon import TelegramClient, events
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

API_ID = os.getenv('TELEGRAM_API_ID')
API_HASH = os.getenv('TELEGRAM_API_HASH')
DB_PATH = 'data/db/anveshak.db'

async def collect_messages(channels, limit=100):
    if not API_ID or not API_HASH:
        print("Error: TELEGRAM_API_ID and TELEGRAM_API_HASH must be set in .env file.")
        return

    async with TelegramClient('anveshak_session', API_ID, API_HASH) as client:
        all_messages = []
        
        for channel in channels:
            print(f"Collecting messages from {channel}...")
            try:
                async for message in client.iter_messages(channel, limit=limit):
                    if message.text:
                        msg_data = {
                            "message_id": str(message.id),
                            "channel_name": channel,
                            "message_text": message.text,
                            "views": message.views or 0,
                            "forwards": message.forwards or 0,
                            "timestamp": message.date.isoformat(),
                            "sentiment": "unverified"
                        }
                        all_messages.append(msg_data)
            except Exception as e:
                print(f"Error collecting from {channel}: {e}")

        # Save to SQLite
        save_to_db(all_messages)
        
        # Save to JSON for verification
        with open('data/datasets/collected_telegram.json', 'w') as f:
            json.dump(all_messages, f, indent=2)
            
        print(f"Collected {len(all_messages)} messages.")

def save_to_db(messages):
    if not messages:
        return
        
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    msg_tuples = [
        (
            m['message_id'],
            m['channel_name'],
            m['message_text'],
            m['views'],
            m['forwards'],
            m['timestamp'],
            m['sentiment']
        ) for m in messages
    ]
    
    cursor.executemany(
        "INSERT OR REPLACE INTO telegram_messages (message_id, channel_name, message_text, views, forwards, timestamp, sentiment) VALUES (?, ?, ?, ?, ?, ?, ?)",
        msg_tuples
    )
    
    conn.commit()
    conn.close()
    print(f"Saved {len(messages)} messages to {DB_PATH}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Collect messages from Telegram channels.")
    parser.add_argument("--channels", type=str, help="Comma-separated list of channel usernames")
    parser.add_argument("--limit", type=int, default=50, help="Max messages per channel")
    
    args = parser.parse_args()
    
    if not args.channels:
        print("Please provide channels using --channels flag.")
    else:
        import asyncio
        channels_list = [c.strip() for c in args.channels.split(',')]
        asyncio.run(collect_messages(channels_list, args.limit))
