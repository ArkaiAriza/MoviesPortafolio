import React, { useState, useContext, useEffect } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  MenuItem,
  Menu,
  Button,
} from '@material-ui/core';
import { Search as SearchIcon, MoreVert as MoreIcon } from '@material-ui/icons';

import axios from '../apis/axios';
import { TMDB_KEY } from '../keys';

import SubMenu from './SubMenu';
import MoviesContext from '../contexts/MoviesContext';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  header: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.contrastText,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  menu: {
    '& .MuiMenu-list': {
      padding: 0,
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
  },
  submenu: {
    /* '& .MuiMenu-paper': {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.primary.contrastText,
    }, */
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    padding: '0.5rem 0',
  },
}));

const Header = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const [genresList, setGenresList] = React.useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const { getList, searchMovie, getGenreList } = useContext(MoviesContext);

  const handleGenreMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = (id) => {
    if (id !== -1) getGenreList(id, 1);

    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const searchTermChanged = (term) => {
    searchMovie(term);
    setSearchTerm(term);
  };

  useEffect(() => {
    const request = async () => {
      const response = await axios.get(
        `/3/genre/movie/list?api_key=${TMDB_KEY}`
      );
      setGenresList(response.data.genres);
    };

    request();
  }, []);

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={
        window.innerWidth < 960
          ? { vertical: 'top', horizontal: 'left' }
          : { vertical: 'bottom', horizontal: 'right' }
      }
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={(id) => handleMenuClose(-1)}
      className={classes.menu}
      getContentAnchorEl={null}
    >
      <div className={classes.submenu}>
        <SubMenu options={genresList} onOptionClick={handleMenuClose} />
      </div>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      id={mobileMenuId}
      keepMounted
      getContentAnchorEl={null}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      className={classes.menu}
    >
      <MenuItem>
        <Button color='inherit' onClick={() => getList(`popular`, 1)}>
          Popular
        </Button>
      </MenuItem>
      <MenuItem>
        <Button color='inherit' onClick={() => getList(`upcoming`, 1)}>
          New
        </Button>
      </MenuItem>
      <MenuItem onClick={handleGenreMenuOpen}>
        <Button color='inherit'>Genre</Button>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position='static' className={classes.header}>
        <Toolbar color={'#801336'}>
          <Typography
            onClick={() => getList('now_playing', 1)}
            className={classes.title}
            variant='h6'
            noWrap
          >
            MOVIES
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder='Search…'
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              value={searchTerm}
              onChange={(e) => searchTermChanged(e.target.value)}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Button color='inherit' onClick={() => getList(`popular`, 1)}>
              Popular
            </Button>

            <Button color='inherit' onClick={() => getList(`upcoming`, 1)}>
              New
            </Button>
            <Button color='inherit' onClick={handleGenreMenuOpen}>
              Genre
            </Button>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label='show more'
              aria-controls={mobileMenuId}
              aria-haspopup='true'
              onClick={handleMobileMenuOpen}
              color='inherit'
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
};

export default Header;
