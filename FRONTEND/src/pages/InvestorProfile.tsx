import React, { useState } from 'react';
import { Layout } from '../components/layout/Layout';

const InvestorProfile: React.FC = () => {
  const [riskLevel, setRiskLevel] = useState<number>(2);

  const getRiskDisplay = () => {
    switch (riskLevel) {
      case 1:
        return { text: 'LOW', className: 'px-3 py-1 rounded bg-[#2d1a1c] border border-error/50 font-label-caps text-label-caps text-error' };
      case 2:
        return { text: 'MODERATE', className: 'px-3 py-1 rounded bg-surface-container border border-outline-variant font-label-caps text-label-caps text-on-surface' };
      case 3:
      default:
        return { text: 'HIGH', className: 'px-3 py-1 rounded bg-[#0a203a] border border-primary/50 font-label-caps text-label-caps text-primary' };
    }
  };

  const riskDisplay = getRiskDisplay();

  return (
    <Layout pageTitle="" customHeader={<></>}>
      <div className="flex flex-col relative w-full spider-bg min-h-[calc(100vh-160px)]">
        {/* Page Content */}
        <div className="grid grid-cols-4 md:grid-cols-12 gap-lg h-full">
          {/* Header Section */}
          <div className="col-span-4 md:col-span-12 mb-lg">
            <h2 className="font-h1-display text-h1-display text-on-surface mb-xs">YOUR SPIDER-SENSE PROFILE</h2>
            <p className="font-body-main text-body-main text-on-surface-variant max-w-2xl">
              "Your risk profile changes how the Council interprets threats." Configure your analytical parameters below to calibrate the network's response algorithms.
            </p>
          </div>

          {/* Left Column: Controls (8 cols on desktop) */}
          <div className="col-span-4 md:col-span-8 flex flex-col gap-lg">
            {/* Risk Tolerance Card */}
            <div className="glass-panel p-lg rounded-xl hover-card">
              <div className="flex items-center justify-between mb-md">
                <h3 className="font-h2-section text-h2-section text-on-surface flex items-center gap-sm">
                  <span className="material-symbols-outlined text-primary">speed</span>
                  Risk Tolerance
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
                  value={riskLevel} 
                  onChange={(e) => setRiskLevel(Number(e.target.value))}
                />
                <div className="flex justify-between mt-sm font-label-md text-label-md text-on-surface-variant">
                  <span>LOW</span>
                  <span>MODERATE</span>
                  <span>HIGH</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-md">
                <div className="bg-surface-container-low p-sm rounded border border-outline-variant">
                  <div className="font-label-caps text-label-caps text-on-surface-variant mb-xs">EQUITY TARGET</div>
                  <div className="font-body-main text-body-main text-on-surface">60%</div>
                </div>
                <div className="bg-surface-container-low p-sm rounded border border-outline-variant">
                  <div className="font-label-caps text-label-caps text-on-surface-variant mb-xs">MAX DRAWDOWN</div>
                  <div className="font-body-main text-body-main text-on-surface">-15%</div>
                </div>
                <div className="bg-surface-container-low p-sm rounded border border-outline-variant">
                  <div className="font-label-caps text-label-caps text-on-surface-variant mb-xs">VOLATILITY CAP</div>
                  <div className="font-body-main text-body-main text-on-surface">12%</div>
                </div>
              </div>
            </div>

            {/* Investment Horizon & Preferences */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
              <div className="glass-panel p-lg rounded-xl hover-card">
                <h3 className="font-h2-section text-h2-section text-on-surface mb-md flex items-center gap-sm">
                  <span className="material-symbols-outlined text-primary">hourglass_empty</span>
                  Time Horizon
                </h3>
                <div className="space-y-sm">
                  <label className="flex items-center gap-md p-sm rounded bg-surface-container-low border border-outline-variant cursor-pointer hover:bg-surface-container">
                    <input className="form-radio text-primary bg-surface border-outline-variant focus:ring-primary focus:ring-offset-surface" name="horizon" type="radio" />
                    <span className="font-body-sm text-body-sm text-on-surface">Tactical (1-3 Years)</span>
                  </label>
                  <label className="flex items-center gap-md p-sm rounded bg-surface-container-low border border-primary cursor-pointer">
                    <input defaultChecked className="form-radio text-primary bg-surface border-outline-variant focus:ring-primary focus:ring-offset-surface" name="horizon" type="radio" />
                    <span className="font-body-sm text-body-sm text-on-surface">Strategic (3-7 Years)</span>
                  </label>
                  <label className="flex items-center gap-md p-sm rounded bg-surface-container-low border border-outline-variant cursor-pointer hover:bg-surface-container">
                    <input className="form-radio text-primary bg-surface border-outline-variant focus:ring-primary focus:ring-offset-surface" name="horizon" type="radio" />
                    <span className="font-body-sm text-body-sm text-on-surface">Legacy (7+ Years)</span>
                  </label>
                </div>
              </div>

              <div className="glass-panel p-lg rounded-xl hover-card">
                <h3 className="font-h2-section text-h2-section text-on-surface mb-md flex items-center gap-sm">
                  <span className="material-symbols-outlined text-primary">psychology</span>
                  Behavioral Bias
                </h3>
                <div className="space-y-md">
                  <div>
                    <div className="flex justify-between font-label-md text-label-md mb-xs">
                      <span className="text-on-surface-variant">Loss Aversion</span>
                      <span className="text-primary">High</span>
                    </div>
                    <div className="w-full bg-surface-container rounded-full h-1.5">
                      <div className="bg-primary h-1.5 rounded-full" style={{ width: '80%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between font-label-md text-label-md mb-xs">
                      <span className="text-on-surface-variant">Action Bias</span>
                      <span className="text-primary">Low</span>
                    </div>
                    <div className="w-full bg-surface-container rounded-full h-1.5">
                      <div className="bg-primary h-1.5 rounded-full" style={{ width: '30%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between font-label-md text-label-md mb-xs">
                      <span className="text-on-surface-variant">Trend Following</span>
                      <span className="text-primary">Neutral</span>
                    </div>
                    <div className="w-full bg-surface-container rounded-full h-1.5">
                      <div className="bg-primary h-1.5 rounded-full" style={{ width: '50%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-sm">
              <button className="bg-primary text-on-primary font-label-caps text-label-caps px-lg py-sm rounded hover:bg-primary-fixed transition-colors">
                UPDATE ALGORITHMS
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Demo (4 cols on desktop) */}
          <div className="col-span-4 md:col-span-4 flex flex-col h-full">
            <div className="glass-panel p-lg rounded-xl flex-1 flex flex-col relative overflow-hidden border-primary/30">
              {/* Subtle background web graphic */}
              <div className="absolute -top-10 -right-10 w-40 h-40 opacity-10 pointer-events-none">
                <svg fill="none" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="50" cy="50" r="40" stroke="#a2c9ff" strokeWidth="2"></circle>
                  <circle cx="50" cy="50" r="25" stroke="#a2c9ff" strokeWidth="2"></circle>
                  <path d="M50 10 L50 90 M10 50 L90 50 M22 22 L78 78 M22 78 L78 22" stroke="#a2c9ff" strokeWidth="2"></path>
                </svg>
              </div>

              <div className="flex items-center gap-sm mb-lg relative z-10">
                <span className="material-symbols-outlined text-[#ffb3b2]">science</span>
                <h3 className="font-h2-section text-h2-section text-on-surface">Simulated Event: Oil Shock</h3>
              </div>

              <div className="bg-surface-container-low p-md rounded border border-outline-variant mb-lg relative z-10">
                <div className="font-label-caps text-label-caps text-on-surface-variant mb-sm">MARKET DATA (STATIC)</div>
                <div className="grid grid-cols-2 gap-sm">
                  <div>
                    <span className="font-label-md text-label-md text-on-surface-variant">Crude Price</span>
                    <div className="font-body-main text-body-main text-error flex items-center">
                      <span className="material-symbols-outlined text-sm">arrow_upward</span> +15.4%
                    </div>
                  </div>
                  <div>
                    <span className="font-label-md text-label-md text-on-surface-variant">Energy ETF</span>
                    <div className="font-body-main text-body-main text-primary flex items-center">
                      <span className="material-symbols-outlined text-sm">arrow_upward</span> +8.2%
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-center relative z-10">
                <div className="font-label-caps text-label-caps text-on-surface-variant mb-sm">CHAIRPERSON'S VERDICT</div>
                
                {/* Dynamic Content based on slider */}
                {riskLevel === 1 && (
                  <div className="flex items-start gap-md bg-[#2d1a1c] border border-error/50 p-md rounded-lg">
                    <div className="w-2 h-2 rounded-full bg-error mt-1.5 flex-shrink-0"></div>
                    <div>
                      <div className="font-label-caps text-label-caps text-error mb-xs">DEFENSIVE POSTURE REQUIRED</div>
                      <p className="font-body-sm text-body-sm text-on-surface">Volatility exceeds low-risk thresholds. Initiate capital preservation protocols immediately. Reduce equity exposure by 12% across broad market indices.</p>
                    </div>
                  </div>
                )}
                
                {riskLevel === 2 && (
                  <div className="flex items-start gap-md bg-surface-container p-md border border-outline-variant rounded-lg">
                    <div className="w-2 h-2 rounded-full bg-on-surface mt-1.5 flex-shrink-0"></div>
                    <div>
                      <div className="font-label-caps text-label-caps text-on-surface mb-xs">HOLD & MONITOR</div>
                      <p className="font-body-sm text-body-sm text-on-surface">Shock within acceptable parameters. Rebalance energy sector allocations back to target weightings. Maintain current cash reserves.</p>
                    </div>
                  </div>
                )}

                {riskLevel === 3 && (
                  <div className="flex items-start gap-md bg-[#0a203a] border border-primary/50 p-md rounded-lg">
                    <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0"></div>
                    <div>
                      <div className="font-label-caps text-label-caps text-primary mb-xs">TACTICAL OPPORTUNITY</div>
                      <p className="font-body-sm text-body-sm text-on-surface">Market dislocation detected. Deploy 25% of available cash reserves into distressed cyclical equities. Accept higher near-term volatility for alpha generation.</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-lg pt-md border-t border-outline-variant font-label-md text-label-md text-on-surface-variant italic text-center relative z-10">
                Adjust Risk Tolerance slider to see Council interpretation change.
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default InvestorProfile;
