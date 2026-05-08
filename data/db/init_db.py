import sqlite3
import json
import os

DB_PATH = 'data/db/anveshak.db'
SCHEMA_PATH = 'data/db/schema.sql'
DATASETS_DIR = 'data/datasets'
MOCK_DIR = 'data/datasets/mock'

def init_db():
    print(f"Initializing database at {DB_PATH}...")
    
    # Ensure directory exists
    os.makedirs(os.path.dirname(DB_PATH), exist_ok=True)
    
    # Remove existing DB to ensure schema updates are applied
    if os.path.exists(DB_PATH):
        os.remove(DB_PATH)
        print(f"Removed existing database at {DB_PATH}")
    
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    # Execute schema
    with open(SCHEMA_PATH, 'r') as f:
        cursor.executescript(f.read())
    
    print("Schema applied successfully.")
    
    # Seed fact-checks
    seed_json_to_table(cursor, os.path.join(DATASETS_DIR, 'fact_checks.json'), 'fact_checks')
    
    # Seed trusted-news
    seed_json_to_table(cursor, os.path.join(DATASETS_DIR, 'trusted_news.json'), 'trusted_news')
    
    # Seed mock telegram spread (into telegram_messages)
    seed_telegram_mock(cursor, os.path.join(MOCK_DIR, 'telegram_spread.json'))
    
    # Seed mock youtube misinfo (into youtube_videos)
    seed_json_to_table(cursor, os.path.join(MOCK_DIR, 'youtube_misinfo.json'), 'youtube_videos')
    
    # Seed mock evidence
    seed_json_to_table(cursor, os.path.join(MOCK_DIR, 'evidence_records.json'), 'evidence_records')
    
    # Seed platform analytics
    seed_analytics(cursor, os.path.join(MOCK_DIR, 'platform_analytics.json'))
    
    conn.commit()
    conn.close()
    print("Database initialization and seeding complete.")

def seed_json_to_table(cursor, file_path, table_name):
    if not os.path.exists(file_path):
        print(f"Warning: {file_path} not found. Skipping.")
        return
    
    with open(file_path, 'r') as f:
        data = json.load(f)
        
    if not data:
        return

    # Handle keywords as string if they are lists
    for item in data:
        for key, value in item.items():
            if isinstance(value, list) or isinstance(value, dict):
                item[key] = json.dumps(value)

    columns = list(data[0].keys())
    placeholders = ', '.join(['?'] * len(columns))
    sql = f"INSERT OR REPLACE INTO {table_name} ({', '.join(columns)}) VALUES ({placeholders})"
    
    values = [tuple(item.get(col) for col in columns) for item in data]
    cursor.executemany(sql, values)
    print(f"Seeded {len(data)} records into {table_name}.")

def seed_telegram_mock(cursor, file_path):
    if not os.path.exists(file_path):
        return
    
    with open(file_path, 'r') as f:
        data = json.load(f)
        
    messages = []
    for entry in data:
        for spread in entry.get('spread_timeline', []):
            messages.append((
                None, # message_id
                spread.get('channel'),
                entry.get('claim'), # Use claim as message text for mock
                spread.get('views'),
                spread.get('forwards'),
                spread.get('timestamp'),
                spread.get('sentiment')
            ))
            
    if messages:
        cursor.executemany(
            "INSERT INTO telegram_messages (message_id, channel_name, message_text, views, forwards, timestamp, sentiment) VALUES (?, ?, ?, ?, ?, ?, ?)",
            messages
        )
        print(f"Seeded {len(messages)} mock messages into telegram_messages.")

def seed_analytics(cursor, file_path):
    if not os.path.exists(file_path):
        return
    
    with open(file_path, 'r') as f:
        data = json.load(f)
        
    cursor.execute("INSERT OR REPLACE INTO platform_analytics (key, value) VALUES (?, ?)", ('summary_stats', json.dumps(data)))
    print("Seeded platform analytics summary.")

if __name__ == "__main__":
    init_db()
