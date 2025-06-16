import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Trash2, Zap, Search, CircleSlash as EyeSlash, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { downloadVideoUtil, fetchVideoData } from '@/lib/downloadUtils';
import VideoPreviewCard from '@/components/VideoPreviewCard';

const BatchDownloadForm = ({ setRecentDownloads }) => {
  const [batchItems, setBatchItems] = useState([{ id: Date.now(), url: '', data: null, previewLoading: false }]);
  const [batchDownloading, setBatchDownloading] = useState(false);

  const addBatchUrl = () => {
    setBatchItems([...batchItems, { id: Date.now(), url: '', data: null, previewLoading: false }]);
  };

  const updateBatchUrl = (id, value) => {
    setBatchItems(prevItems => 
      prevItems.map(item => item.id === id ? { ...item, url: value, data: null } : item)
    );
  };

  const removeBatchUrl = (id) => {
    setBatchItems(batchItems.filter(item => item.id !== id));
  };

  const handleFetchPreviewForItem = async (id) => {
    const itemIndex = batchItems.findIndex(item => item.id === id);
    if (itemIndex === -1 || !batchItems[itemIndex].url.trim()) {
      toast({ title: "URL Required!", description: "Please enter a URL for this item.", variant: "destructive" });
      return;
    }

    setBatchItems(prevItems => 
      prevItems.map(item => item.id === id ? { ...item, previewLoading: true, data: null } : item)
    );

    const data = await fetchVideoData(batchItems[itemIndex].url);
    
    setBatchItems(prevItems => 
      prevItems.map(item => item.id === id ? { ...item, data: data, previewLoading: false } : item)
    );
  };

  const handleActualDownload = async (quality, videoDataToSave, originalUrl) => {
    setBatchDownloading(true); 
    await downloadVideoUtil(originalUrl, quality, setRecentDownloads, videoDataToSave);
    
    setBatchItems(prevItems => prevItems.map(item => item.url === originalUrl ? {...item, data: null, url: ''} : item));
    const activeItems = batchItems.filter(item => item.url.trim() || item.data);
    if(activeItems.length <=1 && activeItems[0]?.url === originalUrl ) {
      setBatchItems([{ id: Date.now(), url: '', data: null, previewLoading: false }]);
    }
    setBatchDownloading(false);
  };

  const handleMasterBatchDownload = async (quality) => {
    const itemsWithData = batchItems.filter(item => item.data && item.url.trim());
    
    if (itemsWithData.length === 0) {
      toast({
        title: "No Previews Fetched! 📝",
        description: "Please fetch previews for videos you want to download, or ensure URLs are valid.",
        variant: "destructive",
      });
      return;
    }

    setBatchDownloading(true);
    let successCount = 0;

    for (const item of itemsWithData) {
      const success = await downloadVideoUtil(item.url, quality, setRecentDownloads, item.data);
      if (success) successCount++;
      await new Promise(resolve => setTimeout(resolve, 1000)); 
    }
    
    setBatchItems(prevItems => prevItems.map(item => itemsWithData.find(d => d.id === item.id) ? { ...item, data: null, url: ''} : item).filter(item => item.url.trim()));
    if(batchItems.filter(item => item.url.trim() || item.data).length === 0){
         setBatchItems([{ id: Date.now(), url: '', data: null, previewLoading: false }]);
    }


    setBatchDownloading(false);
    
    toast({
      title: `Batch Download Complete! 🚀`,
      description: `Successfully downloaded ${successCount} out of ${itemsWithData.length} videos!`,
    });
  };


  return (
    <div className="glass-effect rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <Zap className="w-7 h-7 text-purple-400" />
        <h2 className="text-2xl font-bold text-white">Batch Download</h2>
      </div>
      
      <div className="space-y-5">
        <AnimatePresence>
          {batchItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 border border-purple-500/30 rounded-lg bg-purple-900/20 shadow-md"
            >
              <div className="flex flex-col sm:flex-row gap-3 items-center">
                <span className="text-purple-300 font-medium hidden sm:inline">{index + 1}.</span>
                <input
                  type="text"
                  placeholder={`Paste Twitter URL ${index + 1} here...`}
                  value={item.url}
                  onChange={(e) => updateBatchUrl(item.id, e.target.value)}
                  className="flex-1 px-4 py-3 bg-gray-800/60 border border-purple-500/40 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/30 transition-all w-full"
                />
                <div className="flex gap-2 w-full sm:w-auto">
                  <Button
                    onClick={() => handleFetchPreviewForItem(item.id)}
                    disabled={item.previewLoading || !item.url.trim()}
                    size="default" 
                    className="flex-1 sm:flex-none bg-teal-500 hover:bg-teal-600 text-white py-3 px-4 rounded-lg transition-all transform hover:scale-105"
                  >
                    {item.previewLoading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Search className="w-5 h-5" />}
                  </Button>
                  {batchItems.length > 1 && (
                    <Button
                      onClick={() => removeBatchUrl(item.id)}
                      variant="outline"
                      size="default" 
                      className="flex-1 sm:flex-none border-red-500/60 text-red-400 hover:bg-red-500/20 py-3 px-4 rounded-lg transition-all"
                    >
                      <Trash2 className="w-5 h-5" />
                    </Button>
                  )}
                </div>
              </div>
              {item.data && (
                <VideoPreviewCard 
                  videoData={item.data} 
                  onDownload={(quality, data) => handleActualDownload(quality, data, item.url)}
                  isDownloading={batchDownloading}
                />
              )}
              {!item.data && !item.previewLoading && item.url.trim() && (
                 <p className="text-xs text-center text-gray-400 pt-3">Press search icon to fetch preview for this URL.</p>
              )}
               {!item.data && item.previewLoading && (
                 <p className="text-xs text-center text-gray-400 pt-3 pulse-animation">Fetching preview...</p>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        
        <Button
          onClick={addBatchUrl}
          variant="outline"
          className="w-full border-purple-500/60 text-purple-300 hover:bg-purple-500/20 font-semibold py-3 rounded-lg transition-all flex items-center justify-center gap-2"
        >
          <PlusCircle className="w-5 h-5" /> Add Another URL
        </Button>
        
        {batchItems.some(item => item.data) && (
          <div className="flex flex-col sm:flex-row gap-3 mt-5">
            <Button
              onClick={() => handleMasterBatchDownload('HD')}
              disabled={batchDownloading}
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-5 rounded-lg transition-all transform hover:scale-105 shadow-lg"
            >
              {batchDownloading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing...
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <Download className="w-5 h-5" />
                  Download All Previews (HD)
                </div>
              )}
            </Button>
            
            <Button
              onClick={() => handleMasterBatchDownload('SD')}
              disabled={batchDownloading}
              variant="outline"
              className="flex-1 border-purple-500/70 text-purple-300 hover:bg-purple-500/20 font-semibold py-3 px-5 rounded-lg transition-all transform hover:scale-105"
            >
              {batchDownloading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-purple-400/30 border-t-purple-400 rounded-full animate-spin" />
                  Processing...
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <Download className="w-5 h-5" />
                  Download All Previews (SD)
                </div>
              )}
            </Button>
          </div>
        )}
         {batchItems.every(item => !item.data) && batchItems.some(item => item.url.trim()) && !batchDownloading && (
           <p className="text-sm text-center text-yellow-400/90 pt-3 flex items-center justify-center gap-2">
            <EyeSlash className="w-5 h-5" /> Fetch previews before batch downloading.
           </p>
         )}
      </div>
    </div>
  );
};

export default BatchDownloadForm;