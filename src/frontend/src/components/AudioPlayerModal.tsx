import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import {
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { Story } from "../backend.d";
import {
  formatDuration,
  getCategoryColor,
  getStarImage,
} from "../utils/storyImages";

interface AudioPlayerModalProps {
  story: Story | null;
  stories: Story[];
  isOpen: boolean;
  onClose: () => void;
  onStoryChange: (story: Story) => void;
}

export default function AudioPlayerModal({
  story,
  stories,
  isOpen,
  onClose,
  onStoryChange,
}: AudioPlayerModalProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const totalSeconds = story ? Number(story.durationSeconds) : 0;

  // Playback timer
  useEffect(() => {
    if (isPlaying && totalSeconds > 0) {
      intervalRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= totalSeconds) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, totalSeconds]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional reset on story identity change
  useEffect(() => {
    setCurrentTime(0);
    setIsPlaying(true);
  }, [story?.author]);

  useEffect(() => {
    if (!isOpen) setIsPlaying(false);
  }, [isOpen]);

  if (!story) return null;

  const progress = totalSeconds > 0 ? (currentTime / totalSeconds) * 100 : 0;
  const currentIndex = stories.findIndex((s) => s.author === story.author);

  function formatTime(secs: number) {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  }

  function handlePrev() {
    if (currentIndex > 0) onStoryChange(stories[currentIndex - 1]);
  }

  function handleNext() {
    if (currentIndex < stories.length - 1)
      onStoryChange(stories[currentIndex + 1]);
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="max-w-lg w-full border-gold/20 p-0 overflow-hidden"
        style={{
          background: "oklch(0.17 0.01 170)",
          boxShadow: "0 24px 80px oklch(0 0 0 / 0.7)",
        }}
        data-ocid="player.dialog"
      >
        {/* Hero image */}
        <div className="relative h-56 overflow-hidden">
          <img
            src={getStarImage(story.author)}
            alt={story.author}
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, transparent 30%, oklch(0.17 0.01 170) 100%)",
            }}
          />
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-charcoal/60 border border-beige/20 flex items-center justify-center text-beige/70 hover:text-beige transition-colors"
            data-ocid="player.close.button"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="absolute bottom-4 left-6">
            <span
              className={`font-sans text-xs font-semibold px-2.5 py-1 rounded-full border ${getCategoryColor(story.category)}`}
            >
              {story.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 pb-8 space-y-5">
          <div className="text-center space-y-1">
            <h3 className="font-serif text-2xl font-bold text-beige">
              {story.author}
            </h3>
            <p className="font-sans text-sm text-gold/80 italic">
              {story.title}
            </p>
            <p className="font-sans text-xs text-beige/40">
              {formatDuration(story.durationSeconds)}
            </p>
          </div>

          {/* Progress */}
          <div className="space-y-2">
            <div className="relative h-1.5 bg-charcoal-medium rounded-full overflow-hidden">
              <AnimatePresence>
                <motion.div
                  className="absolute left-0 top-0 h-full bg-gold rounded-full"
                  style={{ width: `${progress}%` }}
                  transition={{ type: "tween", ease: "linear" }}
                />
              </AnimatePresence>
              {isPlaying && (
                <motion.div
                  className="absolute top-0 h-full w-4 rounded-full"
                  style={{
                    left: `${progress}%`,
                    background: "oklch(0.70 0.10 75 / 0.4)",
                  }}
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                />
              )}
            </div>
            <div className="flex justify-between font-sans text-xs text-beige/40">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(totalSeconds)}</span>
            </div>
          </div>

          {/* Waveform visual */}
          {isPlaying && (
            <div className="flex items-center justify-center gap-1 h-8">
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  // biome-ignore lint/suspicious/noArrayIndexKey: static decorative bars
                  key={i}
                  className="w-1 rounded-full bg-gold/60 waveform-bar"
                  style={{
                    height: `${20 + Math.sin(i * 0.8) * 12}px`,
                    animationDelay: `${i * 0.06}s`,
                  }}
                />
              ))}
            </div>
          )}

          {/* Controls */}
          <div className="flex items-center justify-center gap-6">
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentIndex <= 0}
              className="text-beige/50 hover:text-beige disabled:opacity-30 transition-colors"
              data-ocid="player.prev.button"
            >
              <SkipBack className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-14 h-14 rounded-full bg-gold text-charcoal flex items-center justify-center hover:bg-gold-light transition-colors shadow-gold"
              data-ocid="player.play_pause.button"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 fill-current" />
              ) : (
                <Play className="w-6 h-6 fill-current" />
              )}
            </button>
            <button
              type="button"
              onClick={handleNext}
              disabled={currentIndex >= stories.length - 1}
              className="text-beige/50 hover:text-beige disabled:opacity-30 transition-colors"
              data-ocid="player.next.button"
            >
              <SkipForward className="w-5 h-5" />
            </button>
          </div>

          {/* Volume */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsMuted(!isMuted)}
              className="text-beige/50 hover:text-beige transition-colors"
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>
            <Slider
              value={[isMuted ? 0 : volume]}
              onValueChange={([v]) => {
                setVolume(v);
                setIsMuted(false);
              }}
              max={100}
              step={1}
              className="flex-1"
              data-ocid="player.volume.select"
            />
            <span className="font-sans text-xs text-beige/40 w-8">
              {isMuted ? 0 : volume}%
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
