import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#4a505a',
      main: '#222831',
      dark: '#000009',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff8a5d',
      main: '#d65a31',
      dark: '#9e2a04',
      contrastText: '#000',
    },
    type: 'dark',
  },
});
