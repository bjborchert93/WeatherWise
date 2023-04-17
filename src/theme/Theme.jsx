import { createTheme, colors } from '@mui/material';

export const lightTheme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#fefefe',
    },
    background: {
      // default: `linear-gradient(45deg, ${colors.lightBlue[100]}, ${colors.lightBlue[300]}`,
      default: colors.grey[100],
      paper: colors.common.white,
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
});


export const darkTheme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#fefefe',
    },
    text: {
      primary: colors.grey[100]
    },
    background: {
      default: colors.grey[900],
      paper: colors.grey[800],
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
});
