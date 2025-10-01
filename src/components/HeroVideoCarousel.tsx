import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight, Play, Plus, Info, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import trainVideo from "../assets/videos/train.mp4";
import cryingManVideo from "../assets/videos/cryingman.mp4";
import underwaterVideo from "../assets/videos/underwater.mp4";
import corporateLifeVideo from "../assets/videos/corporatelife.mp4";
import walkingVideo from "../assets/videos/walking.mp4";

interface Slide {
  id: number;
  src: string;
  title: string;
  description: string;
  rating: string;
  year: string;
  duration: string;
  genres: string[];
  maturityRating: string;
}

const slides: Slide[] = [
  
  {
    id: 1,
    src: trainVideo,
    title: "The Last Heist",
    description: "A high-stakes train robbery goes terribly wrong.",
    rating: "8.1/10",
    year: "2024",
    duration: "2h 5m",
    genres: ["Action", "Thriller", "Crime"],
    maturityRating: "16+"
  },
  {
    id: 2,
    src: cryingManVideo,
    title: "No Way Out",
    description: "A man's desperate fight for survival against all odds.",
    rating: "8.7/10",
    year: "2024",
    duration: "2h 32m",
    genres: ["Thriller", "Drama", "Action"],
    maturityRating: "18+"
  },
  {
    id: 3,
    src: underwaterVideo,
    title: "Mermaid's Revenge",
    description: "A dark tale of vengeance from the depths.",
    rating: "7.9/10",
    year:   "2023",
    duration: "1h 58m",
    genres: ["Thriller", "Horror", "Fantasy"],
    maturityRating: "18+"
  },
  {
    id: 4,
    src: corporateLifeVideo,
    title: "Corporate Deception",
    description: "A psychological thriller set in the cutthroat world of corporate espionage.",
    rating: "8.3/10",
    year: "2024",
    duration: "2h 15m",
    genres: ["Thriller", "Drama", "Crime"],
    maturityRating: "16+"
  },
  {
    id: 5,
    src:  walkingVideo,
    title: "The Walk",
    description: "A gripping thriller about a man with a dangerous secret.",
    rating: "8.0/10",
    year: "2023",
    duration: "2h 8m",
    genres: ["Thriller", "Mystery", "Drama"],
    maturityRating: "16+"
  },

];

export default function HeroVideoCarousel() {
  const [current, setCurrent] = useState<number>(0);
  const [watchlist, setWatchlist] = useState<number[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Load watchlist from localStorage on component mount
  useEffect(() => {
    const savedWatchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
    // Extract IDs from saved watchlist items
    const watchlistIds = savedWatchlist.map((item: any) => item.id);
    setWatchlist(watchlistIds);
  }, []);

  const openModal = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation?.();
    setIsModalOpen(false);
  }, []);

  // Toggle watchlist status for the current slide
  const toggleWatchlist = useCallback(() => {
    const currentSlide = slides[current];
    const isInWatchlist = watchlist.includes(currentSlide.id);
    
    const updatedWatchlist = isInWatchlist
      ? watchlist.filter(id => id !== currentSlide.id)
      : [...watchlist, currentSlide.id];
    
    setWatchlist(updatedWatchlist);
    
    // Update localStorage
    const savedWatchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
    if (!isInWatchlist) {
      // Add to watchlist
      const newItem = {
        id: currentSlide.id,
        title: currentSlide.title,
        image: currentSlide.src,
        genre: currentSlide.genres[0],
        rating: currentSlide.rating,
        year: currentSlide.year,
        description: currentSlide.description
      };
      localStorage.setItem('watchlist', JSON.stringify([...savedWatchlist, newItem]));
      alert(`${currentSlide.title} added to watchlist!`);
    } else {
      // Remove from watchlist
      const updatedList = savedWatchlist.filter((item: any) => item.id !== currentSlide.id);
      localStorage.setItem('watchlist', JSON.stringify(updatedList));
    }
  }, [current, watchlist]);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);;

  // Handle video playback based on hero section visibility
  useEffect(() => {
    // Auto-play the current video when it changes
    const currentVideo = videoRefs.current[current];
    if (currentVideo) {
      currentVideo.play().catch(e => console.log('Video play error:', e));
    }
    
    // Set up intersection observer for pause/play on scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            videoRefs.current[current]?.play().catch(e => console.log('Video play error:', e));
          } else {
            videoRefs.current[current]?.pause();
          }
        });
      },
      { threshold: 0.5 }
    );

    const heroSection = document.getElementById('hero-section');
    if (heroSection) {
      observer.observe(heroSection);
    }

    return () => {
      if (heroSection) {
        observer.unobserve(heroSection);
      }
      // Pause all videos when unmounting
      videoRefs.current.forEach(video => video?.pause());
    };
  }, [current]);

  return (
    <div className="relative w-full h-[100vh] min-h-[800px] overflow-hidden group">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            index === current ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
          }`}
        >
          {/* Background Video */}
          <video
            ref={el => videoRefs.current[index] = el}
            src={slide.src}
            autoPlay={index === current}
            muted
            loop={false}
            playsInline
            className={`w-full h-full object-cover transition-opacity duration-1000 ${
              index === current ? 'opacity-100' : 'opacity-0'
            }`}
            onEnded={() => {
              if (index === current) {
                nextSlide();
              }
            }}
            onLoadedData={(e) => {
              const video = e.target as HTMLVideoElement;
              video.currentTime = 0;
              video.playbackRate = 1.0;
            }}
          />

          {/* Overlay */}
          {/* Navigation Arrows */}
          <button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/50 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/70"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/50 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/70"
            aria-label="Next slide"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 pb-16 sm:pb-20 md:pb-24 lg:pb-28 xl:pb-32">
            <div className="max-w-4xl">
              {/* Title and Rating */}
              <div className="flex items-center mb-2">
                <h2 className="text-4xl md:text-5xl font-bold text-white mr-4">
                  {slide.title}
                </h2>
                <div className="flex items-center bg-black/60 px-2 py-1 rounded">
                  <span className="text-yellow-400 font-bold mr-1">★</span>
                  <span className="text-white font-semibold">{slide.rating}</span>
                </div>
              </div>
              
              {/* Meta Info */}
              <div className="flex items-center text-gray-300 text-sm mb-4">
                <span>{slide.year}</span>
                <span className="mx-2">•</span>
                <span>{slide.duration}</span>
                <span className="mx-2">•</span>
                <span className="border border-gray-400 px-1 rounded text-xs">{slide.maturityRating}</span>
              </div>
              
              {/* Genres */}
              <div className="flex flex-wrap gap-2 mb-4">
                {slide.genres.map((genre, i) => (
                  <span key={i} className="px-3 py-1 bg-black/40 text-white text-xs font-medium rounded-full border border-white/20">
                    {genre}
                  </span>
                ))}
              </div>
              
              <p className="text-gray-200 text-lg mb-6 max-w-2xl">
                {slide.description}
              </p>
              
              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 sm:gap-4">
                <Button 
                  className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 min-w-[140px] sm:min-w-[160px] md:min-w-[180px] text-sm sm:text-base md:text-lg font-semibold hover:scale-105 transition-transform duration-200"
                  onClick={openModal}
                >
                  <Play className="h-4 w-4 sm:h-5 sm:w-5" /> 
                  <span>Watch Now</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="bg-black/40 border-white/30 text-white hover:bg-black/60 hover:border-white/50 hover:text-white py-2 sm:py-2.5 md:py-3 min-w-[120px] sm:min-w-[140px] md:min-w-[160px] text-sm sm:text-base md:text-lg font-semibold hover:scale-105 transition-transform duration-200 flex items-center justify-center gap-2"
                  onClick={toggleWatchlist}
                >
                  {watchlist.includes(slides[current].id) ? (
                    <>
                      <Check className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" /> 
                      <span>Added</span>
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4 sm:h-5 sm:w-5" /> 
                      <span>My List</span>
                    </>
                  )}
                </Button>
                
              </div>
            </div>
          </div>
        </div>
      ))}

{isModalOpen && (
        <div 
          className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-4"
          onClick={closeModal}
          ref={modalRef}
        >
          <div 
            className="relative w-full max-w-6xl mx-4 mt-10"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute -top-10 right-0 z-50 p-2 bg-black/70 rounded-full hover:bg-black transition-colors"
              aria-label="Close video"
            >
              <X className="h-6 w-6 text-white" />
            </button>
            <video
              src={slides[current]?.src || ''}
              className="w-full h-auto max-h-[80vh] rounded-lg"
              controls
              autoPlay
              playsInline
            />
            <div className="mt-4 text-white">
              <h2 className="text-2xl font-bold">{slides[current]?.title || ''}</h2>
              <div className="flex items-center space-x-4 text-sm text-gray-300 mt-1">
                <span>{slides[current]?.year || ''}</span>
                <span>•</span>
                <span>{slides[current]?.genres?.[0] || ''}</span>
                <span>•</span>
                <span className="flex items-center">
                  <span className="text-yellow-400 mr-1">★</span> {slides[current]?.rating || ''}
                </span>
              </div>
              <p className="mt-2 text-gray-300">{slides[current]?.description || ''}</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-2 rounded-full"
      >
        <ChevronLeft size={24} className="text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-2 rounded-full"
      >
        <ChevronRight size={24} className="text-white" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-0 w-full flex justify-center gap-2 pb-4">
        {slides.map((_, idx) => (
          <span
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-2 w-2 rounded-full cursor-pointer ${
              current === idx ? "bg-white" : "bg-gray-500"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
