import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Plus, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { movieSections } from '@/data/movies';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { toast } from '@/components/ui/use-toast';

interface Movie {
  id: number;
  title: string;
  image: string;
  genre: string;
  rating: string;
  year: string;
  description: string;
  duration?: string;
  director?: string;
  cast?: string[];
  [key: string]: any;
}

export default function MovieDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Find the movie by ID
    const allMovies = movieSections.flatMap(section => section.movies);
    const foundMovie = allMovies.find(m => m.id === Number(id));
    
    if (foundMovie) {
      setMovie(foundMovie);
      // Check if movie is in watchlist
      const watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
      setIsInWatchlist(watchlist.some((item: any) => item.id === foundMovie.id));
    }
    setIsLoading(false);
  }, [id]);

  const toggleWatchlist = () => {
    if (!movie) return;
    
    const watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
    let updatedWatchlist;
    
    if (isInWatchlist) {
      updatedWatchlist = watchlist.filter((item: any) => item.id !== movie.id);
      toast({
        title: "Removed from Watchlist",
        description: `❌ ${movie.title} has been removed from your watchlist.`,
        variant: "destructive",
      });
    } else {
      updatedWatchlist = [...watchlist, movie];
      toast({
        title: "Added to Watchlist",
        description: `🎬 ${movie.title} has been added to your watchlist!`,
        variant: "default",
      });
    }
    
    localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
    setIsInWatchlist(!isInWatchlist);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-4 text-center">
          <h1 className="text-2xl font-bold mb-4">Movie not found</h1>
          <p className="text-muted-foreground mb-6">The movie you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/movies')}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Movies
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Backdrop Image */}
      <div className="relative pt-24 pb-16 md:pt-32 md:pb-24 w-full overflow-hidden">
        <div className="absolute inset-0">
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${movie.image})`,
              filter: 'brightness(0.4)',
              backgroundPosition: 'center 30%',
              backgroundAttachment: 'fixed',
              minHeight: '100%',
              minWidth: '100%',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10 h-full flex flex-col justify-end">
          <div className="max-w-7xl mx-auto w-full">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-fit mb-6 bg-background/80 backdrop-blur-sm"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8 max-w-7xl mx-auto w-full pb-12">
            <div className="w-full md:w-1/3 lg:w-1/4 flex-shrink-0">
              <div className="relative pt-[150%] rounded-lg overflow-hidden shadow-xl">
                <img 
                  src={movie.image} 
                  alt={movie.title} 
                  className="absolute top-0 left-0 w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder.svg';
                  }}
                />
              </div>
            </div>
            
            <div className="flex-1 text-white">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">{movie.title}</h1>
              
              <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-muted-foreground">
                <span>{movie.year}</span>
                <span>•</span>
                <span>{movie.genre}</span>
                <span>•</span>
                <span className="flex items-center">
                  <span className="text-yellow-400 mr-1">★</span> {movie.rating}
                </span>
                {movie.duration && (
                  <>
                    <span>•</span>
                    <span>{movie.duration}</span>
                  </>
                )}
              </div>
              
              <div className="flex gap-3 mb-6">
                <Button 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  onClick={() => {
                    toast({
                      title: "Starting Playback",
                      description: `Now playing: ${movie.title}`,
                      variant: "default",
                    });
                  }}
                >
                  <Play className="mr-2 h-4 w-4" /> Watch Now
                </Button>
                <Button 
                  variant="outline" 
                  className="bg-background/80 backdrop-blur-sm"
                  onClick={toggleWatchlist}
                >
                  {isInWatchlist ? (
                    <>
                      <Check className="mr-2 h-4 w-4" /> In Watchlist
                    </>
                  ) : (
                    <>
                      <Plus className="mr-2 h-4 w-4" /> Add to Watchlist
                    </>
                  )}
                </Button>
              </div>
              
              <div className="space-y-4">
                <p className="text-lg text-foreground">{movie.description}</p>
                
                {movie.director && (
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Director</h3>
                    <p>{movie.director}</p>
                  </div>
                )}
                
                {movie.cast && movie.cast.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Cast</h3>
                    <p>{movie.cast.join(', ')}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Additional Content */}
      <div className="container mx-auto pt-4 px-4 md:px-6 py-40">
        <h2 className="text-2xl font-bold mb-6">More Like This</h2>
        {/* You can add a carousel of similar movies here */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {movieSections[0]?.movies.slice(0, 6).map((similarMovie) => (
            <div 
              key={similarMovie.id}
              className="cursor-pointer group"
              onClick={() => navigate(`/movie/${similarMovie.id}`)}
            >
              <div className="aspect-[2/3] rounded-lg overflow-hidden mb-2">
                <img 
                  src={similarMovie.image} 
                  alt={similarMovie.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="font-medium text-sm line-clamp-1">{similarMovie.title}</h3>
              <p className="text-xs text-muted-foreground">{similarMovie.year}</p>
            </div>
          ))}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
