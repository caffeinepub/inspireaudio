import { Headphones, Instagram, Twitter, Youtube } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  const caffeinUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`;

  return (
    <footer className="bg-charcoal border-t border-gold/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center">
                <Headphones className="w-4 h-4 text-gold" />
              </div>
              <span className="font-serif font-bold text-xl text-beige">
                Inspire<span className="text-gold">Audio</span>
              </span>
            </div>
            <p className="font-sans text-sm text-beige/50 leading-relaxed max-w-xs">
              Discover the real stories behind the world's greatest achievers.
              Let their journeys inspire yours.
            </p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full bg-charcoal-medium border border-border flex items-center justify-center text-beige/50 hover:text-gold hover:border-gold/30 transition-colors"
              >
                <Instagram className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                aria-label="Twitter"
                className="w-8 h-8 rounded-full bg-charcoal-medium border border-border flex items-center justify-center text-beige/50 hover:text-gold hover:border-gold/30 transition-colors"
              >
                <Twitter className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                aria-label="YouTube"
                className="w-8 h-8 rounded-full bg-charcoal-medium border border-border flex items-center justify-center text-beige/50 hover:text-gold hover:border-gold/30 transition-colors"
              >
                <Youtube className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-semibold text-beige uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {[
                "Explore Stories",
                "Featured Biography",
                "Daily Quote",
                "About Us",
                "Contact",
              ].map((link) => (
                <li key={link}>
                  <button
                    type="button"
                    className="font-sans text-sm text-beige/50 hover:text-gold transition-colors"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-semibold text-beige uppercase tracking-wider">
              Categories
            </h4>
            <ul className="space-y-2.5">
              {[
                "Sports",
                "Music",
                "Business",
                "Entertainment",
                "Comebacks",
                "Life Lessons",
              ].map((cat) => (
                <li key={cat}>
                  <button
                    type="button"
                    className="font-sans text-sm text-beige/50 hover:text-gold transition-colors"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gold/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-sans text-xs text-beige/30">
            © {year}. Built with ❤️ using{" "}
            <a
              href={caffeinUrl}
              className="text-gold/60 hover:text-gold transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              caffeine.ai
            </a>
          </p>
          <p className="font-sans text-xs text-beige/30">
            Inspiring lives, one story at a time.
          </p>
        </div>
      </div>
    </footer>
  );
}
