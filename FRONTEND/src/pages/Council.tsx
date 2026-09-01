import React from 'react';
import { Layout } from '../components/layout/Layout';

const Council: React.FC = () => {
  return (
    <Layout pageTitle="" customHeader={<></>}>
      <div className="flex-1 relative min-h-[600px] flex items-center justify-center mb-lg pt-10 md:pt-0">
        
        {/* Header Area in layout context */}
        <div className="absolute top-0 left-0 md:text-left text-center w-full md:w-auto z-20 hidden md:block">
          <h1 className="font-h1-display text-h1-display text-on-background mb-xs tracking-tight uppercase">THE SPIDER COUNCIL</h1>
          <p className="font-body-main text-body-main text-on-surface-variant">Four specialists. One Chairperson. One informed verdict.</p>
        </div>

        {/* Event Status Bar */}
        <div className="absolute top-0 right-0 glass-panel rounded-xl p-md flex flex-col md:flex-row md:items-center justify-between border-[#B11313]/30 z-20 gap-md w-full md:w-auto mt-20 md:mt-0">
          <div className="flex items-center gap-sm">
            <span className="w-3 h-3 rounded-full bg-[#B11313] animate-pulse"></span>
            <span className="font-label-caps text-label-caps text-[#B11313] tracking-widest">ACTIVE EVENT ANALYSIS</span>
          </div>
          <h2 className="font-h2-section text-h2-section text-[#B11313] m-0">OIL PRICE SHOCK</h2>
          <div className="text-right hidden sm:block">
            <div className="font-label-caps text-label-caps text-on-surface-variant">TIME ELAPSED</div>
            <div className="font-body-main text-body-main text-on-background font-mono">02:14:45</div>
          </div>
        </div>

        {/* Connection Lines (SVG) */}
        <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none mt-20 md:mt-0" preserveAspectRatio="none">
          <line className="opacity-70" stroke="#242E3A" strokeWidth="1.5" x1="50%" x2="25%" y1="50%" y2="25%"></line>
          <line className="opacity-70" stroke="#242E3A" strokeWidth="1.5" x1="50%" x2="75%" y1="50%" y2="25%"></line>
          <line className="opacity-70" stroke="#242E3A" strokeWidth="1.5" x1="50%" x2="25%" y1="50%" y2="75%"></line>
          <line className="opacity-70" stroke="#242E3A" strokeWidth="1.5" x1="50%" x2="75%" y1="50%" y2="75%"></line>
          
          {/* Animated data flow dots */}
          <circle className="opacity-0" cx="25%" cy="25%" fill="#B11313" r="3">
            <animate attributeName="opacity" begin="0s" dur="2s" repeatCount="indefinite" values="0;1;0"></animate>
            <animateMotion begin="0s" dur="2s" path="M 25% 25% L 50% 50%" repeatCount="indefinite"></animateMotion>
          </circle>
        </svg>

        {/* Agent 01: Event */}
        <div className="absolute top-40 left-0 md:top-20 md:left-10 xl:left-20 w-64 glass-panel rounded-xl p-md z-10 transition-colors hover:bg-surface-container-low hover:border-[#B11313]/50 group cursor-default hidden md:block">
          <div className="flex justify-between items-start mb-sm">
            <div className="font-label-caps text-label-caps text-on-surface-variant">AGENT 01</div>
            <span className="material-symbols-outlined text-outline text-sm" style={{ fontVariationSettings: "'FILL' 0" }}>public</span>
          </div>
          <div className="font-h2-section text-h2-section text-on-background mb-sm">Event</div>
          <div className="border-t border-outline-variant/30 pt-sm mt-sm">
            <div className="flex justify-between items-center mb-xs">
              <span className="font-label-md text-label-md text-on-surface-variant">Verdict</span>
              <span className="font-label-caps text-label-caps text-[#B11313] bg-[#B11313]/10 px-xs py-1 rounded">HIGH IMPACT</span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-snug">"Oil prices moved beyond normal volatility parameters (+14% 24hr)."</p>
          </div>
        </div>

        {/* Agent 02: Portfolio */}
        <div className="absolute top-40 right-0 md:top-20 md:right-10 xl:right-20 w-64 glass-panel rounded-xl p-md z-10 transition-colors hover:bg-surface-container-low hover:border-[#B11313]/50 hidden md:block">
          <div className="flex justify-between items-start mb-sm">
            <div className="font-label-caps text-label-caps text-on-surface-variant">AGENT 02</div>
            <span className="material-symbols-outlined text-outline text-sm" style={{ fontVariationSettings: "'FILL' 0" }}>pie_chart</span>
          </div>
          <div className="font-h2-section text-h2-section text-on-background mb-sm">Portfolio</div>
          <div className="border-t border-outline-variant/30 pt-sm mt-sm">
            <div className="flex justify-between items-center mb-xs">
              <span className="font-label-md text-label-md text-on-surface-variant">Verdict</span>
              <span className="font-label-caps text-label-caps text-[#B11313] bg-[#B11313]/10 px-xs py-1 rounded">HIGH EXPOSURE</span>
            </div>
            <div className="flex items-center gap-sm mt-sm">
              <div className="flex-1 h-2 bg-surface-container-highest rounded-full overflow-hidden">
                <div className="h-full bg-[#B11313] w-[72%]"></div>
              </div>
              <span className="font-body-sm text-body-sm text-on-background">72%</span>
            </div>
          </div>
        </div>

        {/* Central Chairperson */}
        <div className="relative z-20 w-80 glass-panel rounded-xl p-lg border-[#B11313]/50 shadow-[0_0_30px_rgba(177,19,19,0.15)] bg-surface-container-low/90 backdrop-blur-xl mt-32 md:mt-0">
          <div className="absolute top-0 right-0 w-16 h-16 rounded-tr-xl opacity-50" style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(36, 46, 58, 0.1) 10px, rgba(36, 46, 58, 0.1) 11px)" }}></div>
          <div className="text-center mb-md border-b border-outline-variant/50 pb-sm">
            <div className="w-12 h-12 rounded-full border-2 border-[#B11313] mx-auto mb-sm flex items-center justify-center bg-surface">
              <span className="material-symbols-outlined text-[#B11313]" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
            </div>
            <div className="font-label-caps text-label-caps text-[#B11313] tracking-widest mb-xs">CHAIRPERSON</div>
            <div className="font-body-sm text-body-sm text-on-surface-variant uppercase">"Four agents have reported"</div>
          </div>
          
          <div className="text-center mb-md">
            <div className="font-label-md text-label-md text-on-surface-variant mb-xs">FINAL VERDICT</div>
            <div className="font-h1-display text-h1-display text-[#B11313]">HIGH RISK</div>
            <div className="font-body-sm text-body-sm text-on-background opacity-80 mt-xs">88% Confidence</div>
          </div>
          
          <div className="bg-surface-container-highest/50 rounded-lg p-sm mb-md flex justify-between items-center">
            <span className="font-label-md text-label-md text-on-background">AGENT AGREEMENT</span>
            <span className="font-body-main text-body-main text-[#B11313] font-mono">3 / 4</span>
          </div>
          
          <button className="w-full bg-[#B11313] text-on-primary font-label-caps text-label-caps py-sm px-md rounded hover:bg-[#ff8989] transition-colors">
            [WHY THIS VERDICT?]
          </button>
        </div>

        {/* Agent 03: MPT */}
        <div className="absolute bottom-0 left-0 md:bottom-20 md:left-10 xl:left-20 w-64 glass-panel rounded-xl p-md z-10 transition-colors hover:bg-surface-container-low hover:border-[#B11313]/50 hidden md:block">
          <div className="flex justify-between items-start mb-sm">
            <div className="font-label-caps text-label-caps text-on-surface-variant">AGENT 03</div>
            <span className="material-symbols-outlined text-outline text-sm" style={{ fontVariationSettings: "'FILL' 0" }}>query_stats</span>
          </div>
          <div className="font-h2-section text-h2-section text-on-background mb-sm">MPT</div>
          <div className="border-t border-outline-variant/30 pt-sm mt-sm">
            <div className="flex justify-between items-center mb-xs">
              <span className="font-label-md text-label-md text-on-surface-variant">Impact</span>
              <span className="font-label-caps text-label-caps text-[#B11313] bg-[#B11313]/10 px-xs py-1 rounded">HIGH</span>
            </div>
            <div className="mt-sm">
              <div className="font-label-caps text-label-caps text-on-surface-variant mb-xs">VOLATILITY SHIFT</div>
              <div className="flex items-center gap-sm">
                <span className="font-body-main text-body-main text-on-background font-mono">12.4%</span>
                <span className="material-symbols-outlined text-outline text-sm">arrow_forward</span>
                <span className="font-body-main text-body-main text-[#B11313] font-mono">15.8%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Agent 04: Risk */}
        <div className="absolute bottom-0 right-0 md:bottom-20 md:right-10 xl:right-20 w-64 glass-panel rounded-xl p-md z-10 transition-colors hover:bg-surface-container-low hover:border-[#B11313]/50 hidden md:block">
          <div className="flex justify-between items-start mb-sm">
            <div className="font-label-caps text-label-caps text-on-surface-variant">AGENT 04</div>
            <span className="material-symbols-outlined text-outline text-sm" style={{ fontVariationSettings: "'FILL' 0" }}>warning</span>
          </div>
          <div className="font-h2-section text-h2-section text-on-background mb-sm">Risk</div>
          <div className="border-t border-outline-variant/30 pt-sm mt-sm">
            <div className="flex justify-between items-center mb-xs">
              <span className="font-label-md text-label-md text-on-surface-variant">Verdict</span>
              <span className="font-label-caps text-label-caps text-tertiary bg-tertiary/10 px-xs py-1 rounded">MODERATE-HIGH</span>
            </div>
            <div className="mt-sm">
              <div className="font-label-caps text-label-caps text-on-surface-variant mb-xs">KEY EVIDENCE</div>
              <div className="font-body-sm text-body-sm text-on-background border border-outline-variant/50 rounded px-sm py-xs bg-surface-container-lowest font-mono">
                Q2 FINANCIAL FILING
              </div>
            </div>
          </div>
        </div>

      </div>
    </Layout>
  );
};

export default Council;
