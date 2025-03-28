import React, { useState, useEffect } from 'react'
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

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://localhost:5050/movies/popular')
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

  const handleLogout = async () => {
    await logout()
    navigate('/')
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
          <div id="welcomeCarousel" className="carousel slide mb-5" data-bs-ride="carousel">
            <div className="carousel-indicators">
              {movies.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  data-bs-target="#welcomeCarousel"
                  data-bs-slide-to={index}
                  className={index === 0 ? 'active' : ''}
                  aria-current={index === 0 ? 'true' : 'false'}
                  aria-label={`Slide ${index + 1}`}
                ></button>
              ))}
            </div>
            <div className="carousel-inner">
              {movies.map((movie, index) => (
                <div key={movie.id} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
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
                        <span className="rating">⭐ {movie.vote_average.toFixed(1)}</span>
                        <span className="year">{new Date(movie.release_date).getFullYear()}</span>
                      </div>
                      <Link to={`/movie/${movie.id}`} className="btn btn-primary">
                        Watch Now
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#welcomeCarousel" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#welcomeCarousel" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
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
