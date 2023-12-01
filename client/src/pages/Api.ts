// Api.ts

export const api_key: string = '1cc614b6cd01c73622141ccf0bdceac5';
export const access_token: string = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxY2M2MTRiNmNkMDFjNzM2MjIxNDFjY2YwYmRjZWFjNSIsInN1YiI6IjY1NjQ5MWJhYTZjMTA0MDEzODJiMGZlOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pLiucY7Ytlm6fNHo2cRqaDEdJMoCG7dD42qJCgqcOwI'; // Replace with your actual access token
export const base_url: string = 'https://api.themoviedb.org/3';
export const get_movies: string = '/discover/movie';
export const base_img: string = 'https://image.tmdb.org/t/p/w500';

export interface Movie {
  id: number;
  poster_path: string;
  original_title: string;
  release_date: string;
  original_language: string;
  adult: boolean;
}

export const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${access_token}`,
  },
};
