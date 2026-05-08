# Anveshak AI — Short Project README

## Overview

Anveshak AI is an AI-powered misinformation verification platform that helps users analyze suspicious news, viral claims, social media messages, Telegram forwards, and YouTube content using evidence-based credibility analysis.

The platform combines:

* Fact-check datasets
* Trusted news comparisons
* Telegram evidence analysis
* YouTube evidence analysis
* AI linguistic pattern detection
* Semantic similarity matching

The system does **not** claim absolute truth detection.
Instead, it provides:

* Credibility scores
* Evidence-backed analysis
* Risk indicators
* Source attribution

---

# Tech Stack

## Frontend

* React + Vite
* TailwindCSS
* Framer Motion
* Axios
* Recharts

## Backend

* FastAPI
* SQLite
* SQLAlchemy
* Pydantic

## AI/NLP

* Sentence Transformers
* Scikit-learn
* Langdetect
* NLTK / spaCy
* Cosine Similarity

## Integrations

* Telethon
* YouTube Data API v3
* RSS/News feeds

---

# Team Structure (4 Members)

## 1. Frontend/UI Lead

### Responsibilities

* Landing page
* Analysis dashboard
* Charts & visualizations
* Reusable components
* API integration
* Responsive UI

### Branch Name

```bash
frontend-ui
```

---

## 2. Backend/API Lead

### Responsibilities

* FastAPI backend
* API routes
* SQLite integration
* Database models
* Swagger docs
* Authentication
* Service architecture

### Branch Name

```bash
backend-api
```

---

## 3. AI/NLP Engineer

### Responsibilities

* Claim verification pipeline
* Semantic similarity
* Credibility scoring
* Linguistic analysis
* Verdict generation
* NLP preprocessing

### Branch Name

```bash
ai-engine
```

---

## 4. Data & Integrations Engineer

### Responsibilities

* Fact-check datasets
* Trusted news datasets
* Telegram integration
* YouTube integration
* Mock demo datasets
* Evidence timelines

### Branch Name

```bash
data-integrations
```

---

# Suggested Git Workflow

## Main Branches

```bash
main
dev
frontend-ui
backend-api
ai-engine
data-integrations
```

## Workflow

1. Work on feature branch
2. Push commits regularly
3. Create Pull Request to `dev`
4. Test integration
5. Merge into `main` before demo

---

# Suggested Folder Structure

```bash
anveshak-ai/
│
├── frontend/
│
├── backend/
│   ├── routes/
│   ├── services/
│   ├── models/
│   ├── utils/
│   ├── data/
│
├── datasets/
│
├── docs/
│
└── README.md
```

---

# MVP Goal

Build a hackathon-ready misinformation verification platform that:

* accepts suspicious claims,
* analyzes evidence,
* generates credibility insights,
* and visualizes misinformation spread.

---

# Important Constraints

* No private message scraping
* No real-time internet-wide surveillance
* No political censorship
* No guaranteed truth detection

---

# Demo Flow

1. User pastes suspicious claim
2. AI analyzes text
3. System compares evidence
4. Credibility score generated
5. Dashboard displays:

   * verdict
   * evidence
   * spread timeline
   * risk indicators
