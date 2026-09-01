import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type {
  AnalyzeRequest,
  AnalyzeResponse,
  PortfolioItem,
  RiskProfile,
  UserProfile,
  AppSettings,
} from '../services/api';
import {
  analyzeStock,
  registerApi,
  loginApi,
  updateProfileApi,
  changePasswordApi,
  getStoredSession,
  saveStoredSession,
  getSavedAppSettings,
  saveAppSettings,
  getSavedPortfolio,
  saveStoredPortfolio,
  getSavedCapital,
  saveStoredCapital,
} from '../services/api';

export interface RecentAnalysis {
  stock: string;
  timestamp: string;
  verdict: string;
  confidence: number;
  riskVerdict: string;
  totalLatency: number;
}

interface CouncilContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  activeStock: string;
  riskProfile: RiskProfile;
  portfolio: PortfolioItem[];
  totalCapital: number | null;
  simulateTimeout: boolean;
  analysisResult: AnalyzeResponse | null;
  isLoading: boolean;
  error: string | null;
  recentAnalyses: RecentAnalysis[];
  appSettings: AppSettings;
  loginUser: (email: string, password: string) => Promise<UserProfile>;
  registerUser: (name: string, email: string, password: string, initialRisk?: RiskProfile) => Promise<UserProfile>;
  logoutUser: () => void;
  updateUserProfile: (name: string, risk?: RiskProfile) => Promise<UserProfile>;
  changeUserPassword: (currentPassword: string, newPassword: string) => Promise<void>;
  updateAppSettings: (newSettings: Partial<AppSettings>) => void;
  setActiveStock: (stock: string) => void;
  setRiskProfile: (profile: RiskProfile) => void;
  setPortfolio: (portfolio: PortfolioItem[]) => void;
  setTotalCapital: (amount: number | null) => void;
  setSimulateTimeout: (simulate: boolean) => void;
  addHolding: (item: PortfolioItem) => void;
  removeHolding: (symbol: string) => void;
  loadPortfolioPreset: (presetName: string) => void;
  runAnalysis: (
    stockOverride?: string,
    riskOverride?: RiskProfile,
    timeoutOverride?: boolean,
    portfolioOverride?: PortfolioItem[]
  ) => Promise<void>;
}

const PRESETS: Record<string, { capital: number; holdings: PortfolioItem[] }> = {
  india_trio: {
    capital: 842500,
    holdings: [
      { symbol: 'TCS', sector: 'IT Services', percentage: 30 },
      { symbol: 'INFY', sector: 'IT Services', percentage: 25 },
      { symbol: 'RELIANCE', sector: 'Energy & Telecom', percentage: 45 },
    ],
  },
  ai_titans: {
    capital: 1500000,
    holdings: [
      { symbol: 'NVDA', sector: 'Semiconductors', percentage: 40 },
      { symbol: 'MSFT', sector: 'Enterprise Software', percentage: 35 },
      { symbol: 'AAPL', sector: 'Consumer Tech', percentage: 25 },
    ],
  },
  ev_mobility: {
    capital: 1000000,
    holdings: [
      { symbol: 'TSLA', sector: 'Clean Mobility', percentage: 45 },
      { symbol: 'TATAMOTORS', sector: 'Automotive', percentage: 30 },
      { symbol: 'NVDA', sector: 'Semiconductors', percentage: 25 },
    ],
  },
  banking_diversified: {
    capital: 1250000,
    holdings: [
      { symbol: 'HDFCBANK', sector: 'Banking & Finance', percentage: 40 },
      { symbol: 'RELIANCE', sector: 'Energy & Telecom', percentage: 35 },
      { symbol: 'TCS', sector: 'IT Services', percentage: 25 },
    ],
  },
};

const CouncilContext = createContext<CouncilContextType | undefined>(undefined);

export const CouncilProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Session-backed User state
  const [user, setUser] = useState<UserProfile | null>(() => getStoredSession());
  const [riskProfile, setRiskProfileState] = useState<RiskProfile>(() => {
    const session = getStoredSession();
    return session?.risk_profile || 'low';
  });

  const [activeStock, setActiveStock] = useState<string>('');
  const [portfolio, setPortfolioState] = useState<PortfolioItem[]>(() => getSavedPortfolio());
  const [totalCapital, setTotalCapitalState] = useState<number | null>(() => getSavedCapital());
  const [simulateTimeout, setSimulateTimeout] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<AnalyzeResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [appSettings, setAppSettings] = useState<AppSettings>(() => getSavedAppSettings());
  
  const [recentAnalyses, setRecentAnalyses] = useState<RecentAnalysis[]>([]);

  const setPortfolio = (newPortfolio: PortfolioItem[]) => {
    setPortfolioState(newPortfolio);
    saveStoredPortfolio(newPortfolio);
  };

  const setTotalCapital = (amount: number | null) => {
    setTotalCapitalState(amount);
    saveStoredCapital(amount);
  };

  const setRiskProfile = (newProfile: RiskProfile) => {
    setRiskProfileState(newProfile);
    if (user) {
      const updatedUser = { ...user, risk_profile: newProfile };
      setUser(updatedUser);
      saveStoredSession(updatedUser);
    }
  };

  const loginUser = async (email: string, password: string): Promise<UserProfile> => {
    const profile = await loginApi({ email, password });
    setUser(profile);
    setRiskProfileState(profile.risk_profile || 'low');
    return profile;
  };

  const registerUser = async (
    name: string,
    email: string,
    password: string,
    initialRisk?: RiskProfile
  ): Promise<UserProfile> => {
    const profile = await registerApi({
      name,
      email,
      password,
      risk_profile: initialRisk || 'low',
    });
    setUser(profile);
    setRiskProfileState(profile.risk_profile || 'low');
    return profile;
  };

  const logoutUser = () => {
    saveStoredSession(null);
    setUser(null);
    setActiveStock('');
    setPortfolioState([]);
    setTotalCapitalState(0);
    saveStoredPortfolio([]);
    saveStoredCapital(0);
  };

  const updateUserProfile = async (name: string, risk?: RiskProfile): Promise<UserProfile> => {
    if (!user) throw new Error('Not authenticated');
    const updated = await updateProfileApi({
      email: user.email,
      name,
      risk_profile: risk || riskProfile,
    });
    setUser(updated);
    if (risk) setRiskProfileState(risk);
    return updated;
  };

  const changeUserPassword = async (currentPassword: string, newPassword: string): Promise<void> => {
    if (!user) throw new Error('Not authenticated');
    await changePasswordApi({
      email: user.email,
      current_password: currentPassword,
      new_password: newPassword,
    });
  };

  const updateAppSettings = (newSettings: Partial<AppSettings>) => {
    const merged = { ...appSettings, ...newSettings };
    setAppSettings(merged);
    saveAppSettings(merged);
  };

  const runAnalysis = useCallback(
    async (
      stockOverride?: string,
      riskOverride?: RiskProfile,
      timeoutOverride?: boolean,
      portfolioOverride?: PortfolioItem[]
    ) => {
      const stockToAnalyze = (stockOverride || activeStock).trim().toUpperCase();
      const riskToUse = riskOverride || riskProfile;
      const timeoutToUse = timeoutOverride !== undefined ? timeoutOverride : simulateTimeout;
      const portfolioToUse = portfolioOverride || portfolio;

      if (!stockToAnalyze) return;

      setIsLoading(true);
      setError(null);

      const request: AnalyzeRequest = {
        stock: stockToAnalyze,
        risk_profile: riskToUse,
        simulate_timeout: timeoutToUse,
        portfolio: portfolioToUse,
      };

      try {
        const result = await analyzeStock(request);
        setAnalysisResult(result);

        // Append to recent activity history
        const newRecent: RecentAnalysis = {
          stock: stockToAnalyze,
          timestamp: 'Just now',
          verdict: result.synthesis.verdict,
          confidence: result.synthesis.confidence,
          riskVerdict: result.personalized_result.verdict,
          totalLatency: result.metrics.total_latency_ms,
        };

        setRecentAnalyses((prev) => [
          newRecent,
          ...prev.filter((p) => p.stock !== stockToAnalyze).slice(0, 5),
        ]);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Unknown error during analysis';
        setError(message);
      } finally {
        setIsLoading(false);
      }
    },
    [activeStock, riskProfile, simulateTimeout, portfolio]
  );

  const addHolding = (item: PortfolioItem) => {
    const updated = [
      ...portfolio.filter((p) => p.symbol !== item.symbol.toUpperCase()),
      {
        ...item,
        symbol: item.symbol.toUpperCase(),
      },
    ];
    setPortfolio(updated);
    if (activeStock) {
      runAnalysis(activeStock, riskProfile, simulateTimeout, updated);
    }
  };

  const removeHolding = (symbol: string) => {
    const updated = portfolio.filter((p) => p.symbol !== symbol.toUpperCase());
    setPortfolio(updated);
    if (activeStock) {
      runAnalysis(activeStock, riskProfile, simulateTimeout, updated);
    }
  };

  const loadPortfolioPreset = (presetKey: string) => {
    if (PRESETS[presetKey]) {
      const p = PRESETS[presetKey];
      setTotalCapital(p.capital);
      setPortfolio(p.holdings);
      if (activeStock) {
        runAnalysis(activeStock, riskProfile, simulateTimeout, p.holdings);
      }
    }
  };

  // Trigger analysis on load only if an active stock is already selected
  useEffect(() => {
    if (activeStock) {
      runAnalysis(activeStock, riskProfile, false);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <CouncilContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        activeStock,
        riskProfile,
        portfolio,
        totalCapital,
        simulateTimeout,
        analysisResult,
        isLoading,
        error,
        recentAnalyses,
        appSettings,
        loginUser,
        registerUser,
        logoutUser,
        updateUserProfile,
        changeUserPassword,
        updateAppSettings,
        setActiveStock,
        setRiskProfile,
        setPortfolio,
        setTotalCapital,
        setSimulateTimeout,
        addHolding,
        removeHolding,
        loadPortfolioPreset,
        runAnalysis,
      }}
    >
      {children}
    </CouncilContext.Provider>
  );
};

export const useCouncil = (): CouncilContextType => {
  const context = useContext(CouncilContext);
  if (!context) {
    throw new Error('useCouncil must be used within a CouncilProvider');
  }
  return context;
};
