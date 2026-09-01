import React, { useState, useMemo } from 'react';
import { Layout } from '../components/layout/Layout';
import { useCouncil } from '../context/CouncilContext';

interface CompanyProfile {
  sector: string;
  categoryName: string;
  peers: Array<{ symbol: string; weight: number }>;
  baseVolatility: number;
  expectedReturn: number;
  correlation: number;
  sharpe: number;
  beta: number;
}

const STOCK_PROFILES: Record<string, CompanyProfile> = {
  TCS: {
    sector: 'IT Services',
    categoryName: 'IT & Cloud Services',
    peers: [
      { symbol: 'INFY', weight: 25 },
      { symbol: 'WIPRO', weight: 15 },
      { symbol: 'HCLTECH', weight: 10 },
    ],
    baseVolatility: 12.4,
    expectedReturn: 14.6,
    correlation: 0.82,
    sharpe: 1.42,
    beta: 0.95,
  },
  INFY: {
    sector: 'IT Services',
    categoryName: 'IT & Digital Transformation',
    peers: [
      { symbol: 'TCS', weight: 30 },
      { symbol: 'COFORGE', weight: 15 },
      { symbol: 'LTIM', weight: 12 },
    ],
    baseVolatility: 13.8,
    expectedReturn: 15.2,
    correlation: 0.85,
    sharpe: 1.38,
    beta: 1.05,
  },
  RELIANCE: {
    sector: 'Energy & Telecom',
    categoryName: 'Conglomerate & Energy',
    peers: [
      { symbol: 'ONGC', weight: 20 },
      { symbol: 'BHARTIARTL', weight: 18 },
      { symbol: 'IOC', weight: 12 },
    ],
    baseVolatility: 14.2,
    expectedReturn: 16.4,
    correlation: 0.72,
    sharpe: 1.45,
    beta: 1.12,
  },
  HDFCBANK: {
    sector: 'Banking & Finance',
    categoryName: 'BFSI & Private Banking',
    peers: [
      { symbol: 'ICICIBANK', weight: 28 },
      { symbol: 'KOTAKBANK', weight: 18 },
      { symbol: 'SBIN', weight: 14 },
    ],
    baseVolatility: 11.8,
    expectedReturn: 13.9,
    correlation: 0.79,
    sharpe: 1.48,
    beta: 0.88,
  },
  TATAMOTORS: {
    sector: 'Automotive',
    categoryName: 'Auto & Commercial Mobility',
    peers: [
      { symbol: 'M&M', weight: 24 },
      { symbol: 'MARUTI', weight: 20 },
      { symbol: 'BAJAJ-AUTO', weight: 15 },
    ],
    baseVolatility: 18.5,
    expectedReturn: 17.2,
    correlation: 0.74,
    sharpe: 1.25,
    beta: 1.35,
  },
  NVDA: {
    sector: 'Semiconductors',
    categoryName: 'AI Compute & Semiconductors',
    peers: [
      { symbol: 'AMD', weight: 25 },
      { symbol: 'TSM', weight: 20 },
      { symbol: 'AVGO', weight: 15 },
    ],
    baseVolatility: 24.6,
    expectedReturn: 28.4,
    correlation: 0.88,
    sharpe: 1.58,
    beta: 1.72,
  },
  AAPL: {
    sector: 'Consumer Tech',
    categoryName: 'Consumer Devices & Ecosystem',
    peers: [
      { symbol: 'MSFT', weight: 30 },
      { symbol: 'GOOGL', weight: 22 },
      { symbol: 'AMZN', weight: 18 },
    ],
    baseVolatility: 13.5,
    expectedReturn: 16.8,
    correlation: 0.76,
    sharpe: 1.52,
    beta: 1.02,
  },
  TSLA: {
    sector: 'Clean Mobility',
    categoryName: 'Electric Vehicles & Robotics',
    peers: [
      { symbol: 'RIVN', weight: 20 },
      { symbol: 'BYD', weight: 18 },
      { symbol: 'NIO', weight: 12 },
    ],
    baseVolatility: 29.4,
    expectedReturn: 22.0,
    correlation: 0.69,
    sharpe: 1.15,
    beta: 1.88,
  },
  MSFT: {
    sector: 'Enterprise Software',
    categoryName: 'Cloud Infrastructure & SaaS',
    peers: [
      { symbol: 'AAPL', weight: 28 },
      { symbol: 'AMZN', weight: 24 },
      { symbol: 'ORCL', weight: 16 },
    ],
    baseVolatility: 14.1,
    expectedReturn: 17.5,
    correlation: 0.81,
    sharpe: 1.55,
    beta: 1.08,
  },
};

const QUICK_TICKERS = ['TCS', 'INFY', 'RELIANCE', 'HDFCBANK', 'TATAMOTORS', 'NVDA', 'AAPL', 'TSLA', 'MSFT'];

const WebBalance: React.FC = () => {
  const { activeStock, setActiveStock, runAnalysis } = useCouncil();
  const sym = activeStock.toUpperCase();

  const profile = useMemo(() => {
    if (STOCK_PROFILES[sym]) {
      return STOCK_PROFILES[sym];
    }
    // Dynamic generator for arbitrary tickers
    return {
      sector: `${sym} Sector Group`,
      categoryName: `${sym} Market Ecosystem`,
      peers: [
        { symbol: 'PEER-A', weight: 25 },
        { symbol: 'PEER-B', weight: 18 },
        { symbol: 'PEER-C', weight: 12 },
      ],
      baseVolatility: 15.0,
      expectedReturn: 15.5,
      correlation: 0.75,
      sharpe: 1.35,
      beta: 1.15,
    };
  }, [sym]);

  const [simHolding, setSimHolding] = useState<number>(35);

  const handleSelectTicker = (newSym: string) => {
    setActiveStock(newSym);
    runAnalysis(newSym);
    setSimHolding(35);
  };

  // Dynamic MPT calculations based on selected holding weight and company beta
  const projectedVolatility = useMemo(() => {
    const vol = profile.baseVolatility * (0.7 + (simHolding / 100) * profile.beta);
    return Number(vol.toFixed(1));
  }, [simHolding, profile]);

  const projectedReturn = useMemo(() => {
    const ret = profile.expectedReturn * (0.8 + (simHolding / 100) * 0.4);
    return Number(ret.toFixed(1));
  }, [simHolding, profile]);

  const dynamicSharpe = useMemo(() => {
    const s = (projectedReturn - 4.5) / projectedVolatility;
    return Number(s.toFixed(2));
  }, [projectedReturn, projectedVolatility]);

  const isConcentrated = simHolding >= 45;

  return (
    <Layout pageTitle="" customHeader={<></>}>
      <div className="flex flex-col gap-lg pb-xl">
        
        {/* Header Section with Live Ticker Switcher */}
        <section className="flex flex-col md:flex-row md:items-center justify-between gap-md border-b border-outline-variant/30 pb-sm">
          <div>
            <div className="flex items-center gap-sm">
              <h2 className="font-h1-display text-h1-display font-bold text-on-surface uppercase tracking-tight">
                WEB BALANCE & MPT DIVERSIFICATION
              </h2>
              <span className="px-2.5 py-0.5 rounded bg-primary/10 border border-primary/30 text-primary font-mono text-xs font-bold">
                ${sym}
              </span>
            </div>
            <p className="font-body-main text-body-main text-outline italic">
              "Is your portfolio actually diversified, or just concentrated in correlated webs?"
            </p>
          </div>

          {/* Quick Stock Selector on this page */}
          <div className="flex flex-wrap items-center gap-1.5 bg-surface-container-low p-1.5 rounded-lg border border-outline-variant/40">
            <span className="font-label-caps text-[10px] text-outline px-1">COMPANY:</span>
            {QUICK_TICKERS.map((ticker) => (
              <button
                key={ticker}
                type="button"
                onClick={() => handleSelectTicker(ticker)}
                className={`px-2 py-1 rounded text-xs font-mono transition-all ${
                  sym === ticker
                    ? 'bg-primary text-[#002b50] font-bold shadow'
                    : 'bg-surface-dim text-on-surface-variant hover:text-on-background border border-outline-variant/30'
                }`}
              >
                {ticker}
              </button>
            ))}
          </div>
        </section>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-4 md:grid-cols-12 gap-lg">
          
          {/* Interactive Portfolio & Sector Concentration Network (Left 8 Cols) */}
          <div className="col-span-4 md:col-span-8 bg-surface-container-low rounded-xl card-inner-border p-lg flex flex-col relative overflow-hidden min-h-[440px] border border-[#242E3A]">
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-md relative z-10">
              <div>
                <h3 className="font-h2-section text-lg font-bold text-on-surface">
                  {profile.categoryName} Concentration Map
                </h3>
                <p className="text-xs text-outline font-body-sm">
                  Active Asset: <strong className="text-primary">${sym}</strong> ({simHolding}% Sim Allocation) • Sector: <span className="text-on-surface">{profile.sector}</span>
                </p>
              </div>

              <div className="flex gap-sm">
                <span className={`flex items-center gap-xs font-label-caps text-label-caps uppercase px-2 py-1 rounded border ${
                  isConcentrated ? 'bg-[#d10332]/20 text-[#ffb3b2] border-[#d10332]/40' : 'bg-surface-variant text-on-surface border-outline-variant'
                }`}>
                  <span className={`w-2 h-2 rounded-full ${isConcentrated ? 'bg-[#d10332]' : 'bg-primary'}`}></span>
                  {sym} Weight ({simHolding}%)
                </span>
                <span className="flex items-center gap-xs font-label-caps text-label-caps text-primary uppercase bg-primary/10 px-2 py-1 rounded border border-primary/30">
                  Sector Cluster ({profile.sector})
                </span>
              </div>
            </div>

            {/* Network Visualization Container */}
            <div className="flex-1 relative border border-outline-variant/30 rounded-lg flex items-center justify-center bg-surface-dim overflow-hidden min-h-[280px]">
              
              {isConcentrated && (
                <p className="font-label-caps text-[10px] text-[#ffb3b2] absolute top-sm left-sm bg-[#d10332]/20 px-2 py-0.5 rounded border border-[#d10332]/30 animate-pulse">
                  ⚠️ Heavy Sector Concentration in {profile.sector} ({simHolding}%)
                </p>
              )}

              {/* Dynamic SVG Nodes for Active Company & Peers */}
              <div className="relative w-full h-full flex items-center justify-center">
                
                {/* Central Cluster Hub */}
                <div className={`absolute w-32 h-32 rounded-full border flex flex-col items-center justify-center shadow-lg transition-all ${
                  isConcentrated
                    ? 'border-[#d10332]/60 bg-[#d10332]/10 shadow-[0_0_25px_rgba(209,3,50,0.3)] animate-pulse'
                    : 'border-primary/40 bg-primary/5 shadow-[0_0_20px_rgba(162,201,255,0.15)]'
                }`}>
                  <span className={`font-label-caps text-xs font-bold ${isConcentrated ? 'text-[#ffb3b2]' : 'text-primary'}`}>
                    {profile.sector}
                  </span>
                  <span className="text-[10px] font-mono text-outline">{simHolding}% Weight</span>
                </div>

                {/* Central Active Stock Node */}
                <div className="absolute top-[26%] right-[18%] p-3 rounded-lg bg-surface-container-high border-2 border-primary flex items-center gap-2 shadow-[0_0_18px_rgba(162,201,255,0.3)] z-20">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary animate-ping"></span>
                  <span className="font-mono text-sm font-bold text-primary">${sym}</span>
                  <span className="text-xs font-mono text-on-surface font-bold">({simHolding}%)</span>
                </div>

                {/* Dynamic Peer Nodes */}
                {profile.peers.map((peer, idx) => {
                  const positions = [
                    { top: '16%', left: '18%' },
                    { bottom: '18%', left: '20%' },
                    { bottom: '20%', right: '22%' },
                  ];
                  const pos = positions[idx] || { top: '50%', left: '15%' };

                  return (
                    <div
                      key={peer.symbol}
                      onClick={() => handleSelectTicker(peer.symbol)}
                      className="absolute p-2 rounded-lg bg-surface-variant/90 border border-outline-variant/60 flex items-center gap-1.5 cursor-pointer hover:border-primary hover:scale-105 transition-all z-10"
                      style={pos}
                      title={`Click to analyze ${peer.symbol}`}
                    >
                      <span className="font-mono text-xs font-bold text-on-background">{peer.symbol}</span>
                      <span className="text-[10px] font-mono text-outline">{peer.weight}%</span>
                    </div>
                  );
                })}

                {/* Connection Lines SVG */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                  <line stroke={isConcentrated ? '#d10332' : '#a2c9ff'} strokeWidth="1.5" strokeDasharray="3" x1="25%" x2="50%" y1="25%" y2="50%"></line>
                  <line stroke={isConcentrated ? '#d10332' : '#a2c9ff'} strokeWidth="1.5" strokeDasharray="3" x1="27%" x2="50%" y1="75%" y2="50%"></line>
                  <line stroke="#242E3A" strokeWidth="1.5" x1="75%" x2="50%" y1="35%" y2="50%"></line>
                  <line stroke="#242E3A" strokeWidth="1.5" x1="75%" x2="50%" y1="75%" y2="50%"></line>
                </svg>

              </div>

            </div>

            <div className="mt-sm flex justify-between items-center text-[11px] font-mono text-outline relative z-10">
              <span>Click any peer node in the web to switch context to that company.</span>
              <span className="text-primary">Correlation Index: {profile.correlation}</span>
            </div>

          </div>

          {/* What-If Simulation Sandbox (Right 4 Cols) */}
          <div className="col-span-4 md:col-span-4 bg-surface-container-low rounded-xl card-inner-border p-lg flex flex-col justify-between border border-[#242E3A]">
            
            <div>
              <div className="flex items-center gap-2 mb-xs">
                <span className="material-symbols-outlined text-primary text-base">science</span>
                <h3 className="font-h2-section text-base font-bold text-on-surface">
                  What-If Simulation Sandbox
                </h3>
              </div>
              <p className="text-xs text-outline mb-md font-body-sm">
                Slide allocation for <strong className="text-on-background">${sym}</strong> to simulate real-time portfolio volatility drift.
              </p>

              {/* Dynamic Slider for Active Stock */}
              <div className="flex flex-col gap-sm bg-surface-container-lowest p-md rounded-lg border border-outline-variant/40">
                <label className="font-label-md text-xs text-on-surface-variant flex justify-between">
                  <span>Simulate Holding: <strong className="text-primary">${sym}</strong></span>
                  <span className="text-primary font-mono font-bold text-sm">{simHolding}%</span>
                </label>
                <input
                  className="w-full accent-primary bg-surface-dim h-1.5 rounded appearance-none cursor-pointer"
                  max="80"
                  min="5"
                  type="range"
                  value={simHolding}
                  onChange={(e) => setSimHolding(Number(e.target.value))}
                />
                <div className="flex justify-between font-mono text-[10px] text-outline">
                  <span>5% Min</span>
                  <span>35% Baseline</span>
                  <span>80% Max</span>
                </div>
              </div>
            </div>

            {/* Live Recalculated Volatility Feedback */}
            <div className="mt-md bg-surface-dim p-md rounded-lg border border-outline-variant flex flex-col gap-sm">
              <div className="flex justify-between items-center text-xs">
                <span className="font-label-md text-outline">Projected Portfolio Volatility</span>
                <span className={`font-mono font-bold text-sm ${isConcentrated ? 'text-[#ffb3b2]' : 'text-emerald-400'}`}>
                  {projectedVolatility}% <span className="text-[10px] font-normal text-outline line-through ml-1">{profile.baseVolatility}%</span>
                </span>
              </div>
              
              <div className="flex justify-between items-center text-xs">
                <span className="font-label-md text-outline">Projected Return</span>
                <span className="font-mono font-bold text-primary text-sm">{projectedReturn}%</span>
              </div>

              <div className="h-px w-full bg-outline-variant/50"></div>
              
              <p className="font-body-sm text-xs text-on-surface-variant italic border-l-2 border-primary pl-sm leading-relaxed">
                Spider-Sense Insight: {isConcentrated 
                  ? `"Elevating ${sym} to ${simHolding}% creates excessive ${profile.sector} concentration, raising portfolio drawdown sensitivity."`
                  : `"Holding ${sym} at ${simHolding}% maintains balanced diversification across the ${profile.sector} ecosystem."`}
              </p>
            </div>

          </div>

          {/* MPT Analysis Key Metrics (Bottom 5 Tiles) */}
          <div className="col-span-4 md:col-span-12 grid grid-cols-2 md:grid-cols-5 gap-md">
            
            <div className="bg-surface-container-low rounded-lg p-md flex flex-col gap-1 border border-outline-variant/40 hover:border-primary/40 transition-colors">
              <span className="font-label-caps text-[10px] text-outline uppercase">Expected Return</span>
              <span className="font-h1-display text-xl font-bold text-primary">{projectedReturn}%</span>
            </div>

            <div className="bg-surface-container-low rounded-lg p-md flex flex-col gap-1 border border-outline-variant/40 hover:border-primary/40 transition-colors">
              <span className="font-label-caps text-[10px] text-outline uppercase">Portfolio Volatility</span>
              <span className={`font-h1-display text-xl font-bold ${isConcentrated ? 'text-[#ffb3b2]' : 'text-emerald-400'}`}>
                {projectedVolatility}%
              </span>
            </div>

            <div className="bg-surface-container-low rounded-lg p-md flex flex-col gap-1 border border-outline-variant/40 hover:border-primary/40 transition-colors">
              <span className="font-label-caps text-[10px] text-outline uppercase">Cross Correlation</span>
              <span className="font-h1-display text-xl font-bold text-on-surface">{profile.correlation}</span>
            </div>

            <div className="bg-surface-container-low rounded-lg p-md flex flex-col gap-1 border border-outline-variant/40 hover:border-primary/40 transition-colors">
              <span className="font-label-caps text-[10px] text-outline uppercase">Sharpe Ratio</span>
              <span className="font-h1-display text-xl font-bold text-primary">{dynamicSharpe}</span>
            </div>

            <div className="col-span-2 md:col-span-1 bg-surface-container-low rounded-lg p-md flex flex-col gap-1 border border-outline-variant/40 hover:border-primary/40 transition-colors">
              <span className="font-label-caps text-[10px] text-outline uppercase">Concentration Risk</span>
              <span className={`font-h1-display text-xl font-bold ${isConcentrated ? 'text-[#ffb3b2]' : 'text-emerald-400'}`}>
                {isConcentrated ? `HIGH (${simHolding}%)` : 'BALANCED'}
              </span>
            </div>

          </div>

        </div>
      </div>
    </Layout>
  );
};

export default WebBalance;
