# StatFlow AI (STATATHON 2025) 

StatFlow AI turns raw survey CSVs or Excel into insights in minutes. The prototype showcases a production‑like flow: streaming ingestion, background processing with live WebSocket progress, an interactive dashboard, and one‑click PDF report generation.

## ✨ Key Features
- Drag‑and‑drop CSV/Excel upload with validations (.csv, .xlsx, .xls)
- Animated six‑step flow: Upload → Clean → Process → Schema → Validate → Report
- Live progress via WebSocket (stage, rows, bytes, percent)
- Automated data processing
	- Schema inference (numeric, categorical, datetime)
	- Simple imputation for missing values
	- Outlier detection (IsolationForest)
	- Composite quality score
	- Quick weighting summary
- Interactive dashboard (Chart.js)
	- Quality donut, weights bar
	- Schema type distribution donut
	- Data health donuts (Missing, Outlier rates)
	- Weights distribution histogram
	- Inferred schema grid
- Exports: JSON summary, Generate Report (PDF) using jsPDF + html2canvas

## 🏗 Architecture
- Backend (FastAPI, Python)
	- Endpoints: `/ingest`, `/datasets/{dataset_id}`, `/health`
	- WebSocket: `/ws/progress/{dataset_id}` for real‑time updates
	- Processing: pandas, numpy, scikit‑learn (IsolationForest)
	- Storage: CSV files + SQLite audit log (aiosqlite)
- Frontend (React 18 + TypeScript + Vite)
	- UI: Tailwind CSS + MUI, lucide‑react icons
	- Data: React Query for async state
	- Charts: Chart.js + react‑chartjs‑2
	- Report: jsPDF + html2canvas

See also: `statflow_architecture.md`.

## 📂 Repository Layout
- `backend/` – FastAPI service and processing pipeline
- `frontend/` – React UI, charts, and report export
- `statflow_architecture.md` – System design notes

## ✅ Prerequisites
- Python 3.11+
- Node.js 18+
- Windows PowerShell steps shown below; adapt for macOS/Linux

## 🚀 Getting Started

### Backend (API)
```powershell
# From repo root
cd .\backend

# Create venv (Windows)
python -m venv .venv
.\.venv\Scripts\Activate.ps1

# Install dependencies
pip install -r requirements.txt

# Run API
python -m uvicorn app:app --reload --host 127.0.0.1 --port 8000
```

### Frontend (Web)
```powershell
# From repo root
cd .\frontend

# Install dependencies
npm install

# Configure API base (optional if default http://127.0.0.1:8000 is fine)
# $env:VITE_API_BASE = "http://127.0.0.1:8000"

# Start dev server
npm run dev
```

Open http://localhost:5173 and upload a CSV or Excel file.

### Production build (optional)
```powershell
cd .\frontend
npm run build
npm run preview
```

## 🧭 Usage Flow
1) Upload a CSV or Excel file with a header row (demo limit: 5 MB for this prototype; adjustable).
2) Watch the animated six‑step progress with live stats.
3) Explore the dashboard:
	 - Quality, missing rate, imputations, outliers
	 - Weights and type distributions
	 - Inferred schema
4) Export:
	 - Export JSON – raw summary payload
	 - Generate Report (PDF) – snapshot of the dashboard with headings and timestamp

## 📊 Summary Data Model (response)
Fields returned by `/datasets/{dataset_id}` and used in the UI:
- `row_count: number`
- `column_count: number`
- `missing_rate: number` (0–1)
- `imputations_applied: number`
- `outliers_detected: number`
- `quality_score: number` (0–100)
- `weighting: { domain?: string, weights?: Record<string, number> }`
- `inferred_schema: Record<string, 'numeric' | 'categorical' | 'datetime' | string>`

## 🔌 API & WebSocket
- `POST /ingest` – multipart/form‑data file upload, returns `{ dataset_id }`
- `GET /datasets/{dataset_id}` – returns summary JSON as above
- `GET /health` – service health
- `WS /ws/progress/{dataset_id}` – progress messages, e.g. `{ "stage": "processing", "rows": 1024, "bytes": 123456, "percentage": 62 }`

## ⚙️ Configuration
- Frontend reads `VITE_API_BASE` (defaults to `http://127.0.0.1:8000`).
- WebSocket base is derived from `API_BASE` (`ws://…`).

## 🧪 Tech Stack
- Backend: FastAPI, pandas, numpy, scikit‑learn, aiosqlite, orjson, openpyxl (.xlsx), xlrd (.xls)
- Frontend: React, TypeScript, Vite, Tailwind, MUI, React Query, Chart.js, lucide‑react
- Reporting: jsPDF, html2canvas

## 🧰 Troubleshooting
- Non‑UTF8 CSVs (e.g., error: `'utf-8' codec can't decode …`)
	- The backend now auto‑detects encodings (utf‑8/utf‑8‑sig/cp1252/latin1) and delimiters, and skips malformed lines.
	- If a file still fails, try re‑saving as UTF‑8 or share a small sample so we can add a targeted fallback.
- WebSocket not connecting
	- Ensure backend is on `http://127.0.0.1:8000`; WS will be `ws://127.0.0.1:8000`.
	- If using HTTPS, ensure `wss://` and proper CORS/WS settings.
- File rejected
	- Ensure it’s `.csv`, `.xlsx`, or `.xls` with a header row; demo limit is 5 MB (see `App.tsx`).
- Frontend build ESM errors (PostCSS/Tailwind)
	- Configs use CommonJS to avoid Windows Node ESM issues.
- Large bundle warning
	- PDF libraries and charts add weight; consider code‑splitting.

## 🗺 Roadmap
- Dark mode and subtle motion on report cards
- Recent datasets and audit trail views
- Per‑column histograms and descriptive stats (needs backend column summaries)
- Export/share links and cloud storage integration

## 📄 License
STATFLOW AI - STATATHON 2025. All rights reserved.

---
Questions or feedback? Open an issue or contact the maintainers.
