import React, { useContext } from 'react';
import Card from './Card';

import MoviesContext from '../contexts/MoviesContext';

const MoviesGrid = () => {
  const value = useContext(MoviesContext);

  const renderCards = (movies) => {
    const i = movies.length;

    return movies.map((item, index) => {
      return <Card key={index} movie={item} zIndex={i - index}></Card>;
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
      {value.list !== null ? renderCards(value.list) : null}
    </div>
  );
};

export default MoviesGrid;
