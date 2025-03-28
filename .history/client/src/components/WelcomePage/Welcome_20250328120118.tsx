import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Welcome.css'
import { useAuth } from '../../context/AuthContext'

const Welcome: React.FC = () => {
  const navigate = useNavigate()
  const { isAuthenticated, logout } = useAuth()
  const [movies, setMovies] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5050/api/movies/popular',
        )
        setMovies(response.data.slice(0, 5)) // On prend les 5 premiers films
      } catch (error) {
        console.error('Error fetching movies:', error)
        setError('Failed to load movies. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  }, [])

  useEffect(() => {
    if (movies.length === 0) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [movies.length])

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <h1>Welcome to Get-Flix</h1>
        <p>Your Ultimate Streaming Destination</p>

        {/* Carousel de films */}
        {loading && <div className="loading">Loading...</div>}
        {error && <div className="error-message">{error}</div>}
        {!loading && !error && movies.length > 0 && (
          <div ref={carouselRef} className="carousel slide mb-5">
            <div className="carousel-indicators">
              {movies.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => goToSlide(index)}
                  className={index === currentIndex ? 'active' : ''}
                  aria-current={index === currentIndex ? 'true' : 'false'}
                  aria-label={`Slide ${index + 1}`}
                ></button>
              ))}
            </div>
            <div className="carousel-inner">
              {movies.map((movie, index) => (
                <div
                  key={movie.id}
                  className={`carousel-item ${
                    index === currentIndex ? 'active' : ''
                  }`}
                  style={{ transition: 'transform 0.6s ease-in-out' }}
                >
                  <div className="carousel-content">
                    <img
                      src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                      className="d-block w-100"
                      alt={movie.title}
                    />
                    <div className="carousel-caption">
                      <h3>{movie.title}</h3>
                      <p>{movie.overview}</p>
                      <div className="movie-info">
                        <span className="rating">
                          ⭐ {movie.vote_average.toFixed(1)}
                        </span>
                        <span className="year">
                          {new Date(movie.release_date).getFullYear()}
                        </span>
                      </div>
                      <Link
                        to={`/movie/${movie.id}`}
                        className="btn btn-primary"
                      >
                        Watch Now
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              onClick={() =>
                goToSlide((currentIndex - 1 + movies.length) % movies.length)
              }
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              onClick={() => goToSlide((currentIndex + 1) % movies.length)}
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        )}

        <div className="welcome-buttons">
          {isAuthenticated ? (
            <>
              <Link to="/homepage" className="welcome-btn">
                Go to Homepage
              </Link>
              <button onClick={handleLogout} className="welcome-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="welcome-btn">
                Login
              </Link>
              <Link to="/signup" className="welcome-btn">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Welcome
