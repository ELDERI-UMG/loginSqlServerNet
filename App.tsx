
import React, { useState, useEffect, useCallback } from 'react';
import { User, AuthResponse } from './types';
import { logout as apiLogout } from './services/authService';
import LoginPage from './components/LoginPage';
import DashboardPage from './components/DashboardPage';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  const checkAuthStatus = useCallback(() => {
    try {
      const token = sessionStorage.getItem('authToken');
      const userData = sessionStorage.getItem('userData');
      if (token && userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error("Failed to parse user data from session storage", error);
      sessionStorage.clear();
    }
  }, []);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  const handleLoginSuccess = (authResponse: AuthResponse) => {
    setUser(authResponse.user);
    sessionStorage.setItem('authToken', authResponse.token);
    sessionStorage.setItem('userData', JSON.stringify(authResponse.user));
  };

  const handleLogout = () => {
    apiLogout();
    setUser(null);
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('userData');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4 bg-gradient-to-br from-gray-900 via-gray-800 to-slate-900">
      <div className="w-full max-w-7xl mx-auto">
        {user ? (
          <DashboardPage user={user} onLogout={handleLogout} />
        ) : (
          <LoginPage onLoginSuccess={handleLoginSuccess} />
        )}
      </div>
    </div>
  );
};

export default App;
