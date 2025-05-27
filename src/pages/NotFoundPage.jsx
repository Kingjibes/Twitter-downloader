import React from 'react';
    import { Link } from 'react-router-dom';
    import { motion } from 'framer-motion';
    import { Button } from '@/components/ui/button';
    import { AlertTriangle } from 'lucide-react';

    const NotFoundPage = () => {
      return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center px-4 py-8">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
          >
            <AlertTriangle className="h-24 w-24 text-destructive mb-6" />
          </motion.div>
          
          <motion.h1 
            className="text-5xl md:text-7xl font-extrabold mb-4 text-foreground"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            404
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl font-semibold text-muted-foreground mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Oops! Page Not Found.
          </motion.p>
          
          <motion.p 
            className="text-md text-muted-foreground mb-8 max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            It seems like the page you're looking for doesn't exist or has been moved. Don't worry, let's get you back on track.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link to="/">
                Go Back to Homepage
              </Link>
            </Button>
          </motion.div>
        </div>
      );
    };

    export default NotFoundPage;