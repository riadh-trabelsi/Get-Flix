import React from 'react'

interface SearchResult {
  title: string
  overview: string
}

interface SearchResultsSectionProps {
  results: SearchResult[]
}

const SearchResultsSection: React.FC<SearchResultsSectionProps> = ({
  results,
}) => {
  return (
    <div className="search-results-section">
    
      {results.length > 0 ? (
        <ul>
          {results.map((result, index) => (
            <li key={index}>
              <p>Title: {result.title}</p>
              <p>Overview: {result.overview}</p>
              {/* Add other properties as needed */}
            </li>
          ))}
        </ul>
      ) : (
        <p></p>
      )}
    </div>
  )
}

export default SearchResultsSection