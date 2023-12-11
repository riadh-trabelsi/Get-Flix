import './Movies.css'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

interface Movie {
  id: number
  title: string
  // Add other properties based on your API response
}

const Movies: React.FC = () => {
  const [comedyMovies, setComedyMovies] = useState<Movie[]>([])
  const [actionMovies, setActionMovies] = useState<Movie[]>([])
  const [latestMovies, setLatestMovies] = useState<Movie[]>([])
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const comedyResponse = await axios.get('/api/comedy')
        setComedyMovies(comedyResponse.data.results)

        const actionResponse = await axios.get('/api/action')
        setActionMovies(actionResponse.data.results)

        const latestResponse = await axios.get('/api/latest')
        setLatestMovies(latestResponse.data.results)

        const upcomingResponse = await axios.get('/api/upcoming')
        setUpcomingMovies(upcomingResponse.data.results)

        // All API calls completed, set loading to false
        setLoading(false)
      } catch (error) {
        console.error('Error fetching movies:', error)
        // Handle errors here if needed
        setLoading(false) // Set loading to false even in case of an error
      }
    }

    // Call the API function
    fetchData()
  }, []) // The empty dependency array ensures that this effect runs once when the component mounts

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div>
            <h2>Comedy Movies</h2>
            <ul>
              {comedyMovies.map((movie) => (
                <li key={movie.id}>{movie.title}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2>Action Movies</h2>
            <ul>
              {actionMovies.map((movie) => (
                <li key={movie.id}>{movie.title}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2>Latest Movies</h2>
            <ul>
              {latestMovies.map((movie) => (
                <li key={movie.id}>{movie.title}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2>Upcoming Movies</h2>
            <ul>
              {upcomingMovies.map((movie) => (
                <li key={movie.id}>{movie.title}</li>
              ))}
            </ul>
          </div>
        </>
      )}
    </>
  )
}

export default Movies
