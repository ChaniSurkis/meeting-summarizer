# 🎙️ Meeting Summarizer

An AI-powered meeting intelligence platform that transforms audio recordings into structured summaries, key points, and action items — instantly.

![Tech Stack](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

---

## ✨ Features

- 🎵 **Audio Upload** — Drag & drop support for MP3, MP4, M4A, WAV files
- 🗣️ **AI Transcription** — Powered by OpenAI Whisper, supports Hebrew and 99 other languages
- 📋 **Smart Summarization** — GPT-4o generates structured meeting summaries
- ✅ **Key Points Extraction** — Automatically identifies the most important takeaways
- 🎯 **Action Items** — Extracts tasks with owners from the conversation
- ⚡ **Async Processing** — Non-blocking background processing with real-time status updates
- 💾 **Persistent Storage** — All meetings saved to PostgreSQL via Supabase

---

## 🏗️ Architecture
```
┌─────────────────┐     ┌──────────────────────────────────┐
│   React Frontend │────▶│         FastAPI Backend           │
│  TypeScript      │     │                                  │
│  Tailwind CSS    │     │  ┌─────────┐    ┌─────────────┐ │
└─────────────────┘     │  │ Whisper │    │   GPT-4o    │ │
                         │  │   API   │───▶│    mini     │ │
                         │  └─────────┘    └─────────────┘ │
                         │         │                        │
                         │         ▼                        │
                         │  ┌─────────────┐                 │
                         │  │  PostgreSQL  │                 │
                         │  │  (Supabase) │                 │
                         │  └─────────────┘                 │
                         └──────────────────────────────────┘
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, TypeScript, Tailwind CSS |
| Backend | FastAPI, Python 3.10 |
| AI - Speech to Text | OpenAI Whisper API |
| AI - Summarization | OpenAI GPT-4o mini + LangChain |
| Database | PostgreSQL (Supabase) |
| ORM | SQLAlchemy |

---

## 🚀 Getting Started

### Prerequisites
- Python 3.10+
- Node.js 18+
- OpenAI API Key
- Supabase account (free)

### Backend Setup
```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
pip install fastapi uvicorn openai sqlalchemy psycopg2-binary python-dotenv python-multipart
```

Create `.env` file:
```
OPENAI_API_KEY=your_openai_api_key
DATABASE_URL=your_supabase_connection_string
```

Run the server:
```bash
uvicorn main:app --reload
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/meetings/upload-audio` | Upload audio file for processing |
| `GET` | `/api/meetings/{id}` | Get meeting results by ID |
| `GET` | `/api/meetings` | List all meetings |

---

## 💡 How It Works

1. User uploads an audio file via drag & drop
2. Backend saves the file and returns a `meeting_id` immediately
3. Background task sends audio to **Whisper API** for transcription
4. Transcript is sent to **GPT-4o mini** with a structured prompt
5. Results (summary, key points, action items) are saved to **PostgreSQL**
6. Frontend polls every 2 seconds until status is `done`
7. Results are displayed in a clean tabbed interface

---

## 📁 Project Structure
```
meeting-summarizer/
├── backend/
│   ├── main.py              # FastAPI app & CORS
│   ├── database.py          # SQLAlchemy models & DB connection
│   ├── routers/
│   │   └── meetings.py      # API endpoints
│   └── services/
│       ├── whisper.py       # Audio transcription
│       └── summarizer.py    # GPT summarization
└── frontend/
    └── src/
        ├── App.tsx           # Main app component
        ├── api/
        │   └── meetings.ts   # API calls
        ├── components/
        │   ├── UploadZone.tsx
        │   ├── StatusCard.tsx
        │   └── MeetingResults.tsx
        └── types/
            └── meeting.ts    # TypeScript interfaces
```

---

## 🔮 Roadmap

- [ ] Speaker diarization (identify different speakers)
- [ ] Semantic search across all meetings
- [ ] Slack / Teams integration
- [ ] Export to PDF
- [ ] Multi-language support UI

---

## 👩‍💻 Author

Built with ❤️ as a portfolio project to demonstrate AI engineering skills with modern full-stack development.
