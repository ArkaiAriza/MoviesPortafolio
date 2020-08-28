import { TMDB_DEV_KEY } from './devKeys';

let TMDB_KEY = '';

if (process.env.NODE_ENV === 'production') {
  TMDB_KEY = process.env.REACT_APP_NEXT_PUBLIC_TMDB_PROD_KEY;
} else {
  TMDB_DEV_KEY
    ? (TMDB_KEY = TMDB_DEV_KEY)
    : (TMDB_KEY = process.env.REACT_APP_NEXT_PUBLIC_TMDB_DEV_VERCEL_KEY);
}

export default TMDB_KEY;
