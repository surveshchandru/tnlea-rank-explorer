"use client";
import React from 'react';
import { LogOut, Verified, ShieldCheck } from 'lucide-react';
import { useGoogleLogin } from '@react-oauth/google';

export default function Navbar({ 
  user, 
  onLoginSuccess,
  onLogout 
}: { 
  user: any; 
  onLoginSuccess: (tokenResponse: any) => void;
  onLogout: () => void; 
}) {

  const login = useGoogleLogin({
    onSuccess: onLoginSuccess,
    onError: () => console.error('Login Failed'),
    flow: 'implicit'
  });

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-xl bg-white/70 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
              <ShieldCheck size={20} />
            </div>
            <span className="font-bold text-xl tracking-tight text-gray-900">
              TNLEA Rank Explorer
            </span>
          </div>

          <div>
            {user ? (
              <div className="flex items-center gap-4">
                <div className="hidden sm:flex flex-col items-end">
                  <span className="text-sm font-semibold text-gray-900 flex items-center gap-1">
                    {user.name}
                    <Verified size={16} className="text-blue-500" />
                  </span>
                  <span className="text-xs text-gray-500">Google Verified</span>
                </div>
                {user.picture && (
                  <img 
                    src={user.picture} 
                    alt={user.name} 
                    className="w-9 h-9 rounded-full border border-gray-200 shadow-sm"
                  />
                )}
                <button 
                  onClick={onLogout}
                  className="ml-2 p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                  title="Logout"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <button 
                onClick={() => login()}
                className="flex items-center gap-2 bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded-full font-medium transition-all shadow-sm"
              >
                <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4" />
                Sign in with Google
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
