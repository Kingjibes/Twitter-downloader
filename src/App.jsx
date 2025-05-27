import React, { useState, useEffect } from 'react';
    import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
    import { motion, AnimatePresence } from 'framer-motion';
    import Layout from '@/components/Layout';
    import HomePage from '@/pages/HomePage';
    import AboutPage from '@/pages/AboutPage';
    import NotFoundPage from '@/pages/NotFoundPage';
    import LoadingScreen from '@/components/LoadingScreen';
    import { Toaster } from '@/components/ui/toaster';
    import { ThemeProvider } from '@/components/ThemeProvider';

    function App() {
      const [isLoading, setIsLoading] = useState(true);

      useEffect(() => {
        const timer = setTimeout(() => {
          setIsLoading(false);
        }, 1500); 
        return () => clearTimeout(timer);
      }, []);

      if (isLoading) {
        return <LoadingScreen />;
      }

      return (
        <ThemeProvider defaultTheme="dark" storageKey="twitter-downloader-theme">
          <Router>
            <Layout>
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={<PageWrapper><HomePage /></PageWrapper>} />
                  <Route path="/about" element={<PageWrapper><AboutPage /></PageWrapper>} />
                  <Route path="*" element={<PageWrapper><NotFoundPage /></PageWrapper>} />
                </Routes>
              </AnimatePresence>
            </Layout>
            <Toaster />
          </Router>
        </ThemeProvider>
      );
    }

    const PageWrapper = ({ children }) => (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="w-full"
      >
        {children}
      </motion.div>
    );

    export default App;