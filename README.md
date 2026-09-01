# Spider AI Council 🕷️

A multi-agent, AI-powered financial intelligence platform where multiple specialized AI agents independently analyze a company, a central agent synthesizes their findings with transparent agreement/conflict detection, and a personalization agent customizes the recommendation based on the investor's risk profile and portfolio concentration.

---

## 🏛️ Multi-Agent Architecture

```text
                               ┌────────────────────────────────┐
                               │       USER / FRONTEND UI       │
                               └───────────────┬────────────────┘
                                               │ POST /analyze
                                               ▼
                               ┌────────────────────────────────┐
                               │     FASTAPI ORCHESTRATOR       │
                               └───────────────┬────────────────┘
                                               │
               ┌───────────────────────────────┼──────────────────────────────┐
               ▼                               ▼                              ▼
    ┌────────────────────┐          ┌────────────────────┐         ┌────────────────────┐
    │   👁️ Spider-Eye    │          │   🧠 Spider-Mind   │         │   👂 Spider-Ear    │
    │  Technical Agent   │          │ Fundamental Agent  │         │  Sentiment Agent   │
    │ Price, RSI, Volume │          │ Filings, YoY, P/E  │         │ Headlines, Media   │
    └──────────┬─────────┘          └──────────┬─────────┘         └──────────┬─────────┘
               │                               │                              │
               └───────────────────────────────┼──────────────────────────────┘
                                               │ (Parallel specialist outputs)
                                               ▼
                               ┌────────────────────────────────┐
                               │        🕸️ Spider-Brain         │
                               │      Synthesis Chairperson     │
                               │ Agreement & Conflict Detection │
                               └───────────────┬────────────────┘
                                               │ (Consensus verdict)
                                               ▼
                               ┌────────────────────────────────┐
                               │        🕷️ Spider-Sense         │
                               │      Personalization Agent     │
                               │ Sector Exposure & Risk Profile │
                               └───────────────┬────────────────┘
                                               │
                                               ▼
                               ┌────────────────────────────────┐
                               │     FINAL STRUCTURED JSON      │
                               └────────────────────────────────┘
```

---

## 🤖 The Five Autonomous Agents

| Agent | Role | Domain & Input Data | Key Outputs |
| :--- | :--- | :--- | :--- |
| **👁️ Spider-Eye** | Technical Specialist | Real-time tick stream, 50/200-day moving averages, 14-day RSI, volume momentum, Bollinger bands | `verdict` (bullish/bearish/neutral), `confidence`, `reasoning`, `sources`, `latency_ms` |
| **🧠 Spider-Mind** | Fundamental Specialist | Corporate filings (SEC 10-K/10-Q, BSE/NSE disclosures), audited balance sheets, revenue growth, operating margins, P/E | `verdict` (positive/negative/neutral/abstain), `confidence`, `reasoning`, `sources`, `latency_ms` |
| **👂 Spider-Ear** | Sentiment Specialist | Real-time news wires (Reuters, Bloomberg, Economic Times, FT), media sentiment scoring, analyst consensus | `verdict` (bullish/bearish/neutral), `confidence`, `reasoning`, `sources`, `latency_ms` |
| **🕸️ Spider-Brain** | Synthesis Chairperson | Aggregates 3 specialist outputs, detects consensus/conflict, applies fault-tolerant weighting when an agent abstains | Synthesized `verdict`, average `confidence`, agreement metric (`agreement_count` / `active_count`), detailed rationale |
| **🕷️ Spider-Sense** | Personalization & Risk | Merges Spider-Brain consensus with user's portfolio holdings, sector weights (e.g. IT vs Energy), and risk tolerance | `verdict` (opportunity/moderate_risk/high_risk), personalized drawdown warnings, sector concentration advice |

---

## ⚡ Failure Resilience & Fault Tolerance (`simulate_timeout`)

The system is built to gracefully handle agent failures and timeouts without crashing:

- When `"simulate_timeout": true` is passed (via API or the **"SIMULATE TIMEOUT"** button in the UI):
  - **Spider-Mind** times out (or encounters latency >500ms).
  - **Spider-Mind** abstains gracefully with status `"abstain"`, `confidence: 0.0`, and transparent reasoning.
  - **Spider-Eye** and **Spider-Ear** continue executing normally.
  - **Spider-Brain** detects the abstention, synthesizes the remaining 2 active agents, notes the reduced information transparently in its synthesis, and outputs an informed verdict.
  - The UI highlights the abstained agent with an amber warning badge while keeping the rest of the council and trace web completely functional.

---

## 🚀 Quickstart: Running the Application

### 1. Prerequisites
- **Python 3.10+** (FastAPI, Uvicorn, Pydantic)
- **Node.js 18+** & **npm**

---

### 2. Backend Setup & Launch

Open a terminal in the project root:

```bash
# Install backend dependencies
py -m pip install -r requirements.txt

# Start FastAPI orchestrator server on port 8000
py -m uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

Backend API will be accessible at:
- **API Base:** `http://127.0.0.1:8000`
- **Swagger Docs:** `http://127.0.0.1:8000/docs`

---

### 3. Frontend Setup & Launch

Open a second terminal in the `FRONTEND` directory:

```bash
cd FRONTEND

# Install frontend dependencies
npm install

# Start Vite development server
npm run dev
```

Frontend UI will be running at:
- **Web App:** `http://localhost:5173`

---

## 🔌 API Reference: `POST /analyze`

### Request Payload

```json
{
  "stock": "TCS",
  "risk_profile": "low",
  "simulate_timeout": false,
  "portfolio": [
    {
      "symbol": "TCS",
      "sector": "IT",
      "percentage": 30
    },
    {
      "symbol": "INFY",
      "sector": "IT",
      "percentage": 25
    },
    {
      "symbol": "RELIANCE",
      "sector": "Energy",
      "percentage": 45
    }
  ]
}
```

### Response Schema

```json
{
  "technical": {
    "agent": "Spider-Eye",
    "verdict": "bullish",
    "confidence": 0.84,
    "reasoning": "TCS shows resilient upward momentum with 14-day RSI at 62.4...",
    "sources": ["NSE Tick Stream", "TradingView DMA Oscillator", "Volume Profile Matrix"],
    "latency_ms": 120
  },
  "fundamental": {
    "agent": "Spider-Mind",
    "verdict": "positive",
    "confidence": 0.89,
    "reasoning": "Q3 Financial Statement filing reveals 8.4% YoY revenue growth...",
    "sources": ["Q3 Earnings Filing (BSE/NSE)", "Audited Balance Sheet", "MD&A"],
    "latency_ms": 850
  },
  "sentiment": {
    "agent": "Spider-Ear",
    "verdict": "neutral",
    "confidence": 0.76,
    "reasoning": "News sentiment is moderately optimistic following new deal wins...",
    "sources": ["Reuters Technology Wire", "Economic Times BFSI Desk", "Bloomberg Feed"],
    "latency_ms": 140
  },
  "synthesis": {
    "agent": "Spider-Brain",
    "verdict": "bullish",
    "confidence": 0.83,
    "reasoning": "Consensus is Bullish with alignment across Spider-Eye and Spider-Mind...",
    "sources": ["NSE Tick Stream", "Q3 Earnings Filing", "Reuters Technology Wire"],
    "latency_ms": 10
  },
  "personalized_result": {
    "agent": "Spider-Sense",
    "verdict": "high_risk",
    "confidence": 0.88,
    "reasoning": "Caution: Your portfolio holds a heavy 55% concentration in IT. For a Low-Risk investor, this concentration magnifies drawdown risk...",
    "sources": ["user_portfolio", "risk_profile", "sector_concentration_matrix"],
    "latency_ms": 5
  },
  "metrics": {
    "total_latency_ms": 865,
    "agreement_count": 2,
    "disagreement_count": 1
  }
}
```

---

## 🖥️ Frontend Navigation & Pages

- **`/council` (The Spider Council):** Live interactive analysis hub. Features real-time stock ticker search, quick ticker shortcuts (TCS, INFY, RELIANCE, HDFCBANK, NVDA, AAPL, TSLA), risk stance picker, fault injection toggle, 3 specialist agent cards with confidence bars and source tags, the central Spider-Brain Chairperson synthesis card with agreement counters, the prominent Spider-Sense personalization banner, and an interactive **"[WHY THIS VERDICT?]"** deliberation inspection modal.
- **`/trace` (Trace the Web):** Explainable AI multi-agent graph visualizing the complete lineage from real-time data sources to specialist agents, synthesis, and personalization with an interactive node inspector showing confidence metrics, extracted snippets, source citations, and latency.
- **`/dashboard` (Spider-Sense Terminal):** High-level overview displaying real-time Spider-Sense alerts, interactive financial web topology map, portfolio snapshot, and historical council analysis activity stream.
- **`/investor` (Investor Profile):** Allows investors to configure risk tolerance (Low, Moderate, High), time horizon, and behavioral biases, with dynamic live feedback on how Spider-Sense adapts its recommendations.
- **`/mpt` (Web Balance):** Modern Portfolio Theory analysis and What-If simulation sandbox to adjust position sizing and view real-time projected volatility and diversification drift.

---

## 📂 Project Structure

```text
finance council/
├── main.py                         # FastAPI orchestration backend
├── requirements.txt                # Python dependencies
├── agents/                         # Autonomous specialist & synthesis agents
│   ├── __init__.py
│   ├── spider_eye.py               # Technical Specialist Agent
│   ├── spider_mind.py              # Fundamental Specialist Agent (RAG/Filings)
│   ├── spider_ear.py               # Sentiment Specialist Agent (News/NLP)
│   ├── spider_brain.py             # Chairperson Synthesis Agent
│   └── spider_sense.py             # Personalization & Risk Agent
├── models/
│   ├── __init__.py
│   └── schemas.py                  # Pydantic request & response models
├── FRONTEND/                       # React + TypeScript + Vite Frontend
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── src/
│       ├── App.tsx                 # Route declarations & CouncilProvider
│       ├── context/
│       │   └── CouncilContext.tsx  # Shared reactive state context
│       ├── services/
│       │   └── api.ts              # API client & TypeScript interfaces
│       ├── components/
│       │   └── layout/
│       │       └── Layout.tsx      # Sidebar & header navigation
│       └── pages/
│           ├── Council.tsx         # 5-Agent interactive council
│           ├── TraceWeb.tsx        # Explainable AI trace graph
│           ├── Dashboard.tsx       # System terminal & financial web
│           ├── InvestorProfile.tsx # Risk calibration & simulation
│           ├── WebBalance.tsx      # MPT & portfolio sandbox
│           └── Login.tsx           # Authentication portal
└── README.md                       # Project documentation & runbook
```
