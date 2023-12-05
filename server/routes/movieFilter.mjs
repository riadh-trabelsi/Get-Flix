import axios from 'axios'

const apiKey = '1cc614b6cd01c73622141ccf0bdceac5'

export async function filterByGenres(genreId) {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}`,
    )
    return response.data.results
  } catch (error) {
    console.error(error)
    throw new Error('Error fetching movies by genre')
  }
}

export async function filterByYear(year) {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&primary_release_year=${year}`,
    )
    return response.data.results
  } catch (error) {
    console.error(error)
    throw new Error('Error fetching movies by year')
  }
}
