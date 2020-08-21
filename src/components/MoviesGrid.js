import React, { useContext } from 'react';
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core/styles';

import MoviesContext from '../contexts/MoviesContext';
import Card from './Card';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
      marginLeft: '35vw',
      marginRight: '35vw',
    },
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

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {list !== null ? renderCards(list) : null}
      </div>
      <div className={classes.root}>
        {lastSelected !== 'search' ? (
          <Pagination
            count={10}
            onChange={handlePage}
            page={page}
            color="primary"
            showFirstButton
            showLastButton
          />
        ) : null}
        {/*TODO small pagination <Pagination count={10} color="primary" size="small" siblingCount={0} /> */}
      </div>
    </>
  );
};

export default MoviesGrid;
