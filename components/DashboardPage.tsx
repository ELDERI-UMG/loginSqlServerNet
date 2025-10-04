
import React from 'react';
import { User } from '../types';
import Button from './common/Button';

interface DashboardPageProps {
  user: User;
  onLogout: () => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ user, onLogout }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center">
        <div className="w-full max-w-2xl p-8 space-y-6 bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20">
            <h1 className="text-4xl font-bold text-white">Welcome, {user.name}!</h1>
            <p className="text-lg text-gray-300">You have successfully logged in to the application.</p>
            <p className="text-md text-gray-400">Your registered email is: <span className="font-medium text-indigo-400">{user.email}</span></p>
            <div className="pt-4">
                 <Button onClick={onLogout} variant="secondary">
                    Log Out
                </Button>
            </div>
        </div>
    </div>
  );
};

export default DashboardPage;
