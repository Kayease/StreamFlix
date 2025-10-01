import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import { ArrowLeft, Play, Plus, Check } from 'lucide-react';
import Footer from '@/components/Footer';
import Navbar from "@/components/Navbar";
import { useNavigate, useLocation, Link } from 'react-router-dom';
import HeroVideoCarousel from '@/components/HeroVideoCarousel';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";

interface Movie {
  id: number;
  title: string;
  image: string;
  genre?: string;  // Made optional with ?
  rating: string;
  year: string;
  description: string;
  [key: string]: any; // Add index signature to handle optional properties
}

import { movieSections } from '@/data/movies';

export default function MoviesPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [watchlist, setWatchlist] = useState<number[]>([]);
  const allMovies = movieSections.flatMap(section => section.movies);
  const genres = Array.from(new Set(allMovies.map(movie => movie.genre)));

  // Handle search query from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get('search');
    if (searchQuery) {
      setSearchTerm(searchQuery);
    }
  }, [location.search]);

  // Load watchlist from localStorage on component mount
  useEffect(() => {
    const savedWatchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
    const watchlistIds = savedWatchlist.map((item: any) => item.id);
    setWatchlist(watchlistIds);
  }, []);

  // Toggle watchlist status for a movie
  const toggleWatchlist = (movie: Movie) => {
    const isInWatchlist = watchlist.includes(movie.id);
    const updatedWatchlist = isInWatchlist
      ? watchlist.filter(id => id !== movie.id)
      : [...watchlist, movie.id];
    
    setWatchlist(updatedWatchlist);
    
    // Update localStorage
    const savedWatchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
    if (!isInWatchlist) {
      // Add to watchlist
      const newItem = {
        id: movie.id,
        title: movie.title,
        image: movie.image,
        genre: movie.genre,
        rating: movie.rating,
        year: movie.year,
        description: movie.description
      };
      localStorage.setItem('watchlist', JSON.stringify([...savedWatchlist, newItem]));
      alert(`🎬 ${movie.title} has been added to your wishlist!`);
    } else {
      // Remove from watchlist
      const updatedList = savedWatchlist.filter((item: any) => item.id !== movie.id);
      localStorage.setItem('watchlist', JSON.stringify(updatedList));
      alert(`❌ ${movie.title} has been removed from your wishlist.`);
    }
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  // Get unique genres from all movies
  

  // Filter movies based on search term and genre
  //   const filteredMovies = allMovies.filter((movie) => {
  //     const searchLower = searchTerm.toLowerCase();
  //     const matchesSearch = 
  //       movie.title.toLowerCase().includes(searchLower) ||
  //       movie.description.toLowerCase().includes(searchLower);
  //     const matchesGenre = !selectedGenre || movie.genre === selectedGenre;
  //     return matchesSearch && matchesGenre;
  //   });

  return (
    <div className="min-h-screen bg-gray-950  text-white ">
      <Navbar />
      <div className=" mx-auto max-w-44xl  px-8 py-24">
        <div className="flex flex-col  ">

          <Button 
            variant="ghost" 
            onClick={handleBackToHome}
            className="w-36 h-10  hover:bg-gray-800"
          >
            <ArrowLeft className="h-5 w-2 mr-2" />
            Back to Home
          </Button>
          
        </div>

            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-6 mb-8">
            
              <Select
                value={selectedGenre}
                onValueChange={setSelectedGenre}
              >
              
                <SelectContent>
                  <SelectItem value="movies.ts">All Genres</SelectItem>
                  {genres.map((genre) => (
                    <SelectItem key={genre} value={genre}>
                      {genre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Movies Grid */}
            {allMovies.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-6 gap-3 sm:gap-4 px-2 sm:px-0">
                {allMovies.map((movie) => (
                  <Link 
                    to={`/movie/${movie.id}`}
                    key={movie.id} 
                    className="w-full aspect-[2/3] relative group transition-all duration-300 hover:z-10 block"
                  >
                    {/* Image with fallback overlay */}
                    <div className="relative w-full h-full rounded-lg overflow-hidden">
                      <img
                        src={movie.image}
                        alt={movie.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/placeholder.svg';
                        }}
                      />
                      
                      {/* Bottom gradient overlay - always visible */}
                      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent" />
                      
                      {/* Title and basic info - always visible */}
                      <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3">
                        <h3 className="text-white font-bold text-xs sm:text-sm mb-0.5 line-clamp-1 drop-shadow-lg">{movie.title}</h3>
                        <div className="text-[10px] sm:text-xs text-gray-300 line-clamp-1">
                          {movie.year} • {movie.genre} • ⭐ {movie.rating}
                        </div>
                        
                        {/* Buttons - always visible on mobile, hidden on desktop (shown on hover) */}
                        <div className="sm:hidden flex items-center justify-between gap-1.5 mt-1.5">
                          <Button 
                            size="sm"
                            className="h-6 px-1.5 bg-white hover:bg-gray-200 text-black text-[10px] font-medium flex-1"
                            onClick={(e) => {
                              e.preventDefault() 
                              e.stopPropagation();
                              alert(`Playing: ${movie.title}`);
                             return false;
                            }}
                            
                          >
                            <Play className="h-3 w-3 mr-1 flex-shrink-0" />
                            <span className="truncate">Watch</span>
                          </Button>
                          <Button 
                            size="icon"
                            variant="outline" 
                            className="h-6 w-6 flex-shrink-0 border-white/30 text-white hover:bg-white/10"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              toggleWatchlist(movie as any);
                              return false;
                            }}
                            onMouseDown={(e) => e.stopPropagation()}
                            aria-label={watchlist.includes(movie.id) ? "Remove from watchlist" : "Add to watchlist"}
                          >
                            {watchlist.includes(movie.id) ? 
                              <Check className="h-3 w-3 text-green-500" /> : 
                              <Plus className="h-3 w-3" />
                            }
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Full Details Overlay - Shows on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <h3 className="text-white font-bold text-xs sm:text-sm mb-1 line-clamp-1">{movie.title}</h3>
                        <div className="text-[10px] sm:text-xs text-gray-300 mb-1 sm:mb-2">
                          {movie.year} • {movie.genre} • ⭐ {movie.rating}
                        </div>
                        <p className="text-[10px] sm:text-xs text-gray-300 line-clamp-2 mb-2 sm:mb-3">{movie.description}</p>
                        
                        <div className="flex items-center justify-between gap-2">
                          <Button 
                            size="sm"
                            className="h-6 sm:h-7 px-2 sm:px-3 bg-white hover:bg-gray-200 text-black text-[10px] sm:text-xs font-medium transition-colors flex-1"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              alert(`Playing: ${movie.title}`);
                              return false;
                            }}
                            onMouseDown={(e) => e.stopPropagation()}
                          >
                            <Play className="h-3 w-3 mr-1 flex-shrink-0" />
                            <span className="truncate">Watch Now</span>
                          </Button>
                          <Button 
                            size="icon"
                            variant="outline" 
                            className="h-6 w-6 sm:h-7 sm:w-7 flex-shrink-0 border-white/30 text-white hover:bg-white/10 transition-colors"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              toggleWatchlist(movie);
                              return false;
                            }}
                            onMouseDown={(e) => e.stopPropagation()}
                            aria-label={watchlist.includes(movie.id) ? "Remove from watchlist" : "Add to watchlist"}
                          >
                            {watchlist.includes(movie.id) ? 
                              <Check className="h-3 w-3 text-green-500" /> : 
                              <Plus className="h-3 w-3" />
                            }
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No movies found matching your search.</p>
              </div>
            )}
          </div>
          <Footer/>
        </div>
        
        );
} ;