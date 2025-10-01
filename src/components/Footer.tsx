import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXTwitter, faFacebook, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';

interface FooterProps {
  className?: string;
}

const Footer = ({ className = '' }: FooterProps) => {
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
      <div className="pl-4 pr-4 md:pl-16 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 ">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <Link to="/">
              <h3 className="text-4xl font-bold text-primary mb-1 animate-glow hover:opacity-80 smooth-transition">StreamFlix</h3>
            </Link>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Your ultimate destination for premium streaming content. Watch anywhere, anytime.
            </p>
          </div>
          {/* Quick Links */}
          <div className="md:col-span-1">
            <h4 className="text-2xl font-semibold text-foreground mb-2 ">Quick Links</h4>
            <ul className="space-y-2 text-lg px-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-foreground smooth-transition flex items-center gap-2 text-xl"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-1">
            <h4 className="text-2xl font-semibold text-foreground mb-4">Support</h4>
            <ul className="space-y-2 text-lg px-4">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-primary smooth-transition text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div className="md:col-span-1">
            <h4 className="text-2xl font-semibold text-foreground mb-4 px-2" >Follow Us</h4>
            <div className="flex space-x-4 text-xl">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-muted hover:bg-primary smooth-transition rounded-full flex items-center justify-center text-muted-foreground hover:text-primary-foreground"
                >
                  <FontAwesomeIcon icon={social.icon} className="h-5 w-5" />
                </a>
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