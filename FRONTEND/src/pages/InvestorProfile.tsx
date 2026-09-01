import React, { useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { useCouncil } from '../context/CouncilContext';
import type { RiskProfile } from '../services/api';

const InvestorProfile: React.FC = () => {
  const {
    activeStock,
    riskProfile,
    setRiskProfile,
    portfolio,
    totalCapital,
    setTotalCapital,
    addHolding,
    removeHolding,
    loadPortfolioPreset,
    analysisResult,
    runAnalysis,
    isLoading,
  } = useCouncil();

  const getInitialSlider = (r: RiskProfile) => {
    if (r === 'low') return 1;
    if (r === 'medium') return 2;
    return 3;
  };

  const [riskSlider, setRiskSlider] = useState<number>(getInitialSlider(riskProfile));
  const [horizon, setHorizon] = useState<string>('strategic');
  const [capitalInput, setCapitalInput] = useState<string>(
    totalCapital !== null && totalCapital !== undefined ? String(totalCapital) : ''
  );
  const [newSymbol, setNewSymbol] = useState<string>('');
  const [newSector, setNewSector] = useState<string>('IT Services');
  const [newPercentage, setNewPercentage] = useState<number>(20);

  const handleSliderChange = (val: number) => {
    setRiskSlider(val);
    const newProfile: RiskProfile = val === 1 ? 'low' : val === 2 ? 'medium' : 'high';
    setRiskProfile(newProfile);
    runAnalysis(activeStock, newProfile);
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

  const handleAddHolding = (e: React.FormEvent) => {
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

  const getRiskDisplay = () => {
    switch (riskSlider) {
      case 1:
        return {
          text: 'LOW CONSERVATIVE',
          className: 'px-3 py-1 rounded bg-[#2d1a1c] border border-error/50 font-label-caps text-label-caps text-error',
        };
      case 2:
        return {
          text: 'MODERATE BALANCED',
          className: 'px-3 py-1 rounded bg-surface-container border border-outline-variant font-label-caps text-label-caps text-on-surface',
        };
      case 3:
      default:
        return {
          text: 'HIGH AGGRESSIVE',
          className: 'px-3 py-1 rounded bg-[#0a203a] border border-primary/50 font-label-caps text-label-caps text-primary',
        };
    }
  };

  const riskDisplay = getRiskDisplay();
  const brain = analysisResult?.synthesis;
  const sense = analysisResult?.personalized_result;

  return (
    <Layout pageTitle="" customHeader={<></>}>
      <div className="flex flex-col relative w-full spider-bg min-h-[calc(100vh-140px)] pb-xl">
        {/* Page Content */}
        <div className="grid grid-cols-4 md:grid-cols-12 gap-lg h-full">
          
          {/* Header Section */}
          <div className="col-span-4 md:col-span-12 mb-md border-b border-outline-variant/30 pb-sm">
            <h2 className="font-h1-display text-h1-display text-on-surface mb-xs uppercase">
              YOUR SPIDER-SENSE PROFILE & CAPITAL
            </h2>
            <p className="font-body-main text-body-main text-on-surface-variant max-w-2xl">
              "Your risk profile and capital allocation change how the Council interprets threats." Configure your analytical parameters and portfolio holdings below.
            </p>
          </div>

          {/* Left Column: Controls (8 cols on desktop) */}
          <div className="col-span-4 md:col-span-8 flex flex-col gap-lg">
            
            {/* 1. Risk Tolerance Card */}
            <div className="glass-panel p-lg rounded-xl hover-card border-[#242E3A]">
              <div className="flex items-center justify-between mb-md">
                <h3 className="font-h2-section text-h2-section text-on-surface flex items-center gap-sm">
                  <span className="material-symbols-outlined text-primary">speed</span>
                  Risk Tolerance Profile
                </h3>
                <div className={riskDisplay.className}>
                  {riskDisplay.text}
                </div>
              </div>

              <div className="mb-lg">
                <input
                  className="w-full custom-range"
                  max="3"
                  min="1"
                  type="range"
                  value={riskSlider}
                  onChange={(e) => handleSliderChange(Number(e.target.value))}
                />
                <div className="flex justify-between mt-sm font-label-md text-label-md text-on-surface-variant">
                  <span className={riskSlider === 1 ? 'text-error font-bold' : ''}>1: LOW</span>
                  <span className={riskSlider === 2 ? 'text-primary font-bold' : ''}>2: MODERATE</span>
                  <span className={riskSlider === 3 ? 'text-emerald-400 font-bold' : ''}>3: HIGH</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-md">
                <div className="bg-surface-container-low p-sm rounded border border-outline-variant">
                  <div className="font-label-caps text-label-caps text-on-surface-variant mb-xs">EQUITY TARGET</div>
                  <div className="font-body-main text-body-main text-on-surface">
                    {riskSlider === 1 ? '40%' : riskSlider === 2 ? '65%' : '85%'}
                  </div>
                </div>
                <div className="bg-surface-container-low p-sm rounded border border-outline-variant">
                  <div className="font-label-caps text-label-caps text-on-surface-variant mb-xs">MAX DRAWDOWN</div>
                  <div className="font-body-main text-body-main text-on-surface">
                    {riskSlider === 1 ? '-8%' : riskSlider === 2 ? '-15%' : '-28%'}
                  </div>
                </div>
                <div className="bg-surface-container-low p-sm rounded border border-outline-variant">
                  <div className="font-label-caps text-label-caps text-on-surface-variant mb-xs">VOLATILITY CAP</div>
                  <div className="font-body-main text-body-main text-on-surface">
                    {riskSlider === 1 ? '9%' : riskSlider === 2 ? '14%' : '24%'}
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Capital & Custom Portfolio Holdings Card */}
            <div className="glass-panel p-lg rounded-xl hover-card border-[#242E3A] space-y-md">
              <div className="flex items-center justify-between border-b border-outline-variant/30 pb-sm">
                <h3 className="font-h2-section text-base font-bold text-on-surface flex items-center gap-sm">
                  <span className="material-symbols-outlined text-primary">account_balance_wallet</span>
                  Custom Portfolio Holdings & Capital
                </h3>
                <span className="font-mono text-sm font-bold text-primary">
                  {totalCapital !== null && totalCapital !== undefined && !isNaN(totalCapital) && totalCapital > 0
                    ? `₹${totalCapital.toLocaleString('en-IN')}`
                    : 'Unentered'}
                </span>
              </div>

              {/* Total Capital Input */}
              <div className="flex items-center gap-sm">
                <label className="font-label-caps text-xs text-outline font-bold shrink-0">INVESTED CAPITAL:</label>
                <div className="flex items-center gap-2 flex-1">
                  <span className="font-mono text-xs text-outline">₹</span>
                  <input
                    type="text"
                    value={capitalInput}
                    onChange={(e) => setCapitalInput(e.target.value)}
                    className="input-field py-1.5 px-3 rounded font-mono text-xs text-on-background flex-1"
                    placeholder="Enter invested money (e.g. 1000000)..."
                  />
                  <button
                    type="button"
                    onClick={handleSaveCapital}
                    className="bg-primary text-[#002b50] font-label-caps text-xs font-bold px-3 py-1.5 rounded transition-colors"
                  >
                    UPDATE
                  </button>
                </div>
              </div>

              {/* One-Click Presets */}
              <div>
                <label className="font-label-caps text-[10px] text-outline font-bold mb-1.5 block">QUICK LOAD PRESETS:</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => loadPortfolioPreset('india_trio')}
                    className="p-2 rounded bg-surface-dim hover:bg-surface-variant border border-outline-variant/40 text-xs font-label-caps text-left transition-colors"
                  >
                    <div className="font-bold text-primary">🇮🇳 India Growth</div>
                    <div className="text-[9px] text-outline">TCS, INFY, RIL</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => loadPortfolioPreset('ai_titans')}
                    className="p-2 rounded bg-surface-dim hover:bg-surface-variant border border-outline-variant/40 text-xs font-label-caps text-left transition-colors"
                  >
                    <div className="font-bold text-emerald-400">🤖 AI & Tech</div>
                    <div className="text-[9px] text-outline">NVDA, MSFT, AAPL</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => loadPortfolioPreset('ev_mobility')}
                    className="p-2 rounded bg-surface-dim hover:bg-surface-variant border border-outline-variant/40 text-xs font-label-caps text-left transition-colors"
                  >
                    <div className="font-bold text-amber-300">🚗 EV Mobility</div>
                    <div className="text-[9px] text-outline">TSLA, TATA, NVDA</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => loadPortfolioPreset('banking_diversified')}
                    className="p-2 rounded bg-surface-dim hover:bg-surface-variant border border-outline-variant/40 text-xs font-label-caps text-left transition-colors"
                  >
                    <div className="font-bold text-[#ffb3b2]">🏦 BFSI & Core</div>
                    <div className="text-[9px] text-outline">HDFC, RIL, TCS</div>
                  </button>
                </div>
              </div>

              {/* Active Holdings Table */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs font-label-caps text-outline">
                  <span>ACTIVE HOLDINGS ({portfolio.length})</span>
                  <span>Total Allocation: {portfolio.reduce((a, b) => a + b.percentage, 0)}%</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {portfolio.map((item) => (
                    <div
                      key={item.symbol}
                      className="flex items-center justify-between p-2 rounded bg-surface-dim border border-outline-variant/40 text-xs"
                    >
                      <div>
                        <div className="font-mono font-bold text-primary">${item.symbol}</div>
                        <div className="text-[10px] text-outline">{item.sector}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold">{item.percentage}%</span>
                        <button
                          type="button"
                          onClick={() => removeHolding(item.symbol)}
                          className="text-red-400 hover:text-red-300 transition-colors"
                          title="Remove holding"
                        >
                          <span className="material-symbols-outlined text-xs">close</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add Company Form */}
              <form onSubmit={handleAddHolding} className="pt-sm border-t border-outline-variant/30 flex flex-wrap gap-2 items-center">
                <input
                  type="text"
                  value={newSymbol}
                  onChange={(e) => setNewSymbol(e.target.value.toUpperCase())}
                  placeholder="New Ticker (e.g. NVDA)"
                  className="input-field py-1.5 px-2.5 rounded font-mono text-xs text-on-background flex-1 min-w-[130px]"
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
                </select>

                <div className="flex items-center gap-1 w-24">
                  <input
                    type="number"
                    value={newPercentage}
                    onChange={(e) => setNewPercentage(Number(e.target.value))}
                    min="1"
                    max="100"
                    placeholder="%"
                    className="input-field py-1.5 px-2 rounded font-mono text-xs text-on-background w-full"
                    required
                  />
                  <span className="font-mono text-xs text-outline">%</span>
                </div>

                <button
                  type="submit"
                  className="bg-primary hover:bg-primary-fixed text-[#002b50] font-label-caps text-xs font-bold py-1.5 px-3 rounded transition-colors"
                >
                  + ADD
                </button>
              </form>
            </div>

            {/* 3. Investment Horizon & Behavioral Biases */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
              <div className="glass-panel p-lg rounded-xl hover-card border-[#242E3A]">
                <h3 className="font-h2-section text-h2-section text-on-surface mb-md flex items-center gap-sm">
                  <span className="material-symbols-outlined text-primary">hourglass_empty</span>
                  Time Horizon
                </h3>
                <div className="space-y-sm">
                  <label
                    onClick={() => setHorizon('tactical')}
                    className={`flex items-center gap-md p-sm rounded border cursor-pointer transition-colors ${
                      horizon === 'tactical'
                        ? 'bg-surface-container border-primary text-primary'
                        : 'bg-surface-container-low border-outline-variant text-on-surface hover:bg-surface-container'
                    }`}
                  >
                    <input
                      type="radio"
                      name="horizon"
                      checked={horizon === 'tactical'}
                      onChange={() => setHorizon('tactical')}
                      className="form-radio text-primary"
                    />
                    <span className="font-body-sm text-body-sm">Tactical (1-3 Years)</span>
                  </label>

                  <label
                    onClick={() => setHorizon('strategic')}
                    className={`flex items-center gap-md p-sm rounded border cursor-pointer transition-colors ${
                      horizon === 'strategic'
                        ? 'bg-surface-container border-primary text-primary'
                        : 'bg-surface-container-low border-outline-variant text-on-surface hover:bg-surface-container'
                    }`}
                  >
                    <input
                      type="radio"
                      name="horizon"
                      checked={horizon === 'strategic'}
                      onChange={() => setHorizon('strategic')}
                      className="form-radio text-primary"
                    />
                    <span className="font-body-sm text-body-sm">Strategic (3-7 Years)</span>
                  </label>

                  <label
                    onClick={() => setHorizon('legacy')}
                    className={`flex items-center gap-md p-sm rounded border cursor-pointer transition-colors ${
                      horizon === 'legacy'
                        ? 'bg-surface-container border-primary text-primary'
                        : 'bg-surface-container-low border-outline-variant text-on-surface hover:bg-surface-container'
                    }`}
                  >
                    <input
                      type="radio"
                      name="horizon"
                      checked={horizon === 'legacy'}
                      onChange={() => setHorizon('legacy')}
                      className="form-radio text-primary"
                    />
                    <span className="font-body-sm text-body-sm">Legacy (7+ Years)</span>
                  </label>
                </div>
              </div>

              <div className="glass-panel p-lg rounded-xl hover-card border-[#242E3A]">
                <h3 className="font-h2-section text-h2-section text-on-surface mb-md flex items-center gap-sm">
                  <span className="material-symbols-outlined text-primary">psychology</span>
                  Behavioral Bias Calibration
                </h3>
                <div className="space-y-md">
                  <div>
                    <div className="flex justify-between font-label-md text-label-md mb-xs">
                      <span className="text-on-surface-variant">Loss Aversion</span>
                      <span className="text-primary">{riskSlider === 1 ? 'High' : riskSlider === 2 ? 'Moderate' : 'Low'}</span>
                    </div>
                    <div className="w-full bg-surface-container rounded-full h-1.5">
                      <div
                        className="bg-primary h-1.5 rounded-full transition-all"
                        style={{ width: riskSlider === 1 ? '85%' : riskSlider === 2 ? '55%' : '25%' }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between font-label-md text-label-md mb-xs">
                      <span className="text-on-surface-variant">Sector Concentration Tolerance</span>
                      <span className="text-primary">{riskSlider === 3 ? 'High' : 'Strict (35% Max)'}</span>
                    </div>
                    <div className="w-full bg-surface-container rounded-full h-1.5">
                      <div
                        className="bg-primary h-1.5 rounded-full transition-all"
                        style={{ width: riskSlider === 3 ? '80%' : '35%' }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between font-label-md text-label-md mb-xs">
                      <span className="text-on-surface-variant">Drawdown Sensitivity</span>
                      <span className="text-primary">{riskSlider === 1 ? 'Extreme' : 'Balanced'}</span>
                    </div>
                    <div className="w-full bg-surface-container rounded-full h-1.5">
                      <div
                        className="bg-primary h-1.5 rounded-full transition-all"
                        style={{ width: riskSlider === 1 ? '90%' : '50%' }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-sm">
              <button
                disabled={isLoading}
                onClick={() => runAnalysis()}
                className="bg-primary text-[#002b50] font-label-caps text-xs font-bold px-lg py-2.5 rounded-lg hover:bg-primary-fixed transition-colors flex items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>
                    RECALIBRATING...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-sm">tune</span>
                    RECALIBRATE SPIDER-SENSE
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Column: Live Spider-Sense Impact (4 cols on desktop) */}
          <div className="col-span-4 md:col-span-4 flex flex-col h-full">
            <div className="glass-panel p-lg rounded-xl flex-1 flex flex-col relative overflow-hidden border-primary/40 bg-surface-container-low/95">
              
              <div className="flex items-center gap-sm mb-md relative z-10">
                <span className="text-2xl">🕷️</span>
                <div>
                  <h3 className="font-h2-section text-base font-bold text-on-surface">
                    Spider-Sense Output
                  </h3>
                  <span className="text-[10px] font-mono text-outline">Ticker: ${activeStock}</span>
                </div>
              </div>

              <div className="bg-surface-container-lowest p-md rounded-lg border border-outline-variant mb-md relative z-10 space-y-2">
                <div className="font-label-caps text-[10px] text-outline">COUNCIL CONSENSUS</div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm font-bold text-primary">
                    {brain?.verdict.toUpperCase() || 'BULLISH'}
                  </span>
                  <span className="text-xs font-mono text-outline">
                    {brain ? Math.round(brain.confidence * 100) : 80}% Conf.
                  </span>
                </div>
              </div>

              {/* Dynamic Personalized Recommendation */}
              <div className="flex-1 flex flex-col justify-center relative z-10">
                <div className="font-label-caps text-label-caps text-on-surface-variant mb-xs">
                  PERSONALIZED VERDICT
                </div>

                <div className={`p-md rounded-lg border leading-relaxed text-xs ${
                  sense?.verdict === 'high_risk'
                    ? 'bg-[#2d1a1c] border-error/50 text-[#ffb3b2]'
                    : sense?.verdict === 'opportunity'
                    ? 'bg-[#0a203a] border-primary/50 text-[#a2c9ff]'
                    : 'bg-surface-container border-outline-variant text-on-surface'
                }`}>
                  <div className="font-label-caps font-bold mb-1 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-current"></span>
                    {sense?.verdict.toUpperCase() || 'HOLD & MONITOR'}
                  </div>
                  <p className="leading-relaxed">
                    {sense?.reasoning || 'Personalized analysis generated based on your portfolio and risk calibration.'}
                  </p>
                </div>
              </div>

              <div className="mt-md pt-sm border-t border-outline-variant font-label-md text-[11px] text-on-surface-variant italic text-center relative z-10">
                Customizing your capital, holdings, or risk slider immediately adapts the Council's Spider-Sense recommendations.
              </div>

            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default InvestorProfile;
