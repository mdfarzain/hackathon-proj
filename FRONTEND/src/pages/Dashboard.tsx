import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { useCouncil } from '../context/CouncilContext';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const {
    activeStock,
    setActiveStock,
    riskProfile,
    portfolio,
    totalCapital,
    setTotalCapital,
    addHolding,
    removeHolding,
    loadPortfolioPreset,
    analysisResult,
    recentAnalyses,
    runAnalysis,
  } = useCouncil();

  const [showPortfolioModal, setShowPortfolioModal] = useState<boolean>(false);
  const [newSymbol, setNewSymbol] = useState<string>('');
  const [newSector, setNewSector] = useState<string>('Technology');
  const [newPercentage, setNewPercentage] = useState<number>(20);
  const [capitalInput, setCapitalInput] = useState<string>(
    totalCapital !== null && totalCapital !== undefined ? String(totalCapital) : ''
  );

  const brain = analysisResult?.synthesis;
  const sense = analysisResult?.personalized_result;
  const metrics = analysisResult?.metrics;

  const hasInvestedMoney =
    totalCapital !== null &&
    totalCapital !== undefined &&
    !isNaN(totalCapital) &&
    totalCapital > 0;

  // Calculate highest sector concentration dynamically
  const sectorSummary = useMemo(() => {
    const map: Record<string, number> = {};
    for (const item of portfolio) {
      map[item.sector] = (map[item.sector] || 0) + item.percentage;
    }
    if (Object.keys(map).length === 0) {
      return { topSector: 'None', topPct: 0 };
    }
    const topSector = Object.keys(map).reduce((a, b) => (map[a] > map[b] ? a : b));
    return { topSector, topPct: map[topSector] };
  }, [portfolio]);

  const handleQuickDeploy = (stock: string) => {
    setActiveStock(stock);
    runAnalysis(stock);
    navigate('/council');
  };

  const handleAddHoldingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSymbol.trim()) return;
    addHolding({
      symbol: newSymbol.trim().toUpperCase(),
      sector: newSector,
      percentage: Number(newPercentage),
    });
    setNewSymbol('');
    setNewPercentage(15);
  };

  const handleSaveCapital = () => {
    const trimmed = capitalInput.trim();
    if (trimmed === '') {
      setTotalCapital(null);
    } else {
      const num = Number(trimmed);
      if (!isNaN(num) && num > 0) {
        setTotalCapital(num);
      } else {
        setTotalCapital(null);
      }
    }
  };

  return (
    <Layout
      pageTitle="Spider-Sense Terminal"
      pageSubtitle="Autonomous multi-agent financial intelligence network active."
    >
      <div className="grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12 gap-gutter pb-xl">
        {/* ============================================================== */}
        {/* TOP ALERT BANNER (Connected to Active Analysis & Spider-Sense) */}
        {/* ============================================================== */}
        <div className="col-span-4 md:col-span-8 xl:col-span-12 bg-[#090D13] border border-[#d10332]/60 rounded-xl p-md md:p-lg relative overflow-hidden group shadow-[0_0_25px_rgba(209,3,50,0.1)]">
          <div
            className="absolute inset-0 bg-[#d10332]/5 pointer-events-none"
            style={{
              background:
                'radial-gradient(circle at center, transparent 30%, rgba(162, 201, 255, 0.05) 31%, transparent 32%, transparent 50%, rgba(162, 201, 255, 0.05) 51%, transparent 52%)',
            }}
          ></div>

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-md">
            <div>
              <div className="flex items-center gap-sm mb-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-[#d10332] animate-ping"></span>
                <span className="font-label-caps text-label-caps text-[#ffb3b2] tracking-widest">
                  SPIDER-SENSE ADVISORY ACTIVE
                </span>
                <span className="px-2 py-0.5 rounded bg-[#d10332]/20 border border-[#d10332]/40 text-[#ffb3b2] text-[10px] font-mono">
                  ${activeStock}
                </span>
              </div>

              <h2 className="font-h2-section text-xl md:text-2xl font-bold text-on-background mb-xs">
                {sense?.verdict === 'high_risk'
                  ? `CONCENTRATION ALERT: ${activeStock} Sector Risk Warning`
                  : sense?.verdict === 'opportunity'
                  ? `TACTICAL OPPORTUNITY: Bullish Alignment on ${activeStock}`
                  : `COUNCIL EVALUATION: ${activeStock} Risk Assessment`}
              </h2>

              <p className="font-body-sm text-xs md:text-sm text-on-surface-variant max-w-3xl leading-relaxed mb-sm">
                {sense?.reasoning || 'Multi-agent council actively evaluating ticker risk vectors.'}
              </p>

              <div className="flex flex-wrap gap-sm">
                <span className="px-sm py-xs border border-outline-variant/60 rounded-full font-label-md text-xs text-on-surface-variant bg-surface-container flex items-center gap-xs">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  Consensus: {brain?.verdict.toUpperCase() || 'EVALUATING'} (
                  {brain ? Math.round(brain.confidence * 100) : 0}%)
                </span>
                <span className="px-sm py-xs border border-outline-variant/60 rounded-full font-label-md text-xs text-on-surface-variant bg-surface-container flex items-center gap-xs">
                  <span className="w-2 h-2 rounded-full bg-[#d10332]"></span>
                  Risk Stance: {riskProfile.toUpperCase()}
                </span>
                <span className="px-sm py-xs border border-outline-variant/60 rounded-full font-label-md text-xs text-on-surface-variant bg-surface-container flex items-center gap-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  Concentration: {sectorSummary.topSector} ({sectorSummary.topPct}%)
                </span>
              </div>
            </div>

            <button
              onClick={() => navigate('/council')}
              className="bg-[#d10332] hover:bg-[#b0022a] text-[#ffe1e0] font-label-caps text-xs tracking-wider px-lg py-3 rounded-lg transition-all shadow-lg flex items-center gap-2 shrink-0"
            >
              <span className="material-symbols-outlined text-sm">group</span>
              OPEN SPIDER COUNCIL
            </button>
          </div>
        </div>

        {/* ============================================================== */}
        {/* FINANCIAL WEB VISUALIZATION (Bento Left) */}
        {/* ============================================================== */}
        <div className="col-span-4 md:col-span-8 xl:col-span-8 bg-[#090D13] border border-[#242E3A] rounded-xl p-md md:p-lg min-h-[420px] relative overflow-hidden flex flex-col justify-between group hover:border-primary/30 transition-colors">
          <div className="flex items-center justify-between relative z-10 mb-sm">
            <div>
              <h3 className="font-label-caps text-label-caps text-on-surface-variant tracking-widest">
                ACTIVE FINANCIAL WEB TOPOLOGY
              </h3>
              <p className="font-body-sm text-xs text-outline">
                Real-time node graph connecting your customized holdings & active stock.
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {['TCS', 'INFY', 'RELIANCE', 'NVDA', 'AAPL', 'TSLA'].map((sym) => (
                <button
                  key={sym}
                  onClick={() => handleQuickDeploy(sym)}
                  className={`px-2 py-1 rounded text-xs font-mono transition-colors ${
                    activeStock === sym
                      ? 'bg-primary text-[#002b50] font-bold'
                      : 'bg-surface-container text-on-surface-variant hover:text-on-background border border-outline-variant/40'
                  }`}
                >
                  {sym}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Web Canvas Simulation with User's Custom Holdings */}
          <div className="w-full flex-1 bg-surface-container-lowest/90 rounded-lg flex items-center justify-center relative border border-[#242E3A] overflow-hidden min-h-[260px]">
            {/* SVG Connecting Lines */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line stroke="#242E3A" strokeWidth="1.5" x1="50%" y1="50%" x2="25%" y2="30%"></line>
              <line stroke="#242E3A" strokeWidth="1.5" x1="50%" y1="50%" x2="75%" y2="30%"></line>
              <line stroke="#242E3A" strokeWidth="1.5" x1="50%" y1="50%" x2="30%" y2="75%"></line>
              <line stroke="#242E3A" strokeWidth="1.5" x1="50%" y1="50%" x2="70%" y2="75%"></line>

              <circle
                cx="50%"
                cy="50%"
                r="45"
                stroke="#a2c9ff"
                strokeWidth="1"
                fill="none"
                opacity="0.3"
                className="animate-ping"
              ></circle>
            </svg>

            {/* Central Node: Active Stock */}
            <div
              onClick={() => navigate('/council')}
              className="absolute z-20 cursor-pointer transform hover:scale-110 transition-transform p-3 rounded-full bg-surface border-2 border-primary shadow-[0_0_20px_rgba(162,201,255,0.4)] flex flex-col items-center justify-center text-center"
            >
              <span className="text-xl">🕸️</span>
              <span className="font-mono text-xs font-bold text-primary">${activeStock}</span>
              <span className="text-[9px] font-label-caps text-outline uppercase">
                {brain?.verdict || 'ANALYZED'}
              </span>
            </div>

            {/* Render User's Actual Portfolio Holdings */}
            {portfolio.slice(0, 4).map((holding, idx) => {
              const positions = [
                { top: '18%', left: '16%' },
                { top: '18%', right: '16%' },
                { bottom: '16%', left: '20%' },
                { bottom: '16%', right: '20%' },
              ];
              const pos = positions[idx] || { top: '50%', left: '10%' };

              return (
                <div
                  key={holding.symbol}
                  onClick={() => handleQuickDeploy(holding.symbol)}
                  className="absolute p-2 rounded-lg bg-surface-container border border-outline-variant flex items-center gap-1.5 cursor-pointer hover:border-primary hover:scale-105 transition-all z-10"
                  style={pos}
                  title={`Click to analyze ${holding.symbol} (${holding.sector})`}
                >
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  <span className="font-mono text-xs text-on-background font-bold">
                    {holding.symbol}
                  </span>
                  <span className="text-[10px] font-mono text-outline">
                    ({holding.percentage}%)
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-xs text-outline mt-sm relative z-10">
            <span>Showing custom holdings from your portfolio.</span>
            <button
              onClick={() => navigate('/trace')}
              className="text-primary hover:underline flex items-center gap-1"
            >
              <span>View Full Trace Graph</span>
              <span className="material-symbols-outlined text-xs">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* ============================================================== */}
        {/* PORTFOLIO SNAPSHOT & ACTIVITY (Bento Right Stack) */}
        {/* ============================================================== */}
        <div className="col-span-4 md:col-span-8 xl:col-span-4 flex flex-col gap-gutter">
          {/* Portfolio Snapshot Card with "EDIT / CUSTOMIZE" button */}
          <div className="bg-[#090D13] border border-[#242E3A] rounded-xl p-md md:p-lg relative group hover:border-primary/30 transition-colors">
            <div className="flex items-center justify-between mb-xs">
              <h3 className="font-label-caps text-label-caps text-on-surface-variant tracking-widest">
                PORTFOLIO SNAPSHOT
              </h3>
              <button
                onClick={() => {
                  setCapitalInput(
                    totalCapital !== null && totalCapital !== undefined ? String(totalCapital) : ''
                  );
                  setShowPortfolioModal(true);
                }}
                className="px-2 py-0.5 rounded bg-primary/10 hover:bg-primary/20 text-primary text-[10px] font-label-caps font-bold border border-primary/30 transition-colors flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-xs">edit</span>
                CUSTOMIZE
              </button>
            </div>

            {/* If invested money is entered: Show Valuation. If empty: Show Clear Guidance Message */}
            {hasInvestedMoney ? (
              <div className="font-h1-display text-2xl md:text-3xl font-bold text-primary mb-md">
                ₹{totalCapital.toLocaleString('en-IN')}
              </div>
            ) : (
              <div className="p-3.5 my-sm rounded-lg bg-surface-container-low border border-primary/30 text-center space-y-1.5">
                <span className="material-symbols-outlined text-primary text-xl">
                  account_balance_wallet
                </span>
                <p className="font-body-sm text-xs text-on-surface leading-snug">
                  Please enter your invested amount to view your portfolio snapshot.
                </p>
                <button
                  onClick={() => {
                    setCapitalInput(
                      totalCapital !== null && totalCapital !== undefined
                        ? String(totalCapital)
                        : ''
                    );
                    setShowPortfolioModal(true);
                  }}
                  className="bg-primary/20 hover:bg-primary/30 text-primary border border-primary/40 px-2.5 py-1 rounded font-label-caps text-[11px] font-bold transition-colors"
                >
                  + Enter Invested Amount
                </button>
              </div>
            )}

            <div className="space-y-sm text-xs mt-sm">
              <div className="flex justify-between items-center border-b border-[#242E3A] pb-sm">
                <span className="text-on-surface-variant">Top Sector Exposure</span>
                <span className="font-mono font-bold text-[#ffb3b2]">
                  {sectorSummary.topSector} ({sectorSummary.topPct}%)
                </span>
              </div>
              <div className="flex justify-between items-center border-b border-[#242E3A] pb-sm">
                <span className="text-on-surface-variant">Active Holdings</span>
                <span className="font-mono font-bold text-on-surface">
                  {portfolio.map((p) => p.symbol).join(', ') || 'None'}
                </span>
              </div>
              <div className="flex justify-between items-center border-b border-[#242E3A] pb-sm">
                <span className="text-on-surface-variant">Active Risk Tolerance</span>
                <span className="px-2 py-0.5 bg-surface-variant text-[#a2c9ff] rounded font-label-caps uppercase font-bold">
                  {riskProfile} RISK
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-on-surface-variant">Agent Agreement Avg</span>
                <span className="font-mono text-emerald-400 font-bold">
                  {metrics ? `${metrics.agreement_count} / 3 Specialists` : '2 / 3'}
                </span>
              </div>
            </div>
          </div>

          {/* Recent Activity Mini-Table */}
          <div className="bg-[#090D13] border border-[#242E3A] rounded-xl p-md md:p-lg relative group hover:border-primary/30 transition-colors flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-sm">
              <h3 className="font-label-caps text-label-caps text-on-surface-variant tracking-widest">
                COUNCIL ANALYSIS STREAM
              </h3>
              <span className="text-[10px] font-mono text-outline">LIVE FEED</span>
            </div>

            <div className="space-y-sm flex-1 overflow-y-auto max-h-[220px] pr-1">
              {recentAnalyses.map((act, i) => (
                <div
                  key={i}
                  onClick={() => handleQuickDeploy(act.stock)}
                  className="flex justify-between items-center p-2 rounded-lg bg-surface-container-low hover:bg-surface-container border border-outline-variant/30 cursor-pointer transition-colors"
                >
                  <div>
                    <div className="font-mono text-xs font-bold text-on-background flex items-center gap-1.5">
                      <span>${act.stock}</span>
                      <span
                        className={`text-[9px] px-1 rounded uppercase ${
                          act.verdict === 'bullish'
                            ? 'bg-emerald-950 text-emerald-400'
                            : act.verdict === 'bearish'
                            ? 'bg-red-950 text-red-400'
                            : 'bg-surface-variant text-outline'
                        }`}
                      >
                        {act.verdict}
                      </span>
                    </div>
                    <div className="text-[10px] text-outline mt-0.5">
                      Confidence: {Math.round(act.confidence * 100)}%
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-[10px] font-mono text-outline">{act.timestamp}</div>
                    <div className="text-[10px] font-mono text-primary">{act.totalLatency}ms</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* PORTFOLIO & CAPITAL CUSTOMIZATION MODAL */}
      {/* ============================================================== */}
      {showPortfolioModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-md bg-black/80 backdrop-blur-md">
          <div className="glass-panel max-w-2xl w-full rounded-xl p-lg border-primary/40 shadow-2xl relative max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-outline-variant/40 pb-sm mb-md">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">
                  account_balance_wallet
                </span>
                <h3 className="font-h2-section text-lg font-bold text-on-background">
                  Manage Investment Capital & Portfolio Holdings
                </h3>
              </div>
              <button
                onClick={() => setShowPortfolioModal(false)}
                className="text-outline hover:text-on-background p-1 rounded transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="space-y-lg">
              {/* 1. Edit Total Capital */}
              <div className="bg-surface-container-low p-md rounded-lg border border-outline-variant/40 space-y-sm">
                <label className="font-label-caps text-xs text-primary font-bold block">
                  1. TOTAL INVESTMENT CAPITAL (₹ / $)
                </label>
                <div className="flex items-center gap-sm">
                  <span className="font-mono text-sm text-outline">₹</span>
                  <input
                    type="text"
                    value={capitalInput}
                    onChange={(e) => setCapitalInput(e.target.value)}
                    className="input-field flex-1 py-2 px-3 rounded font-mono text-sm text-on-background"
                    placeholder="Enter invested money (e.g. 1000000)"
                  />
                  <button
                    type="button"
                    onClick={handleSaveCapital}
                    className="bg-primary text-[#002b50] font-label-caps text-xs font-bold px-4 py-2 rounded transition-colors"
                  >
                    SAVE CAPITAL
                  </button>
                </div>
                <p className="text-[10px] text-outline">
                  Tip: Clear the field if you wish to reset or leave invested money unentered.
                </p>
              </div>

              {/* 2. One-Click Portfolio Presets */}
              <div className="bg-surface-container-low p-md rounded-lg border border-outline-variant/40 space-y-sm">
                <label className="font-label-caps text-xs text-outline font-bold block">
                  2. LOAD POPULAR PORTFOLIO PRESETS
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      loadPortfolioPreset('india_trio');
                      setCapitalInput('842500');
                    }}
                    className="p-2 rounded bg-surface-dim hover:bg-surface-variant border border-outline-variant/50 text-xs font-label-caps text-left transition-colors"
                  >
                    <div className="font-bold text-primary">🇮🇳 India Growth</div>
                    <div className="text-[10px] text-outline">TCS, INFY, RIL</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      loadPortfolioPreset('ai_titans');
                      setCapitalInput('1500000');
                    }}
                    className="p-2 rounded bg-surface-dim hover:bg-surface-variant border border-outline-variant/50 text-xs font-label-caps text-left transition-colors"
                  >
                    <div className="font-bold text-emerald-400">🤖 AI & Tech</div>
                    <div className="text-[10px] text-outline">NVDA, MSFT, AAPL</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      loadPortfolioPreset('ev_mobility');
                      setCapitalInput('1000000');
                    }}
                    className="p-2 rounded bg-surface-dim hover:bg-surface-variant border border-outline-variant/50 text-xs font-label-caps text-left transition-colors"
                  >
                    <div className="font-bold text-amber-300">🚗 EV Mobility</div>
                    <div className="text-[10px] text-outline">TSLA, TATA, NVDA</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      loadPortfolioPreset('banking_diversified');
                      setCapitalInput('1250000');
                    }}
                    className="p-2 rounded bg-surface-dim hover:bg-surface-variant border border-outline-variant/50 text-xs font-label-caps text-left transition-colors"
                  >
                    <div className="font-bold text-[#ffb3b2]">🏦 BFSI & Core</div>
                    <div className="text-[10px] text-outline">HDFC, RIL, TCS</div>
                  </button>
                </div>
              </div>

              {/* 3. Current Holdings List */}
              <div className="bg-surface-container-low p-md rounded-lg border border-outline-variant/40 space-y-sm">
                <div className="flex justify-between items-center">
                  <label className="font-label-caps text-xs text-primary font-bold">
                    3. CURRENT ACTIVE HOLDINGS ({portfolio.length})
                  </label>
                  <span className="text-xs font-mono text-outline">
                    Total Weight: {portfolio.reduce((acc, curr) => acc + curr.percentage, 0)}%
                  </span>
                </div>

                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {portfolio.map((item) => (
                    <div
                      key={item.symbol}
                      className="flex items-center justify-between p-2 rounded bg-surface-dim border border-outline-variant/40 text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-bold text-primary text-sm">
                          ${item.symbol}
                        </span>
                        <span className="text-on-surface-variant text-[11px]">{item.sector}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-bold text-on-surface">
                          {item.percentage}%
                        </span>
                        <button
                          type="button"
                          onClick={() => removeHolding(item.symbol)}
                          className="text-red-400 hover:text-red-300 p-1 transition-colors"
                          title="Remove holding"
                        >
                          <span className="material-symbols-outlined text-sm">delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4. Add New Company Holding Form */}
              <form
                onSubmit={handleAddHoldingSubmit}
                className="bg-surface-container-low p-md rounded-lg border border-outline-variant/40 space-y-sm"
              >
                <label className="font-label-caps text-xs text-primary font-bold block">
                  4. ADD NEW COMPANY TO PORTFOLIO
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                  <input
                    type="text"
                    value={newSymbol}
                    onChange={(e) => setNewSymbol(e.target.value.toUpperCase())}
                    placeholder="Symbol (e.g. NVDA)"
                    className="input-field py-1.5 px-2.5 rounded font-mono text-xs text-on-background"
                    required
                  />

                  <select
                    value={newSector}
                    onChange={(e) => setNewSector(e.target.value)}
                    className="input-field py-1.5 px-2.5 rounded font-body-sm text-xs text-on-background bg-surface-dim"
                  >
                    <option value="IT Services">IT Services</option>
                    <option value="Semiconductors">Semiconductors</option>
                    <option value="Banking & Finance">Banking & Finance</option>
                    <option value="Energy & Telecom">Energy & Telecom</option>
                    <option value="Automotive">Automotive</option>
                    <option value="Clean Mobility">Clean Mobility</option>
                    <option value="Consumer Tech">Consumer Tech</option>
                    <option value="Healthcare">Healthcare</option>
                  </select>

                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      value={newPercentage}
                      onChange={(e) => setNewPercentage(Number(e.target.value))}
                      placeholder="Weight %"
                      min="1"
                      max="100"
                      className="input-field py-1.5 px-2.5 rounded font-mono text-xs text-on-background w-full"
                      required
                    />
                    <span className="font-mono text-xs text-outline">%</span>
                  </div>

                  <button
                    type="submit"
                    className="bg-primary hover:bg-primary-fixed text-[#002b50] font-label-caps text-xs font-bold py-1.5 px-3 rounded transition-colors"
                  >
                    + ADD HOLDING
                  </button>
                </div>
              </form>
            </div>

            <div className="mt-lg pt-sm border-t border-outline-variant/30 flex justify-end">
              <button
                onClick={() => setShowPortfolioModal(false)}
                className="bg-primary text-[#002b50] font-label-caps text-xs font-bold px-lg py-2 rounded transition-colors"
              >
                APPLY & CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Dashboard;
