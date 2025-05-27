import React from 'react';
    import { motion, AnimatePresence } from 'framer-motion';
    import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
    import { Button } from '@/components/ui/button';
    import { ListVideo, Trash2, RotateCcw, ExternalLink } from 'lucide-react';

    const DownloadHistory = ({ history, onClearHistory, onReFetch, isLoading }) => {
      if (!history || history.length === 0) {
        return (
          <motion.div 
            className="w-full max-w-2xl mt-10 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="bg-card/60 backdrop-blur-sm p-6">
              <ListVideo className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
              <p className="text-muted-foreground">Your download history will appear here.</p>
              <p className="text-xs text-muted-foreground/70 mt-1">Fetch some videos to get started!</p>
            </Card>
          </motion.div>
        );
      }

      const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.07,
            delayChildren: 0.1,
          },
        },
      };

      const itemVariants = {
        hidden: { opacity: 0, x: -30, scale: 0.95 },
        visible: { opacity: 1, x: 0, scale: 1, transition: { type: 'spring', stiffness: 120, damping:14 } },
        exit: { opacity: 0, x: 30, scale: 0.95, transition: { duration: 0.2 } },
      };

      return (
        <motion.div 
          className="w-full max-w-2xl mt-10"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <Card className="bg-card/80 backdrop-blur-sm shadow-xl overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-4 p-6">
              <div className="flex items-center">
                <ListVideo className="h-6 w-6 mr-2 text-primary" />
                <CardTitle className="text-xl sm:text-2xl">Download History</CardTitle>
              </div>
              <Button variant="outline" size="sm" onClick={onClearHistory} disabled={history.length === 0 || isLoading}>
                <Trash2 className="h-4 w-4 mr-1 sm:mr-2" /> Clear All
              </Button>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <AnimatePresence>
                {history.map((item, index) => (
                  <motion.div
                    key={item.id || item.description || index} 
                    variants={itemVariants}
                    layout
                    className="flex flex-col sm:flex-row items-center justify-between p-3 mb-2 bg-muted/40 hover:bg-muted/60 rounded-md transition-colors duration-150"
                  >
                    <div className="flex-grow mb-2 sm:mb-0 mr-0 sm:mr-2 w-full sm:w-auto">
                      <a 
                        href={item.description} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-sm text-primary hover:underline truncate block"
                        title={item.description}
                      >
                        {item.description.length > 45 ? `${item.description.substring(0,42)}...` : item.description}
                        <ExternalLink className="inline-block h-3 w-3 ml-1 opacity-70"/>
                      </a>
                      <div className="flex items-center mt-1">
                        {item.thumbnail && (
                           <img  
                              alt="Tiny thumbnail" 
                              className="w-10 h-6 object-cover rounded-sm mr-2 border border-border"
                             src="https://images.unsplash.com/photo-1567443024551-f3e3cc2be870" />
                        )}
                        <span className="text-xs text-muted-foreground">
                          {item.video_hd ? "HD " : ""}{item.video_sd ? "SD " : ""}{item.audio ? "Audio" : ""}
                        </span>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => onReFetch(item.description)}
                      disabled={isLoading}
                      className="text-primary hover:text-primary/80 flex-shrink-0 w-full sm:w-auto mt-2 sm:mt-0"
                    >
                      <RotateCcw className={`h-4 w-4 mr-1 ${isLoading && item.description === (history.find(h => h.isLoadingReFetch)?.description) ? 'animate-spin' : ''}`} /> Re-Fetch
                    </Button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>
      );
    };

    export default DownloadHistory;