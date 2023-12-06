import React from 'react'
import SearchResultsSection from './SearchResultsSection.tsx'
import HeroSection from './HeroSection.tsx'
import LatestPodcastSection from './LatestPodcastSection.tsx'
import TopicsSection from './TopicsSection.tsx'
import TrendingPodcastSection from './TrendingPodcastSection.tsx'

const HomePage: React.FC = () => {
  return (
  <>
 
      <SearchResultsSection />
      <HeroSection />
      <LatestPodcastSection />
      <TopicsSection />
      <TrendingPodcastSection />
  </>
  
  )
}

export default HomePage