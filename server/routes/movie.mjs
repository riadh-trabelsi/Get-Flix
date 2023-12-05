import express from 'express'
import axios from 'axios'

import { filterByGenres, filterByYear } from './movieFilter.mjs'

const movieRoutes = express.Router()

const apiKey = '1cc614b6cd01c73622141ccf0bdceac5'

// Route for fetching upcoming movies, popular movies, latest movies, comedy movies, and action movies
movieRoutes.get('/home', async (req, res) => {
  try {
    const upcomingResponse = await axios.get(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`,
    )
    const popularResponse = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`,
    )
    const latestResponse = await axios.get(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`,
    )
    const comedyResponse = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=35`,
    )
    const actionResponse = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=28`,
    )

    const upcomingMovies = upcomingResponse.data.results
    const popularMovies = popularResponse.data.results
    const latestMovies = latestResponse.data.results
    const comedyMovies = comedyResponse.data.results
    const actionMovies = actionResponse.data.results

    res.json({
      upcomingMovies,
      popularMovies,
      latestMovies,
      comedyMovies,
      actionMovies,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// Route for fetching movies by genre
movieRoutes.get('/genre/:genreId', async (req, res) => {
  const { genreId } = req.params
  try {
    const movies = await filterByGenres(genreId)
    res.json(movies)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Route for fetching movies by year
movieRoutes.get('/year/:year', async (req, res) => {
  const { year } = req.params
  try {
    const movies = await filterByYear(year)
    res.json(movies)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default movieRoutes
