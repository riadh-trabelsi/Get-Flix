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
    <>


<div className="row justify-content-center " style={{ margin: 0, padding: 0 }}>
<div className="col-lg-6 col-sm-12 col-md-6" style={{ padding: 0 }}>
    <div className="card d-flex flex-row" style={{ height: '800px', border: '3px solid #32de84',  borderRadius: '20px',  }}>
    <img
        src={`https://image.tmdb.org/t/p/w500/${contentDetails.poster_path}`}
        alt={`${contentDetails.title} Poster`}
        style={{ width:'100%',  border: '3px solid #32de84',  borderRadius: '20px',  }}
    />
    </div>
    </div>
        <div className="col-lg-4 col-sm-12 col-md-4" style={{ padding: 0, }}>
        <div className="card d-flex flex-row " style={{  backgroundColor:'black', color: 'white', height: '800px', border: '3px solid #32de84',  borderRadius: '20px', paddingTop:'5%'  }}>
        <div className="card-body"  style={{ overflowY: 'auto', maxHeight: '800px' }}>
        <h2>{contentDetails.title}</h2>
        <hr />
        <h5> {contentDetails.synopsis}</h5>
        <hr />
        <h2>Genre: {contentDetails.genres}</h2>
        <hr />
        <h2>{contentDetails.releaseDate}</h2>
        <hr />
        <h2>Rating: {contentDetails.tmdbRating}</h2>
        <hr />
        <div className='trailer' style={{textAlign:'center'}}>
        {contentDetails.trailerKey && (
            <div className="embed-responsive embed-responsive-16by9" >
        <iframe
                className="embed-responsive-item"
                style={{width: '90%'}}
                src={`https://www.youtube.com/embed/${contentDetails.trailerKey}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen >
              </iframe>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
</div>



   
    </>
  );
  
};

export default DetailPage;