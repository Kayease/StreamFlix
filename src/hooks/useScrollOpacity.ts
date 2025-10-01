import { useState, useEffect } from 'react';

export const useScrollOpacity = () => {
  const [opacity, setOpacity] = useState(1);
  const [isContentVisible, setIsContentVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('hero-section');
      const contentSection = document.getElementById('content-section');
      
      if (!heroSection || !contentSection) return;

      const heroHeight = heroSection.offsetHeight;
      const scrollPosition = window.scrollY;
      
      // Calculate opacity based on scroll position (0 to 0.5 of hero height)
      const newOpacity = Math.max(0, 1 - (scrollPosition / (heroHeight * 0.5)));
      setOpacity(newOpacity);
      
      // Show content section when scrolled past 30% of hero height
      setIsContentVisible(scrollPosition > heroHeight * 0.3);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { opacity, isContentVisible };
};
