import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CouncilProvider } from './context/CouncilContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Council from './pages/Council';
import TraceWeb from './pages/TraceWeb';
import WebBalance from './pages/WebBalance';
import InvestorProfile from './pages/InvestorProfile';
import Settings from './pages/Settings';

function App() {
  return (
    <CouncilProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Auth Gateway */}
          <Route path="/" element={<Login />} />

          {/* Protected Application Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/council"
            element={
              <ProtectedRoute>
                <Council />
              </ProtectedRoute>
            }
          />
          <Route
            path="/trace"
            element={
              <ProtectedRoute>
                <TraceWeb />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mpt"
            element={
              <ProtectedRoute>
                <WebBalance />
              </ProtectedRoute>
            }
          />
          <Route
            path="/investor"
            element={
              <ProtectedRoute>
                <InvestorProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />

          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </CouncilProvider>
  );
}

export default App;
