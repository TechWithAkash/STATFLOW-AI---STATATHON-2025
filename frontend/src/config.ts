/// <reference types="vite/client" />
// Prefer explicit VITE_API_BASE; otherwise if running on Vercel, infer same-origin API via relative proxy (set in hosting) or fallback to localhost for dev
const fromEnv = import.meta.env.VITE_API_BASE as string | undefined
const isBrowser = typeof window !== 'undefined'
const isProdHost = isBrowser && /vercel\.app$|statflowai\./i.test(window.location.hostname)

export const API_BASE = fromEnv || (isProdHost ? 'https://statflow-api.yourdomain.com' : 'http://127.0.0.1:8000')
export const WS_BASE = API_BASE.replace(/^http/i, 'ws')
