import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCouncil } from '../../context/CouncilContext';

const navItems = [
  { path: '/dashboard', icon: 'dashboard', label: 'Spider-Sense Dashboard' },
  { path: '/council', icon: 'group', label: 'Spider Council', fill: 1 },
  { path: '/trace', icon: 'search_check', label: 'Trace the Web' },
  { path: '/mpt', icon: 'account_balance_wallet', label: 'Web Balance' },
  { path: '/investor', icon: 'account_circle', label: 'Investor Profile' },
  { path: '/settings', icon: 'settings', label: 'Settings' },
];

export const Layout: React.FC<{
  children: React.ReactNode;
  pageTitle: string;
  pageSubtitle?: string;
  customHeader?: React.ReactNode;
}> = ({ children, pageTitle, pageSubtitle, customHeader }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, riskProfile, totalCapital, portfolio, activeStock, logoutUser } = useCouncil();

  const [showProfileModal, setShowProfileModal] = useState<boolean>(false);
  const [showNotificationsModal, setShowNotificationsModal] = useState<boolean>(false);

  const notifications = [
    {
      id: 1,
      title: `Consensus Reached for $${activeStock}`,
      time: 'Just now',
      type: 'success',
      desc: 'Spider-Brain synthesized 3 specialist agents with active consensus.',
    },
    {
      id: 2,
      title: 'Sector Concentration Advisory',
      time: '12m ago',
      type: 'warning',
      desc: 'Spider-Sense evaluated sector weightings for your active portfolio.',
    },
    {
      id: 3,
      title: 'Audited Filings Ingested',
      time: '1h ago',
      type: 'info',
      desc: 'Spider-Mind retrieved statutory disclosures via RAG engine.',
    },
  ];

  const handleLogout = () => {
    setShowProfileModal(false);
    logoutUser();
    navigate('/');
  };

  return (
    <div className="bg-background text-on-background min-h-screen overflow-x-hidden font-body-main web-pattern">
      {/* Top Navigation (Web Only) */}
      <header className="fixed top-0 right-0 left-72 z-50 flex items-center justify-between px-gutter h-16 bg-surface/80 dark:bg-surface/80 backdrop-blur-md border-b border-outline-variant dark:border-outline-variant hidden md:flex">
        <div className="flex items-center gap-sm">
          <div className="font-h2-section text-h2-section font-bold text-[#a2c9ff] dark:text-[#a2c9ff]">
            Finance Council
          </div>
          <span className="px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-[10px] font-mono">
            COUNCIL ONLINE
          </span>
        </div>

        <div className="flex items-center gap-md">
          {/* Notifications Button */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotificationsModal(!showNotificationsModal);
                setShowProfileModal(false);
              }}
              className="text-on-surface-variant hover:text-[#a2c9ff] opacity-80 hover:opacity-100 transition-opacity p-1 rounded-lg relative"
              title="Notifications"
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>
                notifications
              </span>
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-primary animate-ping"></span>
            </button>

            {/* Notifications Popover */}
            {showNotificationsModal && (
              <div className="absolute right-0 mt-2 w-80 glass-panel rounded-xl p-md shadow-2xl border-[#242E3A] z-50 text-xs">
                <div className="flex items-center justify-between border-b border-outline-variant/30 pb-xs mb-sm">
                  <span className="font-label-caps font-bold text-primary">SYSTEM ALERTS</span>
                  <span className="text-[10px] text-outline">3 New</span>
                </div>
                <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                  {notifications.map((n) => (
                    <div key={n.id} className="p-2 rounded bg-surface-container-low border border-outline-variant/30 space-y-0.5">
                      <div className="flex justify-between font-bold text-on-background">
                        <span>{n.title}</span>
                        <span className="text-[10px] font-mono text-outline">{n.time}</span>
                      </div>
                      <p className="text-on-surface-variant text-[11px] leading-snug">{n.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Settings Button */}
          <button
            onClick={() => {
              setShowProfileModal(false);
              setShowNotificationsModal(false);
              navigate('/settings');
            }}
            className="text-on-surface-variant hover:text-[#a2c9ff] opacity-80 hover:opacity-100 transition-opacity p-1 rounded-lg"
            title="Account Settings"
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>
              settings
            </span>
          </button>

          {/* User Profile Avatar with Click Handler */}
          <div className="relative">
            <button
              onClick={() => {
                setShowProfileModal(!showProfileModal);
                setShowNotificationsModal(false);
              }}
              className="flex items-center gap-2 p-1 rounded-full hover:ring-2 hover:ring-primary/50 transition-all cursor-pointer"
              title="Click to view profile details"
            >
              <div className="w-8 h-8 rounded-full bg-surface-container-high overflow-hidden border border-outline-variant">
                <img
                  className="w-full h-full object-cover"
                  src={user?.avatar_url || 'https://api.dicebear.com/7.x/bottts/svg?seed=investor'}
                  alt={user?.name || 'User'}
                />
              </div>
              <span className="font-label-md text-xs text-on-surface font-bold hidden xl:inline">
                {user?.name || 'Investor'}
              </span>
            </button>

            {/* Profile Details Dropdown / Popover */}
            {showProfileModal && (
              <div className="absolute right-0 mt-2 w-72 glass-panel rounded-xl p-md shadow-2xl border-primary/40 z-50">
                <div className="flex items-center gap-sm border-b border-outline-variant/40 pb-sm mb-sm">
                  <div className="w-10 h-10 rounded-full bg-surface-container overflow-hidden border border-primary">
                    <img
                      className="w-full h-full object-cover"
                      src={user?.avatar_url || 'https://api.dicebear.com/7.x/bottts/svg?seed=investor'}
                      alt={user?.name || 'User'}
                    />
                  </div>
                  <div>
                    <h4 className="font-h2-section text-sm font-bold text-on-background leading-tight">
                      {user?.name || 'Investor'}
                    </h4>
                    <p className="text-[10px] font-mono text-outline truncate max-w-[170px]">{user?.email || 'user@spider-council.ai'}</p>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-on-surface-variant mb-md">
                  <div className="flex justify-between border-b border-outline-variant/20 pb-1">
                    <span className="text-outline">Node ID</span>
                    <span className="font-mono font-bold text-primary text-[11px]">
                      {user?.node_id || 'NODE-SPIDER-7749'}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-outline-variant/20 pb-1">
                    <span className="text-outline">Role Tier</span>
                    <span className="text-on-surface font-bold text-[11px]">{user?.role || 'Council Member'}</span>
                  </div>
                  <div className="flex justify-between border-b border-outline-variant/20 pb-1">
                    <span className="text-outline">Total Capital</span>
                    <span className="font-mono font-bold text-emerald-400 text-[11px]">
                      {totalCapital !== null && totalCapital !== undefined && !isNaN(totalCapital) && totalCapital > 0
                        ? `₹${totalCapital.toLocaleString('en-IN')}`
                        : 'Unentered'}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-outline-variant/20 pb-1">
                    <span className="text-outline">Risk Profile</span>
                    <span className="font-label-caps font-bold text-[11px] uppercase text-[#a2c9ff]">
                      {riskProfile}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-outline">Active Holdings</span>
                    <span className="font-mono font-bold text-[11px]">{portfolio.length} Assets</span>
                  </div>
                </div>

                <div className="space-y-1.5 pt-xs border-t border-outline-variant/30">
                  <button
                    onClick={() => {
                      setShowProfileModal(false);
                      navigate('/settings');
                    }}
                    className="w-full py-1.5 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 rounded font-label-caps text-xs font-bold transition-colors flex items-center justify-center gap-1"
                  >
                    <span className="material-symbols-outlined text-sm">settings</span>
                    ACCOUNT SETTINGS
                  </button>

                  <button
                    onClick={() => {
                      setShowProfileModal(false);
                      navigate('/investor');
                    }}
                    className="w-full py-1.5 bg-surface-container-high hover:bg-surface-container text-on-surface border border-outline-variant rounded font-label-caps text-xs font-bold transition-colors flex items-center justify-center gap-1"
                  >
                    <span className="material-symbols-outlined text-sm">tune</span>
                    INVESTOR PROFILE
                  </button>

                  <button
                    onClick={handleLogout}
                    className="w-full py-1.5 bg-red-950/40 hover:bg-red-950/70 text-red-300 border border-red-500/30 rounded font-label-caps text-xs font-bold transition-colors flex items-center justify-center gap-1"
                  >
                    <span className="material-symbols-outlined text-sm">logout</span>
                    LOG OUT
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Side Navigation (Web) */}
      <nav className="hidden md:flex flex-col h-screen py-lg px-md docked left-0 w-72 bg-surface dark:bg-surface border-r border-outline-variant dark:border-outline-variant fixed top-0 z-40">
        <div className="mb-xl flex items-center gap-sm">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-[#a2c9ff] flex items-center justify-center bg-surface-container">
            <span className="material-symbols-outlined text-[#a2c9ff] text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              hub
            </span>
          </div>
          <div>
            <h1 className="font-h1-display text-h1-display font-bold text-[#a2c9ff] dark:text-[#a2c9ff] text-xl tracking-tight leading-none">
              Finance Council
            </h1>
            <p className="font-label-caps text-label-caps text-on-surface-variant mt-xs">Spider-Network Elite</p>
          </div>
        </div>

        <div className="flex flex-col gap-sm flex-1 font-body-main text-body-main">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const isCouncilPage = location.pathname === '/council';
            const primaryColor = isCouncilPage ? '#B11313' : '#a2c9ff';

            if (isActive) {
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="flex items-center gap-sm p-sm rounded-lg font-bold border-r-2 bg-surface-container-high/50 scale-95 active:scale-90 transition-transform"
                  style={{ color: primaryColor, borderColor: primaryColor }}
                >
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: `'FILL' ${item.fill || 1}` }}>
                    {item.icon}
                  </span>
                  {item.label}
                </Link>
              );
            }
            return (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center gap-sm p-sm rounded-lg text-on-surface-variant dark:text-on-surface-variant hover:bg-surface-container-high dark:hover:bg-surface-container-high transition-colors scale-95 active:scale-90 transition-transform"
              >
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>
                  {item.icon}
                </span>
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* User Mini Profile in Sidebar Footer */}
        <div
          onClick={() => {
            setShowProfileModal(true);
          }}
          className="mt-auto p-2.5 rounded-lg bg-surface-container-low border border-outline-variant/40 flex items-center gap-2 cursor-pointer hover:border-primary/50 transition-colors"
          title="Click to view details"
        >
          <div className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant shrink-0 bg-surface-container">
            <img
              className="w-full h-full object-cover"
              src={user?.avatar_url || 'https://api.dicebear.com/7.x/bottts/svg?seed=investor'}
              alt={user?.name || 'User'}
            />
          </div>
          <div className="overflow-hidden flex-1">
            <div className="text-xs font-bold text-on-surface truncate">{user?.name || 'Investor'}</div>
            <div className="text-[10px] font-mono text-primary truncate">{user?.node_id || 'NODE-SPIDER-7749'}</div>
          </div>
        </div>
      </nav>

      {/* Main Content Canvas */}
      <main className="md:ml-72 pt-20 md:pt-24 px-md md:px-gutter pb-24 md:pb-lg min-h-screen relative z-10 flex flex-col">
        {customHeader ? (
          customHeader
        ) : (
          <div className="mb-lg text-center md:text-left relative z-20">
            <h1 className="font-h1-display text-h1-display text-on-background mb-xs tracking-tight uppercase">
              {pageTitle}
            </h1>
            {pageSubtitle && <p className="font-body-main text-body-main text-on-surface-variant">{pageSubtitle}</p>}
          </div>
        )}
        {children}
      </main>

      {/* Bottom Navigation (Mobile Only) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-surface dark:bg-surface border-t border-outline-variant dark:border-outline-variant pb-safe">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const isCouncilPage = location.pathname === '/council';
            const primaryColor = isCouncilPage ? '#B11313' : '#a2c9ff';

            if (isActive) {
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="flex flex-col items-center justify-center w-full h-full border-t-2"
                  style={{ color: primaryColor, borderColor: primaryColor }}
                >
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: `'FILL' ${item.fill || 1}` }}>
                    {item.icon}
                  </span>
                </Link>
              );
            }
            return (
              <Link
                key={item.path}
                to={item.path}
                className="flex flex-col items-center justify-center w-full h-full text-on-surface-variant"
              >
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>
                  {item.icon}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
};
