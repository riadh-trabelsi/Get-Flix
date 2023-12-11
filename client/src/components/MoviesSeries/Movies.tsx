import React, { useState, useEffect } from 'react'
import axios from 'axios'

interface Movie {
  title: string
  overview: string
  releaseDate: string
  genres: string
  tmdbRating: number
  trailerKey: string | null
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

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h2>Latest Movies</h2>
          <ul>
            {latestMovies.map((movie) => (
              <li key={movie.title}>
                {/* Display movie details as needed */}
                <p>{movie.title}</p>
              </li>
            ))}
          </ul>

          <h2>Popular Movies</h2>
          <ul>
            {popularMovies.map((movie) => (
              <li key={movie.title}>
                {/* Display movie details as needed */}
                <p>{movie.title}</p>
              </li>
            ))}
          </ul>

          <h2>Upcoming Movies</h2>
          <ul>
            {upcomingMovies.map((movie) => (
              <li key={movie.title}>
                {/* Display movie details as needed */}
                <p>{movie.title}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}

export default Movies
