import React from 'react';
import LandingPage from './LandingPage';
import Header from './Header';
import MoviesContext from '../contexts/MoviesContext';

const App = () => {
  return (
    <div>
      <MoviesContext.Provider value={{}}>
        <Header />
        <LandingPage />
      </MoviesContext.Provider>
    </div>
  );
};

export default App;
