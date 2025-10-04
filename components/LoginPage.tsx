
import React, { useState } from 'react';
import { login } from '../services/authService';
import { AuthResponse } from '../types';
import Input from './common/Input';
import Button from './common/Button';
import UserIcon from './icons/UserIcon';
import LockIcon from './icons/LockIcon';

interface LoginPageProps {
  onLoginSuccess: (authResponse: AuthResponse) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('user@example.com');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const authResponse = await login({ email, password });
      onLoginSuccess(authResponse);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-8 bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white tracking-tight">Sign In</h1>
          <p className="mt-2 text-gray-400">
            Welcome back! Please enter your credentials.
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <Input
            id="email"
            type="email"
            label="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={<UserIcon />}
            disabled={isLoading}
            autoComplete="email"
          />
          <Input
            id="password"
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={<LockIcon />}
            disabled={isLoading}
            autoComplete="current-password"
          />

          {error && <p className="text-sm text-red-400 text-center">{error}</p>}

          <div>
            <Button type="submit" isLoading={isLoading} fullWidth>
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>
          </div>
          <div className="text-center text-sm text-gray-400">
            <p>Use <span className="font-mono text-indigo-400">user@example.com</span></p>
            <p>and <span className="font-mono text-indigo-400">password123</span> to log in.</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
