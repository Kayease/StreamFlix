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

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/movies?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Movies', path: '/movies' },
    { name: 'Sports', path: '/sports' },
    { name: 'My Space', path: '/my-space' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-background/95 backdrop-blur-md border-b border-border' 
        : 'sm:bg-transparent bg-background/80 backdrop-blur-sm border-b border-border/20 sm:border-none'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Logo and Mobile Menu */}
          <div className="w-full sm:w-auto flex items-center justify-between">
            <Link to="/" className="block">
              <h1 className="text-3xl sm:text-4xl font-bold text-primary animate-glow hover:opacity-80 smooth-transition">
                StreamFlix
              </h1>
            </Link>
            <button 
              className="sm:hidden text-foreground p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-28">
            {navLinks.map((link) => (
              link.path.startsWith('#') ? (
                <a
                  key={link.name}
                  href={link.path}
                  className={` text-2xl text-foreground hover:text-primary smooth-transition font-bold ${
                    location.pathname === '/' && location.hash === link.path ? 'text-primary' : ''
                  }`}
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.path}
                  className={` text-2xl text-foreground hover:text-primary smooth-transition font-bold ${
                    location.pathname === link.path ? 'text-primary' : ''
                  }`}
                >
                  {link.name}
                </Link>
              )
            ))}
          </div>

          {/* Search and Auth Buttons */}
          <div className={`w-full sm:w-auto flex flex-col sm:flex-row items-center gap-4 transition-all duration-300 ${
            isMobileMenuOpen ? 'flex' : 'hidden sm:flex'
          }`}>
            <div className="relative w-full sm:w-48">
              <input 
                type='search'
                placeholder='Search....'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
                className='w-full bg-transparent text-white pr-10 pl-4 py-2 rounded-md text-base border border-gray-600 focus:outline-none focus:border-primary transition-colors duration-200'
              />
              <button 
                onClick={() => searchQuery.trim() && navigate(`/movies?search=${encodeURIComponent(searchQuery.trim())}`)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>
            </div>
            
            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              <Link to="/auth?tab=login">
                <Button variant="ghost" className="text-foreground hover:text-primary hover:bg-primary/10 ">
                  Log In
                </Button>
              </Link>
              <Link to="/auth?tab=signup">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border animate-fade-in">
            <div className="flex flex-col space-y-4 pt-4">
              {navLinks.map((link) => (
                link.path.startsWith('#') ? (
                  <a
                    key={link.name}
                    href={link.path}
                    className="text-foreground hover:text-primary smooth-transition font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="text-foreground hover:text-primary smooth-transition font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                )
              ))}
              {/* Mobile Auth Buttons */}
              <div className="flex flex-col space-y-3 pt-2">
                <Link to="/auth?tab=login" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Log In
                  </Button>
                </Link>
                <Link to="/auth?tab=signup" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full">
                    Sign Up
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;