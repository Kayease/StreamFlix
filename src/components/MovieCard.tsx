import { useState, useCallback, memo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { Play, Plus, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { VideoPlayer } from './VideoPlayer';
import { toast } from '@/components/ui/use-toast';

interface MovieCardProps {
  id: number;
  title: string;
  image: string;
  genre: string;
  rating: string;
  year: string;
  description: string;
}

const MovieCard = memo(({ id, title, image, genre, rating, year, description }: MovieCardProps) => {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  
  // Check if movie is in watchlist on component mount
  useEffect(() => {
    const watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
    setIsInWatchlist(watchlist.some((item: any) => item.title === title));
  }, [title]);
  
  const handleImageError = useCallback(() => setImageError(true), []);
  const openModal = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsModalOpen(true);
  }, []);

  const navigateToDetails = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/movie/${id}`);
  }, [id, navigate]);

  const closeModal = useCallback(() => setIsModalOpen(false), []);

  const toggleWatchlist = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    const watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
    
    if (isInWatchlist) {
      const newWatchlist = watchlist.filter((item: any) => item.title !== title);
      localStorage.setItem('watchlist', JSON.stringify(newWatchlist));
      setIsInWatchlist(false);
      
      toast({
        title: "Removed from Watchlist",
        description: `${title} has been removed from your wishlist.`,
        variant: "destructive",
      });
    } else {
      const movieData = { id, title, image, genre, rating, year, description };
      localStorage.setItem('watchlist', JSON.stringify([...watchlist, movieData]));
      setIsInWatchlist(true);
      
      toast({
        title: "Added to Watchlist",
        description: `${title} has been added to your wishlist!`,
        variant: "default",
      });
    }
  }, [isInWatchlist, id, title, image, genre, rating, year, description]);

  return (
    <div 
      className="w-full h-full relative group cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-105 flex flex-col"
      onClick={navigateToDetails}
    >
      {/* Image with fallback overlay */}
      <div className="relative w-full h-full overflow-hidden rounded-lg">
        <img
          src={image}
          alt={title}
          className={`w-full h-full object-cover rounded-lg transition-all duration-300 ease-in-out transform group-hover:scale-110 ${
            imageError ? 'opacity-0' : 'opacity-100'
          }`}
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
          }}
          onError={() => setImageError(true)}
        />
        {/* Fallback overlay for missing images */}
        <div className={`absolute inset-0 bg-gradient-to-br from-card to-accent rounded-lg flex items-center justify-center transition-opacity duration-300 ${
          imageError ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="text-center p-2">
            <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2">
              <Play className="h-4 w-4 text-primary" />
            </div>
            <p className="text-xs text-muted-foreground font-medium line-clamp-2">{title}</p>
          </div>
        </div>
      </div>
      
      {/* Bottom Details Overlay - Shows on hover on desktop, always visible on mobile */}
      <div className="absolute bottom-0 left-0 right-0 h-auto md:h-0 opacity-100 md:opacity-0 group-hover:opacity-100 group-hover:h-auto bg-gradient-to-t from-black/90 via-black/70 to-transparent rounded-b-lg transition-all duration-300 ease-in-out transform translate-y-2 group-hover:translate-y-0 flex-1 flex flex-col justify-end">
        <div className="p-2 sm:p-3">
          <h3 className="text-white font-bold text-xs sm:text-sm mb-1 line-clamp-1">{title}</h3>
          <div className="text-[10px] xs:text-xs text-gray-300 mb-1 sm:mb-2 line-clamp-1">
            {year} • {genre} • ⭐ {rating}
          </div>
          <p className="hidden xs:block text-[10px] sm:text-xs text-gray-300 line-clamp-2 mb-2 sm:mb-3">{description}</p>
          
          <div className="flex items-center justify-between w-full gap-1.5 sm:gap-2.5">
            <div className="flex-1 min-w-0">
              <Button 
                size="sm"
                className="w-full h-7 sm:h-8 px-2 sm:px-3 bg-white hover:bg-gray-200 text-black text-xs sm:text-sm font-medium transition-colors flex items-center justify-center"
                onClick={(e) => {
                  e.stopPropagation();
                  openModal(e);
                }}
              >
                <Play className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 flex-shrink-0" />
                <span className="truncate text-xs sm:text-sm">Watch Now</span>
              </Button>
            </div>
            <div className="flex-shrink-0">
              <Button 
                size="sm"
                variant="outline"
                className="h-7 sm:h-8 w-7 sm:w-8 p-0 flex items-center justify-center border-white/30 text-white hover:bg-white/10 transition-colors"
                onClick={toggleWatchlist}
              >
                {isInWatchlist ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Plus className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Scale Effect */}
      <div className="absolute -inset-1 bg-primary/20 rounded-lg -z-10 opacity-0 scale-100 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300 ease-in-out" />

      {isModalOpen && createPortal(
        <VideoPlayer
          isOpen={isModalOpen}
          onClose={closeModal}
          title={title}
          description={description}
          genre={genre}
          rating={rating}
          year={year}
          videoUrl="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        />,
        document.body
      )}
    </div>
  );
});

MovieCard.displayName = 'MovieCard';
export default MovieCard;