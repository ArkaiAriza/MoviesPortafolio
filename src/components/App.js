import React from 'react';
import LandingPage from './LandingPage';
import Header from './Header';
import { MoviesProvider } from '../contexts/MoviesContext';

const App = () => {
  return (
    <div>
      <MoviesProvider>
        <Header />
        <LandingPage />
      </MoviesProvider>
    </div>
  );
};

export default App;
