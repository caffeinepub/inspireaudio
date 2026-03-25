import { Skeleton } from "@/components/ui/skeleton";
import { Clock, Play, Star } from "lucide-react";
import { motion } from "motion/react";
import type { Story } from "../backend.d";
import { useFeaturedStory } from "../hooks/useQueries";
import {
  formatDuration,
  getCategoryColor,
  getStarImage,
} from "../utils/storyImages";

interface FeaturedBiographyProps {
  onPlay: (story: Story) => void;
}

export default function FeaturedBiography({ onPlay }: FeaturedBiographyProps) {
  const { data: story, isLoading } = useFeaturedStory();

  if (isLoading) {
    return (
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <Skeleton className="h-8 w-48 mb-8 bg-charcoal-medium" />
        <Skeleton
          className="h-64 w-full rounded-2xl bg-charcoal-medium"
          data-ocid="featured.loading_state"
        />
      </section>
    );
  }

  if (!story) return null;

  return (
    <section
      className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      id="featured"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-3 mb-8">
          <Star className="w-5 h-5 text-gold fill-gold" />
          <h2 className="font-serif text-2xl font-bold text-beige">
            Featured Biography
          </h2>
          <div className="flex-1 h-px bg-gold/20" />
        </div>

        <div
          className="relative rounded-3xl overflow-hidden border border-gold/20 shadow-card"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.19 0.02 60) 0%, oklch(0.19 0.01 170) 100%)",
          }}
          data-ocid="featured.card"
        >
          <div className="grid md:grid-cols-2 gap-0">
            {/* Image side */}
            <div className="relative h-64 md:h-auto overflow-hidden">
              <img
                src={getStarImage(story.author)}
                alt={story.author}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-charcoal/60" />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent md:hidden" />
            </div>

            {/* Content side */}
            <div className="p-8 md:p-12 flex flex-col justify-center gap-5">
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className={`font-sans text-xs font-semibold px-3 py-1 rounded-full border ${getCategoryColor(story.category)}`}
                >
                  {story.category}
                </span>
                <span className="font-sans text-xs text-gold/70 flex items-center gap-1">
                  <Clock className="w-3 h-3" />{" "}
                  {formatDuration(story.durationSeconds)}
                </span>
              </div>

              <div>
                <h3 className="font-serif text-3xl md:text-4xl font-bold text-beige leading-tight mb-2">
                  {story.author}
                </h3>
                <p className="font-serif text-lg text-gold/80 italic">
                  {story.title}
                </p>
              </div>

              <p className="font-sans text-sm text-beige/60 leading-relaxed line-clamp-3">
                {story.description}
              </p>

              <button
                type="button"
                onClick={() => onPlay(story)}
                className="inline-flex items-center gap-3 font-sans font-semibold text-sm bg-gold text-charcoal rounded-full px-8 py-3.5 hover:bg-gold-light transition-colors shadow-gold w-fit mt-2"
                data-ocid="featured.play.button"
              >
                <Play className="w-4 h-4 fill-current" />
                Play Story
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
