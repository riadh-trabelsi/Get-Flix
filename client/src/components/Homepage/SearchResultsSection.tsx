import React, { useState } from 'react';

const api_key = "1cc614b6cd01c73622141ccf0bdceac5";
const access_token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxY2M2MTRiNmNkMDFjNzM2MjIxNDFjY2YwYmRjZWFjNSIsInN1YiI6IjY1NjQ5MWJhYTZjMTA0MDEzODJiMGZlOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pLiucY7Ytlm6fNHo2cRqaDEdJMoCG7dD42qJCgqcOwI";
const base_url = "https://api.themoviedb.org/3";
const base_img = "https://image.tmdb.org/t/p/w500";
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${access_token}`
    }
};

const SearchResultsSection = () => {
    const [search, setSearch] = useState('');
    const [results, setResults] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = `${base_url}/search/movie?query=${search}`;

        fetch(url, options)
            .then(res => res.json())
            .then(json => {
                setResults(json.results);
            });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" value={search} onChange={e => setSearch(e.target.value)} />
                <button type="submit">Search</button>
            </form>

            <div className="search-results">
                {results.map(result => (
                    <div className="col-lg-3 col-md-6 col-12 mb-4 mb-lg-0" key={result.id}>
                        <div className="custom-block custom-block-overlay">
                            <a href="detail-page.html" className="custom-block-image-wrap">
                                {result.poster_path && <img src={`${base_img}${result.poster_path}`} className="custom-block-image img-fluid" alt="" />}
                            </a>

                            <div className="custom-block-info custom-block-overlay-info">
                                <h5 className="mb-1">
                                    <a href="listing-page.html">
                                        {result.original_title}
                                    </a>
                                </h5>

                                <p className="badge mb-0">50 Episodes</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchResultsSection;