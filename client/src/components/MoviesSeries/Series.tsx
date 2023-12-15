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
  const [toprated, setToprated] = useState<Movie[]>([])
  const [popular, setPopular] = useState<Movie[]>([])
  const [airingtoday, setAiringToday] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const topratedResponse = await axios.get(
          'http://localhost:5050/tvshows/toprated',
        )
        setToprated(topratedResponse.data)

        const popularResponse = await axios.get(
          'http://localhost:5050/tvshows/popular',
        )
        setPopular(popularResponse.data)

        const airingtodayResponse = await axios.get(
          'http://localhost:5050/tvshows/airingtoday',
        )
        setAiringToday(airingtodayResponse.data)

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
          <h2 style={{textAlign:'center', color:'white'}}>Top Rated</h2>
          <Slider {...sliderSettings}>{renderMovies(toprated)}</Slider>

          <hr /><h2 style={{textAlign:'center', color:'white'}}>Popular</h2>
          <Slider {...sliderSettings}>{renderMovies(popular)}</Slider>

          <hr /><h2 style={{textAlign:'center', color:'white'}}>Upcoming Movies</h2>
          <Slider {...sliderSettings}>{renderMovies(airingtoday)}</Slider>
        </>
      )}
    </div>
  )
}

export default Movies
