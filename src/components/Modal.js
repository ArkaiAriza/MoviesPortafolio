import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Modal as UIModal } from '@material-ui/core/';
import Backdrop from '@material-ui/core/Backdrop';
import { useSpring, animated } from 'react-spring/web.cjs';

import axios from '../apis/axios';
import { TMDB_KEY } from '../keys';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    justifyContent: 'center',
    padding: '5rem 0',
    overflowY: 'scroll',
    /* backgroundImage: (props) =>
      `url(https://image.tmdb.org/t/p/original${props.backdrop_path})`,
    backgroundSize: 'cover', */
  },
  paper: {
    '&::-webkit-scrollbar ': {
      display: 'none',
    },
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    backgroundColor: 'black',
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
    backgroundColor: 'black',
  },
  image: {
    zIndex: 0,
    backgroundColor: '#222',
    width: '100%',
  },
  gradient: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0) 0%, ' +
      'rgba(0,0,0,0.3) 30%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,1) 90%)',
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
    background: '#000',
    minHeight: '1000px',
    padding: '1rem',
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
  const movieString = movieVideo
    ? `https://www.youtube.com/embed/${movieVideo}`
    : 'https://www.youtube.com/embed/1AasdTsg';

  //if (movie) console.log(movie);

  useEffect(() => {
    const getMovieVideo = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${TMDB_KEY}&append_to_response=videos`
      );
      if (response.data.videos.results[0]) {
        setMovieVideo(response.data.videos.results[0].key);
      }
    };
    getMovieVideo();
  }, []);

  return (
    <UIModal
      aria-labelledby="spring-modal-title"
      aria-describedby="spring-modal-description"
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open} style={{ outline: 'none' }}>
        <div className={classes.paper}>
          <div className={classes.container}>
            <div className={classes.video}>
              <iframe
                width="100%"
                height="100%"
                src={movieString}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <img
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt="a"
              className={classes.image}
            />
            <div className={classes.gradient} />
          </div>
          <div className={classes.content}>
            <h1>{movie.title}</h1>
          </div>
        </div>
      </Fade>
    </UIModal>
  );
}
