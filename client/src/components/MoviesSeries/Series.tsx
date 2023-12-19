import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import ReactPaginate from 'react-paginate'
import './Movies.css'

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

  const [currentPageTopRated, setCurrentPageTopRated] = useState(0)
  const [currentPagePopular, setCurrentPagePopular] = useState(0)
  const [currentPageAiringToday, setCurrentPageAiringToday] = useState(0)

  const tvPerPage = 5

  useEffect(() => {
    const fetchData = async () => {
      try {
        const topratedResponse = await axios.get(
          'https://viewtopia-zlcc.onrender.com//tvshows/toprated',
        )
        setToprated(topratedResponse.data)

        const popularResponse = await axios.get(
          'https://viewtopia-zlcc.onrender.com//tvshows/popular',
        )
        setPopular(popularResponse.data)

        const airingtodayResponse = await axios.get(
          'https://viewtopia-zlcc.onrender.com//tvshows/airingtoday',
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

  const handlePageClickTopRated = ({ selected }: { selected: number }) => {
    setCurrentPageTopRated(selected)
  }

  const handlePageClickPopular = ({ selected }: { selected: number }) => {
    setCurrentPagePopular(selected)
  }

  const handlePageClickAiringToday = ({ selected }: { selected: number }) => {
    setCurrentPageAiringToday(selected)
  }

  const renderPaginatedTvShows = (tvshows: TvShow[], currentPage: number) => {
    const startIndex = currentPage * tvPerPage
    const slicedTvShows = tvshows.slice(startIndex, startIndex + tvPerPage)

    return (
      <div className="movies-container">
        {slicedTvShows.map((tvshow) => (
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
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h2 style={{ textAlign: 'center', color: 'white' }}>
            Top Rated TV Shows
          </h2>
          {renderPaginatedTvShows(toprated, currentPageTopRated)}

          <ReactPaginate
            pageCount={Math.ceil(toprated.length / tvPerPage)}
            pageRangeDisplayed={2}
            marginPagesDisplayed={1}
            onPageChange={handlePageClickTopRated}
            containerClassName="pagination"
            activeClassName="active"
          />

          <hr />
          <h2 style={{ textAlign: 'center', color: 'white' }}>
            Popular TV Shows
          </h2>
          {renderPaginatedTvShows(popular, currentPagePopular)}

          <ReactPaginate
            pageCount={Math.ceil(popular.length / tvPerPage)}
            pageRangeDisplayed={2}
            marginPagesDisplayed={1}
            onPageChange={handlePageClickPopular}
            containerClassName="pagination"
            activeClassName="active"
          />

          <hr />
          <h2 style={{ textAlign: 'center', color: 'white' }}>Airing Today</h2>
          {renderPaginatedTvShows(airingtoday, currentPageAiringToday)}

          <ReactPaginate
            pageCount={Math.ceil(airingtoday.length / tvPerPage)}
            pageRangeDisplayed={2}
            marginPagesDisplayed={1}
            onPageChange={handlePageClickAiringToday}
            containerClassName="pagination"
            activeClassName="active"
          />
        </>
      )}
    </div>
  )
}

export default TvShows
