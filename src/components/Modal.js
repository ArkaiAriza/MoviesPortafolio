import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Modal as UIModal } from '@material-ui/core/';
import Backdrop from '@material-ui/core/Backdrop';
import { useSpring, animated } from 'react-spring/web.cjs';

const useStyles = makeStyles((theme, props) => ({
  modal: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: '5rem 0',
    /* backgroundImage: (props) =>
      `url(https://image.tmdb.org/t/p/original${props.backdrop_path})`,
    backgroundSize: 'cover', */
  },
  paper: {
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    backgroundColor: '#222',
    boxShadow: theme.shadows[5],
    width: '80vw',
    height: '800px',
    overflowX: 'hidden',
    overflowY: 'scroll',
  },
  container: {
    width: '100%',
    position: 'relative',
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
  content: {
    flex: 1,
    background: '#000',
    height: '500px',
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
      <Fade in={open}>
        <div className={classes.paper}>
          <div className={classes.container}>
            <img
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt='a'
              className={classes.image}
            />
            <div className={classes.gradient} />
          </div>
          <div className={classes.content}>MODAL</div>
        </div>
      </Fade>
    </UIModal>
  );
}
