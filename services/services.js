import axios from 'axios';

const API_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'api_key=99861f64ce623902195bbc43b6597d13';

export function getPopularMovies() {
  return axios
    .get(API_URL.concat('/movie/popular?').concat(API_KEY))
    .then(response => response.data.results);
}

export function getUpcomingMovies() {
  return axios
    .get(API_URL.concat('/movies/upcoming?').concat(API_KEY))
    .then(response => response.data.results);
}

export function getPopularTV() {
  return axios
    .get(API_URL.concat('/tv/popular?').concat(API_KEY))
    .then(response => response.data.results);
}

export function getFamilyMovies() {
  return axios
    .get(API_URL.concat('/discover/movie?with_genres=10751&').concat(API_KEY))
    .then(response => response.data.results);
}

export function getDocumentaryMovies() {
  return axios
    .get(API_URL.concat('/discover/movie?with_genres=99&').concat(API_KEY))
    .then(response => response.data.results);
}

export function getMovie(movieId) {
  return axios
    .get(API_URL.concat(`/movie/${movieId}?`).concat(API_KEY))
    .then(response => response.data);
}

export async function searchMovieOrTv(keyword) {
  const extractResult = response => response.data.results;

  return (
    Promise.all([
      axios.get(
        API_URL.concat(`/search/movie?query=${keyword}&`).concat(API_KEY),
        {
          headers: {
            'Cache-Control': 'no-cache'
          }
        }
      ),
      axios.get(
        API_URL.concat(`/search/tv?query=${keyword}&`).concat(API_KEY),
        {
          headers: {
            'Cache-Control': 'no-cache'
          }
        }
      )
    ])

      // extract movies
      .then(responses => responses.map(extractResult))

      // merge results
      .then(movies => movies.reduce((acc, x) => acc.concat(x), []))
  );
}
