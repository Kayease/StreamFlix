import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ChevronLeftCircle, ChevronRightCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MovieCard from './MovieCard';
import { cn } from '@/lib/utils';

export interface Movie {
  id: number;
  title: string;
  image: string;
  genre?: string;
  rating: string;
  year: string;
  description: string;
  [key: string]: any;
}

interface ContentSectionProps {
  title: string;
  movies: Movie[];
}

const ContentSection = ({ title, movies }: ContentSectionProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);
  const [isScrolling, setIsScrolling] = useState(false);
  let scrollTimeout: NodeJS.Timeout;

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const hasHorizontalScroll = scrollWidth > clientWidth;
      
      // Always show both buttons if there's horizontal scroll
      if (hasHorizontalScroll) {
        setShowLeftButton(true);
        setShowRightButton(true);
      } else {
        setShowLeftButton(false);
        setShowRightButton(false);
      }
    }
  };

  useEffect(() => {
    const currentRef = scrollRef.current;
    
    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        checkScroll();
        setIsScrolling(false);
      }, 100);
    };

    if (currentRef) {
      currentRef.addEventListener('scroll', handleScroll);
      // Initial check
      checkScroll();
    }

    // Handle window resize
    const handleResize = () => checkScroll();
    window.addEventListener('resize', handleResize);

    return () => {
      if (currentRef) {
        currentRef.removeEventListener('scroll', handleScroll);
      }
      window.removeEventListener('resize', handleResize);
      clearTimeout(scrollTimeout);
    };
  }, [movies]);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const scrollAmount = clientWidth * 0.8; // Scroll 80% of container width
    
    let newScrollLeft = scrollLeft + (direction === 'right' ? scrollAmount : -scrollAmount);
    
    // Ensure we don't scroll past the boundaries
    newScrollLeft = Math.max(0, Math.min(newScrollLeft, scrollWidth - clientWidth));
    
    scrollRef.current.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth',
    });
  };

  return (
    <div className="w-full h-full relative">
      <div className="flex items-center justify-between mb-4 px-2">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          {title}
        </h2>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => scroll('left')}
            className={cn(
              'w-8 h-8 rounded-full',
              'bg-background/80 backdrop-blur-sm',
              'shadow-md',
              'focus:outline-none',
              'z-20',
              'flex items-center justify-center',
              !showLeftButton ? 'opacity-30 cursor-default' : 'opacity-100'
            )}
            aria-label={`Scroll ${title} left`}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => scroll('right')}
            className={cn(
              'w-8 h-8 rounded-full',
              'bg-background/80 backdrop-blur-sm',
              'shadow-md',
              'focus:outline-none',
              'z-20',
              'flex items-center justify-center',
              !showRightButton ? 'opacity-30 cursor-default' : 'opacity-100'
            )}
            aria-label={`Scroll ${title} right`}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="relative w-full">
        {/* Left Gradient Fade */}
        <div 
          className={cn(
            'absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none',
            'bg-gradient-to-r from-background to-transparent',
            showLeftButton ? 'opacity-100' : 'opacity-0'
          )}
          aria-hidden="true"
        />
        
        {/* Right Gradient Fade */}
        <div 
          className={cn(
            'absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none',
            'bg-gradient-to-l from-background to-transparent',
            showRightButton ? 'opacity-100' : 'opacity-0'
          )}
          aria-hidden="true"
        />
        
        <div
          ref={scrollRef}
          className={cn(
            'flex flex-row gap-6 overflow-x-auto overflow-y-hidden py-2 px-2',
            'scrollbar-none', // Hide scrollbar
            'transition-colors duration-300',
            'relative',
            isScrolling ? 'cursor-grabbing' : 'cursor-grab',
            // Hide scrollbar for different browsers
            '[&::-webkit-scrollbar]:hidden',
            '[-ms-overflow-style:none]',
            '[scrollbar-width:none]'
          )}
          style={{
            scrollBehavior: 'smooth',
            WebkitOverflowScrolling: 'touch',
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
          }}
          onMouseDown={() => setIsScrolling(true)}
          onMouseUp={() => setIsScrolling(false)}
          onMouseLeave={() => setIsScrolling(false)}
        >
          {movies.map((movie) => (
            <div
              key={movie.id}
              className={cn(
                'flex-shrink-0 w-40 md:w-48 lg:w-56 relative',
                'transition-all duration-300 ease-out',
                'transform hover:scale-105 hover:z-10',
                'rounded-lg overflow-hidden',
                'shadow-md hover:shadow-xl',
                'border border-border/50 hover:border-primary/30',
                'bg-card',
                isScrolling ? 'cursor-grabbing' : 'cursor-grab'
              )}
              style={{ aspectRatio: '2/3' }}
            >
              <div className="w-full h-full">
                <MovieCard
                  id={movie.id}
                  title={movie.title}
                  image={movie.image}
                  genre={movie.genre}
                  rating={movie.rating}
                  year={movie.year}
                  description={movie.description}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContentSection;
