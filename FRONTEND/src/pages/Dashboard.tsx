import React from 'react';
import { Layout } from '../components/layout/Layout';

const Dashboard: React.FC = () => {
  return (
    <Layout
      pageTitle="Good morning, Abhi."
      pageSubtitle="Your financial web is being monitored."
    >
      <div className="grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12 gap-gutter">
        {/* Alert Area (Bento Top Full) */}
        <div className="col-span-4 md:col-span-8 xl:col-span-12 bg-[#090D13] border border-[#d10332] rounded-lg p-lg relative overflow-hidden group">
          <div className="absolute inset-0 bg-[#d10332]/5 radial-rings pointer-events-none" style={{ background: 'radial-gradient(circle at center, transparent 30%, rgba(162, 201, 255, 0.05) 31%, transparent 32%, transparent 50%, rgba(162, 201, 255, 0.05) 51%, transparent 52%)' }}></div>
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-md">
            <div>
              <div className="flex items-center gap-sm mb-xs">
                <span className="material-symbols-outlined text-[#d10332]" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
                <span className="font-label-caps text-label-caps text-[#d10332] tracking-widest">SPIDER-SENSE TRIGGERED</span>
              </div>
              <h2 className="font-h2-section text-h2-section text-on-background mb-sm">OIL PRICE SHOCK: Crude Oil +10.4%</h2>
              <div className="flex flex-wrap gap-sm">
                <span className="px-sm py-xs border border-outline-variant rounded-full font-label-md text-label-md text-on-surface-variant bg-surface-container flex items-center gap-xs">
                  <span className="w-2 h-2 rounded-full bg-[#d10332]"></span> Sectors: Energy, Airlines, Logistics
                </span>
                <span className="px-sm py-xs border border-outline-variant rounded-full font-label-md text-label-md text-on-surface-variant bg-surface-container flex items-center gap-xs">
                  <span className="w-2 h-2 rounded-full bg-[#d10332]"></span> Portfolio Relevance: High
                </span>
              </div>
            </div>
            <button className="bg-[#d10332] text-on-error font-label-md text-label-md uppercase tracking-wider px-lg py-sm rounded-DEFAULT hover:bg-error transition-colors shrink-0">
              Deploy Council
            </button>
          </div>
        </div>

        {/* Financial Web Visualization (Bento Left Large) */}
        <div className="col-span-4 md:col-span-8 xl:col-span-8 bg-[#090D13] border border-[#242E3A] rounded-lg p-lg min-h-[400px] relative overflow-hidden group hover:bg-[#151D29] transition-colors">
          <div className="absolute top-0 right-0 w-32 h-32 opacity-50 pointer-events-none" style={{ backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTAgNDBMMDAgMCIgc3Ryb2tlPSIjMjQyRTNBIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIHRyYW5zZm9ybT0icm90YXRlKDE1KSIvPjwvc3ZnPg==')" }}></div>
          <div className="absolute inset-0 border border-transparent group-hover:border-primary/20 rounded-lg pointer-events-none transition-colors"></div>
          <h3 className="font-label-caps text-label-caps text-on-surface-variant mb-md tracking-widest relative z-10">YOUR FINANCIAL WEB</h3>
          
          {/* Placeholder for interactive visualization */}
          <div className="w-full h-[300px] bg-surface-container-low rounded-DEFAULT flex items-center justify-center relative z-10 border border-[#242E3A]">
            <span className="font-body-sm text-body-sm text-on-surface-variant">Interactive Web Visualization Rendered Here</span>
          </div>
        </div>

        {/* Portfolio Snapshot & Activity (Bento Right Stack) */}
        <div className="col-span-4 md:col-span-8 xl:col-span-4 flex flex-col gap-gutter">
          {/* Snapshot */}
          <div className="bg-[#090D13] border border-[#242E3A] rounded-lg p-lg relative group hover:bg-[#151D29] transition-colors">
            <div className="absolute inset-0 border border-transparent group-hover:border-primary/20 rounded-lg pointer-events-none transition-colors"></div>
            <h3 className="font-label-caps text-label-caps text-on-surface-variant mb-md tracking-widest">PORTFOLIO SNAPSHOT</h3>
            <div className="font-h1-display text-h1-display text-primary mb-lg">₹8,42,500</div>
            <div className="space-y-sm">
              <div className="flex justify-between items-center border-b border-[#242E3A] pb-sm">
                <span className="font-body-sm text-body-sm text-on-surface-variant">Volatility</span>
                <span className="font-label-md text-label-md text-[#d10332]">12.4%</span>
              </div>
              <div className="flex justify-between items-center border-b border-[#242E3A] pb-sm">
                <span className="font-body-sm text-body-sm text-on-surface-variant">Correlated Exposure</span>
                <span className="font-label-md text-label-md text-primary">68%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-body-sm text-body-sm text-on-surface-variant">Risk Profile</span>
                <span className="px-sm py-xs bg-surface-variant text-on-surface rounded-DEFAULT font-label-caps text-label-caps">MODERATE</span>
              </div>
            </div>
          </div>

          {/* Recent Activity Mini-Table */}
          <div className="bg-[#090D13] border border-[#242E3A] rounded-lg p-lg relative group hover:bg-[#151D29] transition-colors flex-1 overflow-auto">
            <div className="absolute inset-0 border border-transparent group-hover:border-primary/20 rounded-lg pointer-events-none transition-colors"></div>
            <h3 className="font-label-caps text-label-caps text-on-surface-variant mb-md tracking-widest">RECENT ACTIVITY</h3>
            <div className="space-y-md">
              {/* Row 1 */}
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-label-md text-label-md text-on-background mb-xs">Oil Shock Analysis</div>
                  <div className="font-body-sm text-body-sm text-on-surface-variant">Council: Evaluating</div>
                </div>
                <div className="text-right">
                  <div className="font-label-md text-label-md text-outline">Pending</div>
                  <div className="font-body-sm text-body-sm text-on-surface-variant text-xs">2m ago</div>
                </div>
              </div>
              
              {/* Row 2 */}
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-label-md text-label-md text-on-background mb-xs">Tech Sector Dip</div>
                  <div className="font-body-sm text-body-sm text-on-surface-variant">Council: Hold</div>
                </div>
                <div className="text-right">
                  <div className="font-label-md text-label-md text-primary">85% Conf.</div>
                  <div className="font-body-sm text-body-sm text-on-surface-variant text-xs">1h ago</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
