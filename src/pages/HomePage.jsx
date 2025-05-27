import React, { useState, useEffect, useCallback } from 'react';
    import { motion, AnimatePresence } from 'framer-motion';
    import { Input } from '@/components/ui/input';
    import { Button } from '@/components/ui/button';
    import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
    import { Download, Link as LinkIcon, Loader2, AlertTriangle } from 'lucide-react';
    import { useToast } from '@/components/ui/use-toast';
    import VideoResultCard from '@/components/VideoResultCard';
    import DownloadHistory from '@/components/DownloadHistory';
    import { supabase } from '@/lib/supabaseClient';

    const API_BASE_URL = "https://apis.davidcyriltech.my.id/twitter?url=";
    const MAX_HISTORY_ITEMS = 10; 
    const ANONYMOUS_USER_ID_KEY = 'twitvid_anonymous_user_id';

    const getAnonymousUserId = () => {
      let userId = localStorage.getItem(ANONYMOUS_USER_ID_KEY);
      if (!userId) {
        userId = `anon_${Math.random().toString(36).substring(2, 15)}`;
        localStorage.setItem(ANONYMOUS_USER_ID_KEY, userId);
      }
      return userId;
    };


    const HomePage = () => {
      const [twitterUrl, setTwitterUrl] = useState('');
      const [videoData, setVideoData] = useState(null);
      const [isLoading, setIsLoading] = useState(false);
      const [error, setError] = useState('');
      const [downloadHistory, setDownloadHistory] = useState([]);
      const { toast } = useToast();
      const [anonymousUserId, setAnonymousUserId] = useState('');

      useEffect(() => {
        setAnonymousUserId(getAnonymousUserId());
      }, []);

      const fetchDownloadHistory = useCallback(async () => {
        if (!anonymousUserId) return;
        try {
          const { data, error } = await supabase
            .from('download_history')
            .select('*')
            .eq('user_identifier', anonymousUserId)
            .order('created_at', { ascending: false })
            .limit(MAX_HISTORY_ITEMS);

          if (error) throw error;
          setDownloadHistory(data || []);
        } catch (err) {
          console.error("Error fetching history:", err);
          toast({ title: "Error", description: "Could not fetch download history.", variant: "destructive" });
        }
      }, [anonymousUserId, toast]);

      useEffect(() => {
        if (anonymousUserId) {
          fetchDownloadHistory();
        }
      }, [anonymousUserId, fetchDownloadHistory]);


      const updateDownloadHistory = async (newItem) => {
        if (!anonymousUserId) return;
        try {
          const historyItem = {
            description: newItem.description,
            thumbnail: newItem.thumbnail,
            video_sd: newItem.video_sd,
            video_hd: newItem.video_hd,
            audio: newItem.audio,
            creator: newItem.creator,
            user_identifier: anonymousUserId,
          };
          
          const { error } = await supabase
            .from('download_history')
            .upsert(historyItem, { onConflict: 'description, user_identifier' }); 

          if (error) throw error;
          fetchDownloadHistory(); 
        } catch (err) {
          console.error("Error updating history:", err);
        }
      };
      
      const clearHistory = async () => {
        if (!anonymousUserId) return;
        try {
          const { error } = await supabase
            .from('download_history')
            .delete()
            .eq('user_identifier', anonymousUserId);
          
          if (error) throw error;
          setDownloadHistory([]);
          toast({ title: "History Cleared", description: "Your download history has been cleared."});
        } catch (err) {
          console.error("Error clearing history:", err);
          toast({ title: "Error", description: "Could not clear history.", variant: "destructive" });
        }
      };

      const isValidTwitterUrl = (url) => {
        try {
          const parsedUrl = new URL(url);
          return (parsedUrl.hostname === 'twitter.com' || parsedUrl.hostname === 'x.com') && parsedUrl.pathname.includes('/status/');
        } catch (e) {
          return false;
        }
      };

      const handleFetchVideo = async (urlToFetch = twitterUrl) => {
        if (!urlToFetch) {
          setError('Please paste a Twitter video URL.');
          return;
        }
        if (!isValidTwitterUrl(urlToFetch)) {
          setError('Invalid Twitter video URL. Please check the format (e.g., https://twitter.com/user/status/12345).');
          setVideoData(null);
          return;
        }

        setIsLoading(true);
        setError('');
        setVideoData(null);
        if (urlToFetch !== twitterUrl) setTwitterUrl(urlToFetch);


        try {
          const response = await fetch(`${API_BASE_URL}${encodeURIComponent(urlToFetch)}`);
          if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: "Failed to fetch video details. API error." }));
            throw new Error(errorData.message || `API responded with status: ${response.status}`);
          }
          const data = await response.json();

          if (data.success && (data.video_sd || data.video_hd || data.audio)) {
            setVideoData(data);
            await updateDownloadHistory(data);
            toast({
              title: "Video Ready!",
              description: "Your video details are loaded. Choose a format to download.",
              className: "bg-green-600 text-white border-green-700",
            });
          } else {
            throw new Error(data.description || 'Video not found or no downloadable links available.');
          }
        } catch (err) {
          console.error("Fetch error:", err);
          setError(err.message || 'An unexpected error occurred. Please try again.');
          toast({
            title: "Error Fetching Video",
            description: err.message || 'An unexpected error occurred.',
            variant: "destructive",
          });
        } finally {
          setIsLoading(false);
        }
      };
      
      const handleQuickReFetch = (itemUrl) => {
        setTwitterUrl(itemUrl); 
        handleFetchVideo(itemUrl); 
        window.scrollTo({ top: 0, behavior: 'smooth' });
      };


      const cardVariants = {
        hidden: { opacity: 0, y: 50, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
      };

      const inputButtonVariants = {
        rest: { scale: 1 },
        hover: { scale: 1.03 },
        tap: { scale: 0.97 }
      };
      
      return (
        <motion.div
          className="container mx-auto px-4 py-8 md:py-12 flex flex-col items-center"
          initial="hidden"
          animate="visible"
          variants={cardVariants}
        >
          <motion.div variants={cardVariants}>
            <Card className="w-full max-w-2xl bg-card/80 backdrop-blur-sm shadow-2xl overflow-hidden">
              <CardHeader className="text-center p-6 sm:p-8">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0, rotate: -180 }}
                  animate={{ scale: 1, opacity: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 150, damping: 15, delay: 0.2 }}
                  className="inline-block mx-auto mb-4"
                >
                  <LinkIcon className="h-16 w-16 text-primary" />
                </motion.div>
                <CardTitle className="text-3xl sm:text-4xl gradient-text-twitter">Twitter Video Downloader</CardTitle>
                <CardDescription className="text-base sm:text-lg text-muted-foreground pt-2">
                  Paste the URL of the Twitter video you want to download.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 p-6 sm:p-8">
                <motion.div className="space-y-2" variants={inputButtonVariants} whileHover="hover">
                  <Input
                    type="url"
                    placeholder="https://twitter.com/username/status/123..."
                    value={twitterUrl}
                    onChange={(e) => {
                      setTwitterUrl(e.target.value);
                      if (error) setError(''); 
                    }}
                    className="h-12 text-base px-4 border-2 focus:border-primary transition-all duration-300 ease-in-out"
                    aria-label="Twitter Video URL"
                  />
                </motion.div>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-destructive/10 border border-destructive/30 text-destructive p-3 rounded-md text-sm flex items-center"
                  >
                    <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0" />
                    <span>{error}</span>
                  </motion.div>
                )}
                <motion.div variants={inputButtonVariants} whileHover="hover" whileTap="tap">
                  <Button
                    onClick={() => handleFetchVideo()}
                    disabled={isLoading}
                    size="lg"
                    className="w-full text-lg py-6 bg-gradient-to-r from-primary to-sky-500 hover:from-primary/90 hover:to-sky-500/90 text-primary-foreground shadow-lg hover:shadow-xl transform transition-all duration-200"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-6 w-6 animate-spin" /> Fetching Video...
                      </>
                    ) : (
                      <>
                        <Download className="mr-2 h-6 w-6" /> Get Video
                      </>
                    )}
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          <AnimatePresence>
            {videoData && (
              <motion.div
                className="w-full max-w-2xl mt-8"
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.9 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <VideoResultCard videoData={videoData} toast={toast} />
              </motion.div>
            )}
          </AnimatePresence>
          
          <DownloadHistory 
            history={downloadHistory} 
            onClearHistory={clearHistory} 
            onReFetch={handleQuickReFetch} 
            isLoading={isLoading}
          />

           <section className="w-full max-w-3xl mt-16 text-center">
            <motion.h2 
              className="text-2xl sm:text-3xl font-bold mb-6 gradient-text-twitter"
              initial={{ opacity:0, y:20}}
              whileInView={{ opacity:1, y:0}}
              viewport={{once: true, amount: 0.3}}
              transition={{duration:0.5, delay:0.2}}
            >
              How It Works
            </motion.h2>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              {[
                { title: "Paste URL", description: "Find a video on Twitter, copy its URL (e.g., from the share button or browser address bar)." },
                { title: "Fetch Video", description: "Paste the URL into the input field above and click \"Get Video\". Our system will process it." },
                { title: "Download", description: "Choose your preferred quality (HD, SD, or Audio) and click \"Download\" to save it to your device." }
              ].map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity:0, y:20, scale:0.95}}
                  whileInView={{ opacity:1, y:0, scale:1}}
                  viewport={{once: true, amount: 0.3}}
                  transition={{duration:0.4, delay:0.3 + index * 0.1}}
                >
                  <Card className="bg-card/60 backdrop-blur-sm p-5 h-full hover:shadow-lg transition-shadow">
                    <div className="flex items-center mb-3">
                      <motion.span 
                        className="text-2xl font-bold text-primary mr-3"
                        initial={{rotate: -15, scale: 0.8}}
                        whileInView={{rotate:0, scale:1}}
                        transition={{type: "spring", stiffness:200, damping:10, delay:0.4 + index*0.1}}
                      >
                        {index + 1}.
                      </motion.span>
                      <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
            <motion.p 
              className="mt-8 text-xs text-muted-foreground"
              initial={{ opacity:0 }}
              whileInView={{ opacity:1 }}
              viewport={{once: true, amount: 0.3}}
              transition={{duration:0.5, delay:0.6}}
            >
                Please respect copyright and Twitter's terms of service. This tool is for personal use only.
                The video thumbnail and links are provided by an external API.
            </motion.p>
          </section>
        </motion.div>
      );
    };

    export default HomePage;