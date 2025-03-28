import React from 'react'
import { Link } from 'react-router-dom'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import './SearchResultsSection.css'

interface SearchResult {
  id: number
  title: string
  poster_path: string
  type: string // Add a type property to distinguish between movies and tv shows
}

interface SearchResultsSectionProps {
  results: SearchResult[]
  searchMade: boolean
  currentPage: string
  onSearchResultClick: (id: number, type: string) => void // Update the callback signature
}

const SearchResultsSection: React.FC<SearchResultsSectionProps> = ({
  results,
  searchMade,
  currentPage,
  onSearchResultClick, // Update the prop
}) => {
  return (
    <div className="search-results-section">
      {results.length > 0 ? (
        <Carousel
          showThumbs={false}
          showStatus={false}
          infiniteLoop={true}
          autoPlay={true}
          interval={5000}
          stopOnHover={true}
          showArrows={true}
          emulateTouch={true}
          centerMode={true}
          centerSlidePercentage={33.33}
        >
          {results
            .filter((result) => result.type === currentPage)
            .map((result, index) => (
              <div key={index} className="carousel-slide">
                <Link
                  to={`/${result.type === 'movie' ? 'movie' : 'tvshow'}/${
                    result.id
                  }`}
                  onClick={() => onSearchResultClick(result.id, result.type)}
                  className="carousel-link"
                >
                  <div className="image-container">
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${result.poster_path}`}
                      alt={`${result.title} Poster`}
                      className="carousel-image"
                    />
                    <div className="title-overlay">
                      <p>{result.title}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
        </Carousel>
      ) : searchMade ? (
        <p>No results found.</p>
      ) : null}
    </div>
  )
}

export default SearchResultsSection
