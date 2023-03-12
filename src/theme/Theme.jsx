import { createTheme, colors } from '@mui/material';

export const lightTheme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
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
  // overrides: {
  //   MuiButton: {
  //     containedPrimary: {
  //       color: colors.common.white,
  //     },
  //     outlinedPrimary: {
  //       color: '#3f51b5',
  //     },
  //   },
  //   MuiAppBar: {
  //     colorPrimary: {
  //       backgroundColor: colors.common.white,
  //       color: colors.grey[800],
  //     },
  //   },
  // },
});


export const darkTheme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
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
  // overrides: {
  //   MuiButton: {
  //     containedPrimary: {
  //       color: colors.common.white,
  //     },
  //     outlinedPrimary: {
  //       color: '#3f51b5',
  //     },
  //   },
  //   MuiAppBar: {
  //     colorPrimary: {
  //       backgroundColor: colors.grey[800],
  //       color: colors.common.white,
  //     },
  //   },
  // },
});
