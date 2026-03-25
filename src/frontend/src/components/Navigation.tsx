import { Headphones, Menu, X } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

interface NavigationProps {
  onExploreClick: () => void;
  onAboutClick: () => void;
}

export default function Navigation({
  onExploreClick,
  onAboutClick,
}: NavigationProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-charcoal border-b border-gold/30"
      style={{ boxShadow: "0 2px 20px oklch(0 0 0 / 0.5)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2.5" data-ocid="nav.link">
            <div className="w-8 h-8 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center">
              <Headphones className="w-4 h-4 text-gold" />
            </div>
            <span className="font-serif font-bold text-xl text-beige">
              Inspire<span className="text-gold">Audio</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <nav
            className="hidden md:flex items-center gap-8"
            aria-label="Main navigation"
          >
            <button
              type="button"
              onClick={onExploreClick}
              className="font-sans text-sm font-medium text-beige/70 hover:text-gold transition-colors cursor-pointer"
              data-ocid="nav.explore.link"
            >
              Explore
            </button>
            <button
              type="button"
              onClick={onExploreClick}
              className="font-sans text-sm font-medium text-beige/70 hover:text-gold transition-colors cursor-pointer"
              data-ocid="nav.categories.link"
            >
              Categories
            </button>
            <button
              type="button"
              onClick={onAboutClick}
              className="font-sans text-sm font-medium text-beige/70 hover:text-gold transition-colors cursor-pointer"
              data-ocid="nav.about.link"
            >
              About
            </button>
            <button
              type="button"
              className="font-sans text-sm font-medium text-gold border border-gold/50 hover:bg-gold/10 rounded-full px-5 py-1.5 transition-colors"
              data-ocid="nav.signin.button"
            >
              Sign In
            </button>
          </nav>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden text-beige/70 hover:text-gold transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            data-ocid="nav.menu.toggle"
          >
            {menuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-charcoal border-t border-gold/20 px-4 py-4 flex flex-col gap-4"
        >
          <button
            type="button"
            onClick={() => {
              onExploreClick();
              setMenuOpen(false);
            }}
            className="text-left font-sans text-sm text-beige/80 hover:text-gold"
            data-ocid="nav.mobile.explore.link"
          >
            Explore
          </button>
          <button
            type="button"
            onClick={() => {
              onExploreClick();
              setMenuOpen(false);
            }}
            className="text-left font-sans text-sm text-beige/80 hover:text-gold"
            data-ocid="nav.mobile.categories.link"
          >
            Categories
          </button>
          <button
            type="button"
            onClick={() => {
              onAboutClick();
              setMenuOpen(false);
            }}
            className="text-left font-sans text-sm text-beige/80 hover:text-gold"
            data-ocid="nav.mobile.about.link"
          >
            About
          </button>
          <button
            type="button"
            className="text-left font-sans text-sm text-gold"
            data-ocid="nav.mobile.signin.button"
          >
            Sign In
          </button>
        </motion.div>
      )}
    </motion.header>
  );
}
