/// <reference types="vite/client" />
// Prefer explicit VITE_API_BASE; otherwise if running on Vercel/production, use demo mode; fallback to localhost for dev
const fromEnv = import.meta.env.VITE_API_BASE as string | undefined
const isBrowser = typeof window !== 'undefined'
const isProdHost = isBrowser && /vercel\.app$|statflowai\./i.test(window.location.hostname)

// Use demo mode for production deployments when no backend is specified
export const USE_DEMO_MODE = isProdHost && !fromEnv
export const API_BASE = fromEnv || (isProdHost ? 'DEMO_MODE' : 'http://127.0.0.1:8000')
export const WS_BASE = API_BASE === 'DEMO_MODE' ? 'DEMO_MODE' : API_BASE.replace(/^http/i, 'ws')
