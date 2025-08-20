# StatFlow AI Deployment Guide

This app is a Vite React SPA (frontend) with a FastAPI backend.

## Production checklist

- Backend (FastAPI)
  - Set environment variable `ALLOW_ORIGINS` to a comma-separated list of allowed origins, e.g.
    - `https://statflowai.vercel.app,https://*.statflowai.vercel.app`
  - Serve over HTTPS (behind a reverse proxy like Nginx or via a platform like Fly.io/Render/Heroku).
  - Ensure ports are open and CORS headers are returned.

- Frontend (Vercel)
  - Set `VITE_API_BASE` in Vercel Project Settings → Environment Variables to your public API base, e.g.
    - `https://api.yourdomain.com`
  - Re-deploy after setting env variables.

## Local dev

- Backend: `uvicorn app:app --reload`
- Frontend: `npm run dev` in `frontend`.

## Troubleshooting CORS

- If you see "CORS request did not succeed":
  - Verify frontend uses HTTPS and API is also HTTPS.
  - On backend, set `ALLOW_ORIGINS` to your deployed frontend domain.
  - Confirm `VITE_API_BASE` is set in the frontend deploy and points to the same API domain.
