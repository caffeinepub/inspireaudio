import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "motion/react";
import { useMotivationalQuote } from "../hooks/useQueries";

export default function QuoteBlock() {
  const { data: quote, isLoading } = useMotivationalQuote();

  return (
    <section
      className="py-20 px-4 sm:px-6 lg:px-8"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.88 0.04 85) 0%, oklch(0.92 0.03 75) 100%)",
      }}
      id="quote"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="max-w-3xl mx-auto text-center"
      >
        <p className="font-sans text-xs font-semibold tracking-[0.2em] uppercase text-charcoal/50 mb-6">
          Motivation of the Day
        </p>

        {isLoading ? (
          <div className="space-y-3" data-ocid="quote.loading_state">
            <Skeleton className="h-6 w-3/4 mx-auto bg-charcoal/10" />
            <Skeleton className="h-6 w-1/2 mx-auto bg-charcoal/10" />
          </div>
        ) : (
          <blockquote className="relative" data-ocid="quote.card">
            {/* Big decorative gold quote marks */}
            <span
              className="absolute -top-8 -left-4 font-serif text-[8rem] leading-none text-gold/20 select-none pointer-events-none"
              aria-hidden="true"
            >
              &ldquo;
            </span>
            <p className="font-serif text-2xl md:text-3xl font-medium text-charcoal leading-relaxed italic relative z-10">
              {quote || "The secret of getting ahead is getting started."}
            </p>
            <span
              className="absolute -bottom-16 -right-4 font-serif text-[8rem] leading-none text-gold/20 select-none pointer-events-none"
              aria-hidden="true"
            >
              &rdquo;
            </span>
          </blockquote>
        )}

        <div className="mt-8 flex items-center justify-center gap-3">
          <div className="h-px w-12 bg-gold/40" />
          <span className="font-sans text-sm font-medium text-charcoal/60">
            InspireAudio Daily
          </span>
          <div className="h-px w-12 bg-gold/40" />
        </div>
      </motion.div>
    </section>
  );
}
