import express from 'express'
import axios from 'axios'
import { movieFilterByGenres, movieFilterByYear } from './filter.mjs'
import { search } from './search.mjs'

const movieRoutes = express.Router()

const apiKey = '1cc614b6cd01c73622141ccf0bdceac5'

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

movieRoutes.get('/moviegenre/:genreId', async (req, res) => {
  const { genreId } = req.params
  try {
    const movies = await movieFilterByGenres(genreId)
    res.json(movies)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})
movieRoutes.get('/movieyear/:year', async (req, res) => {
  const { year } = req.params
  try {
    const movies = await movieFilterByYear(year)
    res.json(movies)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

movieRoutes.get('/search/:query', async (req, res) => {
  const { query } = req.params
  try {
    const movies = await search(query)
    res.json(movies)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default movieRoutes
