# InspireAudio - Successful Stars Biography App

## Current State
Backend has Story type with title, description, audioUrl, author, durationSeconds, category. APIs: getAllStories, getStoriesByCategory, getFeaturedStory, getMotivationalQuote, getAllCategories, getStoryByTitle, setMotivationalQuote.

## Requested Changes (Diff)

### Add
- App to inspire people through biography stories of successful stars across sports, music, business, and entertainment
- Hero section: bold headline about inspiring lives, CTA to start listening
- Featured star biography card (from getFeaturedStory)
- Story card grid: cover image per star (generated), star name, category badge, short bio excerpt, duration, Play button
- Category filter tabs: All, Sports, Music, Business, Entertainment, Comebacks
- Motivational quote of the day block (from getMotivationalQuote)
- Audio player modal: play/pause, progress bar, story title and star name
- Floating mini player at bottom of screen
- Stars include: Chris Gayle, Usain Bolt, Oprah Winfrey, Elon Musk, Serena Williams, Cristiano Ronaldo, Rihanna, LeBron James, Nelson Mandela, Malala Yousafzai

### Modify
- App now covers multiple stars (not only Chris Gayle)

### Remove
N/A

## Implementation Plan
1. Generate cover images for each star biography
2. Build frontend with hero, featured story, category filter, story grid, audio player modal, floating player, quote block
3. Map backend story data to UI components
