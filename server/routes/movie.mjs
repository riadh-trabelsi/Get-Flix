import express from 'express'
import axios from 'axios'
import { filterByGenres, filterByYear } from './movieFilter.mjs'
import { searchMovies } from './movieSearch.mjs'

const movieRoutes = express.Router()

const apiKey = '1cc614b6cd01c73622141ccf0bdceac5'

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

movieRoutes.get('/genre/:genreId', async (req, res) => {
  const { genreId } = req.params
  try {
    const movies = await filterByGenres(genreId)
    res.json(movies)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})
movieRoutes.get('/year/:year', async (req, res) => {
  const { year } = req.params
  try {
    const movies = await filterByYear(year)
    res.json(movies)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

movieRoutes.get('/search/:query', async (req, res) => {
  const { query } = req.params
  try {
    const movies = await searchMovies(query)
    res.json(movies)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default movieRoutes
