import { Headphones, Pause, Play, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { Story } from "../backend.d";
import { getStarImage } from "../utils/storyImages";

interface MiniPlayerProps {
  story: Story | null;
  isPlaying: boolean;
  onToggle: () => void;
  onClose: () => void;
  onExpand: () => void;
}

export default function MiniPlayer({
  story,
  isPlaying,
  onToggle,
  onClose,
  onExpand,
}: MiniPlayerProps) {
  return (
    <AnimatePresence>
      {story && (
        <motion.div
          initial={{ opacity: 0, y: 80, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 80, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-6 right-6 z-40 w-72 rounded-2xl border border-gold/20 overflow-hidden shadow-card"
          style={{ background: "oklch(0.17 0.01 170)" }}
          data-ocid="mini_player.card"
        >
          {/* Progress bar */}
          <div className="h-0.5 bg-charcoal-medium">
            <motion.div
              className="h-full bg-gold"
              animate={{ width: isPlaying ? ["0%", "100%"] : undefined }}
              transition={{
                duration: 60,
                ease: "linear",
                repeat: Number.POSITIVE_INFINITY,
              }}
            />
          </div>

          <div className="p-4 flex items-center gap-3">
            {/* Thumbnail */}
            <button
              type="button"
              onClick={onExpand}
              className="relative flex-shrink-0 w-12 h-12 rounded-xl overflow-hidden"
              aria-label="Expand player"
            >
              <img
                src={getStarImage(story.author)}
                alt={story.author}
                className="w-full h-full object-cover"
              />
              {isPlaying && (
                <div className="absolute inset-0 bg-charcoal/40 flex items-center justify-center">
                  <Headphones className="w-4 h-4 text-gold" />
                </div>
              )}
            </button>

            {/* Info */}
            <button
              type="button"
              onClick={onExpand}
              className="flex-1 min-w-0 text-left"
              aria-label="Open full player"
            >
              <p className="font-serif text-sm font-semibold text-beige truncate">
                {story.author}
              </p>
              <p className="font-sans text-xs text-gold/70 truncate italic">
                {story.title}
              </p>
            </button>

            {/* Controls */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                type="button"
                onClick={onToggle}
                className="w-9 h-9 rounded-full bg-gold text-charcoal flex items-center justify-center hover:bg-gold-light transition-colors"
                data-ocid="mini_player.play_pause.toggle"
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 fill-current" />
                ) : (
                  <Play className="w-4 h-4 fill-current" />
                )}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="w-7 h-7 rounded-full bg-charcoal-medium text-beige/50 hover:text-beige flex items-center justify-center transition-colors"
                data-ocid="mini_player.close.button"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
