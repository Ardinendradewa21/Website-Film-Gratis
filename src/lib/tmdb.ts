import { MovieListSchema, MovieSchema, CreditsSchema } from "./schemas";

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = process.env.TMDB_API_KEY || 'b87e13a7faad94dad597c0f462d34a72';

if (!API_KEY) {
  console.error('TMDB_API_KEY is not defined in environment variables');
}

async function fetchTMDB(endpoint: string, params: Record<string, string> = {}) {
  if (!API_KEY) {
    throw new Error('TMDB API Key is missing. Please add TMDB_API_KEY to your .env.local file');
  }

  const url = new URL(`${BASE_URL}${endpoint}`);
  url.searchParams.append('api_key', API_KEY);
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

  const res = await fetch(url.toString(), {
    next: { revalidate: 3600 } // Cache for 1 hour
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(`TMDB API Error: ${res.status} ${res.statusText} - ${JSON.stringify(errorData)}`);
  }

  return res.json();
}

export async function getNowPlaying() {
  const data = await fetchTMDB('/movie/now_playing');
  return MovieListSchema.parse(data);
}

export async function getTrending() {
  const data = await fetchTMDB('/trending/movie/week');
  return MovieListSchema.parse(data);
}

export async function getMovieDetails(id: string) {
  const data = await fetchTMDB(`/movie/${id}`);
  return MovieSchema.parse(data);
}

export async function getMovieCredits(id: string) {
  const data = await fetchTMDB(`/movie/${id}/credits`);
  return CreditsSchema.parse(data);
}

export async function searchMovies(query: string) {
  const data = await fetchTMDB('/search/movie', { query });
  return MovieListSchema.parse(data);
}

export async function getMoviesByGenre(genreId: string) {
  const data = await fetchTMDB('/discover/movie', {
    with_genres: genreId,
    sort_by: 'popularity.desc'
  });
  return MovieListSchema.parse(data);
}
