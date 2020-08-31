import React, { useState, useRef } from 'react';

import Modal from './Modal';

import { Card as MaterialCard, Typography, Grid } from '@material-ui/core';
import { Grade } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    maxWidth: '200px',
    maxHeight: '340px',
    margin: '2rem',
    fontSize: '1.1rem',
    boxShadow: 'none',
    overflow: 'visible',
    backgroundColor: theme.palette.primary.main,
    transition: 'transform 0.2s, z-index 0s ease 0.2s',
    zIndex: 0,
    '&:hover': {
      zIndex: 1,
      transition: 'transform 0.2s ease 0.2s, z-index 0s',
    },
  },
  media: {
    flex: 1,
    width: '100%',
    maxHeight: '90%',
    maxWidth: '200px',
  },
  loader: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: '200px',
    minHeight: '340px',
    width: '100%',
    maxHeight: '90%',
    maxWidth: '200px',
  },
  hiddenMedia: { display: 'none' },
  name: {
    flex: 1,
    maxHeight: '7%',
    padding: '0.5rem !important',
    color: 'white',
    backgroundColor: theme.palette.primary.main,
    overflow: 'hidden',
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
    overflow: 'hidden',
    backgroundColor: theme.palette.secondary.dark,
    color: 'white',
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
    backgroundColor: theme.palette.primary.main,

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
  const [load, setLoad] = useState(false);

  const hoverRef = useRef();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const trimText = (text, num) => {
    return text.length > num ? text.slice(0, num) + '...' : text;
  };

  const classes = useStyles();

  if (!movie) return <div>Card</div>;

  const style = () => {
    if (hover) {
      if (
        hoverRef.current.getBoundingClientRect().x + 560 <=
        window.innerWidth
      ) {
        return {
          right: '-150%',
          width: '150%',
          transition: 'right 0.2s ease 0.2s, width 0.2s ease 0.2s, z-index 0s',
          zIndex: 1,
        };
      } else if (hoverRef.current.getBoundingClientRect().x - 340 >= 0) {
        return {
          right: '100%',
          width: '150%',
          transition: 'right 0.2s ease 0.2s, width 0.2s ease 0.2s, z-index 0s',
          zIndex: 1,
        };
      } else {
        return {
          transition: 'z-index 0s',
          zIndex: 2,
        };
      }
    }
  };

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
        onMouseOver={() => (window.innerWidth <= 635 ? setHover(true) : null)}
        onMouseOut={() => (window.innerWidth <= 635 ? setHover(false) : null)}
      >
        <div
          className={classes.left}
          onMouseOver={() => setHover(true)}
          onMouseOut={() => setHover(false)}
        >
          <img
            className={load ? classes.hiddenMedia : classes.media}
            src={
              'https://www.theprintworks.com/wp-content/themes/psBella/assets/img/film-poster-placeholder.png'
            }
            alt={movie.title}
          ></img>
          <img
            className={load ? classes.media : classes.hiddenMedia}
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
            onLoad={() => setLoad(true)}
          ></img>
          <div className={classes.name}>{trimText(movie.title, 15)}</div>
        </div>
        <div className={classes.details} color='primary' style={style()}>
          <Grid container style={{ height: '100%' }}>
            <Typography
              variant='h6'
              component='h2'
              gutterBottom
              style={{ flex: '1 0 10%', lineHeight: '1.5rem' }}
            >
              {movie.title}
            </Typography>
            <Typography
              variant='body2'
              paragraph
              gutterBottom
              style={{
                height: '60%',
                overflow: 'hidden',
                textAlign: 'justify',
              }}
            >
              {window.innerWidth <= 635
                ? trimText(movie.overview, 200)
                : trimText(movie.overview, 300)}
            </Typography>
            <Grid
              item
              xs={12}
              style={{
                height: '12%',
                display: 'inline-flex',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'inline-flex' }}>
                <Grade />
                <Typography variant='subtitle1' paragraph gutterBottom>
                  {movie.vote_average}
                </Typography>
              </div>
              <Typography variant='subtitle1' component='h2' gutterBottom>
                {movie.release_date}
              </Typography>
            </Grid>
          </Grid>
        </div>
      </MaterialCard>
      <Modal open={open} handleClose={handleClose} movie={movie} />
    </>
  );
};

export default Card;
