import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { useCouncil } from '../context/CouncilContext';
import type { RiskProfile } from '../services/api';

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const {
    user,
    riskProfile,
    setRiskProfile,
    updateUserProfile,
    changeUserPassword,
    logoutUser,
    appSettings,
    updateAppSettings,
  } = useCouncil();

  // Account State
  const [nameInput, setNameInput] = useState<string>(user?.name || '');
  const [accountSuccess, setAccountSuccess] = useState<string | null>(null);
  const [accountError, setAccountError] = useState<string | null>(null);
  const [isSavingAccount, setIsSavingAccount] = useState<boolean>(false);

  // Security (Change Password) State
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');
  const [securitySuccess, setSecuritySuccess] = useState<string | null>(null);
  const [securityError, setSecurityError] = useState<string | null>(null);
  const [isChangingPassword, setIsChangingPassword] = useState<boolean>(false);

  // Preferences State
  const [enablePings, setEnablePings] = useState<boolean>(appSettings.enablePings);
  const [realisticLatency, setRealisticLatency] = useState<boolean>(appSettings.realisticLatency);
  const [liveFeed, setLiveFeed] = useState<boolean>(appSettings.liveFeed);
  const [currency, setCurrency] = useState<string>(appSettings.currency);
  const [horizon, setHorizon] = useState<string>(appSettings.investmentHorizon);
  const [maxSectorCap, setMaxSectorCap] = useState<number>(appSettings.maxSectorCap);
  const [prefSuccess, setPrefSuccess] = useState<string | null>(null);

  // 1. Save Account Profile Changes
  const handleSaveAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    setAccountError(null);
    setAccountSuccess(null);

    if (!nameInput.trim()) {
      setAccountError('Name cannot be empty.');
      return;
    }

    setIsSavingAccount(true);
    try {
      await updateUserProfile(nameInput.trim());
      setAccountSuccess('Profile name updated and persisted successfully!');
      setTimeout(() => setAccountSuccess(null), 4000);
    } catch (err: unknown) {
      setAccountError(err instanceof Error ? err.message : 'Failed to update profile.');
    } finally {
      setIsSavingAccount(false);
    }
  };

  // 2. Change Password
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setSecurityError(null);
    setSecuritySuccess(null);

    if (!currentPassword) {
      setSecurityError('Please enter your current password.');
      return;
    }
    if (!newPassword) {
      setSecurityError('Please enter a new password.');
      return;
    }
    if (newPassword.length < 6) {
      setSecurityError('New password must be at least 6 characters.');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setSecurityError('New passwords do not match.');
      return;
    }

    setIsChangingPassword(true);
    try {
      await changeUserPassword(currentPassword, newPassword);
      setSecuritySuccess('Password updated successfully! Next login will require your new password.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
      setTimeout(() => setSecuritySuccess(null), 5000);
    } catch (err: unknown) {
      setSecurityError(err instanceof Error ? err.message : 'Failed to change password.');
    } finally {
      setIsChangingPassword(false);
    }
  };

  // 3. Save Preferences
  const handleSavePreferences = (e: React.FormEvent) => {
    e.preventDefault();
    updateAppSettings({
      enablePings,
      realisticLatency,
      liveFeed,
      currency,
      investmentHorizon: horizon,
      maxSectorCap,
    });
    setPrefSuccess('Preferences updated and persisted!');
    setTimeout(() => setPrefSuccess(null), 3000);
  };

  // 4. Handle Logout
  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  return (
    <Layout
      pageTitle="Council Settings & Preferences"
      pageSubtitle="Manage your investor identity, security encryption, and Spider-Sense analytical preferences."
    >
      <div className="grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12 gap-lg pb-xl">
        
        {/* ============================================================== */}
        {/* LEFT COLUMN: Account & Security */}
        {/* ============================================================== */}
        <div className="col-span-4 md:col-span-8 xl:col-span-6 flex flex-col gap-lg">
          
          {/* 1. Account Settings */}
          <div className="glass-panel p-lg rounded-xl border-[#242E3A] space-y-md">
            <div className="flex items-center justify-between border-b border-outline-variant/30 pb-sm">
              <h3 className="font-h2-section text-base font-bold text-on-surface flex items-center gap-sm">
                <span className="material-symbols-outlined text-primary">person</span>
                Account Profile
              </h3>
              <span className="px-2 py-0.5 rounded bg-primary/20 text-primary font-mono text-[10px] font-bold">
                {user?.node_id || 'NODE-SPIDER-7749'}
              </span>
            </div>

            {accountSuccess && (
              <div className="p-3 rounded-lg bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs flex items-center gap-2">
                <span className="material-symbols-outlined text-emerald-400 text-sm">check_circle</span>
                <span>{accountSuccess}</span>
              </div>
            )}

            {accountError && (
              <div className="p-3 rounded-lg bg-red-950/80 border border-red-500/50 text-red-200 text-xs flex items-center gap-2">
                <span className="material-symbols-outlined text-red-400 text-sm">error</span>
                <span>{accountError}</span>
              </div>
            )}

            <form onSubmit={handleSaveAccount} className="space-y-md">
              <div className="flex items-center gap-md">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-primary bg-surface-container shrink-0">
                  <img
                    src={user?.avatar_url || 'https://api.dicebear.com/7.x/bottts/svg?seed=investor'}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-0.5 flex-1">
                  <div className="font-mono text-sm font-bold text-on-background">{user?.name || 'Investor'}</div>
                  <div className="text-xs text-outline">{user?.email || 'user@spider-council.ai'}</div>
                  <div className="text-[10px] text-on-surface-variant font-mono">Member Since: {user?.member_since || 'August 2024'}</div>
                </div>
              </div>

              <div className="space-y-xs">
                <label className="font-label-caps text-xs text-on-surface-variant uppercase">
                  Full Investor Name
                </label>
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="input-field w-full py-2 px-3 rounded font-body-sm text-sm text-on-background"
                  placeholder="Enter full name..."
                  required
                />
              </div>

              <div className="space-y-xs">
                <label className="font-label-caps text-xs text-on-surface-variant uppercase">
                  Email Address (Primary Identity)
                </label>
                <input
                  type="email"
                  value={user?.email || ''}
                  disabled
                  className="input-field w-full py-2 px-3 rounded font-mono text-xs text-outline bg-surface-dim/70 cursor-not-allowed opacity-75"
                />
                <span className="text-[10px] text-outline">Email address is tied to your verified cryptographic node ID.</span>
              </div>

              <div className="pt-xs flex justify-end">
                <button
                  type="submit"
                  disabled={isSavingAccount}
                  className="bg-primary hover:bg-primary-fixed text-[#002b50] font-label-caps text-xs font-bold px-lg py-2.5 rounded-lg transition-colors flex items-center gap-2"
                >
                  {isSavingAccount ? (
                    <>
                      <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>
                      SAVING...
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-sm">save</span>
                      SAVE CHANGES
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* 2. Security (Change Password) */}
          <div className="glass-panel p-lg rounded-xl border-[#242E3A] space-y-md">
            <div className="flex items-center justify-between border-b border-outline-variant/30 pb-sm">
              <h3 className="font-h2-section text-base font-bold text-on-surface flex items-center gap-sm">
                <span className="material-symbols-outlined text-primary">security</span>
                Security & Authentication
              </h3>
              <span className="text-[10px] font-mono text-outline">SHA-256 ENCRYPTED</span>
            </div>

            {securitySuccess && (
              <div className="p-3 rounded-lg bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs flex items-center gap-2">
                <span className="material-symbols-outlined text-emerald-400 text-sm">check_circle</span>
                <span>{securitySuccess}</span>
              </div>
            )}

            {securityError && (
              <div className="p-3 rounded-lg bg-red-950/80 border border-red-500/50 text-red-200 text-xs flex items-center gap-2">
                <span className="material-symbols-outlined text-red-400 text-sm">error</span>
                <span>{securityError}</span>
              </div>
            )}

            <form onSubmit={handleChangePassword} className="space-y-sm">
              <div className="space-y-xs">
                <label className="font-label-caps text-xs text-on-surface-variant uppercase">
                  Current Password
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="input-field w-full py-2 px-3 rounded font-body-sm text-sm text-on-background"
                  placeholder="Enter current password..."
                  required
                  autoComplete="current-password"
                />
              </div>

              <div className="space-y-xs">
                <label className="font-label-caps text-xs text-on-surface-variant uppercase flex justify-between">
                  <span>New Password</span>
                  <span className="text-[10px] text-outline">Min 6 characters</span>
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="input-field w-full py-2 px-3 rounded font-body-sm text-sm text-on-background"
                  placeholder="Enter new password..."
                  required
                  autoComplete="new-password"
                />
              </div>

              <div className="space-y-xs">
                <label className="font-label-caps text-xs text-on-surface-variant uppercase">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  className="input-field w-full py-2 px-3 rounded font-body-sm text-sm text-on-background"
                  placeholder="Re-enter new password..."
                  required
                  autoComplete="new-password"
                />
              </div>

              <div className="pt-xs flex justify-end">
                <button
                  type="submit"
                  disabled={isChangingPassword}
                  className="bg-surface-container-high hover:bg-surface-container text-on-background border border-outline-variant font-label-caps text-xs font-bold px-lg py-2.5 rounded-lg transition-colors flex items-center gap-2"
                >
                  {isChangingPassword ? (
                    <>
                      <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>
                      UPDATING...
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-sm">lock_reset</span>
                      UPDATE PASSWORD
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* ============================================================== */}
        {/* RIGHT COLUMN: Preferences & Investment Controls */}
        {/* ============================================================== */}
        <div className="col-span-4 md:col-span-8 xl:col-span-6 flex flex-col gap-lg">
          
          {/* 3. Investment Preferences */}
          <div className="glass-panel p-lg rounded-xl border-[#242E3A] space-y-md">
            <div className="flex items-center justify-between border-b border-outline-variant/30 pb-sm">
              <h3 className="font-h2-section text-base font-bold text-on-surface flex items-center gap-sm">
                <span className="material-symbols-outlined text-primary">trending_up</span>
                Investment Preferences
              </h3>
              <span className="text-[10px] font-mono text-outline">SPIDER-SENSE RULES</span>
            </div>

            <div className="space-y-md">
              {/* Default Risk Profile */}
              <div>
                <label className="font-label-caps text-xs text-on-surface-variant uppercase mb-1.5 block">
                  Default Risk Profile Stance
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['low', 'medium', 'high'] as RiskProfile[]).map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRiskProfile(r)}
                      className={`py-2 rounded text-xs font-label-caps uppercase border transition-all ${
                        riskProfile === r
                          ? 'bg-primary/20 text-primary border-primary font-bold shadow'
                          : 'bg-surface-dim text-on-surface-variant border-outline-variant/40 hover:text-on-background'
                      }`}
                    >
                      {r} Risk
                    </button>
                  ))}
                </div>
                <p className="text-[10px] text-outline mt-1">
                  Directly alters the sensitivity of Spider-Sense concentration warnings.
                </p>
              </div>

              {/* Time Horizon */}
              <div>
                <label className="font-label-caps text-xs text-on-surface-variant uppercase mb-1.5 block">
                  Investment Time Horizon
                </label>
                <select
                  value={horizon}
                  onChange={(e) => setHorizon(e.target.value)}
                  className="input-field w-full py-2 px-3 rounded font-body-sm text-xs text-on-background bg-surface-dim"
                >
                  <option value="tactical">Tactical Short-Term (1-3 Years)</option>
                  <option value="strategic">Strategic Medium-Term (3-7 Years)</option>
                  <option value="legacy">Legacy Long-Term (7+ Years)</option>
                </select>
              </div>

              {/* Sector Cap & Currency */}
              <div className="grid grid-cols-2 gap-md">
                <div>
                  <label className="font-label-caps text-xs text-on-surface-variant uppercase mb-1 block">
                    Max Sector Cap
                  </label>
                  <select
                    value={maxSectorCap}
                    onChange={(e) => setMaxSectorCap(Number(e.target.value))}
                    className="input-field w-full py-2 px-3 rounded font-mono text-xs text-on-background bg-surface-dim"
                  >
                    <option value={25}>25% Conservative</option>
                    <option value={35}>35% Standard</option>
                    <option value={50}>50% High Conviction</option>
                  </select>
                </div>

                <div>
                  <label className="font-label-caps text-xs text-on-surface-variant uppercase mb-1 block">
                    Primary Currency
                  </label>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="input-field w-full py-2 px-3 rounded font-mono text-xs text-on-background bg-surface-dim"
                  >
                    <option value="INR (₹)">INR (₹)</option>
                    <option value="USD ($)">USD ($)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* 4. Application Preferences */}
          <div className="glass-panel p-lg rounded-xl border-[#242E3A] space-y-md">
            <div className="flex items-center justify-between border-b border-outline-variant/30 pb-sm">
              <h3 className="font-h2-section text-base font-bold text-on-surface flex items-center gap-sm">
                <span className="material-symbols-outlined text-primary">tune</span>
                Application Preferences
              </h3>
              <span className="text-[10px] font-mono text-outline">PERSISTED</span>
            </div>

            {prefSuccess && (
              <div className="p-3 rounded-lg bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs flex items-center gap-2">
                <span className="material-symbols-outlined text-emerald-400 text-sm">check_circle</span>
                <span>{prefSuccess}</span>
              </div>
            )}

            <form onSubmit={handleSavePreferences} className="space-y-sm">
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-surface-container-low border border-outline-variant/40">
                <div>
                  <div className="font-bold text-xs text-on-surface">Spider-Sense Audio Pings</div>
                  <div className="text-[10px] text-outline">Play subtle acoustic alerts upon agent consensus</div>
                </div>
                <input
                  type="checkbox"
                  checked={enablePings}
                  onChange={(e) => setEnablePings(e.target.checked)}
                  className="w-4 h-4 accent-primary cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-lg bg-surface-container-low border border-outline-variant/40">
                <div>
                  <div className="font-bold text-xs text-on-surface">Realistic Agent Inference Latency</div>
                  <div className="text-[10px] text-outline">Simulate multi-agent asynchronous network dispatch</div>
                </div>
                <input
                  type="checkbox"
                  checked={realisticLatency}
                  onChange={(e) => setRealisticLatency(e.target.checked)}
                  className="w-4 h-4 accent-primary cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-lg bg-surface-container-low border border-outline-variant/40">
                <div>
                  <div className="font-bold text-xs text-on-surface">Live Council Stream</div>
                  <div className="text-[10px] text-outline">Keep active feed updated on dashboard</div>
                </div>
                <input
                  type="checkbox"
                  checked={liveFeed}
                  onChange={(e) => setLiveFeed(e.target.checked)}
                  className="w-4 h-4 accent-primary cursor-pointer"
                />
              </div>

              <div className="pt-xs flex justify-end">
                <button
                  type="submit"
                  className="bg-primary hover:bg-primary-fixed text-[#002b50] font-label-caps text-xs font-bold px-lg py-2 rounded-lg transition-colors flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-sm">check</span>
                  SAVE PREFERENCES
                </button>
              </div>
            </form>
          </div>

          {/* 5. Logout & Session Actions */}
          <div className="glass-panel p-lg rounded-xl border-[#d10332]/40 bg-[#090D13] space-y-md">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-h2-section text-base font-bold text-on-background flex items-center gap-sm">
                  <span className="material-symbols-outlined text-[#d10332]">logout</span>
                  Sign Out of Council
                </h3>
                <p className="text-xs text-on-surface-variant mt-1">
                  Terminate your active cryptographic session and return to the authentication gateway.
                </p>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="bg-[#d10332] hover:bg-[#a60228] text-[#ffe1e0] font-label-caps text-xs font-bold px-lg py-2.5 rounded-lg transition-colors flex items-center gap-2 shadow-lg shrink-0"
              >
                <span className="material-symbols-outlined text-sm">power_settings_new</span>
                LOG OUT
              </button>
            </div>
          </div>

        </div>

      </div>
    </Layout>
  );
};

export default Settings;
