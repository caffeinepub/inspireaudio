import { useState } from "react";
import type { Story } from "./backend.d";
import AudioPlayerModal from "./components/AudioPlayerModal";
import FeaturedBiography from "./components/FeaturedBiography";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import MiniPlayer from "./components/MiniPlayer";
import Navigation from "./components/Navigation";
import QuoteBlock from "./components/QuoteBlock";
import StoryGrid from "./components/StoryGrid";
import { useAllStories } from "./hooks/useQueries";

export default function App() {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const [isMiniPlaying, setIsMiniPlaying] = useState(false);
  const [miniStory, setMiniStory] = useState<Story | null>(null);

  const { data: allStories = [] } = useAllStories();

  function handlePlayStory(story: Story) {
    setSelectedStory(story);
    setMiniStory(story);
    setIsPlayerOpen(true);
    setIsMiniPlaying(true);
  }

  function handleClosePlayer() {
    setIsPlayerOpen(false);
  }

  function handleCloseMini() {
    setMiniStory(null);
    setIsMiniPlaying(false);
  }

  function handleStoryChange(story: Story) {
    setSelectedStory(story);
    setMiniStory(story);
  }

  function scrollToStories() {
    document.getElementById("stories")?.scrollIntoView({ behavior: "smooth" });
  }

  function scrollToQuote() {
    document.getElementById("quote")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="min-h-screen bg-background font-sans">
      <Navigation
        onExploreClick={scrollToStories}
        onAboutClick={scrollToQuote}
      />

      <main>
        <HeroSection
          onStartListening={scrollToStories}
          onBrowseAll={scrollToStories}
        />
        <FeaturedBiography onPlay={handlePlayStory} />
        <StoryGrid onPlay={handlePlayStory} />
        <QuoteBlock />
      </main>

      <Footer />

      <AudioPlayerModal
        story={selectedStory}
        stories={allStories}
        isOpen={isPlayerOpen}
        onClose={handleClosePlayer}
        onStoryChange={handleStoryChange}
      />

      <MiniPlayer
        story={miniStory}
        isPlaying={isMiniPlaying}
        onToggle={() => setIsMiniPlaying(!isMiniPlaying)}
        onClose={handleCloseMini}
        onExpand={() => {
          if (miniStory) setSelectedStory(miniStory);
          setIsPlayerOpen(true);
        }}
      />
    </div>
  );
}
