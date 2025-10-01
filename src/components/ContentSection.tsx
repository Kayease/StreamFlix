import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MovieCard from './MovieCard';

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

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 240; // desktop-friendly scroll step
      const newScrollLeft =
        scrollRef.current.scrollLeft +
        (direction === 'right' ? scrollAmount : -scrollAmount);

      scrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="w-full h-full">
      <div className="mb-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          {title}
        </h2>
      </div>

      <div className="relative w-full">
        <div
          ref={scrollRef}
          className="flex flex-row gap-6 overflow-x-auto overflow-y-hidden px-4 py-4 scrollbar-hide"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
            scrollBehavior: 'smooth',
          }}
        >
          {movies.map((movie) => (
            <div
              key={movie.id}
              /* fixed width + native aspect-ratio for consistent height */
              className="flex-shrink-0 w-40 md:w-48 lg:w-56 relative group transition-transform duration-300 hover:scale-105 hover:z-10 overflow-hidden rounded-md"
              style={{ display: 'flex', aspectRatio: '2 / 3' }}
            >
              {/* ensure MovieCard fills the wrapper */
              /* inner wrapper forces the child to occupy full computed height */}
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
