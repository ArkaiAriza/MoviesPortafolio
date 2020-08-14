import axios from 'axios';

import { TMDB_KEY } from '../keys';

export default axios.create({
  baseURL: 'https://api.themoviedb.org',
  params: { api_key: TMDB_KEY },
});
