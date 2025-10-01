import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Footer from '@/components/Footer';
import Navbar from "@/components/Navbar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Plus, Check, Play } from 'lucide-react';
import ContentSection from '@/components/ContentSection';
import { useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from "react";

interface SportsEvent {
  id: number;
  title: string;
  image: string;
  sport: string;
  date: string;
  description: string;
  isLive: boolean;
  rating: string;
  year: string;
  genre?: string; // Made optional since it's not used in all cases
  location?: string;
  teams?: string[];
  duration?: string;
}

export default function SportsPage() {
  
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSport, setSelectedSport] = useState("");
  const [watchlist, setWatchlist] = useState<number[]>([]);

  // Load watchlist from localStorage on component mount
  useEffect(() => {
    const savedWatchlist = JSON.parse(localStorage.getItem('sportsWatchlist') || '[]');
    const watchlistIds = savedWatchlist.map((item: any) => item.id);
    setWatchlist(watchlistIds);
  }, []);

  // Toggle watchlist status for a sports event
  const toggleWatchlist = (e: React.MouseEvent, event: SportsEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const isInWatchlist = watchlist.includes(event.id);
    const updatedWatchlist = isInWatchlist
      ? watchlist.filter(id => id !== event.id)
      : [...watchlist, event.id];
    
    setWatchlist(updatedWatchlist);
    
    // Update localStorage
    const savedWatchlist = JSON.parse(localStorage.getItem('sportsWatchlist') || '[]');
    if (!isInWatchlist) {
      // Add to watchlist
      const newItem = {
        id: event.id,
        title: event.title,
        image: event.image,
        sport: event.sport,
        rating: event.rating,
        year: event.year,
        description: event.description,
        isLive: event.isLive,
        date: event.date,
        location: event.location,
        teams: event.teams,
        duration: event.duration
      };
      localStorage.setItem('sportsWatchlist', JSON.stringify([...savedWatchlist, newItem]));
      alert(`🏆 ${event.title} has been added to your watchlist!`);
    } else {
      // Remove from watchlist
      const updatedList = savedWatchlist.filter((item: any) => item.id !== event.id);
      localStorage.setItem('sportsWatchlist', JSON.stringify(updatedList));
      alert(`❌ ${event.title} has been removed from your watchlist.`);
    }
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  // Sample sports data - in a real app, this would come from an API
  const sportsEvents: SportsEvent[] = [
    {
      id: 23,
      title: "Championship Dreams",
      image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=225&fit=crop",
      sport: "Basketball",
      rating: "4.7",
      year: "2023",
      description: "Young athletes fight for their dreams in this inspiring sports drama.",
      isLive: false,
      date: "2023-10-15"
    },
    {
      id: 24,
      title: "Golden Goal",
      image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=225&fit=crop",
      sport: "Soccer",
      rating: "4.8",
      year: "2023",
      description: "The journey of a soccer team from underdogs to world champions.",
      isLive: true,
      date: "2023-11-20"
    },
    {
      id: 25,
      title: "Javelin Champion",
      image: "https://img.olympics.com/images/image/private/t_s_pog_staticContent_hero_lg_2x/f_auto/primary/b12dtu4bpphqckahej9z",
      sport: "Athletics",
      rating: "4.6",
      year: "2023",
      description: "The journey of an Olympic javelin thrower to the top.",
      isLive: false,
      date: "2023-12-05"
    },
    {
      id: 26,
      title: "Court Kings",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMui10jWK0SedXl3znKbiXxO6KFsxexSLmWw&s",
      sport: "Basketball",
      rating: "4.9",
      year: "2023",
      description: "Basketball legends rise from the streets to professional glory.",
      isLive: true,
      date: "2024-01-10"
    },
    {
      id: 27,
      title: "Evening Session",
      image: "https://img.airtel.tv/unsafe/fit-in/500x0/filters:format(webp)/https://xstreamcp-assets-msp.streamready.in/assets/HOTSTAR_DTH/VIDEO/68c3a92991362751b2c64785/images/LANDSCAPE_169/1757960450897-h?o=production",
      sport: "Cricket",
      rating: "4.8",
      year: "2023",
      description: "Athletes overcome personal struggles to compete at the highest level.",
      isLive: false,
      date: "2024-02-15"
    },
    {
      id: 28,
      title: "Champion wali baat: Believe in blue",
      image: "https://img1.hotstarext.com/image/upload/f_auto/sources/r1/cms/prod/2634/1757955972634-i",
      sport: "Cricket",
      rating: "4.8",
      year: "2023",
      description: "The story of the Indian cricket team's journey to victory.",
      isLive: true,
      date: "2024-02-20"
    },
    {
      id: 29,
      title: "T20 World Cup",
      image: "https://img.olympics.com/images/image/private/t_s_pog_staticContent_hero_sm_2x/f_auto/primary/k7qe0iiahvgl3txbcfji",
      sport: "Cricket",
      rating: "4.8",
      year: "2023",
      description: "The most exciting T20 cricket tournament in the world.",
      isLive: false,
      date: "2024-03-01"
    },
    {
      id: 30,
      title: "India vs England Hockey World Cup Final",
      image: "https://images.firstpost.com/uploads/2024/08/India-hockey-team-AP-1200-2024-08-99c5d0e27c763b3ea0f0fcb90d0ffa0f-1200x675.jpg",
      sport: "Hockey",
      rating: "4.9",
      year: "2024",
      description: "The intense final match of the Hockey World Cup.",
      isLive: true,
      date: "2024-03-10"
    },
    {
      id: 31,
      title: "Football Champion",
      image: "https://cdn.britannica.com/94/162194-050-490306EC/Iker-Casillas-winner-association-football-team-victory-July-1-2012.jpg",
      sport: "Football",
      rating: "4.8",
      year: "2023",
      description: "The journey to becoming a football champion.",
      isLive: false,
      date: "2024-03-15"
    },
    {
      id: 32,
      title: "India vs Pakistan",
      image: "https://images.news18.com/ibnlive/uploads/2025/09/1757819181_IND-vs-PAK-5-2025-09-97f619a8b737abe3f8137f800a1b8a1b.jpg",
      sport: "Cricket",
      rating: "4.9",
      year: "2025",
      description: "The most anticipated cricket match of the year.",
      isLive: true,
      date: "2024-03-20"
    }
  ];

  const sports = [...new Set(sportsEvents.map(event => event.sport))];

  const filteredEvents = sportsEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSport = !selectedSport || event.sport === selectedSport;
    return matchesSearch && matchesSport;
  });

  return (
    <div className="min-h-screen bg-gray-950 text-white  ">
      <Navbar />
      <div className="   mx-auto max-w-44xl  px-8 py-24">
        <div className="grid grid-cols-4">
        {/* <h1 className="text-5xl font-bold">Sports</h1> */}
          <Button 
            variant="ghost" 
            onClick={handleBackToHome}
            className="h-10 w-36 hover:bg-gray-800"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Home
          </Button>
   
        </div>
        
      
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* <Input
            placeholder="Search sports events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-gray-900 border-gray-700 text-white"
          /> */}
          <Select onValueChange={setSelectedSport} value={selectedSport}>
            {/* <SelectTrigger className="w-full md:w-[180px] bg-gray-900 border-gray-700 text-white">
              <SelectValue placeholder="Filter by sport" />
            </SelectTrigger> */}
            <SelectContent className="bg-gray-900 border-gray-700 text-white">
              <SelectItem value="non sto">All Sports</SelectItem>
              {sports.map(sport => (
                <SelectItem key={sport} value={sport}>
                  {sport}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-6 gap-3 sm:gap-4 px-2 sm:px-0">
          {filteredEvents.map((event) => (
            <Link 
              key={event.id} 
              to={`/sports/${event.id}`}
              className="w-full aspect-[2/3] relative group transition-all duration-300 hover:z-10 block"
            >
              {/* Image with fallback overlay */}
              <div className="relative w-full h-full rounded-lg overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder.svg';
                  }}
                />
                
                {/* Live badge */}
                {event.isLive && (
                  <div className="absolute top-2 right-2 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    LIVE
                  </div>
                )}
                
                {/* Bottom gradient overlay - always visible */}
                <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-black/90 via-black/60 to-transparent" />
                
                {/* Title and info - always visible */}
                <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3">
                  <h3 className="text-white font-bold text-xs sm:text-sm mb-0.5 line-clamp-1 drop-shadow-lg">{event.title}</h3>
                  <div className="text-[10px] sm:text-xs text-gray-300 line-clamp-1">
                    {event.date} • {event.sport} • ⭐ {event.rating}
                  </div>
                  
                  {/* Buttons - always visible on mobile, hidden on desktop (shown on hover) */}
                  <div className="sm:hidden flex items-center justify-between gap-1.5 mt-1.5">
                    <Button 
                      size="sm"
                      className="h-6 px-1.5 bg-white hover:bg-gray-200 text-black text-[10px] font-medium flex-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (event.isLive) {
                          alert(`📺 Now playing live: ${event.title}`);
                        } else {
                          alert(`▶️ Playing trailer for: ${event.title}`);
                        }
                      }}
                    >
                      <Play className="h-3 w-3 mr-1 flex-shrink-0" />
                      <span className="truncate">Watch</span>
                    </Button>
                    <Button 
                      size="icon"
                      variant="outline" 
                      className="h-6 w-6 flex-shrink-0 border-white/30 text-white hover:bg-white/10"
                      onClick={(e) => toggleWatchlist(e, event)}
                      aria-label={watchlist.includes(event.id) ? "Remove from watchlist" : "Add to watchlist"}
                    >
                      {watchlist.includes(event.id) ? 
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
                  <h3 className="text-white font-bold text-xs sm:text-sm mb-1 line-clamp-1">{event.title}</h3>
                  <div className="text-[10px] sm:text-xs text-gray-300 mb-1 sm:mb-2">
                    {event.date} • {event.sport} • ⭐ {event.rating}
                  </div>
                  <p className="text-[10px] sm:text-xs text-gray-300 line-clamp-2 mb-2 sm:mb-3">{event.description}</p>
                  
                  <div className="flex items-center justify-between gap-2">
                    <Button 
                      size="sm"
                      className="h-6 sm:h-7 px-2 sm:px-3 bg-white hover:bg-gray-200 text-black text-[10px] sm:text-xs font-medium transition-colors flex-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (event.isLive) {
                          alert(`📺 Now playing live: ${event.title}`);
                        } else {
                          alert(`▶️ Playing trailer for: ${event.title}`);
                        }
                      }}
                    >
                      <Play className="h-3 w-3 mr-1 flex-shrink-0" />
                      <span className="truncate">{event.isLive ? 'Watch Live' : 'Watch Now'}</span>
                    </Button>
                    <Button 
                      size="icon"
                      variant="outline" 
                      className="h-6 w-6 sm:h-7 sm:w-7 flex-shrink-0 border-white/30 text-white hover:bg-white/10 transition-colors"
                      onClick={(e) => toggleWatchlist(e, event)}
                      aria-label={watchlist.includes(event.id) ? "Remove from watchlist" : "Add to watchlist"}
                    >
                      {watchlist.includes(event.id) ? 
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
      </div>
      <Footer />
    </div>
  );
}
