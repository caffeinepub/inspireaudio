import { BookOpen, Play } from "lucide-react";
import { motion } from "motion/react";

const heroStars = [
  {
    name: "Oprah Winfrey",
    img: "/assets/generated/oprah-winfrey.dim_400x300.jpg",
    category: "Business",
  },
  {
    name: "Usain Bolt",
    img: "/assets/generated/usain-bolt.dim_400x300.jpg",
    category: "Sports",
  },
  {
    name: "Rihanna",
    img: "/assets/generated/rihanna.dim_400x300.jpg",
    category: "Music",
  },
  {
    name: "Nelson Mandela",
    img: "/assets/generated/nelson-mandela.dim_400x300.jpg",
    category: "Activism",
  },
];

interface HeroSectionProps {
  onStartListening: () => void;
  onBrowseAll: () => void;
}

export default function HeroSection({
  onStartListening,
  onBrowseAll,
}: HeroSectionProps) {
  return (
    <section
      className="relative min-h-[90vh] flex items-center overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.10 0.02 170) 0%, oklch(0.16 0.03 60) 50%, oklch(0.12 0.02 45) 100%)",
      }}
    >
      {/* Decorative glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, oklch(0.70 0.10 75 / 0.08) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-1/2 h-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at right bottom, oklch(0.70 0.10 75 / 0.05) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20 pb-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6"
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 font-sans text-xs font-semibold tracking-[0.15em] uppercase text-gold border border-gold/30 rounded-full px-4 py-1.5 bg-gold/5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              Inspirational Biographies
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-beige leading-[1.1]"
            >
              Every Great Life
              <span className="block text-gold italic mt-1">Has a Story</span>
              <span className="block">Worth Hearing</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="font-sans text-base text-beige/60 max-w-md leading-relaxed"
            >
              Discover the inspiring biographies of world legends — athletes,
              entrepreneurs, activists, and artists. Their journeys will change
              the way you see your own.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
              className="flex flex-wrap gap-4 pt-2"
            >
              <button
                type="button"
                onClick={onStartListening}
                className="inline-flex items-center gap-2.5 font-sans font-semibold text-sm bg-gold text-charcoal rounded-full px-7 py-3.5 hover:bg-gold-light transition-colors shadow-gold"
                data-ocid="hero.start_listening.button"
              >
                <Play className="w-4 h-4 fill-current" />
                Start Listening
              </button>
              <button
                type="button"
                onClick={onBrowseAll}
                className="inline-flex items-center gap-2.5 font-sans font-semibold text-sm border border-beige/30 text-beige rounded-full px-7 py-3.5 hover:border-gold/50 hover:text-gold transition-colors"
                data-ocid="hero.browse_all.button"
              >
                <BookOpen className="w-4 h-4" />
                Browse All Stars
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex gap-8 pt-4"
            >
              {[
                { value: "50+", label: "Stories" },
                { value: "10", label: "Legends" },
                { value: "6", label: "Categories" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-serif text-2xl font-bold text-gold">
                    {stat.value}
                  </div>
                  <div className="font-sans text-xs text-beige/50 mt-0.5">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Star collage */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="grid grid-cols-2 gap-4 max-w-md mx-auto lg:mx-0 lg:ml-auto"
          >
            {heroStars.map((star, i) => (
              <motion.div
                key={star.name}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.4 + i * 0.12, duration: 0.5 }}
                className="relative group rounded-2xl overflow-hidden aspect-[4/3] shadow-card"
              >
                <img
                  src={star.img}
                  alt={star.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="font-serif text-sm font-semibold text-beige">
                    {star.name}
                  </p>
                  <p className="font-sans text-xs text-gold/80 mt-0.5">
                    {star.category}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent, oklch(0.14 0.01 170))",
        }}
      />
    </section>
  );
}
