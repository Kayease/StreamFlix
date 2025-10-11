import { useState, useEffect } from 'react';
import { Search, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation, useNavigate } from 'react-router-dom';
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    // Cleanup function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/movies?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Movies', path: '/movies' },
    { name: 'Sports', path: '/sports' },
    { name: 'My Space', path: '/my-space' }
  ];

  useEffect(() => {
    let ticking = false;
    let lastScrollY = window.scrollY;
    
    const updateScrolled = () => {
      const currentScrollY = window.scrollY;
      // Only update if scroll position changed significantly (more than 1px)
      if (Math.abs(currentScrollY - lastScrollY) > 1) {
        const newScrolled = currentScrollY > 50;
        // Only update state if it actually changed
        if (newScrolled !== isScrolled) {
          setIsScrolled(newScrolled);
        }
        lastScrollY = currentScrollY;
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrolled);
        ticking = true;
      }
    };

    const handleResize = () => {
      // Only update for mobile and desktop
      if (window.innerWidth < 768 || window.innerWidth >= 1024) {
        updateScrolled();
      } else {
        // For tablet, always use scrolled state
        if (!isScrolled) setIsScrolled(true);
      }
    };

    // Initial setup
    if (window.innerWidth >= 768 && window.innerWidth < 1024) {
      // Tablet view - always scrolled
      if (!isScrolled) setIsScrolled(true);
    } else {
      // Mobile/Desktop - check initial scroll
      updateScrolled();
    }

    const scrollOptions = { passive: true, capture: true };
    const resizeOptions = { passive: true };
    
    window.addEventListener('scroll', handleScroll, scrollOptions);
    window.addEventListener('resize', handleResize, resizeOptions);
    
    return () => {
      window.removeEventListener('scroll', handleScroll, scrollOptions);
      window.removeEventListener('resize', handleResize, resizeOptions);
    };
  }, [isScrolled]); // Add isScrolled to dependencies to avoid stale closures

  // Close mobile menu when clicking outside or when a link is clicked
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (isMobileMenuOpen && !target.closest('.mobile-menu-container') && !target.closest('button[aria-label="Toggle menu"]')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside as EventListener);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside as EventListener);
      document.body.style.overflow = 'auto'; // Ensure we clean up
    };
  }, [isMobileMenuOpen]);

  return (
    <nav className={`fixed md:sticky top-0 left-0 right-0 z-50 transition-all duration-300 will-change-transform ${
      isScrolled 
        ? 'bg-background/95 backdrop-blur-md border-b border-border shadow-sm' 
        : 'bg-background/95 backdrop-blur-sm border-b border-border/20 md:bg-background/80 md:border-none'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 py-2 sm:py-3">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 sm:gap-3">
          {/* Logo and Mobile Menu Toggle */}
          <div className="w-full md:w-auto flex items-center justify-between">
            <Link to="/" className="block py-2" onClick={() => setIsMobileMenuOpen(false)}>
              <h1 className="text-2xl sm:text-3xl font-bold text-primary animate-glow hover:opacity-80 transition-opacity">
                StreamFlix
              </h1>
            </Link>
            <button 
              className="md:hidden text-foreground p-2 -mr-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6 xl:space-x-8">
            {navLinks.map((link) => (
              link.path.startsWith('#') ? (
                <a
                  key={link.name}
                  href={link.path}
                  className={`text-sm md:text-base lg:text-lg text-foreground hover:text-primary transition-colors font-medium ${
                    location.pathname === '/' && location.hash === link.path ? 'text-primary' : ''
                  } whitespace-nowrap`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm md:text-base lg:text-lg text-foreground hover:text-primary transition-colors font-medium ${
                    location.pathname === link.path ? 'text-primary' : ''
                  } whitespace-nowrap`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              )
            ))}
          </div>

          {/* Desktop Search and Auth Buttons */}
          <div className="hidden md:flex items-center space-x-2 md:space-x-3">
            <div className="relative w-32 md:w-40 lg:w-48">
              <input 
                type='search'
                placeholder='Search...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
                className='w-full bg-background/50 text-foreground pr-8 pl-3 py-1.5 md:py-2 rounded-md text-xs md:text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all duration-200'
              />
              <button 
                onClick={() => {
                  if (searchQuery.trim()) {
                    navigate(`/movies?search=${encodeURIComponent(searchQuery.trim())}`);
                    setSearchQuery('');
                  }
                }}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Search"
              >
                <Search className="h-3.5 w-3.5 md:h-4 md:w-4" />
              </button>
            </div>
            
            <div className="flex items-center space-x-1.5 md:space-x-2">
              <Link to="/auth?tab=login">
                <Button variant="outline" size="sm" className="h-8 md:h-9 text-xs md:text-sm">
                  Log In
                </Button>
              </Link>
              <Link to="/auth?tab=signup">
                <Button size="sm" className="h-8 md:h-9 text-xs md:text-sm">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu-container md:hidden w-full overflow-y-auto transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'max-h-[calc(100vh-64px)] mt-2 py-2 border-t border-border' : 'max-h-0'
        }`}>
          <div className="flex flex-col space-y-2 sm:space-y-3 px-1 pt-2">
            {navLinks.map((link) => (
              link.path.startsWith('#') ? (
                <a
                  key={link.name}
                  href={link.path}
                  className="py-2 px-3 rounded-md text-foreground hover:bg-accent hover:text-accent-foreground transition-colors font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`py-2.5 px-4 rounded-md hover:bg-accent transition-colors font-medium text-sm sm:text-base ${
                    location.pathname === link.path 
                      ? 'bg-accent text-accent-foreground' 
                      : 'text-foreground hover:text-accent-foreground'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              )
            ))}
            
            <div className="pt-1">
              <div className="relative w-full mb-3">
                <input 
                  type='search'
                  placeholder='Search movies...'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearch}
                  className='w-full bg-background text-foreground pr-10 pl-4 py-2 rounded-md text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all duration-200'
                />
                <button 
                  onClick={() => {
                    if (searchQuery.trim()) {
                      navigate(`/movies?search=${encodeURIComponent(searchQuery.trim())}`);
                      setSearchQuery('');
                      setIsMobileMenuOpen(false);
                    }
                  }}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Search"
                >
                  <Search className="h-4 w-4" />
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-3 w-full">
                <Link 
                  to="/auth?tab=login" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full"
                >
                  <Button variant="outline" size="sm" className="w-full text-sm">
                    Log In
                  </Button>
                </Link>
                <Link 
                  to="/auth?tab=signup" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full"
                >
                  <Button size="sm" className="w-full text-sm">
                    Sign Up
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;