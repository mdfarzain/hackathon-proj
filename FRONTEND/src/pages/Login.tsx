import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCouncil } from '../context/CouncilContext';
import type { RiskProfile } from '../services/api';
import { getLoginCooldownRemaining, clearLoginCooldown } from '../services/api';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginUser, registerUser, isAuthenticated, user } = useCouncil();

  const [isRegister, setIsRegister] = useState<boolean>(false);

  // All fields start completely empty
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [riskPreference, setRiskPreference] = useState<RiskProfile>('low');

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Live 35-Second Cooldown Timer State
  const [cooldownSeconds, setCooldownSeconds] = useState<number>(() => getLoginCooldownRemaining());
  const timerRef = useRef<number | null>(null);

  // Check and run live countdown timer
  useEffect(() => {
    const checkCooldown = () => {
      const remaining = getLoginCooldownRemaining();
      setCooldownSeconds(remaining);

      if (remaining > 0) {
        if (!timerRef.current) {
          timerRef.current = window.setInterval(() => {
            const cur = getLoginCooldownRemaining();
            setCooldownSeconds(cur);
            if (cur <= 0) {
              if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
              }
              clearLoginCooldown();
              setFormError(null);
              setFormSuccess('You can try logging in again.');
              setTimeout(() => setFormSuccess(null), 4000);
            }
          }, 1000);
        }
      } else {
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
      }
    };

    checkCooldown();

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [cooldownSeconds]);

  // If already logged in, redirect to dashboard or requested page
  useEffect(() => {
    if (isAuthenticated && user) {
      const from = (location.state as { from?: { pathname?: string } })?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, user, navigate, location]);

  const handleTabSwitch = (toRegister: boolean) => {
    setIsRegister(toRegister);
    setFormError(null);
    setFormSuccess(null);
    // Clear all fields upon switching tabs
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setName('');
  };

  const validateEmail = (val: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setFormSuccess(null);

    // Block if cooldown is active
    const remaining = getLoginCooldownRemaining();
    if (remaining > 0) {
      setCooldownSeconds(remaining);
      setFormError(`Too many incorrect login attempts. Please wait ${remaining} seconds before trying again.`);
      return;
    }

    const emailTrim = email.trim();
    const nameTrim = name.trim();

    if (isRegister) {
      // -------------------------------------------------------------
      // SIGNUP / CREATE ACCOUNT VALIDATION
      // -------------------------------------------------------------
      if (!nameTrim) {
        setFormError('Please enter your name.');
        return;
      }
      if (!emailTrim) {
        setFormError('Please enter your email address.');
        return;
      }
      if (!validateEmail(emailTrim)) {
        setFormError('Please enter a valid email address.');
        return;
      }
      if (!password) {
        setFormError('Please enter a password.');
        return;
      }
      if (password.length < 6) {
        setFormError('Password must be at least 6 characters.');
        return;
      }
      if (password !== confirmPassword) {
        setFormError('Passwords do not match.');
        return;
      }

      setIsSubmitting(true);
      try {
        await registerUser(nameTrim, emailTrim, password, riskPreference);
        setFormSuccess('Account created successfully! Initializing node...');
        setTimeout(() => {
          navigate('/dashboard');
        }, 300);
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Failed to create account.';
        setFormError(msg);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      // -------------------------------------------------------------
      // LOGIN VALIDATION
      // -------------------------------------------------------------
      if (!emailTrim) {
        setFormError('Please enter your email address.');
        return;
      }
      if (!validateEmail(emailTrim)) {
        setFormError('Please enter a valid email address.');
        return;
      }
      if (!password) {
        setFormError('Please enter your password.');
        return;
      }

      setIsSubmitting(true);
      try {
        await loginUser(emailTrim, password);
        setFormSuccess('Authentication verified! Access granted.');
        setTimeout(() => {
          navigate('/dashboard');
        }, 300);
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Invalid email or password.';
        setFormError(msg);
        // If cooldown was triggered, start live countdown immediately
        const postRemaining = getLoginCooldownRemaining();
        if (postRemaining > 0) {
          setCooldownSeconds(postRemaining);
        }
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background text-on-background flex flex-col items-center justify-center relative overflow-hidden font-body-main text-body-main web-pattern p-4">
      {/* Ambient Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-[#05070A]/60 to-[#05070A] z-0"></div>

      {/* Main Content Canvas */}
      <main className="relative z-10 w-full max-w-md px-gutter md:px-0">
        {/* Logo Area */}
        <div className="text-center mb-lg">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full glass-panel mb-sm relative">
            <span
              className="material-symbols-outlined text-[#a2c9ff] text-3xl z-10"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              hub
            </span>
            <div className="absolute inset-0 border border-[#a2c9ff]/20 rounded-full animate-ping opacity-20"></div>
            <div className="absolute -inset-2 border border-outline-variant/30 rounded-full"></div>
          </div>
          <h1 className="font-h1-display text-h1-display text-2xl md:text-3xl font-bold text-on-background tracking-tight mb-xs">
            FINANCE COUNCIL
          </h1>
          <p className="font-body-sm text-xs text-on-surface-variant max-w-[300px] mx-auto leading-relaxed">
            Multi-Agent Financial Intelligence.
            <br />
            <span className="text-[#a2c9ff]/80">Five perspectives. One informed decision.</span>
          </p>
        </div>

        {/* Login / Register Card */}
        <div className="glass-panel rounded-xl p-lg relative overflow-hidden border border-[#242E3A] shadow-2xl">
          {/* Mode Switcher Tabs */}
          <div className="flex border-b border-outline-variant/40 mb-md">
            <button
              type="button"
              onClick={() => handleTabSwitch(false)}
              className={`flex-1 py-2.5 font-label-caps text-xs font-bold transition-all border-b-2 ${
                !isRegister
                  ? 'border-primary text-primary bg-surface-container-high/30'
                  : 'border-transparent text-on-surface-variant hover:text-on-background'
              }`}
            >
              SIGN IN
            </button>
            <button
              type="button"
              onClick={() => handleTabSwitch(true)}
              className={`flex-1 py-2.5 font-label-caps text-xs font-bold transition-all border-b-2 ${
                isRegister
                  ? 'border-primary text-primary bg-surface-container-high/30'
                  : 'border-transparent text-on-surface-variant hover:text-on-background'
              }`}
            >
              CREATE ACCOUNT
            </button>
          </div>

          {/* Live Cooldown Lockout Banner */}
          {cooldownSeconds > 0 && (
            <div className="mb-md p-3.5 rounded-lg bg-amber-950/90 border border-amber-500/60 text-amber-200 text-xs flex flex-col gap-1.5 shadow-[0_0_15px_rgba(245,158,11,0.2)] animate-pulse">
              <div className="flex items-center gap-2 font-bold text-amber-300">
                <span className="material-symbols-outlined text-base text-amber-400">timer</span>
                <span>SECURITY COOLDOWN ACTIVE</span>
              </div>
              <p className="leading-snug text-[11px] text-amber-100/90">
                Too many incorrect login attempts.
              </p>
              <div className="flex items-center justify-between mt-1 pt-1 border-t border-amber-500/30 font-mono">
                <span className="text-amber-300 font-bold">
                  Please wait {cooldownSeconds} seconds before trying again.
                </span>
                <span className="px-2 py-0.5 rounded bg-amber-900/60 text-amber-200 text-[11px] font-bold">
                  {cooldownSeconds}s
                </span>
              </div>
            </div>
          )}

          {/* Form Error Banner (when not in full lockout) */}
          {formError && cooldownSeconds <= 0 && (
            <div className="mb-md p-3 rounded-lg bg-red-950/80 border border-red-500/50 text-red-200 text-xs flex items-start gap-2">
              <span className="material-symbols-outlined text-red-400 text-base shrink-0 mt-0.5">
                error
              </span>
              <span className="leading-tight">{formError}</span>
            </div>
          )}

          {/* Form Success Banner */}
          {formSuccess && (
            <div className="mb-md p-3 rounded-lg bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs flex items-start gap-2">
              <span className="material-symbols-outlined text-emerald-400 text-base shrink-0 mt-0.5">
                check_circle
              </span>
              <span className="leading-tight">{formSuccess}</span>
            </div>
          )}

          <form className="space-y-md relative z-10" onSubmit={handleSubmit} noValidate>
            {/* Full Name field (for Register mode) */}
            {isRegister && (
              <div className="space-y-xs">
                <label className="font-label-caps text-label-caps text-on-surface-variant uppercase flex justify-between">
                  <span>Full Name</span>
                  <span className="text-[10px] text-primary">Required</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline text-[18px]">
                    person
                  </span>
                  <input
                    className="w-full input-field rounded-lg py-2.5 pl-10 pr-sm font-body-sm text-sm text-on-background placeholder:text-outline"
                    placeholder="Enter your full name"
                    required
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (formError) setFormError(null);
                    }}
                    autoComplete="name"
                    disabled={cooldownSeconds > 0}
                  />
                </div>
              </div>
            )}

            {/* Email / Node Identity */}
            <div className="space-y-xs">
              <label className="font-label-caps text-label-caps text-on-surface-variant uppercase flex justify-between">
                <span>{isRegister ? 'Email Address' : 'Email Address'}</span>
                <span className="text-[10px] text-primary">Required</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline text-[18px]">
                  mail
                </span>
                <input
                  className="w-full input-field rounded-lg py-2.5 pl-10 pr-sm font-body-sm text-sm text-on-background placeholder:text-outline"
                  placeholder="name@example.com"
                  required
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (formError) setFormError(null);
                  }}
                  autoComplete="email"
                  disabled={cooldownSeconds > 0}
                />
              </div>
            </div>

            {/* Passcode */}
            <div className="space-y-xs">
              <label className="font-label-caps text-label-caps text-on-surface-variant uppercase flex justify-between">
                <span>Password</span>
                {isRegister && <span className="text-[10px] text-outline">Min 6 characters</span>}
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline text-[18px]">
                  lock
                </span>
                <input
                  className="w-full input-field rounded-lg py-2.5 pl-10 pr-10 font-body-sm text-sm text-on-background placeholder:text-outline"
                  placeholder="Enter your password"
                  required
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (formError) setFormError(null);
                  }}
                  autoComplete={isRegister ? 'new-password' : 'current-password'}
                  disabled={cooldownSeconds > 0}
                />
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-[#a2c9ff] transition-colors flex items-center justify-center p-1"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  title={showPassword ? 'Hide password' : 'Show password'}
                  disabled={cooldownSeconds > 0}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {/* Confirm Password (for Register mode) */}
            {isRegister && (
              <div className="space-y-xs">
                <label className="font-label-caps text-label-caps text-on-surface-variant uppercase">
                  Confirm Password
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline text-[18px]">
                    lock_reset
                  </span>
                  <input
                    className="w-full input-field rounded-lg py-2.5 pl-10 pr-10 font-body-sm text-sm text-on-background placeholder:text-outline"
                    placeholder="Re-enter your password"
                    required
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (formError) setFormError(null);
                    }}
                    autoComplete="new-password"
                    disabled={cooldownSeconds > 0}
                  />
                  <button
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-[#a2c9ff] transition-colors flex items-center justify-center p-1"
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    title={showConfirmPassword ? 'Hide password' : 'Show password'}
                    disabled={cooldownSeconds > 0}
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {showConfirmPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>
            )}

            {/* Initial Risk Profile (for Register mode) */}
            {isRegister && (
              <div className="space-y-xs pt-1">
                <label className="font-label-caps text-label-caps text-on-surface-variant uppercase">
                  Default Risk Profile
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['low', 'medium', 'high'] as RiskProfile[]).map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRiskPreference(r)}
                      disabled={cooldownSeconds > 0}
                      className={`py-1.5 rounded text-xs font-label-caps uppercase border transition-all ${
                        riskPreference === r
                          ? 'bg-primary/20 text-primary border-primary font-bold shadow'
                          : 'bg-surface-dim text-on-surface-variant border-outline-variant/40 hover:text-on-background'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Submit Action */}
            <div className="pt-sm space-y-sm">
              <button
                className="w-full bg-[#d10332] hover:bg-[#a60228] disabled:bg-surface-container disabled:text-outline disabled:border-outline-variant/30 text-[#ffe1e0] py-3 px-md rounded-lg font-label-md text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-xs shadow-lg cursor-pointer disabled:cursor-not-allowed"
                type="submit"
                disabled={isSubmitting || cooldownSeconds > 0}
              >
                {cooldownSeconds > 0 ? (
                  <>
                    <span className="material-symbols-outlined text-[16px] animate-spin">
                      hourglass_bottom
                    </span>
                    COOLDOWN ACTIVE ({cooldownSeconds}s)
                  </>
                ) : isSubmitting ? (
                  <>
                    <span className="material-symbols-outlined animate-spin text-[16px]">
                      progress_activity
                    </span>
                    AUTHENTICATING...
                  </>
                ) : isRegister ? (
                  <>
                    CREATE ACCOUNT & INITIALIZE NODE
                    <span className="material-symbols-outlined text-[16px]">radar</span>
                  </>
                ) : (
                  <>
                    SIGN IN TO COUNCIL
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* System Status Footer */}
        <div className="mt-md flex items-center justify-between font-label-caps text-[11px] text-on-surface-variant px-sm">
          <div className="flex items-center gap-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#a2c9ff] animate-pulse shadow-[0_0_8px_rgba(162,201,255,0.6)]"></span>
            FASTAPI ORCHESTRATOR ONLINE
          </div>
          <div className="flex items-center gap-xs opacity-70">
            <span className="material-symbols-outlined text-[14px]">shield</span>
            PERSISTENT ENCRYPTION
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
