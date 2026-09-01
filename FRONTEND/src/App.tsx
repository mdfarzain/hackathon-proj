import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Council from './pages/Council';
import TraceWeb from './pages/TraceWeb';
import WebBalance from './pages/WebBalance';
import InvestorProfile from './pages/InvestorProfile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/council" element={<Council />} />
        <Route path="/trace" element={<TraceWeb />} />
        <Route path="/mpt" element={<WebBalance />} />
        <Route path="/investor" element={<InvestorProfile />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
