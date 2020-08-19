import React, { useState } from 'react';
import axios from '../apis/axios';

import Modal from './Modal';

import { Card as MaterialCard } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    maxWidth: '200px',
    height: '340px',
    margin: '50px',
    fontSize: '1.1rem',
    boxShadow: 'none',
    overflow: 'visible',
    zIndex: (zIndex) => zIndex,
    transition: 'transform 0.5s',
  },
  media: {
    maxWidth: '200px',
  },
  name: {
    flex: 1,
    padding: '0.5rem !important',
    color: '#ccc',
    backgroundColor: '#222',
  },
  details: {
    position: 'absolute',
    zIndex: -1,
    top: 0,
    bottom: 0,
    right: 0,
    width: '100%',
    backgroundColor: 'yellow',
    transition: 'right 0.2s, width 0.2s',
  },
  left: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
}));

const Card = ({ movie, zIndex }) => {
  //axios.get(`/3/movie/popular?api_key=${TMDB_KEY}`);

  const [hover, setHover] = useState(false);

  const classes = useStyles(zIndex);

  if (!movie) return <div>Card</div>;

  return (
    <MaterialCard
      className={classes.root}
      style={
        hover
          ? {
              transform: 'scale(1.1,1.1)',
            }
          : null
      }
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className={classes.left}>
        <img
          className={classes.media}
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
        ></img>
        <div className={classes.name}>
          {movie.title.length > 15
            ? movie.title.slice(0, 15) + '...'
            : movie.title}
        </div>
      </div>
      <div
        className={classes.details}
        style={
          hover
            ? {
                right: '-300px',
                width: '300px',
                transition: 'right 0.5s, width 0.5s',
              }
            : null
        }
      >
        Hello
      </div>
    </MaterialCard>
  );
};

export default Card;
