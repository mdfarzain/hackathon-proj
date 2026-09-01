import React from 'react';
import { Layout } from '../components/layout/Layout';

const WebBalance: React.FC = () => {
  return (
    <Layout pageTitle="" customHeader={<></>}>
      <div className="flex flex-col gap-lg">
        {/* Header Section */}
        <section className="flex flex-col gap-xs mb-md">
          <h2 className="font-h1-display text-h1-display font-bold text-on-surface uppercase tracking-tight">WEB BALANCE</h2>
          <p className="font-body-main text-body-main text-outline italic">"Is your portfolio actually diversified?"</p>
        </section>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-4 md:grid-cols-12 gap-lg">
          {/* Interactive Portfolio Network */}
          <div className="col-span-4 md:col-span-8 bg-surface-container-low rounded-xl card-inner-border p-lg flex flex-col relative overflow-hidden h-[400px]">
            <div className="absolute top-0 right-0 w-32 h-32 opacity-50 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(15deg, transparent, transparent 40px, rgba(36, 46, 58, 0.2) 40px, rgba(36, 46, 58, 0.2) 41px)' }}></div>
            <div className="flex justify-between items-start mb-md relative z-10">
              <h3 className="font-h2-section text-h2-section text-on-surface">Concentration Node Map</h3>
              <div className="flex gap-sm">
                <span className="flex items-center gap-xs font-label-caps text-label-caps text-secondary uppercase"><span className="w-2 h-2 rounded-full bg-secondary"></span> Risk</span>
                <span className="flex items-center gap-xs font-label-caps text-label-caps text-primary uppercase"><span className="w-2 h-2 rounded-full bg-primary"></span> Stable</span>
              </div>
            </div>

            {/* Placeholder for Network Viz */}
            <div className="flex-1 relative border border-outline-variant/30 rounded flex items-center justify-center bg-surface-dim">
              <p className="font-label-caps text-label-caps text-outline absolute top-sm left-sm">IT Sector Overload Detected</p>
              {/* Simulating nodes */}
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="absolute w-24 h-24 rounded-full border border-secondary/50 flex items-center justify-center animate-pulse shadow-[0_0_15px_rgba(209,3,50,0.2)]">
                  <span className="font-label-caps text-label-caps text-secondary">Tech</span>
                </div>
                <div className="absolute top-1/4 left-1/4 w-12 h-12 rounded-full bg-surface-variant border border-outline flex items-center justify-center"><span className="font-label-caps text-label-caps text-[8px]">TCS</span></div>
                <div className="absolute bottom-1/4 left-1/3 w-10 h-10 rounded-full bg-surface-variant border border-outline flex items-center justify-center"><span className="font-label-caps text-label-caps text-[8px]">INFY</span></div>
                <div className="absolute top-1/3 right-1/4 w-14 h-14 rounded-full bg-surface-variant border border-outline flex items-center justify-center"><span className="font-label-caps text-label-caps text-[8px]">WIPRO</span></div>
                {/* Connection Lines SVG */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                  <line stroke="#242E3A" strokeWidth="1.5" x1="25%" x2="50%" y1="25%" y2="50%"></line>
                  <line stroke="#242E3A" strokeWidth="1.5" x1="33%" x2="50%" y1="75%" y2="50%"></line>
                  <line stroke="#242E3A" strokeWidth="1.5" x1="75%" x2="50%" y1="33%" y2="50%"></line>
                </svg>
              </div>
            </div>
          </div>

          {/* What-If Analysis */}
          <div className="col-span-4 md:col-span-4 bg-surface-container-low rounded-xl card-inner-border p-lg flex flex-col relative">
            <h3 className="font-h2-section text-h2-section text-on-surface mb-md">Simulation Sandbox</h3>
            <div className="flex-1 flex flex-col gap-md">
              <div className="flex flex-col gap-xs">
                <label className="font-label-md text-label-md text-outline">Adjust Holding: RELIANCE</label>
                <input className="w-full accent-primary bg-surface-dim h-1 rounded appearance-none cursor-pointer" max="100" min="0" type="range" defaultValue="30" />
                <div className="flex justify-between font-label-caps text-label-caps text-on-surface-variant">
                  <span>0%</span>
                  <span className="text-primary font-bold">30% → 40%</span>
                  <span>100%</span>
                </div>
              </div>
              
              <div className="mt-auto bg-surface-dim p-md rounded border border-outline-variant flex flex-col gap-sm">
                <div className="flex justify-between items-center">
                  <span className="font-label-md text-label-md text-outline">Projected Volatility</span>
                  <span className="font-body-main text-body-main text-error font-bold">15.8% <span className="text-xs font-normal text-outline line-through ml-xs">12.4%</span></span>
                </div>
                <div className="h-px w-full bg-outline-variant/50"></div>
                <p className="font-body-sm text-body-sm text-on-surface-variant italic border-l-2 border-secondary pl-sm">Insight: "Your financial web becomes significantly less balanced. Systemic risk increased."</p>
              </div>
            </div>
          </div>

          {/* MPT Analysis Cards */}
          <div className="col-span-4 md:col-span-12 grid grid-cols-2 md:grid-cols-5 gap-md">
            <div className="bg-surface-container-low rounded-lg card-inner-border p-md flex flex-col items-start gap-xs hover:-translate-y-1 transition-transform border border-transparent hover:border-[#a2c9ff]/20">
              <span className="font-label-caps text-label-caps text-outline uppercase">Expected Return</span>
              <span className="font-h1-display text-h1-display text-primary">14.2%</span>
            </div>
            <div className="bg-surface-container-low rounded-lg card-inner-border p-md flex flex-col items-start gap-xs hover:-translate-y-1 transition-transform border border-transparent hover:border-[#a2c9ff]/20">
              <span className="font-label-caps text-label-caps text-outline uppercase">Volatility</span>
              <span className="font-h1-display text-h1-display text-secondary">12.4%</span>
            </div>
            <div className="bg-surface-container-low rounded-lg card-inner-border p-md flex flex-col items-start gap-xs hover:-translate-y-1 transition-transform border border-transparent hover:border-[#a2c9ff]/20">
              <span className="font-label-caps text-label-caps text-outline uppercase">Correlation</span>
              <span className="font-h1-display text-h1-display text-on-surface">0.82</span>
            </div>
            <div className="bg-surface-container-low rounded-lg card-inner-border p-md flex flex-col items-start gap-xs hover:-translate-y-1 transition-transform border border-transparent hover:border-[#a2c9ff]/20">
              <span className="font-label-caps text-label-caps text-outline uppercase">Diversification</span>
              <span className="font-h1-display text-h1-display text-primary">Low</span>
            </div>
            <div className="col-span-2 md:col-span-1 bg-surface-container-low rounded-lg card-inner-border p-md flex flex-col items-start gap-xs hover:-translate-y-1 transition-transform border border-transparent hover:border-[#a2c9ff]/20">
              <span className="font-label-caps text-label-caps text-outline uppercase">Risk Contrib</span>
              <span className="font-h1-display text-h1-display text-secondary">High</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default WebBalance;
