import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Download, Video, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { downloadVideoUtil, fetchVideoData } from '@/lib/downloadUtils';
import VideoPreviewCard from '@/components/VideoPreviewCard';

const SingleDownloadForm = ({ setRecentDownloads }) => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [videoData, setVideoData] = useState(null);

  const handleFetchPreview = async () => {
    if (!url.trim()) {
      toast({
        title: "URL Required! 📝",
        description: "Please enter a Twitter video URL first!",
        variant: "destructive",
      });
      return;
    }
    setPreviewLoading(true);
    setVideoData(null);
    const data = await fetchVideoData(url);
    if (data) {
      setVideoData(data);
    }
    setPreviewLoading(false);
  };

  const handleActualDownload = async (quality, dataToSave) => {
    setLoading(true);
    await downloadVideoUtil(url, quality, setRecentDownloads, dataToSave);
    setLoading(false);
    setVideoData(null); 
    setUrl('');
  };
  
  const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), delay);
    };
  };

  const debouncedFetchPreview = useCallback(debounce(handleFetchPreview, 500), [url]);

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
    setVideoData(null); 
  };


  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="glass-effect rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <Video className="w-6 h-6 text-cyan-400" />
          <h2 className="text-2xl font-bold text-white">Single Download</h2>
        </div>
        
        <div className="space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Paste Twitter video URL here..."
              value={url}
              onChange={handleUrlChange}
              className="flex-1 px-4 py-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
            />
            <Button
              onClick={handleFetchPreview}
              disabled={previewLoading || !url.trim()}
              className="bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white font-semibold py-3 px-4 rounded-lg transition-all transform hover:scale-105"
            >
              {previewLoading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Search className="w-5 h-5" />
              )}
            </Button>
          </div>
          
          {videoData && (
            <VideoPreviewCard 
              videoData={videoData} 
              onDownload={handleActualDownload} 
              isDownloading={loading}
            />
          )}
          {!videoData && !previewLoading && url.trim() && (
             <p className="text-sm text-center text-gray-400 pt-2">Press the search button to fetch video preview.</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default SingleDownloadForm;