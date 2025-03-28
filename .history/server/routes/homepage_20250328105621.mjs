import express from 'express'
import axios from 'axios'
import { search } from './search/search.mjs'
import MovieModel from '../models/moviemodel.mjs'
import TvShowModel from '../models/tvmodel.mjs'

const homepageRoutes = express.Router()

const apiKey = '1cc614b6cd01c73622141ccf0bdceac5'

homepageRoutes.get('/trending', async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}`,
    )
    const trendingMoviesData = response.data.results

    await MovieModel.deleteMany() // Clear existing data
    await MovieModel.insertMany(trendingMoviesData)

    res.json(trendingMoviesData)
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

    await TvShowModel.deleteMany() // Clear existing data
    await TvShowModel.insertMany(ontheairData)

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

    await MovieModel.deleteMany({ latest: true })
    await MovieModel.insertMany(
      latestMovies.map((movie) => ({ ...movie, latest: true })),
    )

    res.json(latestMovies)
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
    const personData = response.data.results

    await MovieModel.deleteMany() // Clear existing data
    await MovieModel.insertMany(personData)

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

homepageRoutes.get('/actors' , async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/trending/person/week?api_key=${apiKey}`,
    )
    const actorsData = response.data.results.slice(0,3)
    res.json(actorsData)
  } catch (error) {
    res.status(500).json({ error: 'error fetching actors' })
  }



})

export default homepageRoutes
