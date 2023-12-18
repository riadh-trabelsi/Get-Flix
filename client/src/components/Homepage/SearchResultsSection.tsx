import React from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

interface SearchResult {
  id: number;
  title: string;
  poster_path: string;
}

interface SearchResultsSectionProps {
  results: SearchResult[];
  searchMade: boolean; // new prop to indicate whether a search has been made
}

const SearchResultsSection: React.FC<SearchResultsSectionProps> = ({
  results,
  searchMade,
}) => { 
  return (
    <div className="search-results-section">
      {results.length > 0 ? (
        <Carousel>
          {results.map((result, index) => (
            <div key={index}>
              <Link to={`/movie/${result.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500/${result.poster_path}`}
                  alt={`${result.title} Poster`}
                  style={{
                    width: '80%',
                    height: 'auto',
                    border: '3px solid #32de84',
                    borderRadius: '20px',
                    marginLeft: '10%',
                  }}
                />
                <p>{result.title}</p>
              </Link>
            </div>
          ))}
        </Carousel>
      ) : searchMade ? (
        <p>No results found.</p>
      ) : null}
    </div>
  );
};

export default SearchResultsSection;