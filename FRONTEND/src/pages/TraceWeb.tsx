import React, { useState } from 'react';
import { Layout } from '../components/layout/Layout';

const TraceWeb: React.FC = () => {
  const [activeNode, setActiveNode] = useState<number | null>(4); // Node index 4 is active by default

  const handleNodeClick = (index: number) => {
    setActiveNode(index);
  };

  const getNodeClass = (index: number, baseClass: string) => {
    return `${baseClass} ${activeNode === index ? 'active' : ''}`;
  };

  return (
    <Layout pageTitle="" customHeader={<></>}>
      <div className="flex flex-col h-full min-h-[calc(100vh-160px)]">
        {/* Header Section */}
        <div className="mb-lg">
          <h1 className="font-h1-display text-h1-display text-on-surface uppercase tracking-wider">TRACE THE WEB</h1>
          <p className="font-body-main text-body-main text-outline mt-xs">Follow every connection behind the verdict.</p>
        </div>

        {/* Explainable AI Layout */}
        <div className="flex-grow flex flex-col md:flex-row gap-gutter relative h-full">
          {/* Network Graph Canvas (Left - 8 Cols approx) */}
          <div className="flex-grow relative bg-surface/50 border border-outline-variant rounded-xl overflow-hidden glass-panel h-[700px] web-pattern">
            {/* SVG Canvas for Connecting Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 1000 700">
              {/* Final to Chairperson */}
              <path className="path-active" d="M 500,350 C 500,250 500,150 500,100"></path>
              {/* Agents to Chairperson */}
              <path className="path-evidence" d="M 500,100 C 400,150 300,150 200,200"></path>
              <path className="path-evidence" d="M 500,100 C 450,150 400,150 350,200"></path>
              <path className="path-evidence" d="M 500,100 C 550,150 600,150 650,200"></path>
              <path className="path-risk" d="M 500,100 C 600,150 700,150 800,200"></path>
              {/* Data to Agents */}
              <path className="path-evidence" d="M 200,200 C 150,300 150,400 200,500"></path>
              <path className="path-evidence" d="M 350,200 C 350,300 300,400 350,500"></path>
              <path className="path-evidence" d="M 650,200 C 650,300 600,400 500,500"></path>
              {/* The active path to selected node */}
              <path className="path-risk" d="M 800,200 C 800,300 700,400 650,500"></path>
              <path className="path-risk path-active" d="M 800,200 C 900,300 850,400 800,500"></path>
            </svg>

            {/* Nodes */}
            {/* Final Verdict (Center) */}
            <div className={getNodeClass(0, 'node node-final')} style={{ left: '50%', top: '50%' }} onClick={() => handleNodeClick(0)}>
              <div className="node-indicator evidence animate-pulse"></div>
              <span className="font-label-caps text-label-caps text-primary tracking-widest">FINAL VERDICT</span>
            </div>

            {/* Chairperson (Top Center) */}
            <div className={getNodeClass(1, 'node')} style={{ left: '50%', top: '15%' }} onClick={() => handleNodeClick(1)}>
              <div className="node-indicator neutral"></div>
              <span className="font-label-md text-label-md text-on-surface">Chairperson Synthesis</span>
            </div>

            {/* Agents (Middle Row) */}
            <div className={getNodeClass(2, 'node')} style={{ left: '20%', top: '30%' }} onClick={() => handleNodeClick(2)}>
              <div className="node-indicator evidence"></div>
              <span className="font-label-md text-label-md text-on-surface">Agent: Macro</span>
            </div>
            <div className={getNodeClass(3, 'node')} style={{ left: '35%', top: '30%' }} onClick={() => handleNodeClick(3)}>
              <div className="node-indicator evidence"></div>
              <span className="font-label-md text-label-md text-on-surface">Agent: Sector</span>
            </div>
            <div className={getNodeClass(4, 'node')} style={{ left: '65%', top: '30%' }} onClick={() => handleNodeClick(4)}>
              <div className="node-indicator evidence"></div>
              <span className="font-label-md text-label-md text-on-surface">Agent: Quant</span>
            </div>
            <div className={getNodeClass(5, 'node')} style={{ left: '80%', top: '30%' }} onClick={() => handleNodeClick(5)}>
              <div className="node-indicator risk"></div>
              <span className="font-label-md text-label-md text-on-surface">Agent: Risk</span>
            </div>

            {/* Data Sources (Bottom Row) */}
            <div className={getNodeClass(6, 'node')} style={{ left: '20%', top: '75%' }} onClick={() => handleNodeClick(6)}>
              <div className="node-indicator evidence"></div>
              <span className="font-label-md text-label-md text-on-surface-variant">Market Events</span>
            </div>
            <div className={getNodeClass(7, 'node')} style={{ left: '35%', top: '75%' }} onClick={() => handleNodeClick(7)}>
              <div className="node-indicator evidence"></div>
              <span className="font-label-md text-label-md text-on-surface-variant">Sector Analysis</span>
            </div>
            <div className={getNodeClass(8, 'node')} style={{ left: '50%', top: '75%' }} onClick={() => handleNodeClick(8)}>
              <div className="node-indicator evidence"></div>
              <span className="font-label-md text-label-md text-on-surface-variant">Holdings Data</span>
            </div>
            <div className={getNodeClass(9, 'node')} style={{ left: '65%', top: '75%' }} onClick={() => handleNodeClick(9)}>
              <div className="node-indicator risk"></div>
              <span className="font-label-md text-label-md text-on-surface-variant">MPT Calcs</span>
            </div>
            <div className={getNodeClass(10, 'node')} style={{ left: '80%', top: '75%' }} onClick={() => handleNodeClick(10)}>
              <div className="node-indicator risk"></div>
              <span className={`font-label-md text-label-md ${activeNode === 10 ? 'text-primary' : 'text-on-surface-variant'}`}>Q2 Financial Filing</span>
            </div>

            {/* Map UI Element floating corner */}
            <div className="absolute bottom-4 left-4 w-48 h-32 border border-outline-variant bg-surface-dim rounded-lg overflow-hidden">
              <div className="bg-cover bg-center w-full h-full opacity-60 mix-blend-screen" style={{ backgroundImage: "url('https://www.gstatic.com/labs-code/stitch/stitch-placeholder-300x300.svg')" }}></div>
              <div className="absolute top-2 left-2 font-label-caps text-[10px] text-on-surface-variant">NODE ORIGIN</div>
            </div>
          </div>

          {/* Side Panel (Right - 4 Cols approx) */}
          <aside className="w-full md:w-96 flex-shrink-0 flex flex-col gap-md h-[700px]">
            {/* Node Details Card */}
            <div className="bg-surface-dim border border-outline-variant rounded-xl flex flex-col h-full overflow-hidden">
              {/* Panel Header */}
              <div className="p-md border-b border-outline-variant relative bg-surface-container-low">
                <div className="absolute top-0 right-0 w-16 h-16 opacity-30" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(36, 46, 58, 0.5) 4px, rgba(36, 46, 58, 0.5) 5px)' }}></div>
                <div className="flex items-center gap-sm mb-xs relative z-10">
                  <span className="material-symbols-outlined text-[#d10332]" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
                  <span className="font-label-caps text-label-caps text-[#d10332]">RISK VECTOR IDENTIFIED</span>
                </div>
                <h2 className="font-h2-section text-h2-section text-on-surface relative z-10">Q2 Financial Filing</h2>
                <div className="flex gap-2 mt-sm relative z-10">
                  <span className="px-2 py-1 bg-surface-variant border border-outline-variant rounded font-label-caps text-[10px] text-on-surface-variant">SOURCE: SEC EDGAR</span>
                  <span className="px-2 py-1 bg-surface-variant border border-outline-variant rounded font-label-caps text-[10px] text-on-surface-variant">WEIGHT: HIGH</span>
                </div>
              </div>

              {/* Panel Content */}
              <div className="p-md flex-grow overflow-y-auto flex flex-col gap-lg">
                {/* Metric */}
                <div className="flex items-center justify-between p-sm bg-surface-container border border-outline-variant rounded-lg">
                  <span className="font-label-md text-label-md text-on-surface-variant">AI Confidence</span>
                  <div className="flex items-center gap-2">
                    <span className="font-body-main text-body-main font-bold text-primary">84%</span>
                    {/* Small radial mock */}
                    <div className="w-6 h-6 rounded-full border-2 border-surface-variant border-t-primary transform rotate-45"></div>
                  </div>
                </div>

                {/* Snippet */}
                <div>
                  <h3 className="font-label-caps text-label-caps text-on-surface mb-sm border-b border-outline-variant pb-xs">EXTRACTED SNIPPET</h3>
                  <div className="bg-[#05070A] border border-[#242E3A] p-sm rounded-lg font-body-sm text-body-sm text-on-surface-variant relative">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#d10332] rounded-l-lg"></div>
                    "...company anticipates a material adverse effect on operating margins due to prolonged supply chain disruptions in the APAC region, specifically impacting the semiconductor procurement cycle by an estimated 14-18 weeks..."
                  </div>
                </div>

                {/* Reasoning Chain */}
                <div>
                  <h3 className="font-label-caps text-label-caps text-on-surface mb-sm border-b border-outline-variant pb-xs">REASONING CHAIN</h3>
                  <div className="flex flex-col gap-2 relative before:absolute before:left-2.5 before:top-4 before:bottom-4 before:w-[1px] before:bg-outline-variant">
                    <div className="flex gap-sm items-start relative z-10">
                      <div className="w-5 h-5 rounded-full bg-surface-variant border border-outline-variant flex items-center justify-center mt-0.5 z-20">
                        <div className="w-2 h-2 rounded-full bg-[#d10332]"></div>
                      </div>
                      <div>
                        <p className="font-label-md text-label-md text-on-surface">Keyword Match: "Material adverse effect"</p>
                      </div>
                    </div>
                    <div className="flex gap-sm items-start relative z-10">
                      <div className="w-5 h-5 rounded-full bg-surface-variant border border-outline-variant flex items-center justify-center mt-0.5 z-20">
                        <div className="w-2 h-2 rounded-full bg-[#d10332]"></div>
                      </div>
                      <div>
                        <p className="font-label-md text-label-md text-on-surface">Cross-reference: Tech Sector</p>
                        <p className="font-body-sm text-[12px] text-outline mt-1">Agent Sector corroborates 14wk avg delay.</p>
                      </div>
                    </div>
                    <div className="flex gap-sm items-start relative z-10">
                      <div className="w-5 h-5 rounded-full bg-surface-variant border border-outline-variant flex items-center justify-center mt-0.5 z-20">
                        <div className="w-2 h-2 rounded-full bg-[#d10332]"></div>
                      </div>
                      <div>
                        <p className="font-label-md text-label-md text-on-surface">Impact Calc: MPT Adjustment</p>
                        <p className="font-body-sm text-[12px] text-outline mt-1">Volatility beta increased by 0.15.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="p-md border-t border-outline-variant bg-surface-container-lowest">
                <button className="w-full py-sm bg-transparent border border-[#242E3A] text-on-surface font-label-md text-label-md rounded hover:bg-surface-container-high hover:border-primary/50 transition-all">
                  VIEW FULL DOCUMENT
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </Layout>
  );
};

export default TraceWeb;
