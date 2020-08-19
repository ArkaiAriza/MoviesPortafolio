import React, { useState, useContext } from 'react';
import Card from './Card';

import MoviesContext from '../contexts/MoviesContext';

const MoviesGrid = () => {
  const [list, setlist] = useState(null);
  const value = useContext(MoviesContext);

  const renderCards = (movies) => {
    const i = movies.length;

    return movies.map((item, index) => {
      return <Card key={index} movie={item} zIndex={i - index}></Card>;
    });
  };

  console.log(value);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}
    >
      {value.list !== null ? renderCards(value.list) : null}
    </div>
  );
};

export default MoviesGrid;
