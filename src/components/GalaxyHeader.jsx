
import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const GalaxyHeader = () => {
  return (
    <div className="galaxy-bg h-64 flex items-center justify-center relative">
      <div className="text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center gap-4 mb-4"
        >
          <img   
            class="w-16 h-16 rounded-full border-4 border-cyan-400 neon-glow" 
            alt="HACKERPRO Profile"
            src="https://zuctusbetucsmsywshyk.supabase.co/storage/v1/object/public/imgurl/51fkxi_1750104894398.jpg" />
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Twitter Video Downloader
            </h1>
            <p className="text-cyan-300 text-lg font-medium">
              Made by <span className="text-cyan-400 font-bold">HACKERPRO</span>
            </p>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center justify-center gap-2 text-cyan-200"
        >
          <Star className="w-5 h-5 text-yellow-400" />
          <span>Download Twitter videos in HD & SD quality</span>
          <Star className="w-5 h-5 text-yellow-400" />
        </motion.div>
      </div>
    </div>
  );
};

export default GalaxyHeader;
