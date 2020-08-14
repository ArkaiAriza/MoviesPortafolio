import React from 'react';
import axios from '../apis/axios';

import Modal from './Modal';

import {
  Card as MaterialCard,
  CardContent,
  CardMedia,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import { findByLabelText } from '@testing-library/react';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 'auto',
    background: 'none',
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '200px',
    boxShadow: 'none',
    fontSize: '1.1rem',
  },
  media: {
    maxWidth: '100%',
  },
  content: { padding: '0.5rem !important', color: '#ccc' },
}));

const Card = ({ movie }) => {
  //axios.get(`/3/movie/popular?api_key=${TMDB_KEY}`);

  const classes = useStyles();
  console.log(movie);

  if (!movie) return <div>Card;</div>;

  return (
    <div>
      <h4>Card</h4>
      <MaterialCard className={classes.root}>
        <img
          className={classes.media}
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
        ></img>
        <CardContent className={classes.content}>
          <div>{movie.title}</div>
        </CardContent>
      </MaterialCard>
      <Modal />
    </div>
  );
};

export default Card;
