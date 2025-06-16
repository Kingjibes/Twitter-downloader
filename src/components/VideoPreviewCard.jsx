import React from 'react';
import { motion } from 'framer-motion';
import { Download, PlayCircle, Eye, Film } from 'lucide-react';
import { Button } from '@/components/ui/button';

const VideoPreviewCard = ({ videoData, onDownload, isDownloading }) => {
  if (!videoData) return null;

  const hasThumbnail = videoData.thumbnail && videoData.thumbnail.startsWith('http');

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-4 p-4 border border-cyan-500/30 rounded-lg glass-effect"
    >
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="w-full sm:w-1/3">
          {hasThumbnail ? (
            <img  
              src={videoData.thumbnail} 
              alt="Video thumbnail" 
              className="rounded-lg w-full h-auto object-cover aspect-video"
            />
          ) : (
            <div className="rounded-lg w-full h-full aspect-video bg-gray-700/50 flex flex-col items-center justify-center text-cyan-300">
              <Film className="w-12 h-12 mb-2" />
              <p className="text-sm text-center">No Thumbnail Available</p>
            </div>
          )}
        </div>
        <div className="flex-1 space-y-3">
          <h4 className="text-lg font-semibold text-cyan-300 flex items-center gap-2">
            <Eye className="w-5 h-5" /> Video Preview
          </h4>
          {!hasThumbnail && (
             <p className="text-sm text-gray-400">
              Video details: (Direct download links below)
            </p>
          )}
          {hasThumbnail && (
            <p className="text-sm text-gray-400">
              Thumbnail and download links for the video.
            </p>
          )}
          
          <div className="flex flex-wrap gap-2">
            {videoData.HD && (
              <Button
                onClick={() => onDownload('HD', videoData)}
                disabled={isDownloading}
                size="sm"
                className="bg-cyan-500 hover:bg-cyan-600 text-white"
              >
                {isDownloading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                ) : (
                  <Download className="w-4 h-4 mr-2" />
                )}
                Download HD
              </Button>
            )}
            {videoData.SD && (
              <Button
                onClick={() => onDownload('SD', videoData)}
                disabled={isDownloading}
                size="sm"
                variant="outline"
                className="border-cyan-500/70 text-cyan-400 hover:bg-cyan-500/20"
              >
                {isDownloading ? (
                  <div className="w-4 h-4 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin mr-2" />
                ) : (
                  <Download className="w-4 h-4 mr-2" />
                )}
                Download SD
              </Button>
            )}
          </div>
          {videoData.HD && (
            <a
              href={videoData.HD}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-sm text-blue-400 hover:text-blue-300 transition-colors"
            >
              <PlayCircle className="w-4 h-4 mr-2" />
              Open HD Video in New Tab
            </a>
          )}
           {videoData.SD && !videoData.HD && (
            <a
              href={videoData.SD}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-sm text-blue-400 hover:text-blue-300 transition-colors"
            >
              <PlayCircle className="w-4 h-4 mr-2" />
              Open SD Video in New Tab
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default VideoPreviewCard;