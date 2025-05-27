import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Film, Music, CheckCircle, Copy, Download } from 'lucide-react';

const VideoResultCard = ({ videoData, toast }) => {
  if (!videoData) return null;

  const handleDownload = (url, quality) => {
    if (!url) {
      toast({ title: "Download Error", description: "No URL provided for this quality.", variant: "destructive" });
      return;
    }
    const link = document.createElement('a');
    link.href = url;
    const filename = `twitter_video_${quality || 'audio'}.${url.includes('.mp4') ? 'mp4' : 'mp3'}`;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast({
      title: "Download Started",
      description: `Downloading ${quality || 'audio'}.`,
      className: "bg-green-500 text-white"
    });
  };

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Copied to Clipboard!",
        description: `${type} link copied.`,
        className: "bg-primary text-primary-foreground"
      });
    }).catch(err => {
      toast({
        title: "Copy Failed",
        description: "Could not copy link to clipboard.",
        variant: "destructive"
      });
    });
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 100,
        damping: 12
      },
    }),
  };

  return (
    <Card className="shadow-xl bg-card/80 backdrop-blur-sm overflow-hidden">
      <CardHeader className="p-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <CardTitle className="text-2xl text-primary flex items-center">
            <CheckCircle className="mr-2 h-7 w-7 text-green-500"/> Video Found!
          </CardTitle>
        </motion.div>
        {videoData.thumbnail && (
          <motion.div 
            className="mt-4 rounded-lg overflow-hidden border border-border shadow-md aspect-video"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            <img  
              alt="Video thumbnail"
              className="w-full h-full object-cover"
              src={videoData.thumbnail} />
          </motion.div>
        )}
        {videoData.description && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <CardDescription className="pt-3 text-sm text-foreground/80">
              Original Tweet: <a href={videoData.description} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{videoData.description}</a>
            </CardDescription>
          </motion.div>
        )}
      </CardHeader>
      <CardContent className="space-y-4 p-6">
        <motion.p 
          className="font-semibold text-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Available formats:
        </motion.p>
        {videoData.video_hd && (
          <motion.div 
            custom={0} variants={itemVariants} initial="hidden" animate="visible"
            className="flex flex-col sm:flex-row items-center justify-between p-3 bg-muted/50 rounded-md hover:bg-muted/70 transition-colors"
          >
            <div className="flex items-center mb-2 sm:mb-0">
              <Film className="h-5 w-5 mr-2 text-primary" />
              <span>Video HD</span>
            </div>
            <div className="space-x-2 flex-shrink-0">
              <Button onClick={() => handleDownload(videoData.video_hd, 'HD')} variant="outline" size="sm" className="hover:bg-primary/10"><Download className="mr-1 h-4 w-4" /> Download</Button>
              <Button onClick={() => copyToClipboard(videoData.video_hd, 'HD Video')} variant="ghost" size="sm" aria-label="Copy HD link"><Copy className="h-4 w-4"/></Button>
            </div>
          </motion.div>
        )}
        {videoData.video_sd && (
          <motion.div 
            custom={1} variants={itemVariants} initial="hidden" animate="visible"
            className="flex flex-col sm:flex-row items-center justify-between p-3 bg-muted/50 rounded-md hover:bg-muted/70 transition-colors"
          >
            <div className="flex items-center mb-2 sm:mb-0">
              <Film className="h-5 w-5 mr-2 text-sky-500" />
              <span>Video SD</span>
            </div>
            <div className="space-x-2 flex-shrink-0">
              <Button onClick={() => handleDownload(videoData.video_sd, 'SD')} variant="outline" size="sm" className="hover:bg-sky-500/10"><Download className="mr-1 h-4 w-4" /> Download</Button>
              <Button onClick={() => copyToClipboard(videoData.video_sd, 'SD Video')} variant="ghost" size="sm" aria-label="Copy SD link"><Copy className="h-4 w-4"/></Button>
            </div>
          </motion.div>
        )}
        {videoData.audio && (
          <motion.div 
            custom={2} variants={itemVariants} initial="hidden" animate="visible"
            className="flex flex-col sm:flex-row items-center justify-between p-3 bg-muted/50 rounded-md hover:bg-muted/70 transition-colors"
          >
            <div className="flex items-center mb-2 sm:mb-0">
              <Music className="h-5 w-5 mr-2 text-purple-500" />
              <span className="text-xs sm:text-sm">Audio Only (MP3/MP4 Audio)</span>
            </div>
            <div className="space-x-2 flex-shrink-0">
              <Button onClick={() => handleDownload(videoData.audio, 'Audio')} variant="outline" size="sm" className="hover:bg-purple-500/10"><Download className="mr-1 h-4 w-4" /> Download</Button>
              <Button onClick={() => copyToClipboard(videoData.audio, 'Audio')} variant="ghost" size="sm" aria-label="Copy Audio link"><Copy className="h-4 w-4"/></Button>
            </div>
          </motion.div>
        )}
        {!videoData.video_hd && !videoData.video_sd && !videoData.audio && (
          <motion.p 
            className="text-muted-foreground" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            No downloadable formats were found for this video.
          </motion.p>
        )}
      </CardContent>
    </Card>
  );
};

export default VideoResultCard;