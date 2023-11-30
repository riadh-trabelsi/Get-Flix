import React from 'react'
import SearchResultsSection from './SearchResultsSection.tsx'
import HeroSection from './HeroSection.tsx'
import LatestPodcastSection from './LatestPodcastSection.tsx'
import TopicsSection from './TopicsSection.tsx'
import TrendingPodcastSection from './TrendingPodcastSection.tsx'

const HomePage: React.FC = () => {
  return (
    <main>
      <SearchResultsSection />
      <HeroSection />
      <LatestPodcastSection />
      <TopicsSection />
      <TrendingPodcastSection />
    </main>
  )
}

export default HomePage
