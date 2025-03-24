import { createTheme } from '@mui/material/styles';

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    primary: {
      main: '#FF69B4', // Hot Pink
      light: '#FFB6C1', // Light Pink
      dark: '#DB7093', // Pale Violet Red
    },
    secondary: {
      main: '#9370DB', // Medium Purple
      light: '#B19CD9', // Light Purple
      dark: '#663399', // Rebecca Purple
    },
    ...(mode === 'dark'
      ? {
          background: {
            default: '#1A1A2E', // Dark Navy
            paper: '#2A2A3E', // Slightly lighter navy
          },
          text: {
            primary: '#FFFFFF',
            secondary: '#E6E6FA', // Lavender
          },
        }
      : {
          background: {
            default: '#F8F9FF', // Light Lavender
            paper: '#FFFFFF',
          },
          text: {
            primary: '#1A1A2E', // Dark Navy
            secondary: '#4A4A6A', // Muted Navy
          },
        }),
    error: {
      main: '#FF6B6B',
      light: '#FF8E8E',
      dark: '#FF4444',
    },
    success: {
      main: '#98FB98',
      light: '#B0FFB0',
      dark: '#7FFF7F',
    },
  },
  typography: {
    fontFamily: '"Söhne", "Helvetica Neue", Arial, sans-serif',
    h1: {
      fontSize: '2rem',
      fontWeight: 600,
      background: 'linear-gradient(45deg, #FF69B4 30%, #9370DB 90%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    h2: {
      fontSize: '1.75rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 600,
    },
    h5: {
      fontSize: '1.1rem',
      fontWeight: 600,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          fontWeight: 500,
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: mode === 'dark' 
              ? '0 4px 8px rgba(255, 105, 180, 0.3)'
              : '0 4px 8px rgba(255, 105, 180, 0.2)',
          },
        },
        contained: {
          background: 'linear-gradient(45deg, #FF69B4 30%, #9370DB 90%)',
          '&:hover': {
            background: 'linear-gradient(45deg, #DB7093 30%, #663399 90%)',
          },
        },
        outlined: {
          borderColor: '#FF69B4',
          color: '#FF69B4',
          '&:hover': {
            borderColor: '#9370DB',
            color: '#9370DB',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundColor: mode === 'dark' ? '#2A2A3E' : '#FFFFFF',
          border: `1px solid ${mode === 'dark' 
            ? 'rgba(255, 105, 180, 0.1)' 
            : 'rgba(255, 105, 180, 0.2)'}`,
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: mode === 'dark'
              ? '0 8px 16px rgba(255, 105, 180, 0.2)'
              : '0 8px 16px rgba(255, 105, 180, 0.1)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: mode === 'dark' ? '#1A1A2E' : '#F8F9FF',
            '& fieldset': {
              borderColor: mode === 'dark'
                ? 'rgba(255, 105, 180, 0.2)'
                : 'rgba(255, 105, 180, 0.3)',
            },
            '&:hover fieldset': {
              borderColor: mode === 'dark'
                ? 'rgba(255, 105, 180, 0.4)'
                : 'rgba(255, 105, 180, 0.5)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#FF69B4',
            },
            '& input': {
              color: mode === 'dark' ? '#FFFFFF' : '#1A1A2E',
            },
          },
          '& .MuiInputLabel-root': {
            color: mode === 'dark' ? '#E6E6FA' : '#4A4A6A',
            '&.Mui-focused': {
              color: '#FF69B4',
            },
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: mode === 'dark' ? '#1A1A2E' : '#FFFFFF',
          borderRight: `1px solid ${mode === 'dark'
            ? 'rgba(255, 105, 180, 0.1)'
            : 'rgba(255, 105, 180, 0.2)'}`,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: mode === 'dark' ? '#1A1A2E' : '#FFFFFF',
          borderBottom: `1px solid ${mode === 'dark'
            ? 'rgba(255, 105, 180, 0.1)'
            : 'rgba(255, 105, 180, 0.2)'}`,
          background: mode === 'dark'
            ? 'linear-gradient(45deg, #1A1A2E 30%, #2A2A3E 90%)'
            : 'linear-gradient(45deg, #FFFFFF 30%, #F8F9FF 90%)',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: mode === 'dark'
            ? 'rgba(255, 105, 180, 0.1)'
            : 'rgba(255, 105, 180, 0.2)',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: '#FF69B4',
          '&:hover': {
            backgroundColor: mode === 'dark'
              ? 'rgba(255, 105, 180, 0.1)'
              : 'rgba(255, 105, 180, 0.05)',
          },
        },
      },
    },
  },
});

const theme = (mode) => createTheme(getDesignTokens(mode));

export default theme; 