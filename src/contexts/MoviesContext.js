import React, { useState, useEffect } from 'react';

import axios from '../apis/axios';
import { TMDB_KEY } from '../keys';

const MoviesContext = React.createContext({ list: [] });

export const MoviesProvider = ({ children }) => {
  const [list, setList] = useState(null);

  const changeList = (list) => {
    setList(list);
  };

  const getList = async (selectedList) => {
    const response = await axios.get(
      `/3/movie/${selectedList}?api_key=${TMDB_KEY}`
    );
    setList(response.data.results);
  };

  const searchMovie = async (term) => {
    if (term.length === 0) {
      getList('now_playing');
      return;
    }
    const response = await axios.get(
      `/3/search/movie?api_key=${TMDB_KEY}&query=${term}`
    );
    setList(response.data.results);
  };

  const getGenreList = async (genre) => {
    const response = await axios.get(
      `/3/discover/movie?api_key=${TMDB_KEY}&sort_by=popularity.desc&with_genres=${genre}`
    );
    setList(response.data.results);
  };

  useEffect(() => {
    getList('now_playing');
  }, []);

  return (
    <MoviesContext.Provider
      value={{
        list,
        changeList,
        getList,
        searchMovie,
        getGenreList,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};

export default MoviesContext;
