// // App.tsx

// import React, { useEffect, useMemo, useRef, useState } from 'react'
// import { Container, CssBaseline, Box, Typography, Paper, LinearProgress, Button, Stepper, Step, StepLabel } from '@mui/material'
// import { motion, AnimatePresence } from 'framer-motion'
// import UploadRoundedIcon from '@mui/icons-material/UploadRounded'
// import { Metrics } from '../ui/Metrics'
// import { API_BASE, WS_BASE } from '../config'


// export default function App() {
//   const [datasetId, setDatasetId] = useState<string | null>(null)
//   const [progress, setProgress] = useState<any>({})
//   const [summary, setSummary] = useState<any | null>(null)
//   const wsRef = useRef<WebSocket | null>(null)

//   useEffect(() => {
//     if (!datasetId) return
//   const ws = new WebSocket(`${WS_BASE}/ws/progress/${datasetId}`)
//     wsRef.current = ws


// frontend/src/ui/App.tsx
import React, { useEffect, useMemo, useRef, useState } from 'react'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import { Upload, CheckCircle, Clock, BarChart3, Shield, Database, Zap, AlertCircle, RefreshCw } from 'lucide-react'
import { API_BASE, WS_BASE, USE_DEMO_MODE } from '../config'
import { Metrics } from './Metrics'

type ProgressMsg = {
  stage?: 'upload' | 'processing' | 'done' | 'error' | string
  rows?: number
  bytes?: number
  percentage?: number
  message?: string
  summary?: any
}

// Mock data generator for demo mode
const generateMockSummary = (filename: string) => ({
  dataset_id: 'demo_' + Math.random().toString(36).substr(2, 9),
  filename,
  basic_stats: {
    total_rows: Math.floor(Math.random() * 2000) + 500,
    total_columns: Math.floor(Math.random() * 15) + 5,
    missing_values: Math.floor(Math.random() * 100) + 10,
    duplicate_rows: Math.floor(Math.random() * 50) + 5,
    quality_score: Math.floor(Math.random() * 30) + 70
  },
  schema: Array.from({ length: Math.floor(Math.random() * 10) + 5 }, (_, i) => ({
    name: ['Age', 'Gender', 'Income', 'Education', 'Satisfaction', 'Location', 'Experience', 'Feedback', 'Date', 'Category'][i] || `Column_${i}`,
    type: ['numeric', 'categorical', 'text', 'datetime'][Math.floor(Math.random() * 4)],
    missing_count: Math.floor(Math.random() * 50),
    unique_values: Math.floor(Math.random() * 500) + 10
  })),
  outliers: Array.from({ length: Math.floor(Math.random() * 3) + 1 }, (_, i) => ({
    column: ['Income', 'Age', 'Experience'][i] || `Column_${i}`,
    count: Math.floor(Math.random() * 20) + 1,
    description: 'Extreme values detected via statistical analysis'
  })),
  recommendations: [
    'Consider reviewing outliers in numeric columns',
    'Data quality is good overall with minimal missing values',
    'Schema detection completed successfully',
    'Ready for advanced analytics and modeling'
  ]
})

export default function App() {
  const [datasetId, setDatasetId] = useState<string | null>(null)
  const [progress, setProgress] = useState<ProgressMsg>({})
  const [summary, setSummary] = useState<any | null>(null)
  const [error, setError] = useState<string | null>(null)
  const wsRef = useRef<WebSocket | null>(null)
  const uploadAbortRef = useRef<AbortController | null>(null)
  const [uiStepIndex, setUiStepIndex] = useState(0)

  // Open WebSocket when datasetId is set (or simulate in demo mode)
  useEffect(() => {
    if (!datasetId) return
    
    if (USE_DEMO_MODE) {
      // Simulate processing in demo mode
      const stages = ['upload', 'processing', 'done']
      let currentStage = 0
      
      const simulateProgress = () => {
        if (currentStage >= stages.length) return
        
        const stage = stages[currentStage]
        setProgress({
          stage,
          rows: Math.floor(Math.random() * 1000) + 500,
          bytes: Math.floor(Math.random() * 500000) + 100000,
          percentage: ((currentStage + 1) / stages.length) * 100
        })
        
        if (stage === 'done') {
          // Use the filename from localStorage or default
          const filename = localStorage.getItem('demo_filename') || 'sample_data.csv'
          setSummary(generateMockSummary(filename))
        } else {
          setTimeout(() => {
            currentStage++
            simulateProgress()
          }, 2000 + Math.random() * 1000)
        }
      }
      
      setTimeout(simulateProgress, 500)
      return
    }

    // Real WebSocket logic for when backend is available
    // Cleanup any existing socket
    if (wsRef.current) {
      try { wsRef.current.close() } catch { /* noop */ }
      wsRef.current = null
    }

    const wsUrl = `${WS_BASE}/ws/progress/${datasetId}`
    const ws = new WebSocket(wsUrl)
    wsRef.current = ws

    ws.onmessage = (e) => {
      try {
        const msg: ProgressMsg = JSON.parse(e.data)
        setProgress(msg)
        if (msg.stage === 'error') {
          setError(msg.message || 'Processing error')
        }
        if (msg.stage === 'done') {
          if (msg.summary) {
            setSummary(msg.summary)
          } else {
            // Fallback: fetch summary
            fetchSummary(datasetId).then(setSummary).catch((err) => setError(err.message))
          }
        }
      } catch (err: any) {
        setError('Invalid progress message')
      }
    }
    ws.onerror = () => setError((prev) => prev ?? 'WebSocket error')
    ws.onclose = () => { wsRef.current = null }

    return () => {
      try { ws.close() } catch { /* noop */ }
      wsRef.current = null
    }
  }, [datasetId])

  // Gentle client-side step animation during processing
  useEffect(() => {
    if (!progress.stage || progress.stage === 'done' || progress.stage === 'error') return
    let timer: number | undefined
    if (progress.stage === 'upload') setUiStepIndex(0)
    if (progress.stage === 'processing') {
      timer = window.setInterval(() => setUiStepIndex((i) => (i < 4 ? i + 1 : 4)), 1200)
    }
    return () => { if (timer) window.clearInterval(timer) }
  }, [progress.stage])

  useEffect(() => {
    if (summary) setUiStepIndex(5)
  }, [summary])

  const handleUpload = async (file: File) => {
    setError(null)
    setSummary(null)
    setProgress({ stage: 'upload', bytes: file.size, percentage: 5 })
    setUiStepIndex(0)

    // basic validations
    const maxBytes = 5 * 1024 * 1024 // 5MB demo cap
    if (file.size > maxBytes) {
      setError('File too large (max 5MB for demo)')
      return
    }
    const nameLower = file.name.toLowerCase()
    const isCsv = file.type.includes('csv') || nameLower.endsWith('.csv')
    const isXlsx = nameLower.endsWith('.xlsx') || file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    const isXls = nameLower.endsWith('.xls') || file.type === 'application/vnd.ms-excel'
    if (!(isCsv || isXlsx || isXls)) {
      setError('Please upload a CSV or Excel file (.csv, .xlsx, .xls)')
      return
    }

    if (USE_DEMO_MODE) {
      // Demo mode - simulate upload without backend
      localStorage.setItem('demo_filename', file.name)
      setDatasetId('demo_' + Math.random().toString(36).substr(2, 9))
      return
    }

    // Real upload logic for when backend is available
    // Abort any in-flight upload
    try { uploadAbortRef.current?.abort() } catch { /* noop */ }
    const ac = new AbortController()
    uploadAbortRef.current = ac

    const form = new FormData()
    form.append('file', file)

    try {
      const res = await fetch(`${API_BASE}/ingest`, { method: 'POST', body: form, signal: ac.signal })
      if (!res.ok) throw new Error(`Upload failed (${res.status})`)
      const json = await res.json()
      if (!json?.dataset_id) throw new Error('Missing dataset_id')
      setDatasetId(json.dataset_id)
    } catch (err: any) {
      if (err.name === 'AbortError') return
      setError(err.message || 'Upload failed')
      setProgress({})
    }
  }

  const handleReset = () => {
    setDatasetId(null)
    setSummary(null)
    setProgress({})
    setError(null)
    setUiStepIndex(0)
    try { uploadAbortRef.current?.abort() } catch { /* noop */ }
    try { wsRef.current?.close() } catch { /* noop */ }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50">
      {/* Decorative background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-violet-200/20 to-rose-200/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-200/20 to-violet-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-8">
        {/* Top navigation with Back button */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur border border-gray-200 rounded-xl text-gray-700 font-semibold hover:bg-violet-50 hover:border-violet-300 hover:scale-[1.02] transition-all shadow-sm"
            aria-label="Go back"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m12 19-7-7 7-7"/>
              <path d="M19 12H5"/>
            </svg>
            Back
          </button>
          <div className="text-xs text-gray-500">StatFlow AI</div>
        </div>

        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-violet-500 to-rose-500 flex items-center justify-center text-white text-xl shadow-lg">📊</div>
            <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-violet-600 to-rose-600 bg-clip-text text-transparent">StatFlow AI</h1>
          </div>
          <p className="text-gray-600">Upload a survey CSV to see schema detection, imputation, outliers, and a quality score.</p>
          {USE_DEMO_MODE && (
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-sm">
              <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
              Demo Mode - Simulated AI processing for demonstration
            </div>
          )}
        </div>

        {!datasetId && (
          <UploadBox onUpload={handleUpload} error={error} />
        )}

        {datasetId && !summary && (
          <ProcessingSection progress={progress} uiStepIndex={uiStepIndex} error={error} />
        )}

        {summary && (
          <ResultsSection summary={summary} datasetId={datasetId || undefined} onReset={handleReset} />
        )}
      </div>

      <style>{`
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        .animate-float { animation: float 10s ease-in-out infinite; }
  @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  .animate-spin-slow { animation: spin-slow 6s linear infinite; }
  @keyframes pulse-glow { 0%,100%{box-shadow:0 0 16px rgba(139,92,246,0.25)} 50%{box-shadow:0 0 28px rgba(139,92,246,0.45)} }
  .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
  @keyframes shimmer { 0%{transform:translateX(-100%)} 100%{transform:translateX(100%)} }
  .animate-shimmer { animation: shimmer 2s infinite; }
      `}</style>
    </div>
  )
}

function UploadBox({ onUpload, error }: { onUpload: (file: File) => void, error: string | null }) {
  const [isDragOver, setIsDragOver] = useState(false)
  const inputRef = useRef<HTMLInputElement | null>(null)

  return (
    <div className="max-w-2xl mx-auto">
      <div
        className={`relative group border-2 border-dashed rounded-3xl p-12 text-center transition-all duration-300 cursor-pointer ${isDragOver ? 'border-violet-400 bg-violet-50/60' : 'border-gray-300 hover:border-violet-300 hover:bg-violet-50/40'}`}
        onDragOver={(e) => { e.preventDefault(); setIsDragOver(true) }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setIsDragOver(false); const f = e.dataTransfer.files?.[0]; if (f) onUpload(f) }}
        onClick={() => inputRef.current?.click()}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-rose-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl" />
        <div className="relative z-10">
          <div className={`w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-r from-violet-100 to-rose-100 flex items-center justify-center border border-violet-200 ${isDragOver ? 'scale-110 rotate-6' : ''}`}>
            <Upload size={36} className={isDragOver ? 'text-violet-600' : 'text-gray-500'} />
          </div>
          <h3 className="text-2xl md:text-3xl font-bold mb-3 text-gray-800">Upload your survey CSV</h3>
          <p className="text-gray-600 mb-6">Drag & drop here or click to browse. Max 5MB for demo.</p>
          <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2"><Shield size={16} className="text-violet-500" /><span>Headers required</span></div>
            <div className="flex items-center gap-2"><Zap size={16} className="text-rose-500" /><span>Fast processing</span></div>
          </div>
        </div>
  <input ref={inputRef} type="file" accept=".csv,.xlsx,.xls,text/csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) onUpload(f) }} />
      </div>
  <div className="mt-3 text-center text-xs text-gray-500">Supported: .csv, .xlsx, .xls • Max size 5MB</div>
      {error && (
        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700 text-sm">{error}</div>
      )}
    </div>
  )
}

function ProcessingSection({ progress, uiStepIndex, error }: { progress: ProgressMsg, uiStepIndex: number, error: string | null }) {
  const steps = useMemo(() => [
    { name: 'Upload', icon: Upload },
    { name: 'Clean', icon: AlertCircle },
    { name: 'Process', icon: Zap },
    { name: 'Schema', icon: Database },
    { name: 'Validate', icon: Shield },
    { name: 'Report', icon: BarChart3 }
  ], [])

  const activeIdx = progress.stage === 'upload' ? 0 : progress.stage === 'processing' ? Math.max(1, uiStepIndex) : progress.stage === 'done' ? 5 : 0
  const percent = typeof progress.percentage === 'number' ? progress.percentage : (activeIdx / (steps.length - 1)) * 100

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="text-center">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-violet-500 to-rose-500 flex items-center justify-center shadow-xl animate-spin-slow">
          <RefreshCw size={32} className="text-white" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-2 text-gray-800">Processing your data</h2>
        <p className="text-gray-600">AI is analyzing and optimizing your survey data…</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {steps.map((s, i) => {
          const Icon = s.icon as any
          const isActive = i === activeIdx
          const isDone = i < activeIdx
          return (
            <div key={s.name} className={`text-center p-4 rounded-2xl border-2 transition-all ${isDone ? 'bg-emerald-50 border-emerald-300' : isActive ? 'bg-violet-50 border-violet-400' : 'bg-white border-gray-200'}`}>
              <div className={`w-12 h-12 mx-auto mb-2 rounded-xl flex items-center justify-center ${isDone ? 'bg-emerald-500 text-white' : isActive ? 'bg-gradient-to-r from-violet-500 to-rose-500 text-white' : 'bg-gray-100 text-gray-400'}`}>
                <Icon size={22} />
              </div>
              <div className="text-sm font-semibold">{s.name}</div>
            </div>
          )
        })}
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3"><Clock size={20} className="text-violet-500" /><span className="font-semibold">Progress</span></div>
          <span className="text-sm font-bold text-gray-700 bg-violet-100 px-2.5 py-0.5 rounded-full">{Math.round(percent)}%</span>
        </div>
        <div className="relative w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-violet-500 via-purple-500 to-rose-500 rounded-full transition-all" style={{ width: `${percent}%` }} />
          <div className="pointer-events-none absolute inset-0 opacity-50">
            <div className="w-1/3 h-full bg-white/40 blur-sm animate-shimmer" />
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
          <div className="rounded-xl p-3 border bg-blue-50 border-blue-200">
            <div className="text-xs text-gray-600">Rows processed</div>
            <div className="text-blue-700 font-bold">{progress.rows?.toLocaleString?.() ?? '—'}</div>
          </div>
          <div className="rounded-xl p-3 border bg-violet-50 border-violet-200">
            <div className="text-xs text-gray-600">Bytes</div>
            <div className="text-violet-700 font-bold">{progress.bytes ? `${(progress.bytes / 1024).toFixed(1)} KB` : '—'}</div>
          </div>
          <div className="rounded-xl p-3 border bg-emerald-50 border-emerald-200">
            <div className="text-xs text-gray-600">Stage</div>
            <div className="text-emerald-700 font-bold capitalize">{progress.stage || '—'}</div>
          </div>
          <div className="rounded-xl p-3 border bg-rose-50 border-rose-200">
            <div className="text-xs text-gray-600">Status</div>
            <div className="text-rose-700 font-bold">{error ? 'Error' : 'Running'}</div>
          </div>
        </div>
        {error && <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">{error}</div>}
      </div>
    </div>
  )
}

function ResultsSection({ summary, datasetId, onReset }: { summary: any, datasetId?: string, onReset: () => void }) {
  const [visible, setVisible] = useState(false)
  const reportRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => { setVisible(true) }, [])

  const exportJson = () => {
    const fileName = `statflow_report_${datasetId ?? 'dataset'}.json`
    const blob = new Blob([JSON.stringify(summary, null, 2)], { type: 'application/json;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = fileName
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  const generatePdf = async () => {
    const node = reportRef.current
    if (!node) return
    // Increase scale for sharper output
    const canvas = await html2canvas(node, { scale: 2, backgroundColor: '#ffffff', useCORS: true })
    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF('p', 'mm', 'a4')
    const pdfW = pdf.internal.pageSize.getWidth()
    const pdfH = pdf.internal.pageSize.getHeight()
    const imgW = pdfW
    const imgH = canvas.height * (imgW / canvas.width)

    let heightLeft = imgH
    let position = 0
    pdf.addImage(imgData, 'PNG', 0, position, imgW, imgH)
    heightLeft -= pdfH
    while (heightLeft > 0) {
      position = heightLeft - imgH
      pdf.addPage()
      pdf.addImage(imgData, 'PNG', 0, position, imgW, imgH)
      heightLeft -= pdfH
    }
    pdf.save(`statflow_report_${datasetId ?? 'dataset'}.pdf`)
  }
  return (
    <div className={`space-y-6 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <div className="text-center">
        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 flex items-center justify-center shadow-xl">
          <CheckCircle size={36} className="text-white" />
        </div>
        <h2 className="text-3xl font-bold mb-1 text-gray-800">Analysis complete</h2>
        <p className="text-gray-600">Your data has been processed and analyzed.</p>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <button onClick={onReset} className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border-2 border-gray-200 rounded-xl font-semibold text-gray-700 hover:border-violet-300 hover:bg-violet-50 transition-all">
          <Upload size={18} />
          Upload another file
        </button>
        <div className="flex items-center gap-2">
          <button onClick={exportJson} className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-violet-600 to-rose-600 text-white rounded-xl font-semibold shadow hover:shadow-md transition-all">
            Export JSON
          </button>
          <button onClick={generatePdf} className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border-2 border-gray-200 rounded-xl font-semibold text-gray-700 hover:border-violet-300 hover:bg-violet-50 transition-all">
            Generate Report (PDF)
          </button>
        </div>
      </div>
      <div ref={reportRef} className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-xl border border-white/50">
        <Metrics summary={summary} />
      </div>
    </div>
  )
}

async function fetchSummary(id: string) {
  const res = await fetch(`${API_BASE}/datasets/${id}`)
  if (!res.ok) throw new Error(`Failed to fetch summary (${res.status})`)
  return res.json()
}
