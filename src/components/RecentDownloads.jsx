
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Trash2, Video, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const RecentDownloads = ({ recentDownloads, setRecentDownloads }) => {
  const clearRecent = () => {
    setRecentDownloads([]);
    localStorage.removeItem('recentDownloads');
    toast({
      title: "History Cleared! 🧹",
      description: "Recent downloads have been cleared successfully!",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="lg:col-span-1"
    >
      <div className="glass-effect rounded-2xl p-6 sticky top-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Clock className="w-6 h-6 text-green-400" />
            <h2 className="text-xl font-bold text-white">Recent Downloads</h2>
          </div>
          {recentDownloads.length > 0 && (
            <Button
              onClick={clearRecent}
              variant="outline"
              size="sm"
              className="border-red-500/50 text-red-400 hover:bg-red-500/10"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          )}
        </div>
        
        <div className="space-y-3 max-h-96 overflow-y-auto">
          <AnimatePresence>
            {recentDownloads.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8 text-gray-400"
              >
                <Video className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No recent downloads yet</p>
                <p className="text-sm">Start downloading to see history!</p>
              </motion.div>
            ) : (
              recentDownloads.map((download, index) => (
                <motion.div
                  key={download.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: index * 0.1 }}
                  className="download-card rounded-lg p-3"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={download.thumbnail}
                      alt="Video thumbnail"
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-300 truncate">
                        {new Date(download.downloadedAt).toLocaleString()}
                      </p>
                      <div className="flex gap-2 mt-1">
                        <a
                          href={download.hdUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded hover:bg-cyan-500/30 transition-colors"
                        >
                          HD
                        </a>
                        <a
                          href={download.sdUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded hover:bg-purple-500/30 transition-colors"
                        >
                          SD
                        </a>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-400" />
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
        
        {recentDownloads.length > 0 && (
          <div className="mt-4 text-center text-sm text-gray-400">
            {recentDownloads.length}/10 recent downloads
            {recentDownloads.length === 10 && (
              <p className="text-xs text-yellow-400 mt-1">
                ⚡ List will reset after next download
              </p>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default RecentDownloads;
