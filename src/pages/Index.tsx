import { useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import ContentSection, { Movie } from '@/components/ContentSection';
import Footer from '@/components/Footer';
import { movieSections } from '@/data/movies';
import HeroVideoCarousel from '@/components/HeroVideoCarousel';
import { useScrollOpacity } from '@/hooks/useScrollOpacity';

const Index = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { opacity, isContentVisible } = useScrollOpacity();

  useEffect(() => {
    if (heroRef.current && contentRef.current) {
      const heroSection = heroRef.current;
      const contentSection = contentRef.current;
      
      // Calculate scroll progress (0 to 1)
      const scrollProgress = window.scrollY / (heroSection.offsetHeight * 0.8);
      
      // Parallax, fade, and blur effect for hero
      heroSection.style.transform = `translateY(${window.scrollY * 0.5}px)`;
      heroSection.style.opacity = Math.max(0, 1 - scrollProgress * 1.5).toString();
      // Increase blur based on scroll progress (0px to 10px)
      const blurAmount = Math.min(12, scrollProgress * 20);
      heroSection.style.filter = `blur(${blurAmount}px)`;
      
      // Show content with fade-in and slight upward movement
      const contentProgress = Math.min(1, scrollProgress * 2);
      contentSection.style.opacity = Math.min(1, contentProgress * 2).toString();
      contentSection.style.transform = `translateY(${Math.max(-100, -50 + (contentProgress * 50))}px)`;
    }
  }, [opacity, isContentVisible]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="relative">
        <div 
          id="hero-section" 
          ref={heroRef} 
          className="relative z-10" 
          style={{ 
            transition: 'opacity 0.3s ease-out, filter 0.3s ease-out',
            willChange: 'transform, opacity, filter'
          }}
        >
          <HeroVideoCarousel />
        </div>
        
        <div 
          id="content-section"
          ref={contentRef}
          className="relative z-20 transition-all duration-500 ease-out -mt-16"
          style={{
            opacity: 0,
            transform: 'translateY(0)'
          }}
        >
          <div className=" pl-4  pr-4 mx-auto">
            {movieSections.map((section: { title: string; movies: Movie[] }, index: number) => (
              <ContentSection 
                key={index}
                title={section.title}
                movies={section.movies}
              />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
