import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Slider from 'react-slick'
import { Link } from 'react-router-dom'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

interface TvShow {
  id: number
  title: string
  overview: string
  releaseYear: string
  genres: string
  tmdbRating: number
  trailerKey: string | null
  poster_path: string
  type: string
}

const TvShows: React.FC = () => {
  const [toprated, setToprated] = useState<TvShow[]>([])
  const [popular, setPopular] = useState<TvShow[]>([])
  const [airingtoday, setAiringToday] = useState<TvShow[]>([])
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

  const handleTvShowClick = (id: number) => {
    const isMovie = false
    const TvDetailPageRoute = isMovie ? `/movie/${id}` : `/tvshow/${id}`
    window.location.href = TvDetailPageRoute
  }

  const renderTvShows = (tvShows: TvShow[]) => {
    return tvShows.map((tvShow) => (
      <div
        key={tvShow.poster_path}
        className="tv-show-slide"
        onClick={() => handleTvShowClick(tvShow.id)}
      >
        <Link to={`/tvshow/${tvShow.id}`}>
          <img
            src={`https://image.tmdb.org/t/p/w500/${tvShow.poster_path}`}
            alt={`${tvShow.title} Poster`}
            style={{
              width: '70%',
              height: 'auto',
              border: '3px solid #32de84',
              borderRadius: '20px',
              marginLeft: '10%',
            }}
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
          <h2 style={{ textAlign: 'center', color: 'white' }}>
            Top Rated TV Shows
          </h2>
          <Slider {...sliderSettings}>{renderTvShows(toprated)}</Slider>

          <hr />
          <h2 style={{ textAlign: 'center', color: 'white' }}>
            Popular TV Shows
          </h2>
          <Slider {...sliderSettings}>{renderTvShows(popular)}</Slider>

          <hr />
          <h2 style={{ textAlign: 'center', color: 'white' }}>Airing Today</h2>
          <Slider {...sliderSettings}>{renderTvShows(airingtoday)}</Slider>
        </>
      )}
    </div>
  )
}

export default TvShows
