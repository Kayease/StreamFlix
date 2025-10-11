import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight, Play, Plus, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import train from '@/assets/videos/train.mp4';
import cryingman from '@/assets/videos/cryingman.mp4';
import underwater from '@/assets/videos/underwater.mp4';
import corporateLife from '@/assets/videos/corporatelife.mp4';
import walking from '@/assets/videos/walking.mp4';

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
    id: 2,
    src: train,
    title: "The Last Heist",
    description: "A high-stakes train robbery goes terribly wrong.",
    rating: "8.1/10",
    year: "2024",
    duration: "2h 5m",
    genres: ["Action", "Thriller", "Crime"],
    maturityRating: "16+"
  },
  {
    id: 3,
    src: cryingman,
    title: "No Way Out",
    description: "A man's desperate fight for survival against all odds.",
    rating: "8.7/10",
    year: "2024",
    duration: "2h 32m",
    genres: ["Thriller", "Drama", "Action"],
    maturityRating: "18+"
  },
  {
    id: 5,
    src: underwater,
    title: "Mermaid's Revenge",
    description: "A dark tale of vengeance from the depths.",
    rating: "7.9/10",
    year: "2023",
    duration: "1h 58m",
    genres: ["Thriller", "Horror", "Fantasy"],
    maturityRating: "18+"
  },
  {
    id: 6,
    src: corporateLife,
    title: "Corporate Deception",
    description: "A psychological thriller set in the cutthroat world of corporate espionage.",
    rating: "8.3/10",
    year: "2024",
    duration: "2h 15m",
    genres: ["Thriller", "Drama", "Crime"],
    maturityRating: "16+"
  },
  {
    id: 7,
    src: walking,
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

  // Load watchlist from localStorage
  useEffect(() => {
    const savedWatchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
    const watchlistIds = savedWatchlist.map((item: any) => item.id);
    setWatchlist(watchlistIds);
  }, []);

  const openModal = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // For touch events, add a small delay to prevent ghost clicks
    if (e.type === 'touchend') {
      const target = e.currentTarget as HTMLElement;
      target.style.pointerEvents = 'none';
      setTimeout(() => {
        target.style.pointerEvents = 'auto';
      }, 300);
    }

    setIsModalOpen(true);
    videoRefs.current[current]?.pause();
    document.body.style.overflow = 'hidden';

    // Show toast on mobile
    if (window.innerWidth <= 768) {
      toast({
        title: "Playing: " + slides[current].title,
        description: "Enjoy your movie!",
        duration: 3000,
      });
    }
  }, [current, slides]);

  const closeModal = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation?.();
    setIsModalOpen(false);
    videoRefs.current[current]?.play().catch(() => { });
  }, [current]);

  const toggleWatchlist = useCallback(() => {
    const currentSlide = slides[current];
    const isInWatchlist = watchlist.includes(currentSlide.id);

    const updatedWatchlist = isInWatchlist
      ? watchlist.filter(id => id !== currentSlide.id)
      : [...watchlist, currentSlide.id];

    setWatchlist(updatedWatchlist);

    const savedWatchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
    if (!isInWatchlist) {
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
      toast({
        title: 'Added to My List',
        description: `${currentSlide.title} has been added to your watchlist.`,
        duration: 3000,
      });
    } else {
      const updatedList = savedWatchlist.filter((item: any) => item.id !== currentSlide.id);
      localStorage.setItem('watchlist', JSON.stringify(updatedList));
      toast({
        title: 'Removed from My List',
        description: `${currentSlide.title} has been removed from your watchlist.`,
        duration: 3000,
      });
    }
  }, [current, watchlist]);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  // Auto-play current video & intersection observer
  useEffect(() => {
    const currentVideo = videoRefs.current[current];
    if (currentVideo) currentVideo.play().catch(() => { });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            videoRefs.current[current]?.play().catch(() => { });
          } else {
            videoRefs.current[current]?.pause();
          }
        });
      },
      { threshold: 0.5 }
    );

    const heroSection = document.getElementById('hero-section');
    if (heroSection) observer.observe(heroSection);

    return () => {
      if (heroSection) observer.unobserve(heroSection);
      videoRefs.current.forEach(video => video?.pause());
    };
  }, [current]);

  return (
    <div id="hero-section" className="relative w-full h-[100vh] min-h-[800px] overflow-hidden">

      {/* Slides */}
      {slides.map((slide, index) => (
        <div key={slide.id} className={`absolute inset-0 transition-opacity duration-1000 ${index === current ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
          <video
            ref={el => videoRefs.current[index] = el}
            src={slide.src}
            autoPlay={index === current}
            muted
            loop={false}
            playsInline
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 pointer-events-none`}
            onEnded={() => { if (index === current) nextSlide(); }}
          />

          {/* Overlay & Content */}
          <div className="absolute inset-0 z-30 flex flex-col justify-end p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 pb-24 sm:pb-24 md:pb-24 lg:pb-28 xl:pb-32 pointer-events-auto bg-gradient-to-t from-black/90 via-black/70 to-transparent">
            {/* Spacer to push content up from the absolute bottom */}
            <div className="flex-1"></div>
            <div className="max-w-4xl text-white">
              <h2 className="text-4xl md:text-5xl font-bold mb-2">{slide.title}</h2>
              <div className="flex items-center text-gray-300 text-sm mb-4">
                <span>{slide.year}</span><span className="mx-2">•</span>
                <span>{slide.duration}</span><span className="mx-2">•</span>
                <span className="border border-gray-400 px-1 rounded text-xs">{slide.maturityRating}</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {slide.genres.map((genre, i) => (
                  <span key={i} className="px-3 py-1 bg-black/40 text-white text-xs font-medium rounded-full border border-white/20">{genre}</span>
                ))}
              </div>
              <p className="text-gray-200 text-lg mb-6 max-w-2xl">{slide.description}</p>

              {/* Buttons */}
              <div className="relative z-50 flex flex-wrap gap-3 sm:gap-4 mb-4">

                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    openModal(e);
                  }}
                  className="relative z-50 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 px-6 py-3 sm:px-4 sm:py-2 font-semibold text-sm sm:text-base md:text-lg active:scale-95 transition-transform min-h-[44px] min-w-[120px]"
                >
                  <Play className="h-5 w-5 sm:h-4 sm:w-4 flex-shrink-0" />
                  <span>Watch Now</span>
                </Button>

                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleWatchlist();
                  }}
                  variant="outline"
                  className="relative z-50 flex items-center justify-center gap-2 bg-black/40 border-white/30 text-white hover:bg-black/60 py-3 px-6 sm:py-2 sm:px-4 font-semibold text-sm sm:text-base md:text-lg active:scale-95 transition-transform min-h-[44px] min-w-[120px]"
                >
                  {watchlist.includes(slides[current].id) ? (
                    <>
                      <Check className="h-5 w-5 sm:h-4 sm:w-4 text-green-500 flex-shrink-0" />
                      <span>Added</span>
                    </>
                  ) : (
                    <>
                      <Plus className="h-5 w-5 sm:h-4 sm:w-4 flex-shrink-0" />
                      <span>My List</span>
                    </>
                  )}
                </Button>

              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation */}
      <button onClick={prevSlide} className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-3 rounded-full z-40">
        <ChevronLeft className="text-white w-6 h-6" />
      </button>
      <button onClick={nextSlide} className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-3 rounded-full z-40">
        <ChevronRight className="text-white w-6 h-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-0 w-full flex justify-center gap-2 pb-4 z-40">
        {slides.map((_, idx) => (
          <span key={idx} onClick={() => setCurrent(idx)} className={`h-2 w-2 rounded-full cursor-pointer ${current === idx ? 'bg-white' : 'bg-gray-500'}`} />
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-4"
          onClick={closeModal}
          ref={modalRef}
        >
          <div className="relative w-full max-w-6xl mx-4 mt-10" onClick={e => e.stopPropagation()}>
            <button
              onClick={closeModal}
              onTouchEnd={(e) => {
                e.preventDefault();
                e.stopPropagation();
                closeModal();
              }}
              className="absolute -top-10 right-0 z-50 p-3 bg-black/70 rounded-full hover:bg-black active:bg-black/80 transition-colors touch-manipulation"
              style={{
                WebkitTapHighlightColor: 'transparent',
                minWidth: '44px',
                minHeight: '44px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              aria-label="Close video"
            >
              <X className="h-6 w-6 text-white" />
            </button>
            <video src={slides[current]?.src || ''} className="w-full h-auto max-h-[80vh] rounded-lg" controls autoPlay playsInline />
            <div className="mt-4 text-white">
              <h2 className="text-2xl font-bold">{slides[current]?.title}</h2>
              <div className="flex items-center space-x-4 text-sm text-gray-300 mt-1">
                <span>{slides[current]?.year}</span>
                <span>•</span>
                <span>{slides[current]?.genres?.[0]}</span>
                <span>•</span>
                <span className="flex items-center"><span className="text-yellow-400 mr-1">★</span>{slides[current]?.rating}</span>
              </div>
              <p className="mt-2 text-gray-300">{slides[current]?.description}</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
