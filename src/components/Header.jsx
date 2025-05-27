import React from 'react';
    import { Link, NavLink } from 'react-router-dom';
    import Logo from '@/components/Logo';
    import { Button } from '@/components/ui/button';
    import { Menu, Sun, Moon, Code } from 'lucide-react';
    import {
      DropdownMenu,
      DropdownMenuContent,
      DropdownMenuItem,
      DropdownMenuTrigger,
    } from "@/components/ui/dropdown-menu";
    import { useTheme } from "@/components/ThemeProvider";

    const Header = () => {
      const { theme, setTheme } = useTheme();

      const navLinks = [
        { to: '/', label: 'Home' },
        { to: '/about', label: 'About' },
      ];

      const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
      };

      return (
        <header className="sticky top-0 z-50 w-full bg-background/90 backdrop-blur-md shadow-md">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <Logo className="h-10 w-10" />
              <h1 className="text-xl sm:text-2xl font-bold gradient-text-twitter">
                TwitVid Downloader
              </h1>
            </Link>
            
            <div className="flex-grow hidden md:flex justify-center items-center">
              <nav className="flex items-center space-x-2">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className={({ isActive }) =>
                      `px-3 py-2 rounded-md text-sm font-medium transition-colors
                      ${isActive ? 'bg-primary text-primary-foreground' : 'text-foreground/80 hover:bg-accent hover:text-accent-foreground'}`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
              </nav>
            </div>

            <div className="flex items-center">
              <span className="hidden lg:flex items-center mr-4 font-mono text-xs text-muted-foreground">
                <Code size={14} className="mr-1 text-sky-400" />
                by <span className="font-semibold text-primary ml-1">Hackerpro</span>
              </span>
              <Button variant="ghost" size="icon" onClick={toggleTheme} className="text-foreground/80 hover:text-primary">
                {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                <span className="sr-only">Toggle theme</span>
              </Button>
              <div className="md:hidden ml-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-foreground/80 hover:text-primary">
                      <Menu className="h-6 w-6" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-popover border-border text-popover-foreground w-48">
                    {navLinks.map((link) => (
                      <DropdownMenuItem key={link.to} asChild className="focus:bg-accent focus:text-accent-foreground cursor-pointer">
                        <Link to={link.to} className="flex items-center w-full py-2 px-3">
                          {link.label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                     <DropdownMenuItem className="focus:bg-accent focus:text-accent-foreground cursor-default mt-2 lg:hidden">
                        <span className="flex items-center w-full py-1 px-3 font-mono text-xs text-muted-foreground">
                            <Code size={14} className="mr-1 text-sky-400" />
                            by <span className="font-semibold text-primary ml-1">Hackerpro</span>
                        </span>
                     </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </header>
      );
    };

    export default Header;