import React from 'react';
    import { Link } from 'react-router-dom';
    import { Twitter, Github, Heart, Code } from 'lucide-react';

    const Footer = () => {
      const currentYear = new Date().getFullYear();

      return (
        <footer className="bg-card/80 backdrop-blur-sm border-t border-border text-muted-foreground py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div>
                <p className="font-semibold text-foreground mb-2">TwitVid Downloader</p>
                <p className="text-sm">Quickly download your favorite Twitter videos.</p>
              </div>
              <div>
                <p className="font-semibold text-foreground mb-2">Quick Links</p>
                <ul className="space-y-1">
                  <li>
                    <Link to="/" className="hover:text-primary transition-colors text-sm">Home</Link>
                  </li>
                  <li>
                    <Link to="/about" className="hover:text-primary transition-colors text-sm">About Us</Link>
                  </li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-foreground mb-2">Connect with Us</p>
                <div className="flex space-x-4">
                  <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-primary transition-colors">
                    <Twitter size={20} />
                  </a>
                  <a href="https://github.com/" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-primary transition-colors">
                    <Github size={20} />
                  </a>
                </div>
              </div>
            </div>
            <div className="border-t border-border pt-8 text-center text-sm">
              <p>&copy; {currentYear} TwitVid Downloader. All rights reserved.</p>
              <p className="mt-2 flex items-center justify-center font-mono text-xs tracking-wider">
                <Code size={14} className="mr-1.5 text-sky-400" />
                Made by <span className="font-bold text-primary ml-1">Hackerpro</span>
              </p>
              <p className="mt-1 flex items-center justify-center">
                Built with <Heart size={14} className="mx-1 text-red-500" /> for easy video downloading.
              </p>
            </div>
          </div>
        </footer>
      );
    };

    export default Footer;