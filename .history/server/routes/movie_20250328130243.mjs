import express from 'express'
import axios from 'axios'
import { searchmovie } from './search/searchmovie.mjs'
import MovieModel from '../models/moviemodel.mjs'
import {
  getFromCacheOrFetch,
  getDetailsFromCacheOrFetch,
} from '../util/cache.mjs'

const movieRoutes = express.Router()

const apiKey = '1cc614b6cd01c73622141ccf0bdceac5'

movieRoutes.get('/latest', async (req, res) => {
  try {
    const fetchLatest = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`,
      )
      return response.data.results
    }

    const movies = await getFromCacheOrFetch('latest', fetchLatest, MovieModel)
    res.json(movies)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

movieRoutes.get('/popular', async (req, res) => {
  try {
    const fetchPopular = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`,
      )
      return response.data.results
    }

    const movies = await getFromCacheOrFetch(
      'popular',
      fetchPopular,
      MovieModel,
    )
    res.json(movies)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

movieRoutes.get('/upcoming', async (req, res) => {
  try {
    const fetchUpcoming = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`,
      )
      return response.data.results
    }

    const movies = await getFromCacheOrFetch(
      'upcoming',
      fetchUpcoming,
      MovieModel,
    )
    res.json(movies)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

movieRoutes.get('/moviedetails/:id', async (req, res) => {
  const { id } = req.params
  try {
    const fetchDetails = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&append_to_response=videos`,
      )
      return response.data
    }

    const movieDetails = await getDetailsFromCacheOrFetch(
      id,
      fetchDetails,
      MovieModel,
    )
    res.json(movieDetails)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

movieRoutes.get('/searchmovie/:query', async (req, res) => {
  const { query } = req.params
  try {
    const movies = await searchmovie(query)
    res.json(movies)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default movieRoutes
