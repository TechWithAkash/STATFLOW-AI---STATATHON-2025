# Deploying the FastAPI Backend

## Quick Start (Docker)

1. Build image
   docker build -t statflow-api ./backend
2. Run
   docker run -p 8000:8000 -e ALLOW_ORIGINS="https://statflowai.vercel.app" statflow-api

## Cloud Platforms
- Render/Fly/Railway: point to start command `uvicorn app:app --host 0.0.0.0 --port 8000` and set env:
  - ALLOW_ORIGINS = https://statflowai.vercel.app
  - (optional) ALLOW_ORIGIN_REGEX = https://.*\.vercel\.app

## Verify
- Health: GET /health
- CORS: From your deployed frontend, ensure /ingest works without CORS errors.
