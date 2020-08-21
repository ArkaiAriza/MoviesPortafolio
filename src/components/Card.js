import React, { useState, useRef } from 'react';

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
    transition: 'transform 0.2s, z-index 0s ease 0.2s',
    backgroundColor: '#444',
    zIndex: 0,
    '&:hover': {
      zIndex: 1,
      transition: 'transform 0.2s ease 0.2s, z-index 0s',
    },
  },
  media: {
    flex: 1,
    maxWidth: '200px',
  },
  name: {
    padding: '0.5rem !important',
    color: '#ccc',
    backgroundColor: '#222',
  },
  details: {
    position: 'absolute',
    zIndex: -1,
    top: 0,
    right: 0,
    height: '100%',
    width: '100%',
    padding: '1em',
    boxSizing: 'border-box',

    backgroundColor: '#444',
    color: '#ccc',
    transition: 'right 0.2s, width 0.2s, z-index 0.2s',
  },
  left: {
    position: 'relative',
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'z-index 0s ease 0.2s',
    zIndex: 0,
    '&:hover': {
      zIndex: 2,
      transition: 'z-index 0s',
    },
  },
}));

const Card = ({ movie }) => {
  //axios.get(`/3/movie/popular?api_key=${TMDB_KEY}`);

  const [hover, setHover] = useState(false);
  const [open, setOpen] = useState(false);

  const hoverRef = useRef();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();

  if (!movie) return <div>Card</div>;

  return (
    <>
      <MaterialCard
        className={classes.root}
        ref={hoverRef}
        style={
          hover
            ? {
                transform: 'scale(1.1,1.1)',
              }
            : null
        }
        onClick={handleOpen}
        /* onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)} */
      >
        <div
          className={classes.left}
          onMouseOver={() => setHover(true)}
          onMouseOut={() => setHover(false)}
        >
          <img
            className={classes.media}
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
            onError={(ev) =>
              (ev.target.src =
                'https://www.theprintworks.com/wp-content/themes/psBella/assets/img/film-poster-placeholder.png')
            }
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
                  right:
                    hoverRef.current.getBoundingClientRect().x + 600 <=
                    window.innerWidth
                      ? '-200%'
                      : '100%',
                  width: '200%',
                  transition:
                    'right 0.2s ease 0.2s, width 0.2s ease 0.2s, z-index 0s',
                  zIndex: 1,
                }
              : null
          }
        >
          Hello
        </div>
      </MaterialCard>

      <Modal open={open} handleClose={handleClose} movie={movie} />
    </>
  );
};

export default Card;
