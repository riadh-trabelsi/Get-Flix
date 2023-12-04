import express from 'express'
import axios from 'axios'

const movieRoutes = express.Router()

const apiKey = '1cc614b6cd01c73622141ccf0bdceac5'
const access_token =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxY2M2MTRiNmNkMDFjNzM2MjIxNDFjY2YwYmRjZWFjNSIsInN1YiI6IjY1NjQ5MWJhYTZjMTA0MDEzODJiMGZlOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pLiucY7Ytlm6fNHo2cRqaDEdJMoCG7dD42qJCgqcOwI'

// Route for fetching comedy movies
movieRoutes.get('/comedy', async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=35`,
    )
    const comedyMovies = response.data.results
    res.json(comedyMovies)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// Route for fetching action movies
movieRoutes.get('/action', async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=28`,
    )
    const actionMovies = response.data.results
    res.json(actionMovies)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// Route for fetching latest movies
movieRoutes.get('/latest', async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`,
    )
    const latestMovies = response.data.results
    res.json(latestMovies)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// Route for fetching upcoming movies
movieRoutes.get('/upcoming', async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`,
    )
    const upcomingMovies = response.data.results
    res.json(upcomingMovies)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// Exporting the movieRoutes as a module
export default movieRoutes
