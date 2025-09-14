// // frontend/src/config.ts

// /// <reference types="vite/client" />
// // Prefer explicit VITE_API_BASE; otherwise if running on Vercel/production, use demo mode; fallback to localhost for dev
// const fromEnv = import.meta.env.VITE_API_BASE as string | undefined
// const isBrowser = typeof window !== 'undefined'
// const isProdHost = isBrowser && /vercel\.app$|statflowai\./i.test(window.location.hostname)

// // Use demo mode for production deployments when no backend is specified
// export const USE_DEMO_MODE = isProdHost && !fromEnv
// export const API_BASE = fromEnv || (isProdHost ? 'DEMO_MODE' : 'http://127.0.0.1:8000')
// export const WS_BASE = API_BASE === 'DEMO_MODE' ? 'DEMO_MODE' : API_BASE.replace(/^http/i, 'ws')



/// <reference types="vite/client" />

const isBrowser = typeof window !== 'undefined'
const fromEnv = import.meta.env.VITE_API_BASE as string | undefined

// Check if running on production (Vercel, custom domain, etc.)
const isProdHost = isBrowser && (
  /vercel\.app$/i.test(window.location.hostname) || 
  /statflowai\./i.test(window.location.hostname) ||
  (window.location.hostname !== 'localhost' && 
   window.location.hostname !== '127.0.0.1' &&
   !window.location.hostname.includes('dev'))
)

// Production logic:
// 1. If explicit backend URL provided, use it
// 2. If production host but no backend URL, use demo mode
// 3. If development, use localhost
const hasValidBackend = fromEnv && 
  fromEnv !== '' && 
  fromEnv !== 'undefined' && 
  !fromEnv.includes('localhost') &&
  !fromEnv.includes('127.0.0.1')

export const USE_DEMO_MODE = isProdHost && !hasValidBackend

// Normalize API_BASE by removing trailing slash to prevent double slashes in URLs
const normalizedApiBase = hasValidBackend 
  ? fromEnv!.replace(/\/+$/, '') // Remove trailing slashes
  : (isProdHost ? 'DEMO_MODE' : 'http://127.0.0.1:8000')

export const API_BASE = normalizedApiBase

export const WS_BASE = API_BASE === 'DEMO_MODE' 
  ? 'DEMO_MODE' 
  : API_BASE.replace(/^http/i, 'ws')

// Debug logging for troubleshooting
if (isBrowser) {
  console.log('StatFlow Config Debug:', {
    hostname: window.location.hostname,
    isProdHost,
    fromEnv: fromEnv || 'undefined',
    hasValidBackend,
    USE_DEMO_MODE,
    API_BASE,
    WS_BASE
  })
  
  // Additional helpful logging
  if (USE_DEMO_MODE) {
    console.log('📊 StatFlow running in DEMO MODE - simulated AI processing')
  } else if (API_BASE.includes('localhost')) {
    console.log('🔧 StatFlow running in DEVELOPMENT MODE - connecting to local backend')
  } else {
    console.log('🚀 StatFlow running in PRODUCTION MODE - connecting to:', API_BASE)
  }
}