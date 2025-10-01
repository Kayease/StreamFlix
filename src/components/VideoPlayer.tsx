import { useState, useRef, useEffect, useCallback } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize2, Minimize2, SkipBack, SkipForward } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VideoPlayerProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  title: string;
  description: string;
  genre: string;
  rating: string;
  year: string;
}

export const VideoPlayer = ({
  isOpen,
  onClose,
  videoUrl,
  title,
  description,
  genre,
  rating,
  year
}: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const controlsTimeout = useRef<NodeJS.Timeout>();

  // Format time in seconds to MM:SS
  const formatTime = useCallback((timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }, []);

  const resetControlsTimer = useCallback(() => {
    setShowControls(true);
    clearTimeout(controlsTimeout.current);
    controlsTimeout.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  }, []);

  const handleTimeUpdate = useCallback(() => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setIsPlaying(!videoRef.current.paused);
    }
  }, []);

  const handleLoadedMetadata = useCallback(() => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  }, []);

  const togglePlay = useCallback(() => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play().catch(e => console.error("Video play failed:", e));
      } else {
        videoRef.current.pause();
      }
      setIsPlaying(!videoRef.current.paused);
    }
    resetControlsTimer();
  }, [resetControlsTimer]);

  const toggleMute = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
    resetControlsTimer();
  }, [isMuted, resetControlsTimer]);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      playerRef.current?.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
    resetControlsTimer();
  }, [resetControlsTimer]);

  const handleProgressChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const newTime = parseFloat(e.target.value);
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  }, []);

  const skipForward = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.min(videoRef.current.currentTime + 10, duration);
    }
  }, [duration]);

  const skipBackward = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 10);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      // Prevent scrolling when video is open
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'relative';
      document.body.style.width = '100%';
      document.body.style.height = '100%';
      
      const video = videoRef.current;
      if (video) {
        video.currentTime = 0;
        video.play().catch(e => console.error("Video play failed:", e));
        
        // Add event listeners
        video.addEventListener('timeupdate', handleTimeUpdate);
        video.addEventListener('loadedmetadata', handleLoadedMetadata);
      }
      
      setShowControls(true);
      resetControlsTimer();
      
      // Add event listeners
      const handleKeyDown = (e: KeyboardEvent) => {
        switch (e.key) {
          case 'Escape':
            onClose();
            break;
          case ' ':
          case 'k':
            e.preventDefault();
            togglePlay();
            break;
          case 'm':
            toggleMute();
            break;
          case 'f':
            toggleFullscreen();
            break;
          case 'ArrowLeft':
            skipBackward();
            break;
          case 'ArrowRight':
            skipForward();
            break;
        }
      };
      
      window.addEventListener('keydown', handleKeyDown);
      
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        if (video) {
          video.removeEventListener('timeupdate', handleTimeUpdate);
          video.removeEventListener('loadedmetadata', handleLoadedMetadata);
        }
      };
    } else {
      // Reset body styles when closing
      document.body.style.overflow = 'auto';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
      
      if (videoRef.current) {
        videoRef.current.pause();
      }
    }
    
    return () => {
      clearTimeout(controlsTimeout.current);
    };
  }, [isOpen, onClose, togglePlay, toggleMute, toggleFullscreen, skipBackward, skipForward, handleTimeUpdate, handleLoadedMetadata]);


  if (!isOpen) return null;

  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Pause the video if it's playing
    if (videoRef.current) {
      videoRef.current.pause();
    }
    
    // Reset body styles
    document.body.style.overflow = 'auto';
    document.body.style.position = '';
    document.body.style.width = '';
    document.body.style.height = '';
    
    // Close the modal
    onClose();
    
    // Scroll to top of the page
    window.scrollTo(0, 0);
  };

  return (
    <div 
      ref={playerRef}
      className="fixed inset-0 z-[99999] bg-black/90 flex flex-col items-center justify-center p-2 sm:p-4 md:p-6 lg:p-8"
      onClick={() => setShowControls(!showControls)}
      style={{ position: 'fixed', zIndex: 99999 }}
    >
      <div className="relative w-full h-full max-h-[90vh] bg-black mx-auto" style={{ aspectRatio: '16/9' }}>
        {/* Top Gradient Overlay */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/80 to-transparent z-10 pointer-events-none" />
        
        {/* Close Button */}
        <div 
          className={`absolute top-0 right-0 p-4 sm:p-6 z-20 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}
          onMouseMove={resetControlsTimer}
        >
          <Button
            variant="ghost"
            size="icon"
            className="h-12 w-12 rounded-full bg-red-600/90 hover:bg-red-500 text-white transition-all flex-shrink-0 shadow-lg hover:scale-105"
            onClick={handleClose}
            aria-label="Close video"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>

        {/* Video Container */}
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
          <video
            ref={videoRef}
            src={videoUrl}
            className="w-full h-full object-contain"
            onClick={togglePlay}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            autoPlay
            loop
            muted={isMuted}
            playsInline
          />
             

          {/* Center Controls */}
          <div 
            className={`absolute inset-0 flex items-center justify-center p-4 space-x-8 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}
            onMouseMove={resetControlsTimer}
          >
            <Button
              variant="ghost"
              size="icon"
              className="h-12 w-12 rounded-full bg-black/50 text-white hover:bg-white/20 transition-all"
              onClick={(e) => {
                e.stopPropagation();
                skipBackward();
              }}
            >
              <SkipBack className="h-6 w-6" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="h-16 w-16 rounded-full bg-black/70 text-white hover:bg-white/20 transition-all"
              onClick={(e) => {
                e.stopPropagation();
                togglePlay();
              }}
            >
              {isPlaying ? (
                <Pause className="h-8 w-8" fill="white" />
              ) : (
                <Play className="h-8 w-8 ml-1" fill="white" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="h-12 w-12 rounded-full bg-black/50 text-white hover:bg-white/20 transition-all"
              onClick={(e) => {
                e.stopPropagation();
                skipForward();
              }}
            >
              <SkipForward className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Bottom Controls */}
        <div 
          className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}
          onMouseMove={resetControlsTimer}
        >
          {/* Progress Bar */}
          <div className="flex items-center w-full h-2 mb-4 group">
            <div className="relative w-full">
              <div className="absolute top-0 left-0 h-1 w-full bg-gray-600 rounded-full"></div>
              <div 
                className="absolute top-0 left-0 h-1 bg-red-600 rounded-full"
                style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
              ></div>
              <input
                type="range"
                min="0"
                max={duration || 1}
                value={currentTime}
                onChange={handleProgressChange}
                className="absolute top-0 left-0 w-full h-2 opacity-0 cursor-pointer"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 sm:h-10 sm:w-10 rounded-full text-white hover:bg-white/20 transition-all text-xs sm:text-base"
                onClick={(e) => {
                  e.stopPropagation();
                  togglePlay();
                }}
              >
                {isPlaying ? (
                  <Pause className="h-5 w-5" fill="white" />
                ) : (
                  <Play className="h-5 w-5 ml-0.5" fill="white" />
                )}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 sm:h-10 sm:w-10 rounded-full text-white hover:bg-white/20 transition-all text-xs sm:text-base"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMute();
                }}
              >
                {isMuted ? (
                  <VolumeX className="h-5 w-5" />
                ) : (
                  <Volume2 className="h-5 w-5" />
                )}
              </Button>

              <div className="text-sm text-gray-300">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 sm:h-10 sm:w-10 rounded-full text-white hover:bg-white/20 transition-all text-xs sm:text-base"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFullscreen();
                }}
              >
                {isFullscreen ? (
                  <Minimize2 className="h-5 w-5" />
                ) : (
                  <Maximize2 className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
