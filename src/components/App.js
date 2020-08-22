import React from 'react';
import { ThemeProvider } from '@material-ui/styles';

import MoviesGrid from './MoviesGrid';
import Header from './Header';

import { theme } from '../theme';
import { MoviesProvider } from '../contexts/MoviesContext';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <MoviesProvider>
          <Header />
          <MoviesGrid />
        </MoviesProvider>
      </div>
    </ThemeProvider>
  );
};

export default App;
