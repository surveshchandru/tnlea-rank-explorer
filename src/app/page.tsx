"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StatisticsCards from '@/components/StatisticsCards';
import SubmitForm from '@/components/SubmitForm';
import RankingsTable from '@/components/RankingsTable';
import { TNLEASubmission } from '@/types';
import { getAllSubmissions, submitRank } from '@/services/submissionService';
import { Loader2, ArrowDown } from 'lucide-react';
import { useGoogleLogin } from '@react-oauth/google';

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  
  const [submissions, setSubmissions] = useState<TNLEASubmission[]>([]);
  const [userSubmission, setUserSubmission] = useState<TNLEASubmission | null>(null);
  const [loadingData, setLoadingData] = useState(true);

  // Check local storage for existing session on load
  useEffect(() => {
    const storedUser = localStorage.getItem('tnlea_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoadingAuth(false);
  }, []);

  // Fetch all public data
  const fetchData = async () => {
    setLoadingData(true);
    try {
      const data = await getAllSubmissions();
      setSubmissions(data);
    } catch (error) {
      console.error("Error fetching submissions:", error);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // When user is set, or submissions change, find their existing submission
  useEffect(() => {
    if (user && user.sub && submissions.length > 0) {
      // NOTE: We do not get the Google User ID from the public fetch anymore for security reasons.
      // So to populate the "Edit" form, we would ideally need a separate authenticated fetch.
      // Since this is a simple setup, we'll keep the form empty for now if they reload, 
      // or we can just let them submit and it will overwrite their existing record based on their ID.
      // In this demo, we'll just allow them to submit.
    }
  }, [user, submissions]);

  const handleLoginSuccess = async (tokenResponse: any) => {
    try {
      const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
      });
      const userInfo = await res.json();
      setUser(userInfo);
      localStorage.setItem('tnlea_user', JSON.stringify(userInfo));
    } catch (error) {
      console.error('Failed to fetch user info', error);
    }
  };

  const login = useGoogleLogin({
    onSuccess: handleLoginSuccess,
    onError: () => console.error('Login Failed'),
    flow: 'implicit'
  });

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('tnlea_user');
  };

  const handleFormSubmit = async (data: Omit<TNLEASubmission, 'userId' | 'createdAt' | 'updatedAt'>) => {
    if (!user || !user.sub) return;
    
    // user.sub is the unique Google User ID
    await submitRank(user.sub, data);
    
    // Refresh data after submission
    await fetchData();
  };

  // Calculate Statistics
  const totalStudents = submissions.length;
  const highestPercentage = submissions.length > 0 ? Math.max(...submissions.map(s => s.diplomaPercentage)) : 0;
  const lowestGeneralRank = submissions.length > 0 ? Math.min(...submissions.map(s => s.generalRank)) : Infinity;
  const highestGeneralRank = submissions.length > 0 ? Math.max(...submissions.map(s => s.generalRank)) : 0;

  return (
    <div className="min-h-screen flex flex-col selection:bg-blue-200">
      <Navbar user={user} onLoginSuccess={handleLoginSuccess} onLogout={handleLogout} />
      
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24">
        {/* Hero Section */}
        <section className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            TNLEA Rank Explorer
          </h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8">
            A community-driven platform where TNLEA students voluntarily share their diploma percentage and ranks to improve transparency for everyone.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {!user ? (
              <button 
                onClick={() => login()}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5 bg-white rounded-full p-0.5" />
                Sign in with Google to Submit
              </button>
            ) : (
              <a 
                href="#submit-form"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all shadow-md hover:shadow-lg flex items-center justify-center"
              >
                Submit Your Rank
              </a>
            )}
            <a 
              href="#rankings"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-bold transition-all flex items-center justify-center gap-2"
            >
              View Rankings
              <ArrowDown size={18} />
            </a>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="mb-16">
          <StatisticsCards 
            totalStudents={totalStudents} 
            highestPercentage={highestPercentage} 
            lowestGeneralRank={lowestGeneralRank} 
            highestGeneralRank={highestGeneralRank} 
          />
        </section>

        {/* Rankings Table Section */}
        <section id="rankings" className="mb-20 scroll-mt-24">
          {loadingData ? (
            <div className="flex flex-col items-center justify-center py-20 bg-white border border-gray-100 rounded-2xl shadow-soft">
              <Loader2 size={40} className="animate-spin text-blue-500 mb-4" />
              <p className="text-gray-500 font-medium">Loading rankings...</p>
            </div>
          ) : (
            <RankingsTable data={submissions} />
          )}
        </section>

        {/* Submission Form Section */}
        <section id="submit-form" className="scroll-mt-24 pb-12">
          {loadingAuth ? (
             <div className="flex justify-center py-10">
               <Loader2 size={32} className="animate-spin text-gray-400" />
             </div>
          ) : user ? (
            <SubmitForm initialData={null} onSubmit={handleFormSubmit} />
          ) : (
            <div className="max-w-2xl mx-auto bg-blue-50 border border-blue-100 rounded-2xl p-8 text-center">
              <h3 className="text-xl font-bold text-blue-900 mb-2">Want to contribute?</h3>
              <p className="text-blue-800 mb-6">Sign in with your Google account to securely submit your rank details.</p>
              <button 
                onClick={() => login()}
                className="px-6 py-3 rounded-full bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold transition-all inline-flex items-center gap-2 shadow-sm"
              >
                <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4" />
                Sign in with Google
              </button>
            </div>
          )}
        </section>

      </main>

      <Footer />
    </div>
  );
}
