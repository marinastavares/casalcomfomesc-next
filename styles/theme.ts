import { createTheme } from '@mui/material/styles';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#ff8f63',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#9199a1',
    },
    background: {
      default: '#F6F8FC'
    },
  },
  typography: {
    h1: {
      fontSize: 32,
    }
  }
});

export default theme;
