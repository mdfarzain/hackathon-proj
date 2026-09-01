import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background text-on-background flex flex-col items-center justify-center relative overflow-hidden font-body-main text-body-main web-pattern">
      {/* Ambient Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-[#05070A]/50 to-[#05070A] z-0"></div>
      
      {/* Main Content Canvas (No Nav Shell per Transactional Rule) */}
      <main className="relative z-10 w-full max-w-md px-gutter md:px-0">
        {/* Logo Area */}
        <div className="text-center mb-xl">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full glass-panel mb-lg relative">
            {/* Abstract Web Node Icon */}
            <span className="material-symbols-outlined text-[#a2c9ff] text-3xl z-10" style={{ fontVariationSettings: "'FILL' 1" }}>
              hub
            </span>
            {/* Decorative concentric rings */}
            <div className="absolute inset-0 border border-[#a2c9ff]/20 rounded-full animate-ping opacity-20"></div>
            <div className="absolute -inset-2 border border-outline-variant/30 rounded-full"></div>
          </div>
          <h1 className="font-h1-display text-h1-display text-on-background tracking-tight mb-sm">
            FINANCE COUNCIL
          </h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant max-w-[280px] mx-auto leading-relaxed">
            Your Financial Spider-Sense.<br />
            <span className="text-[#a2c9ff]/80">Five perspectives. One informed decision.</span>
          </p>
        </div>
        
        {/* Login Form Panel */}
        <div className="glass-panel rounded-xl p-lg relative overflow-hidden">
          {/* Diagonal corner detail */}
          <div className="absolute top-0 right-0 w-16 h-16 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTAgNDBMNDAgMCIgc3Ryb2tlPSIjMjQyRTNBIiBzdHJva2Utd2lkdGg9IjEiLz48L3N2Zz4=')] opacity-50 pointer-events-none"></div>
          <form className="space-y-lg relative z-10" onSubmit={handleLogin}>
            <div className="space-y-xs">
              <label className="font-label-caps text-label-caps text-on-surface-variant uppercase" htmlFor="email">Network Identity</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline text-[18px]">
                  fingerprint
                </span>
                <input className="w-full input-field rounded-DEFAULT py-sm pl-10 pr-sm font-body-sm text-on-background placeholder:text-outline-variant" id="email" placeholder="Enter secure node address" required type="email" />
              </div>
            </div>
            
            <div className="space-y-xs">
              <label className="font-label-caps text-label-caps text-on-surface-variant uppercase" htmlFor="password">Passcode</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline text-[18px]">
                  lock
                </span>
                <input className="w-full input-field rounded-DEFAULT py-sm pl-10 pr-10 font-body-sm text-on-background placeholder:text-outline-variant" id="password" placeholder="••••••••" required type="password" />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-[#a2c9ff] transition-colors flex items-center justify-center" type="button">
                  <span className="material-symbols-outlined text-[18px]">visibility</span>
                </button>
              </div>
            </div>
            
            <div className="pt-sm space-y-sm">
              <button className="w-full bg-[#d10332] text-[#ffe1e0] py-sm px-md rounded-DEFAULT font-label-md text-label-md uppercase tracking-wider hover:bg-[#93000a] transition-colors flex items-center justify-center gap-xs" type="submit">
                ACTIVATE SPIDER-SENSE
                <span className="material-symbols-outlined text-[16px]">radar</span>
              </button>
              <button className="w-full bg-transparent border border-outline-variant text-on-background py-sm px-md rounded-DEFAULT font-label-md text-label-md uppercase tracking-wider hover:bg-surface-container-high transition-colors" type="button">
                CREATE ACCOUNT
              </button>
            </div>
          </form>
        </div>
        
        {/* System Status Footer */}
        <div className="mt-xl flex items-center justify-between font-label-caps text-label-caps text-on-surface-variant px-sm">
          <div className="flex items-center gap-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#a2c9ff] animate-pulse shadow-[0_0_8px_rgba(162,201,255,0.6)]"></span>
            WEB ONLINE
          </div>
          <div className="flex items-center gap-xs opacity-70">
            <span className="material-symbols-outlined text-[14px]">shield</span>
            SECURE COUNCIL ACCESS
          </div>
        </div>
      </main>
      
      {/* Node Decorations */}
      <div className="absolute top-20 left-20 hidden md:flex items-center gap-2 opacity-30">
        <span className="w-1 h-1 rounded-full bg-[#d10332]"></span>
        <div className="h-px w-12 bg-outline-variant"></div>
        <span className="font-label-caps text-[9px] text-outline">NODE . ALPHA</span>
      </div>
      
      <div className="absolute bottom-20 right-20 hidden md:flex items-center gap-2 opacity-30">
        <span className="font-label-caps text-[9px] text-outline">SYS . STABLE</span>
        <div className="h-px w-12 bg-outline-variant"></div>
        <span className="w-1 h-1 rounded-full bg-[#a2c9ff]"></span>
      </div>
    </div>
  );
};

export default Login;
