import React, { useContext } from 'react';
import { Pagination } from '@material-ui/lab/';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress, Typography } from '@material-ui/core';

import MoviesContext from '../contexts/MoviesContext';
import Card from './Card';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiPagination-ul': {
      margin: 'auto',
      maxWidth: 'fit-content',
    },
    padding: '1rem 0',
  },
  grid: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    minHeight: '100vh',
  },
  pagLarge: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
    },
  },
  pagSmall: { [theme.breakpoints.up('sm')]: { display: 'none' } },
  titleLarge: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
      minWidth: '100%',
      textAlign: 'center',
      padding: '2rem',
    },
  },
  titleSmall: {
    minWidth: '100%',
    textAlign: 'center',
    padding: '1rem',
    [theme.breakpoints.up('sm')]: { display: 'none' },
  },
}));

const MoviesGrid = () => {
  const classes = useStyles();

  const {
    list,
    lastSelected,
    currentListType,
    currentListGenre,
    page,
    getList,
    getGenreList,
    loading,
    totalPages,
    getGenreById,
    genreName,
  } = useContext(MoviesContext);

  const handlePage = (event, value) => {
    switch (lastSelected) {
      case 'type':
        getList(currentListType, value);
        break;
      case 'init':
        getList(currentListType, value);
        break;
      case 'genre':
        getGenreList(currentListGenre, value);
        break;
      default:
        getList('now_playing', 1);
        break;
    }
    window.scrollTo(0, 0);
  };

  const renderCards = (movies) => {
    return movies.map((item, index) => {
      return <Card key={index} movie={item}></Card>;
    });
  };

  const renderTitle = () => {
    let title = null;

    if (currentListType !== 'now_playing' && lastSelected !== 'genre') {
      title = currentListType;
    } else if (lastSelected === 'genre') {
      getGenreById(currentListGenre);
      title = genreName;
    }

    return title ? title.charAt(0).toUpperCase() + title.slice(1) : null;
  };

  return (
    <>
      <div className={classes.grid}>
        {loading ? (
          <CircularProgress
            color="secondary"
            style={{ alignSelf: 'center' }}
            size="10rem"
          />
        ) : list.length !== 0 ? (
          <>
            <Typography variant="h2" className={classes.titleSmall}>
              {renderTitle()}
            </Typography>

            <Typography variant="h1" className={classes.titleLarge}>
              {renderTitle()}
            </Typography>

            {renderCards(list)}
          </>
        ) : (
          <h1>No Results Found</h1>
        )}
      </div>
      <div className={classes.root}>
        {lastSelected !== 'search' ? (
          <>
            <Pagination
              className={classes.pagLarge}
              count={totalPages}
              onChange={handlePage}
              page={page}
              color="secondary"
              showFirstButton
              showLastButton
              size="large"
            />

            <Pagination
              className={classes.pagSmall}
              onChange={handlePage}
              page={page}
              color="secondary"
              count={totalPages}
              size="medium"
              siblingCount={0}
            />
          </>
        ) : null}
      </div>
    </>
  );
};

export default MoviesGrid;
