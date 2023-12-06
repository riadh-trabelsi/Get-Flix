import express from 'express'
import axios from 'axios'
import { search } from './search.mjs'

const homepageRoutes = express.Router()

const apiKey = '1cc614b6cd01c73622141ccf0bdceac5'

homepageRoutes.get('/trending', async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}`,
    )
    const trendingMovies = response.data.results
    res.json(trendingMovies)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

homepageRoutes.get('/search/:query', async (req, res) => {
  const { query } = req.params
  try {
    const homepage = await search(query)
    res.json(homepage)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default homepageRoutes
