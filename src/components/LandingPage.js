import React, { useEffect, useState } from 'react';
import axios from '../apis/axios';

import { TMDB_KEY } from '../keys';
import MoviesGrid from './MoviesGrid';

const LandingPage = () => {
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    const request = async () => {
      const response = await axios.get(
        `/3/trending/movie/week?api_key=${TMDB_KEY}`
      );
      setMovies(response.data.results);
    };

    request();
  }, []);

  return (
    <div>
      <h1>LandingPage</h1>
      <MoviesGrid movies={movies} />
    </div>
  );
};

export default LandingPage;
