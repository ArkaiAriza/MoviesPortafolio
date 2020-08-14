import React, { useEffect, useState } from 'react';
import Card from './Card';

import axios from '../apis/axios';
import { TMDB_KEY } from '../keys';

const MoviesGrid = () => {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const request = async () => {
      const response = await axios.get(`/3/movie/808?api_key=${TMDB_KEY}`);
      setMovie(response.data);
    };

    request();
  }, []);

  return (
    <div>
      <h1>MoviesGrid</h1>
      <Card movie={movie} />
    </div>
  );
};

export default MoviesGrid;
