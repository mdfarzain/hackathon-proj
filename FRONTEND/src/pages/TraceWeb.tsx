import React, { useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { useCouncil } from '../context/CouncilContext';

interface TraceNode {
  id: number;
  label: string;
  category: 'synthesis' | 'specialist' | 'source' | 'personalization';
  agentKey?: 'technical' | 'fundamental' | 'sentiment' | 'synthesis' | 'personalized_result';
  sourceTitle?: string;
  sourceType?: string;
  snippet?: string;
  x: string;
  y: string;
}

const TraceWeb: React.FC = () => {
  const { activeStock, analysisResult, simulateTimeout } = useCouncil();
  const [selectedNodeId, setSelectedNodeId] = useState<number>(0);

  const eye = analysisResult?.technical;
  const mind = analysisResult?.fundamental;
  const ear = analysisResult?.sentiment;
  const brain = analysisResult?.synthesis;
  const sense = analysisResult?.personalized_result;

  const nodes: TraceNode[] = [
    // 0: Final Chairperson Synthesis
    {
      id: 0,
      label: '🕸️ Spider-Brain Synthesis',
      category: 'synthesis',
      agentKey: 'synthesis',
      sourceType: 'MULTI-AGENT CONSENSUS',
      snippet: brain?.reasoning || 'Aggregating multi-agent specialist signals into consensus verdict.',
      x: '50%',
      y: '14%',
    },
    // 1: Spider-Sense Personalization
    {
      id: 1,
      label: '🕷️ Spider-Sense Risk',
      category: 'personalization',
      agentKey: 'personalized_result',
      sourceType: 'PORTFOLIO CALIBRATION',
      snippet: sense?.reasoning || 'Projecting consensus against portfolio concentration and risk profile.',
      x: '50%',
      y: '34%',
    },
    // 2: Spider-Eye (Technical)
    {
      id: 2,
      label: '👁️ Spider-Eye (Tech)',
      category: 'specialist',
      agentKey: 'technical',
      sourceType: 'TECHNICAL INDICATORS',
      snippet: eye?.reasoning || 'Price momentum and volume indicator evaluation.',
      x: '20%',
      y: '52%',
    },
    // 3: Spider-Mind (Fundamental)
    {
      id: 3,
      label: mind?.verdict === 'abstain' ? '🧠 Spider-Mind (Timeout)' : '🧠 Spider-Mind (Fund)',
      category: 'specialist',
      agentKey: 'fundamental',
      sourceType: 'FINANCIAL FILINGS / RAG',
      snippet: mind?.reasoning || 'Audited financial statements and revenue margin analysis.',
      x: '50%',
      y: '52%',
    },
    // 4: Spider-Ear (Sentiment)
    {
      id: 4,
      label: '👂 Spider-Ear (Sent)',
      category: 'specialist',
      agentKey: 'sentiment',
      sourceType: 'NEWS & MEDIA NLP',
      snippet: ear?.reasoning || 'News headline sentiment extraction and media scoring.',
      x: '80%',
      y: '52%',
    },
    // 5: Source - Tick Data
    {
      id: 5,
      label: 'NSE/BSE Tick Stream',
      category: 'source',
      sourceType: 'REAL-TIME EXCHANGE FEED',
      snippet: `Real-time Level-2 order book quotes and 50/200 DMA trend series for ${activeStock}.`,
      x: '20%',
      y: '80%',
    },
    // 6: Source - SEC / Regulatory
    {
      id: 6,
      label: 'Corporate Filings (RAG)',
      category: 'source',
      sourceType: 'AUDITED REGULATORY DOCUMENTS',
      snippet: `Q3 financial statements, cash flow disclosures, and balance sheet filings for ${activeStock}.`,
      x: '50%',
      y: '80%',
    },
    // 7: Source - News Wires
    {
      id: 7,
      label: 'News Wire Aggregator',
      category: 'source',
      sourceType: 'FINANCIAL MEDIA FEED',
      snippet: `Real-time news headlines from Reuters, Bloomberg, and Economic Times mentioning ${activeStock}.`,
      x: '80%',
      y: '80%',
    },
  ];

  const selectedNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

  const getNodeData = (node: TraceNode) => {
    if (node.agentKey && analysisResult) {
      return analysisResult[node.agentKey];
    }
    return null;
  };

  const currentAgentData = getNodeData(selectedNode);

  return (
    <Layout pageTitle="" customHeader={<></>}>
      <div className="flex flex-col h-full min-h-[calc(100vh-140px)] pb-xl">
        {/* Header Section */}
        <div className="mb-md flex flex-col sm:flex-row sm:items-center justify-between gap-sm border-b border-outline-variant/30 pb-sm">
          <div>
            <div className="flex items-center gap-sm">
              <h1 className="font-h1-display text-h1-display text-on-surface uppercase tracking-wider">
                TRACE THE WEB
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/30 text-primary font-mono text-xs font-bold">
                ${activeStock}
              </span>
            </div>
            <p className="font-body-main text-body-main text-outline mt-xs">
              Explainable AI multi-agent transparency graph: inspect data lineage, confidence, and reasoning chains.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 text-[11px] font-mono text-outline">
              <span className="w-2 h-2 rounded-full bg-primary"></span> Specialist
            </span>
            <span className="flex items-center gap-1 text-[11px] font-mono text-outline ml-2">
              <span className="w-2 h-2 rounded-full bg-[#d10332]"></span> Personalization
            </span>
            <span className="flex items-center gap-1 text-[11px] font-mono text-outline ml-2">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span> Timeout/Abstain
            </span>
          </div>
        </div>

        {/* Explainable AI Layout */}
        <div className="flex-grow flex flex-col lg:flex-row gap-gutter relative h-full">
          
          {/* Network Graph Canvas (Left Canvas) */}
          <div className="flex-grow relative bg-surface/60 border border-outline-variant rounded-xl overflow-hidden glass-panel min-h-[580px] lg:h-[680px] web-pattern">
            
            {/* SVG Canvas for Connecting Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 1000 680" preserveAspectRatio="none">
              {/* Specialist Agents to Spider-Brain */}
              <path className="path-evidence" d="M 200,353 C 300,250 400,180 500,95"></path>
              <path className="path-evidence" d="M 500,353 C 500,250 500,180 500,95"></path>
              <path className="path-evidence" d="M 800,353 C 700,250 600,180 500,95"></path>

              {/* Spider-Brain to Spider-Sense */}
              <path className="path-active" d="M 500,95 L 500,230"></path>

              {/* Sources to Specialist Agents */}
              <path className="path-evidence" d="M 200,544 L 200,353"></path>
              <path className={simulateTimeout ? 'path-risk' : 'path-evidence'} d="M 500,544 L 500,353"></path>
              <path className="path-evidence" d="M 800,544 L 800,353"></path>
            </svg>

            {/* Render Nodes */}
            {nodes.map((node) => {
              const isSelected = selectedNodeId === node.id;
              const agentData = getNodeData(node);
              const isAbstained = agentData?.verdict === 'abstain';

              let nodeClasses = 'node transition-all transform -translate-x-1/2 -translate-y-1/2 cursor-pointer ';
              if (isSelected) {
                nodeClasses += ' ring-2 ring-primary scale-105 bg-[#151D29] shadow-[0_0_15px_rgba(162,201,255,0.4)] z-30';
              } else {
                nodeClasses += ' hover:scale-105 hover:bg-surface-container-high z-20';
              }

              return (
                <div
                  key={node.id}
                  className={nodeClasses}
                  style={{ left: node.x, top: node.y }}
                  onClick={() => setSelectedNodeId(node.id)}
                >
                  <div
                    className={`node-indicator ${
                      isAbstained
                        ? 'bg-amber-400 animate-ping'
                        : node.category === 'personalization'
                        ? 'risk'
                        : node.category === 'synthesis'
                        ? 'evidence animate-pulse'
                        : 'evidence'
                    }`}
                  ></div>
                  <span className="font-label-md text-xs font-bold text-on-surface whitespace-nowrap">
                    {node.label}
                  </span>
                  {agentData && (
                    <span
                      className={`text-[9px] px-1 rounded uppercase font-mono ${
                        isAbstained
                          ? 'bg-amber-900/60 text-amber-300'
                          : agentData.verdict === 'bullish' || agentData.verdict === 'positive' || agentData.verdict === 'opportunity'
                          ? 'bg-emerald-950/80 text-emerald-300'
                          : agentData.verdict === 'bearish' || agentData.verdict === 'negative' || agentData.verdict === 'high_risk'
                          ? 'bg-red-950/80 text-red-300'
                          : 'bg-surface-variant text-on-surface'
                      }`}
                    >
                      {agentData.verdict}
                    </span>
                  )}
                </div>
              );
            })}

            {/* Bottom floating map indicator */}
            <div className="absolute bottom-4 left-4 p-2.5 border border-outline-variant bg-surface-dim/90 rounded-lg backdrop-blur">
              <div className="font-label-caps text-[10px] text-outline">EXPLAINABLE MULTI-AGENT TOPOLOGY</div>
              <div className="text-[11px] text-on-surface font-mono mt-0.5">
                3 Specialists ➔ 1 Synthesis ➔ 1 Personalization
              </div>
            </div>
          </div>

          {/* Side Panel Inspector (Right) */}
          <aside className="w-full lg:w-96 flex-shrink-0 flex flex-col gap-md">
            <div className="bg-surface-dim border border-outline-variant rounded-xl flex flex-col h-full overflow-hidden glass-panel">
              
              {/* Panel Header */}
              <div className="p-md border-b border-outline-variant relative bg-surface-container-low">
                <div className="flex items-center gap-sm mb-xs">
                  <span className="material-symbols-outlined text-primary text-base">
                    {selectedNode.category === 'source' ? 'database' : 'smart_toy'}
                  </span>
                  <span className="font-label-caps text-label-caps text-primary uppercase">
                    NODE INSPECTOR : {selectedNode.category}
                  </span>
                </div>
                <h2 className="font-h2-section text-base font-bold text-on-surface">
                  {selectedNode.label}
                </h2>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  <span className="px-2 py-0.5 bg-surface-variant border border-outline-variant rounded font-label-caps text-[10px] text-on-surface-variant">
                    TYPE: {selectedNode.sourceType}
                  </span>
                  {currentAgentData && (
                    <span className="px-2 py-0.5 bg-surface-variant border border-outline-variant rounded font-label-caps text-[10px] text-primary">
                      LATENCY: {currentAgentData.latency_ms}ms
                    </span>
                  )}
                </div>
              </div>

              {/* Panel Content */}
              <div className="p-md flex-grow overflow-y-auto flex flex-col gap-md">
                
                {/* Confidence Metric if Agent */}
                {currentAgentData && (
                  <div className="flex items-center justify-between p-sm bg-surface-container border border-outline-variant rounded-lg">
                    <span className="font-label-md text-xs text-on-surface-variant">Confidence Metric</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-bold text-primary">
                        {Math.round(currentAgentData.confidence * 100)}%
                      </span>
                      <div className="w-5 h-5 rounded-full border-2 border-surface-variant border-t-primary transform rotate-45"></div>
                    </div>
                  </div>
                )}

                {/* Extracted Snippet / Evidence */}
                <div>
                  <h3 className="font-label-caps text-xs text-on-surface mb-xs border-b border-outline-variant/40 pb-xs font-bold">
                    EXTRACTED REASONING & EVIDENCE
                  </h3>
                  <div className="bg-[#05070A] border border-[#242E3A] p-sm rounded-lg font-body-sm text-xs text-on-surface-variant leading-relaxed relative">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-l-lg"></div>
                    {currentAgentData?.reasoning || selectedNode.snippet}
                  </div>
                </div>

                {/* Sources list if available */}
                {currentAgentData?.sources && currentAgentData.sources.length > 0 && (
                  <div>
                    <h3 className="font-label-caps text-xs text-on-surface mb-xs border-b border-outline-variant/40 pb-xs font-bold">
                      GROUNDED CITATIONS / SOURCES
                    </h3>
                    <div className="space-y-1">
                      {currentAgentData.sources.map((src, i) => (
                        <div key={i} className="flex items-center gap-2 p-1.5 rounded bg-surface-container border border-outline-variant/30 text-[11px] font-mono text-outline">
                          <span className="material-symbols-outlined text-xs text-primary">link</span>
                          <span>{src}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Reasoning Chain */}
                <div>
                  <h3 className="font-label-caps text-xs text-on-surface mb-xs border-b border-outline-variant/40 pb-xs font-bold">
                    EXECUTION LINEAGE
                  </h3>
                  <div className="flex flex-col gap-2 relative before:absolute before:left-2 before:top-3 before:bottom-3 before:w-[1px] before:bg-outline-variant">
                    <div className="flex gap-sm items-start relative z-10">
                      <div className="w-4 h-4 rounded-full bg-surface-variant border border-outline-variant flex items-center justify-center mt-0.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                      </div>
                      <div>
                        <p className="font-label-md text-xs text-on-surface">Data Ingestion: ${activeStock}</p>
                        <p className="text-[11px] text-outline">Async parallel query triggered.</p>
                      </div>
                    </div>

                    <div className="flex gap-sm items-start relative z-10">
                      <div className="w-4 h-4 rounded-full bg-surface-variant border border-outline-variant flex items-center justify-center mt-0.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                      </div>
                      <div>
                        <p className="font-label-md text-xs text-on-surface">Agent Inference & Scoring</p>
                        <p className="text-[11px] text-outline">Verdict computed with grounded source citations.</p>
                      </div>
                    </div>

                    <div className="flex gap-sm items-start relative z-10">
                      <div className="w-4 h-4 rounded-full bg-surface-variant border border-outline-variant flex items-center justify-center mt-0.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                      </div>
                      <div>
                        <p className="font-label-md text-xs text-on-surface">Synthesis Integration</p>
                        <p className="text-[11px] text-outline">Transmitted to Spider-Brain Chairperson.</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Action Button */}
              <div className="p-md border-t border-outline-variant bg-surface-container-lowest">
                <button
                  onClick={() => setSelectedNodeId((selectedNodeId + 1) % nodes.length)}
                  className="w-full py-2 bg-transparent border border-[#242E3A] text-on-surface font-label-md text-xs rounded hover:bg-surface-container-high hover:border-primary/50 transition-all flex items-center justify-center gap-1"
                >
                  <span>INSPECT NEXT NODE</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
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
