import { createTheme } from '@mui/material/styles';

// Tema minimalista personalizado
export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1A1A1A',
      light: '#424242',
      dark: '#000000',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#757575',
      light: '#9E9E9E',
      dark: '#424242',
      contrastText: '#FFFFFF',
    }, error: {
      main: '#FF5722',
      light: '#FF8A50',
      dark: '#C41C00',
      contrastText: '#FFFFFF',
    },
    background: {
      default: 'transparent',
      paper: 'rgba(250, 250, 250, 0.7)',
    },
    text: {
      primary: '#353535',
      secondary: '#fefcfe',
    },
    divider: '#E0E0E0',
  },
  typography: {
    fontFamily: [
      'Montserrat'
    ].join(','),
    h1: {
      fontSize: '3.5rem',
      fontWeight: 700,
      letterSpacing: '-0.02em',
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 600,
      letterSpacing: '-0.01em',
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '1.1rem',
      lineHeight: 1.7,
      letterSpacing: '0.00938em',
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
  },
  shape: {
    borderRadius: 8,
  },
  spacing: 8,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          borderRadius: 8,
          padding: '10px 24px',
        },
        outlined: {
          borderWidth: 2,
          '&:hover': {
            borderWidth: 2,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
          transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          '&:hover': {
            boxShadow: '0 4px 8px rgba(0,0,0,0.15), 0 2px 4px rgba(0,0,0,0.22)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          borderBottom: '1px solid #E0E0E0',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
        },
      },
    },
  },
});
