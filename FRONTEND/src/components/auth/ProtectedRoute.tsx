import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useCouncil } from '../../context/CouncilContext';

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useCouncil();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect unauthenticated user to Login page
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
