import { Skeleton } from "@/components/ui/skeleton";
import { Clock, Play } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { Story } from "../backend.d";
import {
  useAllCategories,
  useAllStories,
  useStoriesByCategory,
} from "../hooks/useQueries";
import {
  formatDuration,
  getCategoryColor,
  getStarImage,
} from "../utils/storyImages";

interface StoryGridProps {
  onPlay: (story: Story) => void;
}

function StoryCard({
  story,
  index,
  onPlay,
}: { story: Story; index: number; onPlay: (s: Story) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
      className="bg-charcoal-light rounded-2xl overflow-hidden border border-border hover:border-gold/30 transition-colors group shadow-card"
      data-ocid={`stories.item.${index + 1}`}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={getStarImage(story.author)}
          alt={story.author}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" />
        <div
          className={`absolute top-3 left-3 font-sans text-xs font-semibold px-2.5 py-1 rounded-full border ${getCategoryColor(story.category)}`}
        >
          {story.category}
        </div>
        <div className="absolute bottom-3 right-3 flex items-center gap-1 font-sans text-xs text-beige/70">
          <Clock className="w-3 h-3" />
          {formatDuration(story.durationSeconds)}
        </div>
      </div>

      <div className="p-5 space-y-3">
        <div>
          <h3 className="font-serif text-lg font-bold text-beige leading-tight">
            {story.author}
          </h3>
          <p className="font-sans text-sm text-gold/80 mt-0.5 italic">
            {story.title}
          </p>
        </div>
        <p className="font-sans text-xs text-beige/50 leading-relaxed line-clamp-2">
          {story.description}
        </p>
        <button
          type="button"
          onClick={() => onPlay(story)}
          className="w-full inline-flex items-center justify-center gap-2 font-sans font-semibold text-sm text-charcoal bg-gold rounded-full py-2.5 hover:bg-gold-light transition-colors shadow-gold mt-1"
          data-ocid={`stories.play.button.${index + 1}`}
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          Play Now
        </button>
      </div>
    </motion.div>
  );
}

function CategoryTabs({
  activeCategory,
  onChange,
}: { activeCategory: string; onChange: (c: string) => void }) {
  const { data: categories = [] } = useAllCategories();
  const allCategories = ["All", ...categories];

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {allCategories.map((cat) => (
        <button
          key={cat}
          type="button"
          onClick={() => onChange(cat)}
          className={`flex-shrink-0 font-sans text-sm font-medium rounded-full px-5 py-2 transition-colors ${
            activeCategory === cat
              ? "bg-gold text-charcoal"
              : "bg-charcoal-medium text-beige/60 hover:text-beige border border-border hover:border-gold/30"
          }`}
          data-ocid="stories.filter.tab"
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

function StoriesContent({
  category,
  onPlay,
}: { category: string; onPlay: (s: Story) => void }) {
  const allQuery = useAllStories();
  const catQuery = useStoriesByCategory(category);
  const { data: stories, isLoading } = category === "All" ? allQuery : catQuery;

  if (isLoading) {
    return (
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Skeleton key={i} className="h-72 rounded-2xl bg-charcoal-medium" />
        ))}
      </div>
    );
  }

  if (!stories || stories.length === 0) {
    return (
      <div
        className="text-center py-16 text-beige/40"
        data-ocid="stories.empty_state"
      >
        <p className="font-serif text-2xl">No stories found</p>
        <p className="font-sans text-sm mt-2">Try a different category</p>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={category}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6"
      >
        {stories.map((story, i) => (
          <StoryCard
            key={`${story.author}-${i}`}
            story={story}
            index={i}
            onPlay={onPlay}
          />
        ))}
      </motion.div>
    </AnimatePresence>
  );
}

export default function StoryGrid({ onPlay }: StoryGridProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <section
      className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      id="stories"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-3 mb-8">
          <h2 className="font-serif text-2xl font-bold text-beige">
            All Stories
          </h2>
          <div className="flex-1 h-px bg-gold/20" />
        </div>

        <CategoryTabs
          activeCategory={activeCategory}
          onChange={setActiveCategory}
        />
        <StoriesContent category={activeCategory} onPlay={onPlay} />
      </motion.div>
    </section>
  );
}
