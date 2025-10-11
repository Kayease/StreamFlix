import { useParams, useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { ArrowLeft, Play, Plus, Check, Calendar, Clock, Radio } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

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
  genre?: string;
  [key: string]: any;
}

export default function SportsDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [sportsEvent, setSportsEvent] = useState<SportsEvent | null>(null);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [relatedEvents, setRelatedEvents] = useState<SportsEvent[]>([]);

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchSportsEvent = () => {
      // Get all sports events from localStorage or use sample data
      const savedEvents = JSON.parse(localStorage.getItem('sportsEvents') || '[]');
      const sampleEvents = [
        // Sample events that match the SportsPage data structure
        {
          id: 23,
          title: "Championship Dreams",
          image: "/src/assets/latest/movies/championshipdreams.jpg",
          sport: "Basketball",
          rating: "4.7",
          year: "2023",
          description: "Young athletes fight for their dreams in this inspiring sports drama. Follow the journey of a high school basketball team as they overcome challenges and personal struggles to reach the state championships.",
          isLive: false,
          date: "2023-10-15",
          location: "Madison Square Garden, NY",
          teams: ["Westside High", "Eastside High"],
          duration: "2h 15m"
        },
        {
          id: 24,
          title: "Golden Goal",
          image: "/src/assets/latest/movies/goldengoal.jpg",
          
          rating: "4.8",
          year: "2023",
          description: "The journey of a soccer team from underdogs to world champions. Experience the passion, drama, and excitement of international soccer through the eyes of the players and their dedicated coach.",
          isLive: true,
          date: "2023-11-20",
          location: "Camp Nou, Barcelona",
          teams: ["Barcelona FC", "Real Madrid"],
          duration: "1h 55m"
        },
        {
          id: 25,
          title: "Javelin Champion",
          image: "/src/assets/latest/movies/javelinchampion.jpg",
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
          image: "/src/assets/latest/movies/basketball.jpg",
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
          image: "/src/assets/latest/movies/indiangameadda.jpg",
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
          image: "/src/assets/latest/movies/championwalibaatbelieveinblue.jpg",
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
          image: "/src/assets/latest/movies/t20worldcup.jpg",
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
          image: "/src/assets/latest/movies/indiavsenglandhockeyworldcupfinal.jpg",
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
          image: "/src/assets/latest/movies/footballchampion.jpg",
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
          image: "/src/assets/latest/movies/indiavspak.jpg",
          sport: "Cricket",
          rating: "4.9",
          year: "2025",
          description: "The most anticipated cricket match of the year.",
          isLive: true,
          date: "2024-03-20"
        }
      ];
      
      const events = savedEvents.length > 0 ? savedEvents : sampleEvents;
      
      // Find the current event
      const foundEvent = events.find((event: SportsEvent) => event.id === Number(id));
      
      if (foundEvent) {
        setSportsEvent(foundEvent);
        // Get related events (excluding current one)
        const related = events
          .filter((event: SportsEvent) => event.id !== Number(id) && event.sport === foundEvent.sport)
          .slice(0, 4);
        setRelatedEvents(related);
        
        // Check if event is in watchlist
        const watchlist = JSON.parse(localStorage.getItem('sportsWatchlist') || '[]');
        setIsInWatchlist(watchlist.some((item: any) => item.id === foundEvent.id));
      }
      
      setIsLoading(false);
    };
    
    fetchSportsEvent();
  }, [id]);

  const toggleWatchlist = () => {
    if (!sportsEvent) return;
    
    const watchlist = JSON.parse(localStorage.getItem('sportsWatchlist') || '[]');
    let updatedWatchlist;
    
    if (isInWatchlist) {
      updatedWatchlist = watchlist.filter((item: any) => item.id !== sportsEvent.id);
      toast({
        title: 'Removed from Watchlist',
        description: `${sportsEvent.title} has been removed from your watchlist.`,
        duration: 3000,
        className: 'bg-destructive text-white border-0',
      });
    } else {
      const newItem = {
        id: sportsEvent.id,
        title: sportsEvent.title,
        image: sportsEvent.image,
        sport: sportsEvent.sport,
        rating: sportsEvent.rating,
        year: sportsEvent.year,
        description: sportsEvent.description,
        isLive: sportsEvent.isLive,
        date: sportsEvent.date
      };
      updatedWatchlist = [...watchlist, newItem];
      toast({
        title: 'Added to Watchlist',
        description: `${sportsEvent.title} has been added to your watchlist!`,
        duration: 3000,
        className: 'bg-primary text-white border-0',
      });
    }
    
    localStorage.setItem('sportsWatchlist', JSON.stringify(updatedWatchlist));
    setIsInWatchlist(!isInWatchlist);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!sportsEvent) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-4 text-center">
          <h1 className="text-2xl font-bold mb-4">Event not found</h1>
          <p className="text-muted-foreground mb-6">The sports event you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/sports')}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Sports
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  // Format date to be more readable
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      {/* Hero Section with Backdrop */}
      <div className="relative pt-24 pb-16 md:pt-32 md:pb-24 w-full overflow-hidden">
        <div className="absolute inset-0">
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${sportsEvent.image})`,
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
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Sports
            </Button>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8 max-w-7xl mx-auto w-full pb-12">
            <div className="w-full md:w-1/3 lg:w-1/4 flex-shrink-0">
              <div className="relative pt-[150%] rounded-lg overflow-hidden shadow-xl">
                <img 
                  src={sportsEvent.image} 
                  alt={sportsEvent.title} 
                  className="absolute top-0 left-0 w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder.svg';
                  }}
                />
                {sportsEvent.isLive && (
                  <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-md flex items-center">
                    <span className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse"></span>
                    LIVE
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex-1 text-white">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">{sportsEvent.title}</h1>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/20 text-primary-foreground">
                  {sportsEvent.sport}
                </span>
              </div>
              
              <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-muted-foreground">
                <span className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {formatDate(sportsEvent.date)}
                </span>
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {sportsEvent.duration || '2h'}
                </span>
                <span className="flex items-center">
                  <span className="text-yellow-400 mr-1">★</span> {sportsEvent.rating}
                </span>
              </div>
              
              {sportsEvent.teams && sportsEvent.teams.length > 0 && (
                <div className="mb-6 p-4 bg-muted/20 rounded-lg">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Teams</h3>
                  <div className="flex items-center justify-center gap-8">
                    {sportsEvent.teams.map((team, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-muted/30 rounded-full mb-2 flex items-center justify-center">
                          <span className="text-xl font-bold">{team.charAt(0)}</span>
                        </div>
                        <span className="text-sm font-medium">{team}</span>
                      </div>
                    ))}
                    {sportsEvent.teams.length === 1 && (
                      <div className="text-muted-foreground">vs TBD</div>
                    )}
                  </div>
                </div>
              )}
              
              <div className="flex flex-wrap gap-3 mb-6">
                <Button 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  onClick={() => {
                    toast({
                      title: sportsEvent.isLive ? 'Starting Live Stream' : 'Starting Replay',
                      description: sportsEvent.isLive ? 'Preparing your live stream...' : 'Loading the replay...',
                      duration: 3000,
                      className: 'bg-primary text-white border-0',
                    });
                  }}
                >
                  <Play className="mr-2 h-4 w-4" /> 
                  {sportsEvent.isLive ? 'Watch Live' : 'Watch Replay'}
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
                {sportsEvent.isLive && (
                  <Button variant="outline" className="bg-red-600/20 hover:bg-red-600/30 text-red-400 border-red-600/30">
                    <Radio className="mr-2 h-4 w-4" />
                    Live Commentary
                  </Button>
                )}
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">About the Event</h3>
                  <p className="text-foreground">{sportsEvent.description}</p>
                </div>
                
                {sportsEvent.location && (
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Venue</h3>
                    <p>{sportsEvent.location}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Related Events */}
      {relatedEvents.length > 0 && (
        <div className="container mx-auto px-4 md:px-6 py-12">
          <h2 className="text-2xl font-bold mb-6">More {sportsEvent.sport} Events</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {relatedEvents.map((event) => (
              <div 
                key={event.id}
                className="group cursor-pointer"
                onClick={() => navigate(`/sports/${event.id}`)}
              >
                <div className="relative aspect-[2/3] rounded-lg overflow-hidden mb-2">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {event.isLive && (
                    <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-md">
                      LIVE
                    </div>
                  )}
                </div>
                <h3 className="font-medium text-sm line-clamp-1">{event.title}</h3>
                <div className="flex items-center text-xs text-muted-foreground">
                  <span>{event.sport}</span>
                  <span className="mx-1">•</span>
                  <span>{event.year}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
}
