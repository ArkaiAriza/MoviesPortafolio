import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Modal as UIModal, Typography, Grid, Link } from '@material-ui/core/';
import Backdrop from '@material-ui/core/Backdrop';
import { useSpring, animated } from 'react-spring/web.cjs';
import { Grade } from '@material-ui/icons';

import axios from '../apis/axios';
import { TMDB_KEY } from '../keys';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    justifyContent: 'center',
    padding: '5rem 0',
    overflowY: 'scroll',
  },
  paper: {
    '&::-webkit-scrollbar ': {
      display: 'none',
    },
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    backgroundColor: theme.palette.primary.dark,
    boxShadow: theme.shadows[5],
    width: '90vw',
    maxWidth: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '60vw',
    },
    height: 'auto',
    overflowX: 'hidden',
    overflowY: 'scroll',
  },
  container: {
    width: '100%',
    position: 'relative',
    display: 'grid',
    placeItems: 'center',
    boxSizing: 'content-box',
    marginBottom: '10%',
    backgroundColor: theme.palette.primary.dark,
  },
  image: {
    zIndex: 0,
    backgroundColor: theme.palette.primary.dark,
    width: '100%',
  },
  gradient: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
    background: `linear-gradient(to bottom, ${theme.palette.primary.dark}00 0%, 
                ${theme.palette.primary.dark}50 30%,
                ${theme.palette.primary.dark}A0 50%,
                ${theme.palette.primary.dark}FF 90%)`,
  },
  video: {
    top: '50%',
    position: 'absolute',
    zIndex: 1,
    height: '60%',
    width: '60%',
    [theme.breakpoints.up('sm')]: {
      width: '60%',
      height: '60%',
    },
  },
  content: {
    flex: 1,
    background: theme.palette.primary.dark,
    minHeight: 'auto',
    padding: '1rem',
  },
  divider: {
    height: '1px',
    backgroundColor: theme.palette.primary.light,
    width: '60%',
    border: 'none',
  },
  gridRow: {
    display: 'inline-flex',
    padding: '1rem 20%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  link: {
    color: theme.palette.secondary.main,
  },
}));

const Fade = React.forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
    config: {
      duration: 200,
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element,
  in: PropTypes.bool.isRequired,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
};

export default function Modal({ open, handleClose, movie }) {
  const classes = useStyles(movie);
  const [movieVideo, setMovieVideo] = useState(null);
  const [movieDetails, setMovieDetails] = useState(null);

  const movieString = movieVideo
    ? `https://www.youtube.com/embed/${movieVideo}`
    : 'https://www.youtube.com/embed/1AasdTsg';

  useEffect(() => {
    const getMovieVideo = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${TMDB_KEY}&append_to_response=videos`
      );
      setMovieDetails(response.data);
      if (response.data.videos.results[0]) {
        setMovieVideo(response.data.videos.results[0].key);
      }
    };
    getMovieVideo();
  }, [movie.id]);

  const genreRender = (movieDetail) => {
    return movieDetail.genres.map((genre) => {
      return ' ' + genre.name;
    });
  };

  return (
    <UIModal
      aria-labelledby='spring-modal-title'
      aria-describedby='spring-modal-description'
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open} style={{ outline: 'none', height: 'fit-content' }}>
        <div className={classes.paper}>
          <div className={classes.container}>
            <div className={classes.video}>
              {movieVideo && movieDetails ? (
                <iframe
                  title={movieDetails.title}
                  width='100%'
                  height='100%'
                  src={movieString}
                  frameBorder='0'
                  allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
                  allowFullScreen
                ></iframe>
              ) : (
                'Loading...'
              )}
            </div>
            <img
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt='a'
              className={classes.image}
            />
            <div className={classes.gradient} />
          </div>
          <div className={classes.content}>
            {movieDetails ? (
              <Grid container>
                <Grid item xs={12} className={classes.gridRow}>
                  <Typography variant='h4' component='h2'>
                    {movieDetails.title}
                  </Typography>
                  <Typography
                    variant='h6'
                    paragraph
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      margin: 0,
                    }}
                  >
                    <Grade style={{ marginRight: '5px' }} />
                    {movieDetails.vote_average}
                  </Typography>
                </Grid>

                <Grid item xs={12} className={classes.gridRow}>
                  <Typography variant='subtitle2' component='h2' gutterBottom>
                    {movieDetails.release_date}
                  </Typography>
                  <Typography variant='subtitle2' component='h2' gutterBottom>
                    {'Runtime: ' + movieDetails.runtime + 'm'}
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <hr className={classes.divider} />
                  <Typography
                    variant='body1'
                    component='h2'
                    gutterBottom
                    style={{ textAlign: 'justify', padding: '1rem 15%' }}
                  >
                    {movieDetails.overview}
                  </Typography>
                  <hr className={classes.divider} />
                </Grid>

                <Grid item xs={12} className={classes.gridRow}>
                  <Typography variant='body1' component='h2' gutterBottom>
                    {genreRender(movieDetails)}
                  </Typography>
                  <Typography
                    variant='subtitle2'
                    component='h2'
                    gutterBottom
                    style={{ textAlign: 'right' }}
                  >
                    {'Original Title: ' + movieDetails.original_title}
                  </Typography>
                </Grid>

                <Grid item xs={12} className={classes.gridRow}>
                  <Typography
                    variant='subtitle2'
                    component='h2'
                    gutterBottom
                    style={{
                      overflow: 'hidden',
                      marginRight: '1rem',
                      wordBreak: 'break-word',
                    }}
                  >
                    {movieDetails.homepage ? (
                      <Link
                        className={classes.link}
                        target='_blank'
                        rel='noopener noreferrer'
                        href={movieDetails.homepage}
                      >
                        {movieDetails.homepage}
                      </Link>
                    ) : (
                      <Link
                        className={classes.link}
                        target='_blank'
                        rel='noopener noreferrer'
                        href={`https://www.imdb.com/title/${movieDetails.imdb_id}/?ref_=nv_sr_srsg_0`}
                      >
                        IMDB Information!
                      </Link>
                    )}
                  </Typography>
                  <Typography variant='subtitle2' component='h2' gutterBottom>
                    {'Status: ' + movieDetails.status}
                  </Typography>
                </Grid>

                {movieDetails.tagline !== '' ? (
                  <Grid item xs={12}>
                    <Typography
                      variant='h5'
                      component='h2'
                      gutterBottom
                      style={{ textAlign: 'center' }}
                    >
                      {movieDetails.tagline}
                    </Typography>
                  </Grid>
                ) : null}
              </Grid>
            ) : (
              'Loading...'
            )}
          </div>
        </div>
      </Fade>
    </UIModal>
  );
}
