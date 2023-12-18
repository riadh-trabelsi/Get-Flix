import React from 'react'
import SearchResultsSection from './SearchResultsSection.tsx'
import HeroSection from './HeroSection.tsx'
import LatestPodcastSection from './LatestPodcastSection.tsx'
import TopicsSection from './TopicsSection.tsx'
import TrendingPodcastSection from './TrendingPodcastSection.tsx'
import MainCarousel from './MainCarousel.tsx'

const HomePage: React.FC = () => {
  return (
    <>
      <SearchResultsSection results={[]} />
      <TopicsSection />
      <HeroSection />

      <TrendingPodcastSection />
    </>
  )
}

export default HomePage
