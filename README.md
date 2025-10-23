# Failure Academy Web Platform

A full-stack demo for the Failure Academy EdTech experience, combining a cinematic React (Vite + Tailwind + Framer Motion) frontend with a FastAPI backend that exposes role-based workflows, YouTube playlist integration, Telegram doubt forwarding, exams, and chatbot prototypes.

## Project Structure

```
FailureAcademyWeb/
├─ backend/        # FastAPI app, SQLModel models, services
├─ frontend/       # React + Vite SPA with Tailwind UI
├─ README.md
```

## Prerequisites

- Node.js 18+
- Python 3.11+
- (Optional) A virtual environment for Python dependencies

## Backend (FastAPI)

```bash
cd backend
python -m venv .venv && source .venv/bin/activate  # optional but recommended
pip install -r requirements.txt
cp .env.example .env                                # then fill values
uvicorn main:app --reload
```

The API runs on `http://localhost:8000` by default and exposes documentation at `http://localhost:8000/api/openapi.json`.

### Environment Variables

All configuration lives in `backend/.env` (see `.env.example` for defaults):

| Variable | Purpose | How to obtain |
| --- | --- | --- |
| `JWT_SECRET_KEY` | Required for signing access tokens | Generate a long random string (e.g. `python -c "import secrets; print(secrets.token_hex(32))"`) |
| `FRONTEND_ORIGIN` | CORS allow-list entry | Usually `http://localhost:5173` in development |
| `DATABASE_URL` | SQLModel database URL | Defaults to local SQLite file |
| `YOUTUBE_API_KEY` | Unlock real playlist data | Create a project in Google Cloud Console → Enable YouTube Data API v3 → generate API key |
| `YOUTUBE_CHANNEL_HANDLE` | Channel source for playlists | Defaults to `@academyfailure`; change if you point at another channel |
| `TELEGRAM_BOT_TOKEN` | Sends doubts to Telegram | Use [@BotFather](https://t.me/BotFather) to create a bot and copy the token |
| `TELEGRAM_CHAT_ID` | Target community/group | Add the bot to the Failure Academy Telegram group, send a message, fetch `/api/telegram/updates` to read the chat ID |

> **Telegram setup flow:**
> 1. Use the provided invite link `https://t.me/+9tXd6W3j8v5hMDA1` to add your bot to the group.
> 2. Promote the bot if the group requires it to post attachments.
> 3. Send a test message in the group.
> 4. Call `GET /api/telegram/updates` (admin-only) to output the latest `chat_id`, then set `TELEGRAM_CHAT_ID`.

If Telegram credentials are missing, doubts fall back to the local SQLite `doubt` table and return the message “Doubt recorded locally — set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID to enable forwarding.”

### Seeded Accounts and Roles

The database seeds automatically on startup:

- **Admin:** `admin@failureacademy.com` / `Admin@123`
- Courses, exams, and relationships are pre-populated for demo flows.

Register new users via `/api/auth/register` (or the frontend) and choose a role: `student`, `teacher`, or `admin`.

### Notable API Endpoints

- `POST /api/auth/register` — create account and receive JWT
- `POST /api/auth/login` — authenticate and receive JWT
- `GET /api/auth/me` — fetch current user details
- `GET /api/playlists` — YouTube playlists with graceful fallbacks
- `GET /api/courses` — demo course catalogue
- `GET /api/exams` — exam with MCQs (answers included for local scoring)
- `POST /api/doubt` — multipart form for doubts + optional image upload
- `POST /api/chatbot` — placeholder chatbot reply endpoint
- `GET /api/live` — live stream placeholders for YouTube & Facebook
- `GET /api/telegram/updates` — admin-only helper to fetch bot updates
- `POST /api/admin/seed` — admin-only reseed of demo content
- `POST /api/admin/courses` — admin-only demo to add courses

## Frontend (React + Vite)

```bash
cd frontend
npm install
cp .env.example .env.local   # optional: override API base URL
npm run dev                  # starts Vite on http://localhost:5173
```

Key libraries: React Router, Tailwind CSS, Framer Motion, Axios, React Hot Toast, React Icons. The SPA consumes backend endpoints via `src/services/api.js` (update `VITE_API_BASE_URL` to match the backend if needed).

### Frontend Highlights

- Hero section inspired by Nas Daily with gradients, neon glows, and responsive interactions.
- Sections for playlists, courses, live streams, chatbot preview, and a Telegram CTA.
- Modal-driven playlist playback (embedded YouTube player) and course purchase prototype.
- Role-aware dashboards and admin tools (Telegram getUpdates helper, reseed trigger).
- Exams rendered with real-time scoring on the client; results never leave the browser.
- Doubt form with optional image upload that hits the FastAPI `/api/doubt` endpoint.
- Toast notifications and loading states throughout the UX.

## Extending the Demo

- Swap the fallback YouTube data with live data by setting `YOUTUBE_API_KEY` and (optionally) `YOUTUBE_CHANNEL_HANDLE`.
- Connect production Telegram credentials to enable instant doubt forwarding.
- Integrate real payment processing inside the course “Buy Now” flow.
- Plug a proper LLM backend or RAG service into `/api/chatbot` and update the UI to stream responses.
- Expand role-based dashboards with analytics, content authoring, and cohort management features.

## Development Tips

- Backend logs will show when doubts are stored locally vs forwarded to Telegram.
- To reset seed data at any time, call `POST /api/admin/seed` from an admin account.
- Add more playlists or courses by editing `backend/seed.py` and rerunning the seeder.
- Update the YouTube handle in `backend/core/config.py` if Failure Academy rebrands the channel.

Enjoy building the next iteration of Failure Academy! 🚀
# FailureAcademy
