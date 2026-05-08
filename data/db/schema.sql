-- Anveshak AI Database Schema

-- Fact-check claims table
CREATE TABLE IF NOT EXISTS fact_checks (
    id TEXT PRIMARY KEY,
    claim TEXT NOT NULL,
    verdict TEXT NOT NULL,
    category TEXT,
    explanation TEXT,
    source TEXT,
    source_url TEXT,
    date_checked TEXT,
    severity TEXT,
    keywords TEXT -- Stored as comma-separated values or JSON
);

-- Trusted news articles table
CREATE TABLE IF NOT EXISTS trusted_news (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    source TEXT,
    source_url TEXT,
    category TEXT,
    published_date TEXT,
    credibility_score REAL,
    keywords TEXT
);

-- Telegram messages table (collected or mock)
CREATE TABLE IF NOT EXISTS telegram_messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    message_id TEXT,
    channel_name TEXT,
    message_text TEXT,
    views INTEGER,
    forwards INTEGER,
    timestamp TEXT,
    sentiment TEXT
);

-- YouTube videos table (collected or mock)
CREATE TABLE IF NOT EXISTS youtube_videos (
    video_id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    views INTEGER,
    likes INTEGER,
    comments_count INTEGER,
    channel TEXT,
    publish_date TEXT,
    risk_level TEXT,
    flagged_reasons TEXT,
    thumbnail_url TEXT
);

-- Evidence records table
CREATE TABLE IF NOT EXISTS evidence_records (
    evidence_id TEXT PRIMARY KEY,
    claim_id TEXT,
    platform_sources TEXT, -- JSON string
    trusted_references TEXT, -- JSON string
    ai_analysis TEXT, -- JSON string
    FOREIGN KEY (claim_id) REFERENCES fact_checks(id)
);

-- Platform analytics table
CREATE TABLE IF NOT EXISTS platform_analytics (
    key TEXT PRIMARY KEY,
    value TEXT -- JSON string containing stats
);
