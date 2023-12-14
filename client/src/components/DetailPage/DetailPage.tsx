import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useLocation } from 'react-router-dom';

const DetailPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const [contentDetails, setContentDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContentDetails = async () => {
      try {
        const isMovie = location.pathname.includes('movie');
        const endpoint = isMovie
          ? `http://localhost:5050/movies/moviedetails/${id}`
          : `http://localhost:5050/tvshows/details/${id}`;

        const response = await axios.get(endpoint);
        setContentDetails(response.data);
      } catch (error) {
        console.error('Error fetching content details:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchContentDetails();
  }, [id, location.pathname]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading content details. Please try again later.</p>;
  }

  if (!contentDetails) {
    return <p>No content details available.</p>;
  }
  console.log(contentDetails);
  return (
    <div>
      <h2>{contentDetails.title}</h2>
      <img
        src={`https://image.tmdb.org/t/p/w500/${contentDetails.poster_path}`}
        alt={`${contentDetails.title} Poster`}
        style={{ width: '70%', height: 'auto', border: '3px solid #32de84',  borderRadius: '20px', marginLeft:'10%' }}
      />
      <p>{contentDetails.synopsis}</p>
      {contentDetails.trailerKey && (
  <iframe
    width="560"
    height="315"
    src={`https://www.youtube.com/embed/${contentDetails.trailerKey}`}
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen >
  </iframe>
)}
    </div>
  );
  
};

export default DetailPage;