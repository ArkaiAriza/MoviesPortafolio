import React, { useState, useEffect } from 'react';

import axios from '../apis/axios';
import { TMDB_KEY } from '../keys';

const MoviesContext = React.createContext({
  list: [],
  currentListType: 'now_playing',
  currentListGenre: 28,
  page: 1,
  lastSelected: 'init',
});

export const MoviesProvider = ({ children }) => {
  const [list, setList] = useState([]);
  const [currentListType, setCurrentListType] = useState('now_playing');
  const [currentListGenre, setCurrentListGenre] = useState(28);
  const [page, setPage] = useState(1);
  const [lastSelected, setLastSelected] = useState('init'); //init, type, genre

  const changeList = (list) => {
    setList(list);
  };

  const changeCurrentListType = (currentListType) => {
    setCurrentListType(currentListType);
  };

  const changeCurrentListGenre = (currentListGenre) => {
    setCurrentListGenre(currentListGenre);
  };

  const changePage = (page) => {
    setPage(page);
  };

  const getList = async (selectedList, selectedPage) => {
    const response = await axios.get(
      `/3/movie/${selectedList}?api_key=${TMDB_KEY}&page=${selectedPage}`
    );
    setList(response.data.results);
    setCurrentListType(selectedList);
    setPage(selectedPage);
    currentListType === 'now_playing'
      ? setLastSelected('init')
      : setLastSelected('type');
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

  const getGenreList = async (genre, selectedPage) => {
    const response = await axios.get(
      `/3/discover/movie?api_key=${TMDB_KEY}&sort_by=popularity.desc&with_genres=${genre}&page=${selectedPage}`
    );
    setList(response.data.results);
    setCurrentListGenre(genre);
    setPage(selectedPage);
    setLastSelected('genre');
  };

  useEffect(() => {
    getList('now_playing', 1);
  }, []);

  return (
    <MoviesContext.Provider
      value={{
        list,
        currentListType,
        currentListGenre,
        page,
        lastSelected,
        changeList,
        changeCurrentListType,
        changeCurrentListGenre,
        changePage,
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
