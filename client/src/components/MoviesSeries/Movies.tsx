import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import ReactPaginate from 'react-paginate'
import './Movies.css' // Assuming you have a CSS file for styling

interface Movie {
  id: number
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

  // Pagination state
  const [currentPageLatest, setCurrentPageLatest] = useState(0)
  const [currentPagePopular, setCurrentPagePopular] = useState(0)
  const [currentPageUpcoming, setCurrentPageUpcoming] = useState(0)

  const moviesPerPage = 5 // Adjust as needed

  useEffect(() => {
    const fetchData = async () => {
      try {
        const latestResponse = await axios.get(
          'https://viewtopia-zlcc.onrender.com//movies/latest',
        )
        setLatestMovies(latestResponse.data)

        const popularResponse = await axios.get(
          'https://viewtopia-zlcc.onrender.com//movies/popular',
        )
        setPopularMovies(popularResponse.data)

        const upcomingResponse = await axios.get(
          'https://viewtopia-zlcc.onrender.com//movies/upcoming',
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

  const handlePageClickLatest = ({ selected }: { selected: number }) => {
    setCurrentPageLatest(selected)
  }

  const handlePageClickPopular = ({ selected }: { selected: number }) => {
    setCurrentPagePopular(selected)
  }

  const handlePageClickUpcoming = ({ selected }: { selected: number }) => {
    setCurrentPageUpcoming(selected)
  }

  const renderPaginatedMovies = (movies: Movie[], currentPage: number) => {
    const startIndex = currentPage * moviesPerPage
    const slicedMovies = movies.slice(startIndex, startIndex + moviesPerPage)

    const handleMovieClick = (id: number) => {
      const isMovie = true
      const detailPageRoute = isMovie ? `/movie/${id}` : `/tvshow/${id}`
      window.location.href = detailPageRoute
    }

    return (
      <div className="movies-container">
        {slicedMovies.map((movie) => (
          <div
            key={movie.poster_path}
            className="movie-card"
            onClick={() => handleMovieClick(movie.id)}
          >
            <Link to={`/movie/${movie.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={`${movie.title} Poster`}
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

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h2 style={{ textAlign: 'center', color: 'white' }}>Latest Movies</h2>
          {renderPaginatedMovies(latestMovies, currentPageLatest)}

          <ReactPaginate
            pageCount={Math.ceil(latestMovies.length / moviesPerPage)}
            pageRangeDisplayed={2}
            marginPagesDisplayed={1}
            onPageChange={handlePageClickLatest}
            containerClassName="pagination"
            activeClassName="active"
          />

          <hr />
          <h2 style={{ textAlign: 'center', color: 'white' }}>
            Popular Movies
          </h2>
          {renderPaginatedMovies(popularMovies, currentPagePopular)}

          <ReactPaginate
            pageCount={Math.ceil(popularMovies.length / moviesPerPage)}
            pageRangeDisplayed={2}
            marginPagesDisplayed={1}
            onPageChange={handlePageClickPopular}
            containerClassName="pagination"
            activeClassName="active"
          />

          <hr />
          <h2 style={{ textAlign: 'center', color: 'white' }}>
            Upcoming Movies
          </h2>
          {renderPaginatedMovies(upcomingMovies, currentPageUpcoming)}

          <ReactPaginate
            pageCount={Math.ceil(upcomingMovies.length / moviesPerPage)}
            pageRangeDisplayed={2}
            marginPagesDisplayed={1}
            onPageChange={handlePageClickUpcoming}
            containerClassName="pagination"
            activeClassName="active"
            previousLabel="Previous"
            nextLabel="Next"
          />
        </>
      )}
    </div>
  )
}

export default Movies
