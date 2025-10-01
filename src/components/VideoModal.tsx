import { useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  genre: string;
  rating: string;
  year: string;
  videoUrl: string;
}

export const VideoModal = ({
  isOpen,
  onClose,
  title,
  description,
  genre,
  rating,
  year,
  videoUrl,
}: VideoModalProps) => {
  if (!isOpen) return null;

  // ✅ Prevent background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center"
      onClick={handleBackdropClick}
    >
      {/* Close Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed right-6 top-6 z-10 h-12 w-12 rounded-full bg-black/70 text-white hover:bg-white/20 transition-all"
        onClick={handleClose}
      >
        <X className="h-6 w-6" />
        <span className="sr-only">Close</span>
      </Button>

      {/* Modal Content */}
      <div
        className="w-full max-w-5xl space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Video Container */}
        <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">
          <video
            src={videoUrl}
            className="w-full h-full object-contain bg-black"
            controls
            autoPlay
            playsInline
          />
        </div>

        {/* Video Details */}
        <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-3">{title}</h2>
            <div className="flex items-center space-x-4 text-sm text-gray-300 mb-4">
              <span>{year}</span>
              <span>•</span>
              <span>{genre}</span>
              <span>•</span>
              <span className="flex items-center">
                <span className="text-yellow-400 mr-1 text-lg">★</span> {rating}
              </span>
            </div>
            <p className="text-base text-gray-300 leading-relaxed">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
