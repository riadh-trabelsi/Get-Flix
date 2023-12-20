import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './Movies.css' // Add your own CSS file for styling

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
          'https://viewtopia-zlcc.onrender.com/tvshows/toprated',
        )
        setToprated(topratedResponse.data)

        const popularResponse = await axios.get(
          'https://viewtopia-zlcc.onrender.com/tvshows/popular',
        )
        setPopular(popularResponse.data)

        const airingtodayResponse = await axios.get(
          'https://viewtopia-zlcc.onrender.com/tvshows/airingtoday',
        )
        setAiringToday(airingtodayResponse.data)
      } catch (error) {
        console.error('Error fetching TV shows:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const renderTvShows = (tvshows: TvShow[]) => {
    return (
      <div className="movies-container">
        {tvshows.map((tvshow) => (
          <div
            key={tvshow.poster_path}
            className="movie-card"
            onClick={() => handleTvShowClick(tvshow.id)}
          >
            <Link to={`/tvshow/${tvshow.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w500/${tvshow.poster_path}`}
                alt={`${tvshow.title} Poster`}
                style={{
                  width: '100%',
                  height: 'auto',
                  border: '3px solid #32de84',
                  borderRadius: '20px',
                }}
              />
            </Link>
          </div>
        ))}
      </div>
    )
  }

  const handleTvShowClick = (id: number) => {
    const isMovie = false
    const TvDetailPageRoute = isMovie ? `/movie/${id}` : `/tvshow/${id}`
    window.location.href = TvDetailPageRoute
  }

  return (
    <div className="movies-container">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="category-container">
            <h2 className="category-title">Top Rated TV Shows</h2>
            <div className="movies-container-horizontal">
              {renderTvShows(toprated)}
            </div>
          </div>

          <hr className="divider" />

          <div className="category-container">
            <h2 className="category-title"> Popular TV Shows </h2>
            <div className="movies-container-horizontal">
              {renderTvShows(popular)}
            </div>
          </div>

          <hr className="divider" />

          <div className="category-container">
            <h2 className="category-title"> Airing Today </h2>
            <div className="movies-container-horizontal">
              {renderTvShows(airingtoday)}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default TvShows
