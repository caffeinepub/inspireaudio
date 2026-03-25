export const STAR_IMAGES: Record<string, string> = {
  "Chris Gayle": "/assets/generated/chris-gayle.dim_400x300.jpg",
  "Usain Bolt": "/assets/generated/usain-bolt.dim_400x300.jpg",
  "Oprah Winfrey": "/assets/generated/oprah-winfrey.dim_400x300.jpg",
  "Elon Musk": "/assets/generated/elon-musk.dim_400x300.jpg",
  "Serena Williams": "/assets/generated/serena-williams.dim_400x300.jpg",
  "Cristiano Ronaldo": "/assets/generated/cristiano-ronaldo.dim_400x300.jpg",
  Rihanna: "/assets/generated/rihanna.dim_400x300.jpg",
  "LeBron James": "/assets/generated/lebron-james.dim_400x300.jpg",
  "Nelson Mandela": "/assets/generated/nelson-mandela.dim_400x300.jpg",
  "Malala Yousafzai": "/assets/generated/malala-yousafzai.dim_400x300.jpg",
};

export function getStarImage(author: string): string {
  return (
    STAR_IMAGES[author] || "/assets/generated/hero-inspire.dim_1600x900.jpg"
  );
}

export const CATEGORY_COLORS: Record<string, string> = {
  Sports: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  Music: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  Business: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  Entertainment: "bg-pink-500/20 text-pink-300 border-pink-500/30",
  Comebacks: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  "Life Lessons": "bg-orange-500/20 text-orange-300 border-orange-500/30",
  Activism: "bg-teal-500/20 text-teal-300 border-teal-500/30",
};

export function getCategoryColor(category: string): string {
  return CATEGORY_COLORS[category] || "bg-gold/20 text-gold border-gold/30";
}

export function formatDuration(durationSeconds: bigint): string {
  const mins = Math.floor(Number(durationSeconds) / 60);
  return `${mins} min`;
}
