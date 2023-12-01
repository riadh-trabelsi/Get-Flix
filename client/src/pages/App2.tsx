// App.tsx

import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar.tsx';
import { api_key, access_token, base_url, get_movies, base_img, options, Movie } from './Api.ts';

function App() {
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const search_form = document.getElementById('search_form');
    
    if (search_form) {
      search_form.addEventListener('submit', async function (e) {
        e.preventDefault();

        try {
          const url = `${base_url}/search/movie?query=${(this as any).search.value}`;
          const response = await fetch(url, options);

          if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
          }

          const json = await response.json();
          setSearchResults(json.results || []); // Utilisation de l'opérateur de coalescence nulle pour éviter la valeur nulle
          setError(null);
        } catch (error) {
          console.error('Error fetching movies:', error.message);
          setError('Failed to fetch movies. Please try again.');
        }
      });
    }
  }, []);

  return (
    <>
      <html lang="en">
        <head></head>
        <body>
          <div id="root">
            <h1>Vitefddfdf + React</h1>
            <Navbar />

            {/* Display search results or error message */}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            
            <div className="search-results">
              {searchResults.map((result) => (
                <div key={result.id} className="col-lg-3 col-md-6 col-12 mb-4 mb-lg-0">
                  <div className="custom-block custom-block-overlay">
                    <a href="detail-page.html" className="custom-block-image-wrap">
                      <img src={`${base_img}${result.poster_path}`} className="custom-block-image img-fluid" alt="" />
                    </a>

                    <div className="custom-block-info custom-block-overlay-info">
                      <h5 className="mb-1">
                        <a href="listing-page.html">{result.original_title}</a>
                      </h5>

                      <p className="badge mb-0">50 Episodes</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </body>
      </html>
    </>
  );
}

export default App;
