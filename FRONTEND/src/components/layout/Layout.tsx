import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { path: '/dashboard', icon: 'dashboard', label: 'Spider-Sense Dashboard' },
  { path: '/council', icon: 'group', label: 'Spider Council', fill: 1 },
  { path: '/trace', icon: 'search_check', label: 'Trace the Web' },
  { path: '/mpt', icon: 'account_balance_wallet', label: 'Web Balance' },
  { path: '/investor', icon: 'account_circle', label: 'Investor Profile' },
];

export const Layout: React.FC<{ children: React.ReactNode; pageTitle: string; pageSubtitle?: string; customHeader?: React.ReactNode }> = ({ children, pageTitle, pageSubtitle, customHeader }) => {
  const location = useLocation();

  return (
    <div className="bg-background text-on-background min-h-screen overflow-x-hidden font-body-main web-pattern">
      {/* Top Navigation (Web Only) */}
      <header className="fixed top-0 right-0 left-72 z-50 flex items-center justify-between px-gutter h-16 bg-surface/80 dark:bg-surface/80 backdrop-blur-md border-b border-outline-variant dark:border-outline-variant hidden md:flex">
        <div className="font-h2-section text-h2-section font-bold text-[#a2c9ff] dark:text-[#a2c9ff]">Finance Council</div>
        <div className="flex items-center gap-md">
          <button className="text-on-surface-variant dark:text-on-surface-variant hover:text-[#a2c9ff] dark:hover:text-[#a2c9ff] opacity-80 hover:opacity-100 transition-opacity">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>notifications</span>
          </button>
          <button className="text-on-surface-variant dark:text-on-surface-variant hover:text-[#a2c9ff] dark:hover:text-[#a2c9ff] opacity-80 hover:opacity-100 transition-opacity">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>settings</span>
          </button>
          <div className="w-8 h-8 rounded-full bg-surface-container-high overflow-hidden border border-outline-variant ml-sm">
            <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIwj-fZxBiWitjCecO4ob90hf3M6lXWLDIkGQtARa2V5rXDRtul0dsqfGA_tjYoqJMfnmm7lN7WZQ073o_HzUMRzowsl62iSIptMP_HLtm2Td5LF-o1uY4EvjwAIEPPDbm3vwDhdI0x8wFvm5W2iI1Tf9EV32l3TzetC94eQZJOFhZPdpCEviXVDdXPh0n4Uh19yWWuYMI7yU47hui8Sy5_nN1t-IHjpwA0VKCDh1O2hgLPu5pAntmGw" alt="Profile" />
          </div>
        </div>
      </header>

      {/* Side Navigation (Web) */}
      <nav className="hidden md:flex flex-col h-screen py-lg px-md docked left-0 w-72 bg-surface dark:bg-surface border-r border-outline-variant dark:border-outline-variant fixed top-0 z-40">
        <div className="mb-xl flex items-center gap-sm">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-[#a2c9ff]">
            <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdqEPuD52--94kXv8qoZD2ucSt4Nfc0tSYEQeDLGrpuHP11YfN9bMb3T6XYVsIcLMc77NyNyoDif6CDiNmZDXpU5s_xiYAnBehS2RJXubgq7A3VCAv6r1-_tMRaTnvcDL5wlL1jYtsT2b1eRqYU1Gw6m2_5JsRjVZklcJ0UF7lqbtEGtj8SKgSkNY3ddm8au_sYhKEFIFZE4Y6Cw93kh_3NEBGtbki357nXHbJq3xQdXLMuGQkZ28tmA" alt="Logo" />
          </div>
          <div>
            <h1 className="font-h1-display text-h1-display font-bold text-[#a2c9ff] dark:text-[#a2c9ff] text-xl tracking-tight leading-none">Finance Council</h1>
            <p className="font-label-caps text-label-caps text-on-surface-variant mt-xs">Spider-Network Elite</p>
          </div>
        </div>
        <div className="flex flex-col gap-sm flex-1 font-body-main text-body-main">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            // The design uses blue for default active, red for council. We can just use the specific colors or just blue globally, since in the original they were separate html files with their own primary color.
            // Using Blue #a2c9ff generally except if it's the council page which used #B11313.
            // We'll dynamically set the color class based on the page to perfectly match the Stitch HTML outputs.
            const isCouncilPage = location.pathname === '/council';
            const primaryColor = isCouncilPage ? '#B11313' : '#a2c9ff';

            if (isActive) {
              return (
                <Link key={item.path} to={item.path} className="flex items-center gap-sm p-sm rounded-lg font-bold border-r-2 bg-surface-container-high/50 scale-95 active:scale-90 transition-transform" style={{ color: primaryColor, borderColor: primaryColor }}>
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: `'FILL' ${item.fill || 1}` }}>{item.icon}</span>
                  {item.label}
                </Link>
              );
            }
            return (
              <Link key={item.path} to={item.path} className="flex items-center gap-sm p-sm rounded-lg text-on-surface-variant dark:text-on-surface-variant hover:bg-surface-container-high dark:hover:bg-surface-container-high transition-colors scale-95 active:scale-90 transition-transform">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Main Content Canvas */}
      <main className="md:ml-72 pt-20 md:pt-24 px-md md:px-gutter pb-24 md:pb-lg min-h-screen relative z-10 flex flex-col">
        {customHeader ? customHeader : (
          <div className="mb-lg text-center md:text-left relative z-20">
            <h1 className="font-h1-display text-h1-display text-on-background mb-xs tracking-tight uppercase">{pageTitle}</h1>
            {pageSubtitle && <p className="font-body-main text-body-main text-on-surface-variant">{pageSubtitle}</p>}
          </div>
        )}
        {children}
      </main>

      {/* Bottom Navigation (Mobile Only) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-surface dark:bg-surface border-t border-outline-variant dark:border-outline-variant pb-safe">
        <div className="flex justify-around items-center h-16">
          {navItems.filter(item => item.path !== '/investor').map((item) => {
            const isActive = location.pathname === item.path;
            const isCouncilPage = location.pathname === '/council';
            const primaryColor = isCouncilPage ? '#B11313' : '#a2c9ff';

            if (isActive) {
              return (
                <Link key={item.path} to={item.path} className="flex flex-col items-center justify-center w-full h-full border-t-2" style={{ color: primaryColor, borderColor: primaryColor }}>
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: `'FILL' ${item.fill || 1}` }}>{item.icon}</span>
                </Link>
              );
            }
            return (
              <Link key={item.path} to={item.path} className="flex flex-col items-center justify-center w-full h-full text-on-surface-variant">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>{item.icon}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
};
