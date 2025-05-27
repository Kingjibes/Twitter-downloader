import React from 'react';
    import { DownloadCloud, Twitter } from 'lucide-react';

    const Logo = ({ className }) => {
      return (
        <div className={`relative ${className} flex items-center justify-center`}>
          <Twitter className="text-primary h-[70%] w-[70%]" />
          <DownloadCloud className="absolute bottom-0 right-0 h-[50%] w-[50%] text-sky-400 dark:text-sky-300 transform translate-x-1/4 translate-y-1/4 opacity-90" />
        </div>
      );
    };

    export default Logo;