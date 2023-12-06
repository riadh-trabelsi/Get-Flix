import express from 'express'
//import axios from 'axios'
import { searchTv } from './search.mjs'
import { tvShowsFilterByGenres, tvShowsFilterByYear } from './filter.mjs'

const tvShowsRoutes = express.Router()

// const apiKey = '1cc614b6cd01c73622141ccf0bdceac5'

tvShowsRoutes.get('/searchtv/:query', async (req, res) => {
  const { query } = req.params
  try {
    const homepage = await searchTv(query)
    res.json(homepage)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

tvShowsRoutes.get('/tvshowsgenre/:genreId', async (req, res) => {
  const { genreId } = req.params
  try {
    const movies = await tvShowsFilterByGenres(genreId)
    res.json(movies)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})
tvShowsRoutes.get('/tvshowsyear/:year', async (req, res) => {
  const { year } = req.params
  try {
    const movies = await tvShowsFilterByYear(year)
    res.json(movies)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default tvShowsRoutes
