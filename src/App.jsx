import React, { useState, useEffect } from 'react';
import { Toaster } from '@/components/ui/toaster';
import GalaxyHeader from '@/components/GalaxyHeader';
import SingleDownloadForm from '@/components/SingleDownloadForm';
import BatchDownloadForm from '@/components/BatchDownloadForm';
import RecentDownloads from '@/components/RecentDownloads';
import { supabase } from '@/lib/supabaseClient';

function App() {
  const [recentDownloads, setRecentDownloads] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('recentDownloads');
    if (saved) {
      setRecentDownloads(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    const checkSupabaseConnection = async () => {
      try {
        const { data, error } = await supabase.from('users').select('*').limit(1); 
        if (error && error.message.includes("relation \"public.users\" does not exist")) {
          console.warn("Supabase 'users' table does not exist. This is okay if you are not using auth features yet.");
        } else if (error) {
          console.error("Supabase connection error:", error);
        } else {
          console.log("Supabase connection successful. Sample data (if any):", data);
        }
      } catch (e) {
         console.error("Exception during Supabase check:", e)
      }
    };
    checkSupabaseConnection();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <Toaster />
      <GalaxyHeader />

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <SingleDownloadForm setRecentDownloads={setRecentDownloads} />
            <BatchDownloadForm setRecentDownloads={setRecentDownloads} />
          </div>
          <RecentDownloads recentDownloads={recentDownloads} setRecentDownloads={setRecentDownloads} />
        </div>
      </div>
    </div>
  );
}

export default App;