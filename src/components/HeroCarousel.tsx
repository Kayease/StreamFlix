import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Slide {
  id: number;
  src: string;
  title: string;
  description: string;
}

const slides: Slide[] = [
  {
    id: 1,
    src: "/videos/trailer1.mp4",
    title: "Epic Adventure",
    description: "Join the journey across magical lands.",
  },
  {
    id: 2,
    src: "/videos/trailer2.mp4",
    title: "Future Wars",
    description: "A battle beyond the stars.",
  },
  {
    id: 3,
    src: "/videos/trailer3.mp4",
    title: "Romantic Escape",
    description: "A story of love and destiny.",
  },
];

export default function HeroVideoCarousel() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Auto-play every 10s
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[80vh] overflow-hidden rounded-2xl">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <video
            src={slide.src}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">
              {slide.title}
            </h2>
            <p className="text-gray-200 text-lg mb-5 max-w-xl">
              {slide.description}
            </p>
            <div className="flex gap-3">
              <Button className="flex items-center gap-2 bg-red-600 hover:bg-red-700">
                <Play size={18} /> Play
              </Button>
              <Button variant="secondary">More Info</Button>
            </div>
          </div>
        </div>
      ))}

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
      <div className="absolute bottom-4 w-full flex justify-center gap-2">
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
}



