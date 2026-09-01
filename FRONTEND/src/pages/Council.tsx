import React, { useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { useCouncil } from '../context/CouncilContext';
import type { RiskProfile } from '../services/api';

const QUICK_STOCKS = ['TCS', 'INFY', 'RELIANCE', 'HDFCBANK', 'NVDA', 'AAPL', 'TSLA'];

const Council: React.FC = () => {
  const {
    activeStock,
    setActiveStock,
    riskProfile,
    setRiskProfile,
    simulateTimeout,
    setSimulateTimeout,
    analysisResult,
    isLoading,
    error,
    runAnalysis,
  } = useCouncil();

  const [inputStock, setInputStock] = useState<string>(activeStock);
  const [showExplanationModal, setShowExplanationModal] = useState<boolean>(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputStock.trim()) return;
    const sym = inputStock.trim().toUpperCase();
    setActiveStock(sym);
    runAnalysis(sym, riskProfile, simulateTimeout);
  };

  const handleSelectQuickStock = (sym: string) => {
    setInputStock(sym);
    setActiveStock(sym);
    runAnalysis(sym, riskProfile, simulateTimeout);
  };

  const handleRiskChange = (newRisk: RiskProfile) => {
    setRiskProfile(newRisk);
    runAnalysis(activeStock, newRisk, simulateTimeout);
  };

  const handleToggleTimeout = () => {
    const nextVal = !simulateTimeout;
    setSimulateTimeout(nextVal);
    runAnalysis(activeStock, riskProfile, nextVal);
  };

  // Helper color mappings
  const getVerdictBadge = (verdict?: string) => {
    const v = (verdict || '').toLowerCase();
    if (v === 'bullish' || v === 'positive' || v === 'opportunity') {
      return {
        bg: 'bg-emerald-950/70 border-emerald-500/40 text-emerald-400',
        dot: 'bg-emerald-400',
        text: verdict?.toUpperCase() || 'BULLISH',
      };
    }
    if (v === 'bearish' || v === 'negative' || v === 'high_risk') {
      return {
        bg: 'bg-[#3b0811]/70 border-[#d10332]/40 text-[#ffb3b2]',
        dot: 'bg-[#d10332]',
        text: verdict?.toUpperCase() || 'BEARISH',
      };
    }
    if (v === 'abstain') {
      return {
        bg: 'bg-amber-950/70 border-amber-500/40 text-amber-300',
        dot: 'bg-amber-400',
        text: 'TIMED OUT / ABSTAINED',
      };
    }
    return {
      bg: 'bg-surface-variant border-outline-variant text-on-surface',
      dot: 'bg-primary',
      text: verdict?.toUpperCase() || 'NEUTRAL',
    };
  };

  const eyeResult = analysisResult?.technical;
  const mindResult = analysisResult?.fundamental;
  const earResult = analysisResult?.sentiment;
  const brainResult = analysisResult?.synthesis;
  const senseResult = analysisResult?.personalized_result;
  const metrics = analysisResult?.metrics;

  const senseBadge = getVerdictBadge(senseResult?.verdict);

  return (
    <Layout pageTitle="" customHeader={<></>}>
      <div className="flex flex-col gap-lg min-h-[calc(100vh-140px)] pb-xl">
        {/* Top Control Bar & Live Analyzer Toolbar */}
        <div className="glass-panel p-md md:p-lg rounded-xl border-[#242E3A] flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-md relative z-30">
          <form onSubmit={handleSearchSubmit} className="flex flex-wrap items-center gap-sm flex-1">
            <div className="relative min-w-[200px] flex-1 max-w-sm">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-lg">
                search
              </span>
              <input
                type="text"
                value={inputStock}
                onChange={(e) => setInputStock(e.target.value.toUpperCase())}
                placeholder="Enter stock symbol (e.g. TCS, NVDA)..."
                className="input-field w-full pl-9 pr-sm py-2 rounded-lg font-mono text-sm text-on-background placeholder:text-outline"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="bg-primary hover:bg-primary-fixed text-[#002b50] font-label-caps text-xs font-bold px-lg py-2.5 rounded-lg transition-all flex items-center gap-xs disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>
                  DEPLOYING COUNCIL...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-sm">radar</span>
                  DEPLOY COUNCIL
                </>
              )}
            </button>

            {/* Quick stock shortcuts */}
            <div className="hidden sm:flex items-center gap-1.5 ml-2">
              <span className="font-label-caps text-[10px] text-outline">QUICK:</span>
              {QUICK_STOCKS.map((sym) => (
                <button
                  key={sym}
                  type="button"
                  onClick={() => handleSelectQuickStock(sym)}
                  className={`px-2 py-1 rounded text-xs font-mono transition-colors ${
                    activeStock === sym
                      ? 'bg-[#a2c9ff]/20 text-[#a2c9ff] border border-[#a2c9ff]/40 font-bold'
                      : 'bg-surface-container-low text-on-surface-variant hover:text-on-background border border-outline-variant/30'
                  }`}
                >
                  {sym}
                </button>
              ))}
            </div>
          </form>

          {/* Right Controls: Risk Profile & Fault Injection Toggle */}
          <div className="flex flex-wrap items-center gap-sm">
            {/* Risk profile picker */}
            <div className="flex items-center bg-surface-container-low p-1 rounded-lg border border-outline-variant/50">
              <span className="font-label-caps text-[10px] text-outline px-2">RISK:</span>
              {(['low', 'medium', 'high'] as RiskProfile[]).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => handleRiskChange(r)}
                  className={`px-2.5 py-1 rounded text-xs font-label-caps uppercase transition-all ${
                    riskProfile === r
                      ? 'bg-surface-variant text-[#a2c9ff] font-bold shadow'
                      : 'text-on-surface-variant hover:text-on-background'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>

            {/* Simulate Timeout Toggle (Demo requirement) */}
            <button
              type="button"
              onClick={handleToggleTimeout}
              title="Simulate Spider-Mind failure/timeout to demo council resilience"
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border text-xs font-label-caps transition-all ${
                simulateTimeout
                  ? 'bg-amber-950/80 border-amber-500 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.3)] animate-pulse'
                  : 'bg-surface-container-low border-outline-variant/50 text-on-surface-variant hover:border-amber-500/50'
              }`}
            >
              <span className="material-symbols-outlined text-sm">
                {simulateTimeout ? 'error_med' : 'bolt'}
              </span>
              <span>
                {simulateTimeout ? 'TIMEOUT SIMULATED' : 'SIMULATE TIMEOUT'}
              </span>
            </button>
          </div>
        </div>

        {/* Global Error Banner if any */}
        {error && (
          <div className="bg-red-950/80 border border-red-500 text-red-200 px-md py-sm rounded-lg flex items-center justify-between">
            <span className="font-body-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-red-400">warning</span>
              {error}
            </span>
            <button onClick={() => runAnalysis()} className="font-label-caps underline text-xs">
              Retry
            </button>
          </div>
        )}

        {/* Header Title with Active Stock & Latency */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-sm border-b border-outline-variant/30 pb-sm">
          <div>
            <div className="flex items-center gap-sm">
              <h1 className="font-h1-display text-h1-display text-on-background tracking-tight uppercase">
                THE SPIDER COUNCIL
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/30 text-primary font-mono text-xs font-bold">
                {activeStock ? `$${activeStock}` : 'NO TICKER SELECTED'}
              </span>
            </div>
            <p className="font-body-main text-body-main text-on-surface-variant">
              Three specialist agents. One Chairperson synthesis. One personalized risk assessment.
            </p>
          </div>

          <div className="flex items-center gap-md">
            {metrics && (
              <div className="flex items-center gap-sm font-mono text-xs text-on-surface-variant bg-surface-container-low px-3 py-1.5 rounded border border-outline-variant/40">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>TOTAL LATENCY: {metrics.total_latency_ms}ms</span>
              </div>
            )}
          </div>
        </div>

        {/* Main Council Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-lg relative">
          
          {/* ============================================================== */}
          {/* LEFT: 3 SPECIALIST AGENT CARDS (Spider-Eye, Spider-Mind, Spider-Ear) */}
          {/* ============================================================== */}
          <div className="col-span-1 md:col-span-4 flex flex-col gap-md">
            
            {/* AGENT 1: 👁️ SPIDER-EYE (Technical) */}
            <div className="glass-panel rounded-xl p-md border-[#242E3A] hover:border-primary/40 transition-all group relative overflow-hidden">
              <div className="flex items-center justify-between mb-xs">
                <div className="flex items-center gap-2">
                  <span className="text-xl">👁️</span>
                  <div>
                    <h3 className="font-label-caps text-label-caps text-on-surface-variant">AGENT 01 — TECHNICAL</h3>
                    <h2 className="font-h2-section text-base font-bold text-on-background">Spider-Eye</h2>
                  </div>
                </div>
                {eyeResult && (
                  <span className="font-mono text-[11px] text-outline">{eyeResult.latency_ms}ms</span>
                )}
              </div>

              {eyeResult ? (
                <div className="mt-sm space-y-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-label-md text-xs text-on-surface-variant">Verdict</span>
                    <span className={`px-2 py-0.5 rounded border text-[11px] font-label-caps font-bold ${getVerdictBadge(eyeResult.verdict).bg}`}>
                      {eyeResult.verdict.toUpperCase()}
                    </span>
                  </div>

                  {/* Confidence Bar */}
                  <div>
                    <div className="flex justify-between font-mono text-[11px] text-on-surface-variant mb-1">
                      <span>Confidence</span>
                      <span className="text-primary font-bold">{Math.round(eyeResult.confidence * 100)}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all duration-700"
                        style={{ width: `${eyeResult.confidence * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                    {eyeResult.reasoning}
                  </p>

                  <div className="flex flex-wrap gap-1 pt-1 border-t border-outline-variant/30">
                    {eyeResult.sources.map((src, i) => (
                      <span key={i} className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-surface-container text-outline border border-outline-variant/40">
                        {src}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="py-8 text-center text-outline text-xs">
                  {isLoading ? 'Running technical momentum scan...' : 'Agent standby. Enter a stock symbol above to deploy.'}
                </div>
              )}
            </div>

            {/* AGENT 2: 🧠 SPIDER-MIND (Fundamental) */}
            <div className={`glass-panel rounded-xl p-md border-[#242E3A] transition-all relative overflow-hidden ${
              mindResult?.verdict === 'abstain' ? 'border-amber-500/50 bg-amber-950/20' : 'hover:border-primary/40'
            }`}>
              <div className="flex items-center justify-between mb-xs">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🧠</span>
                  <div>
                    <h3 className="font-label-caps text-label-caps text-on-surface-variant">AGENT 02 — FUNDAMENTAL</h3>
                    <h2 className="font-h2-section text-base font-bold text-on-background">Spider-Mind</h2>
                  </div>
                </div>
                {mindResult && (
                  <span className="font-mono text-[11px] text-outline">{mindResult.latency_ms}ms</span>
                )}
              </div>

              {mindResult ? (
                <div className="mt-sm space-y-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-label-md text-xs text-on-surface-variant">Verdict</span>
                    <span className={`px-2 py-0.5 rounded border text-[11px] font-label-caps font-bold ${getVerdictBadge(mindResult.verdict).bg}`}>
                      {getVerdictBadge(mindResult.verdict).text}
                    </span>
                  </div>

                  {mindResult.verdict === 'abstain' ? (
                    <div className="bg-amber-950/40 border border-amber-500/30 rounded p-2 text-xs text-amber-200 space-y-1">
                      <div className="flex items-center gap-1 font-bold text-amber-400">
                        <span className="material-symbols-outlined text-sm">schedule</span>
                        TIMED OUT / ABSTAINED
                      </div>
                      <p className="text-[11px] text-amber-200/90 leading-snug">
                        {mindResult.reasoning}
                      </p>
                    </div>
                  ) : (
                    <>
                      <div>
                        <div className="flex justify-between font-mono text-[11px] text-on-surface-variant mb-1">
                          <span>Confidence</span>
                          <span className="text-primary font-bold">{Math.round(mindResult.confidence * 100)}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary transition-all duration-700"
                            style={{ width: `${mindResult.confidence * 100}%` }}
                          ></div>
                        </div>
                      </div>

                      <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                        {mindResult.reasoning}
                      </p>

                      <div className="flex flex-wrap gap-1 pt-1 border-t border-outline-variant/30">
                        {mindResult.sources.map((src, i) => (
                          <span key={i} className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-surface-container text-outline border border-outline-variant/40">
                            {src}
                          </span>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className="py-8 text-center text-outline text-xs">
                  {isLoading ? 'Retrieving audited SEC/NSE filings...' : 'Agent standby. Ready to query statutory disclosures.'}
                </div>
              )}
            </div>

            {/* AGENT 3: 👂 SPIDER-EAR (Sentiment) */}
            <div className="glass-panel rounded-xl p-md border-[#242E3A] hover:border-primary/40 transition-all group relative overflow-hidden">
              <div className="flex items-center justify-between mb-xs">
                <div className="flex items-center gap-2">
                  <span className="text-xl">👂</span>
                  <div>
                    <h3 className="font-label-caps text-label-caps text-on-surface-variant">AGENT 03 — SENTIMENT</h3>
                    <h2 className="font-h2-section text-base font-bold text-on-background">Spider-Ear</h2>
                  </div>
                </div>
                {earResult && (
                  <span className="font-mono text-[11px] text-outline">{earResult.latency_ms}ms</span>
                )}
              </div>

              {earResult ? (
                <div className="mt-sm space-y-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-label-md text-xs text-on-surface-variant">Verdict</span>
                    <span className={`px-2 py-0.5 rounded border text-[11px] font-label-caps font-bold ${getVerdictBadge(earResult.verdict).bg}`}>
                      {earResult.verdict.toUpperCase()}
                    </span>
                  </div>

                  <div>
                    <div className="flex justify-between font-mono text-[11px] text-on-surface-variant mb-1">
                      <span>Confidence</span>
                      <span className="text-primary font-bold">{Math.round(earResult.confidence * 100)}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all duration-700"
                        style={{ width: `${earResult.confidence * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                    {earResult.reasoning}
                  </p>

                  <div className="flex flex-wrap gap-1 pt-1 border-t border-outline-variant/30">
                    {earResult.sources.map((src, i) => (
                      <span key={i} className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-surface-container text-outline border border-outline-variant/40">
                        {src}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="py-8 text-center text-outline text-xs">
                  {isLoading ? 'Aggregating real-time news wire...' : 'Agent standby. Ready to scan global market sentiment.'}
                </div>
              )}
            </div>

          </div>

          {/* ============================================================== */}
          {/* CENTER: 🕸️ SPIDER-BRAIN (Chairperson Synthesis) & DATA FLOW */}
          {/* ============================================================== */}
          <div className="col-span-1 md:col-span-4 flex flex-col justify-center items-center">
            
            <div className="w-full glass-panel rounded-xl p-lg border-primary/50 shadow-[0_0_35px_rgba(162,201,255,0.15)] bg-surface-container-low/95 backdrop-blur-xl relative overflow-hidden text-center">
              
              {/* Chairperson Icon & Status */}
              <div className="w-16 h-16 rounded-full border-2 border-primary mx-auto mb-sm flex items-center justify-center bg-surface shadow-[0_0_20px_rgba(162,201,255,0.3)] relative">
                <span className="text-2xl">🕸️</span>
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 animate-pulse border-2 border-surface"></span>
              </div>

              <div className="font-label-caps text-label-caps text-primary tracking-widest mb-xs">
                CHAIRPERSON SYNTHESIS
              </div>
              <h2 className="font-h2-section text-lg font-bold text-on-background mb-md">
                Spider-Brain
              </h2>

              {/* Central Verdict Display */}
              {brainResult ? (
                <div className="space-y-md">
                  <div className="bg-surface-container-lowest/80 p-md rounded-lg border border-outline-variant/40">
                    <div className="font-label-md text-xs text-outline mb-xs">SYNTHESIZED MARKET OUTLOOK</div>
                    <div className={`font-h1-display text-2xl font-bold tracking-tight ${
                      brainResult.verdict === 'bullish' ? 'text-emerald-400' :
                      brainResult.verdict === 'bearish' ? 'text-[#ff8989]' : 'text-primary'
                    }`}>
                      {brainResult.verdict.toUpperCase()}
                    </div>
                    <div className="font-mono text-xs text-on-surface-variant mt-1">
                      {Math.round(brainResult.confidence * 100)}% Consensus Confidence
                    </div>
                  </div>

                  {/* Agreement Counter */}
                  <div className="bg-surface-container p-sm rounded-lg flex items-center justify-between border border-outline-variant/30">
                    <span className="font-label-caps text-xs text-on-surface-variant">AGENT AGREEMENT</span>
                    <span className="font-mono text-sm font-bold text-primary">
                      {metrics?.agreement_count || 2} / {mindResult?.verdict === 'abstain' ? '2' : '3'} Active
                    </span>
                  </div>

                  <p className="font-body-sm text-xs text-on-surface-variant text-left leading-relaxed bg-surface-dim p-sm rounded border border-outline-variant/20">
                    {brainResult.reasoning}
                  </p>

                  <button
                    onClick={() => setShowExplanationModal(true)}
                    className="w-full bg-primary/20 hover:bg-primary/30 border border-primary/50 text-primary font-label-caps text-xs py-2 px-md rounded-lg transition-all flex items-center justify-center gap-xs"
                  >
                    <span className="material-symbols-outlined text-sm">visibility</span>
                    [WHY THIS VERDICT?]
                  </button>
                </div>
              ) : (
                <div className="py-12 text-center text-outline text-xs">
                  {isLoading ? 'Synthesizing multi-agent specialist signals...' : 'Chairperson standby. Enter a stock symbol above to synthesize.'}
                </div>
              )}

            </div>

          </div>

          {/* ============================================================== */}
          {/* RIGHT: 🕷️ SPIDER-SENSE (Personalization & Risk Assessment) */}
          {/* ============================================================== */}
          <div className="col-span-1 md:col-span-4 flex flex-col gap-md">
            
            <div className="glass-panel rounded-xl p-md md:p-lg border-[#d10332]/40 bg-surface-container-low/90 relative overflow-hidden flex flex-col h-full shadow-[0_0_25px_rgba(209,3,50,0.1)]">
              
              <div className="flex items-center justify-between border-b border-outline-variant/30 pb-sm mb-md">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🕷️</span>
                  <div>
                    <h3 className="font-label-caps text-label-caps text-[#ffb3b2]">PERSONALIZATION AGENT</h3>
                    <h2 className="font-h2-section text-base font-bold text-on-background">Spider-Sense</h2>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded bg-surface-variant text-[10px] font-label-caps uppercase text-outline border border-outline-variant">
                  {riskProfile} RISK
                </span>
              </div>

              {senseResult ? (
                <div className="space-y-md flex-1 flex flex-col justify-between">
                  <div>
                    <div className="font-label-caps text-[10px] text-outline mb-1">
                      WHAT THIS MEANS FOR YOUR PORTFOLIO:
                    </div>
                    <div className={`p-sm rounded-lg border mb-md flex items-center justify-between ${senseBadge.bg}`}>
                      <div className="flex items-center gap-2">
                        <span className={`w-2.5 h-2.5 rounded-full ${senseBadge.dot} animate-pulse`}></span>
                        <span className="font-label-caps text-xs font-bold">{senseBadge.text}</span>
                      </div>
                      <span className="font-mono text-xs">{Math.round(senseResult.confidence * 100)}% Confidence</span>
                    </div>

                    <div className="bg-[#05070A] border border-[#242E3A] p-md rounded-lg font-body-sm text-xs text-on-surface-variant leading-relaxed relative">
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#d10332] rounded-l-lg"></div>
                      {senseResult.reasoning}
                    </div>
                  </div>

                  {/* Portfolio Exposure Mini Bar */}
                  <div className="bg-surface-container-lowest p-sm rounded-lg border border-outline-variant/30 space-y-sm">
                    <div className="flex justify-between font-label-caps text-[10px] text-outline">
                      <span>SECTOR EXPOSURE CHECK</span>
                      <span className="text-[#a2c9ff]">IT: 55% | ENERGY: 45%</span>
                    </div>
                    <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden flex">
                      <div className="bg-[#a2c9ff] h-full" style={{ width: '55%' }} title="IT Sector (55%)"></div>
                      <div className="bg-[#d10332] h-full" style={{ width: '45%' }} title="Energy Sector (45%)"></div>
                    </div>
                  </div>

                  <div className="pt-sm border-t border-outline-variant/30 flex justify-between items-center text-[10px] font-mono text-outline">
                    <span>SOURCES: User Portfolio, Risk Engine</span>
                    <span>LATENCY: {senseResult.latency_ms}ms</span>
                  </div>
                </div>
              ) : (
                <div className="py-12 text-center text-outline text-xs">
                  {isLoading ? 'Calibrating portfolio risk matrices...' : 'Personalization standby. Enter a stock symbol above to evaluate risk vectors.'}
                </div>
              )}

            </div>

          </div>

        </div>

      </div>

      {/* ============================================================== */}
      {/* EXPLANATION MODAL / WHY THIS VERDICT DIALOG */}
      {/* ============================================================== */}
      {showExplanationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-md bg-black/75 backdrop-blur-md">
          <div className="glass-panel max-w-xl w-full rounded-xl p-lg border-[#a2c9ff]/40 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-outline-variant/40 pb-sm mb-md">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">psychology</span>
                <h3 className="font-h2-section text-lg font-bold text-on-background">
                  Council Deliberation & Consensus Logic
                </h3>
              </div>
              <button
                onClick={() => setShowExplanationModal(false)}
                className="text-outline hover:text-on-background p-1 rounded transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="space-y-md text-xs font-body-sm text-on-surface-variant max-h-[70vh] overflow-y-auto pr-1">
              <div className="bg-surface-container-low p-md rounded-lg border border-outline-variant/40">
                <h4 className="font-label-caps text-xs text-primary mb-xs font-bold">1. SPECIALIST DELIBERATION</h4>
                <ul className="space-y-2 mt-2">
                  <li className="flex items-start gap-2">
                    <span className="text-base">👁️</span>
                    <div>
                      <strong className="text-on-background">Spider-Eye (Technical):</strong> {eyeResult?.verdict.toUpperCase()} ({eyeResult ? Math.round(eyeResult.confidence * 100) : 0}%) — {eyeResult?.reasoning}
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-base">🧠</span>
                    <div>
                      <strong className="text-on-background">Spider-Mind (Fundamental):</strong> {mindResult?.verdict.toUpperCase()} — {mindResult?.reasoning}
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-base">👂</span>
                    <div>
                      <strong className="text-on-background">Spider-Ear (Sentiment):</strong> {earResult?.verdict.toUpperCase()} ({earResult ? Math.round(earResult.confidence * 100) : 0}%) — {earResult?.reasoning}
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-surface-container-low p-md rounded-lg border border-outline-variant/40">
                <h4 className="font-label-caps text-xs text-primary mb-xs font-bold">2. SYNTHESIS ENGINE (SPIDER-BRAIN)</h4>
                <p className="leading-relaxed">
                  Spider-Brain applies majority consensus weighting across all active specialists. If one agent encounters a timeout or abstains, the engine dynamically recalibrates without system interruption, noting reduced confidence.
                </p>
              </div>

              <div className="bg-surface-container-low p-md rounded-lg border border-outline-variant/40">
                <h4 className="font-label-caps text-xs text-[#ffb3b2] mb-xs font-bold">3. RISK CALIBRATION (SPIDER-SENSE)</h4>
                <p className="leading-relaxed">
                  Market direction alone does not dictate trade viability. Spider-Sense projects the consensus against your {riskProfile.toUpperCase()} risk profile and sector weightings to protect from unhedged sector concentration.
                </p>
              </div>
            </div>

            <div className="mt-md pt-sm border-t border-outline-variant/30 flex justify-end">
              <button
                onClick={() => setShowExplanationModal(false)}
                className="bg-primary text-[#002b50] font-label-caps text-xs font-bold px-lg py-2 rounded transition-colors"
              >
                CLOSE INSPECTION
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Council;
