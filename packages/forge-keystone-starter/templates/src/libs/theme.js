import { createMuiTheme } from '@material-ui/core/styles';

export const colors = {
  white: '#ffffff',
  dark: '#4A707C',
  gray: '#222222',
  minor: '#9b9b9b',
  darkText: '#dcdcdc',
  background: '#f7f8f8',
  yellow: '#FFCF71',
  green: '#4cbbb9',
  red: '#FF7B8A',
  blue: '#4e6af6',
};

// A theme with custom primary and secondary color.
// It's optional.
const theme = createMuiTheme({
  pageWidth: 1000,
  palette: {
    primary: { main: colors.green, contrastText: colors.white },
    secondary: { main: colors.red, contrastText: colors.white },
  },
  typography: {
    fontSize: 14,
    useNextVariants: true,
  },
  overrides: {
    MuiButton: {
      root: {
        borderRadius: 0,
        letterSpacing: '1.5px',
        boxShadow: 'none',
      },
    },
  },
  colors,
});

export default theme;
