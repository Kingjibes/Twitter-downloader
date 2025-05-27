import React from 'react';
    import { motion } from 'framer-motion';
    import { Twitter } from 'lucide-react';

    const LoadingScreen = () => {
      return (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background">
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1, 1.2, 1],
              rotate: [0, 10, -10, 10, 0],
            }}
            transition={{ 
              duration: 2, 
              ease: "easeInOut",
              repeat: Infinity, 
              repeatType: "loop"
            }}
          >
            <Twitter className="h-24 w-24 text-primary" />
          </motion.div>
          <motion.p 
            className="mt-8 text-xl font-semibold text-foreground"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, type: "spring", stiffness: 100 }}
          >
            Loading TwitVid Downloader...
          </motion.p>
           <div className="absolute bottom-8 text-xs text-muted-foreground">
            Your go-to Twitter Video Downloader
          </div>
        </div>
      );
    };

    export default LoadingScreen;