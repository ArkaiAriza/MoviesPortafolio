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

  const renderCards = () => {
    const z = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    const i = z.length;

    return z.map((item, index) => {
      return <Card key={index} movie={movie} zIndex={i - index}></Card>;
    });
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}
    >
      {renderCards()}
    </div>
  );
};

export default MoviesGrid;
