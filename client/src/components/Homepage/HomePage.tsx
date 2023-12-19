import React from 'react'
import SearchResultsSection from './SearchResultsSection.tsx'
//import HeroSection from './HeroSection.tsx'
import TopicsSection from './TopicsSection.tsx'
import TrendingPodcastSection from './TrendingPodcastSection.tsx'

const HomePage: React.FC = () => {
  return (
    <>
      <SearchResultsSection
        results={[]}
        searchMade={false}
        currentPage={''}
        onSearchResultClick={function (_id: number, _type: string): void {
          throw new Error('Function not implemented.')
        }}
      />
      <TopicsSection />

      <TrendingPodcastSection />
    </>
  )
}

export default HomePage
