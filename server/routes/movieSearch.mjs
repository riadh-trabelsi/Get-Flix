import axios from 'axios'

const apiKey = '1cc614b6cd01c73622141ccf0bdceac5'

export async function searchMovies(query) {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`,
    )
    return response.data.results
  } catch (error) {
    console.error(error)
    throw new Error('Error searching for movies')
  }
}
