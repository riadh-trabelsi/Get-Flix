import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Slider from 'react-slick'
import { Link } from 'react-router-dom'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

interface Movie {
  id : number
  title: string
  overview: string
  releaseDate: string
  genres: string
  tmdbRating: number
  trailerKey: string | null
  poster_path: string
}

const Movies: React.FC = () => {
  const [latestMovies, setLatestMovies] = useState<Movie[]>([])
  const [popularMovies, setPopularMovies] = useState<Movie[]>([])
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const latestResponse = await axios.get(
          'http://localhost:5050/movies/latest',
        )
        setLatestMovies(latestResponse.data)

        const popularResponse = await axios.get(
          'http://localhost:5050/movies/popular',
        )
        setPopularMovies(popularResponse.data)

        const upcomingResponse = await axios.get(
          'http://localhost:5050/movies/upcoming',
        )
        setUpcomingMovies(upcomingResponse.data)

      } catch (error) {
        console.error('Error fetching movies:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleMovieClick = (id: number) => {
    
    const isMovie = true; 
    const detailPageRoute = isMovie ? `/movie/${id}` : `/tvshow/${id}`;
    window.location.href = detailPageRoute;
  };

  const renderMovies = (movies: Movie[]) => {
    return movies.map((movie) => (
      <div key={movie.poster_path} className="movie-slide" onClick={() => handleMovieClick(movie.id)}
      >
  <Link to="/detailpage/${movie.id}">
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={`${movie.title} Poster`}
          style={{ width: '70%', height: 'auto', border: '3px solid #32de84',  borderRadius: '20px', marginLeft:'10%' }}
        />
        </Link>
      </div>
    ))
  }

  const sliderSettings = {
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1500,
    autoplaySpeed: 3000,
    arrows: true,
  }

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h2 style={{textAlign:'center', color:'white'}}>Latest Movies</h2>
          <Slider {...sliderSettings}>{renderMovies(latestMovies)}</Slider>

          <hr /><h2 style={{textAlign:'center', color:'white'}}>Popular Movies</h2>
          <Slider {...sliderSettings}>{renderMovies(popularMovies)}</Slider>

          <hr /><h2 style={{textAlign:'center', color:'white'}}>Upcoming Movies</h2>
          <Slider {...sliderSettings}>{renderMovies(upcomingMovies)}</Slider>
        </>
      )}
    </div>
  )
}

export default Movies
