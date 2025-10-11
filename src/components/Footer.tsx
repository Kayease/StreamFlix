import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXTwitter, faFacebook, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

interface FooterProps {
  className?: string;
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

const Footer = ({ className = '' }: FooterProps) => {
  const location = useLocation();
  
  useEffect(() => {
    // This will run when location changes, which happens after navigation
    scrollToTop();
  }, [location]);
  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Movies', href: '/movies' },
   
    { name: 'Sports', href: '/sports' },
    { name: 'My Space', href: '/my-space' },
  ]
  const supportLinks = [
    { name: 'About', href: '/about' },
    { name: 'Help', href: '/help' },
    { name: 'Terms', href: '/terms' },
    { name: 'Privacy', href: '/privacy' },
  ];

  const socialLinks = [
    { icon: faFacebook, href: 'https://www.facebook.com/' },
    { icon: faXTwitter, href: 'https://x.com/' },
    { icon: faInstagram, href: 'https://www.instagram.com/accounts/login/?next=https%3A%2F%2Fwww.instagram.com%2Freels%2F%3Fhl%3Den%26__coig_login%3D1#' },
    { icon: faYoutube, href: 'https://youtube.com' },
  ];

  return (
    <footer className={`bg-background border-t border-border w-full ${className}`}>
      <div className="px-4 md:px-8 lg:pl-16 py-8 md:py-12">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Logo and Description */}
          <div className="col-span-2 md:col-span-1 lg:col-span-1">
            <Link to="/">
              <h3 className="text-4xl font-bold text-primary mb-1 animate-glow hover:opacity-80 smooth-transition">StreamFlix</h3>
            </Link>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Your ultimate destination for premium streaming content. Watch anywhere, anytime.
            </p>
          </div>
          {/* Quick Links */}
          <div className="col-span-2 md:col-span-1 lg:col-span-1">
            <h4 className="text-xl md:text-2xl font-semibold text-foreground mb-2 md:mb-3">Quick Links</h4>
            <ul className="space-y-1 md:space-y-2 text-base md:text-lg px-0 md:px-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    onClick={scrollToTop}
                    className="text-muted-foreground hover:text-foreground smooth-transition flex items-center gap-2 text-xl"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-2 md:col-span-1 lg:col-span-1">
            <h4 className="text-xl md:text-2xl font-semibold text-foreground mb-3 md:mb-4">Support</h4>
            <ul className="space-y-1 md:space-y-2 text-base md:text-lg px-0 md:px-4">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    onClick={scrollToTop}
                    className="text-muted-foreground hover:text-primary smooth-transition text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div className="col-span-2 md:col-span-1 lg:col-span-1">
            <h4 className="text-xl md:text-2xl font-semibold text-foreground mb-3 md:mb-4 px-0 md:px-2">Follow Us</h4>
            <div className="flex flex-wrap gap-3 md:gap-4 text-lg md:text-xl">
              {socialLinks.map((social, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    // Optional: Add any click effect or animation here
                    const btn = e.currentTarget;
                    btn.classList.add('scale-90');
                    setTimeout(() => btn.classList.remove('scale-90'), 100);
                  }}
                  className="w-10 h-10 bg-muted hover:bg-muted/80 rounded-full flex items-center justify-center text-muted-foreground cursor-pointer transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  aria-label={`${social.icon.iconName} (not linked)`}
                  title="Click for feedback (no redirection)"
                >
                  <FontAwesomeIcon icon={social.icon} className="h-5 w-5" />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © 2025 StreamFlix. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm mt-4 md:mt-0">
            Made with ❤️ for movie lovers worldwide
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;