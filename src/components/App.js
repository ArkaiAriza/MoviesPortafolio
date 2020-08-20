import React from 'react';

import MoviesGrid from './MoviesGrid';
import Header from './Header';

import { MoviesProvider } from '../contexts/MoviesContext';

const App = () => {
  return (
    <div>
      <MoviesProvider>
        <Header />
        <MoviesGrid />
      </MoviesProvider>
    </div>
  );
};

export default App;
