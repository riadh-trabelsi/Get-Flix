import express from 'express'
import axios from 'axios'
import { search } from './search/search.mjs'

const homepageRoutes = express.Router()

const apiKey = '1cc614b6cd01c73622141ccf0bdceac5'

homepageRoutes.get('/trending', async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}`,
    )
    const trendingData = response.data.results
    res.json(trendingData)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

homepageRoutes.get('/ontheair', async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/tv/on_the_air?api_key=${apiKey}`,
    )
    const ontheairData = response.data.results
    res.json(ontheairData)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

homepageRoutes.get('/latest', async (req, res) => {
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

homepageRoutes.get('/popular', async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`,
    )
    const popularMovies = response.data.results
    res.json(popularMovies)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

homepageRoutes.get('/person', async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/person/popular?api_key=${apiKey}`,
    )
    const personData = response.data.results.slice(0, 3)
    res.json(personData)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

homepageRoutes.get('/search/:query', async (req, res) => {
  const { query } = req.params
  try {
    const searchResults = await search(query)
    res.json(searchResults)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default homepageRoutes
