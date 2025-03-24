import React from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
  Paper,
  Alert,
  Grid,
  Fade,
  Slide,
} from '@mui/material';
import { SmartToy as AIIcon, Login as LoginIcon } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required'),
});

const Login = () => {
  const navigate = useNavigate();
  const { login, error, loading } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await login(values.email, values.password);
        navigate('/');
      } catch (err) {
        // Error is handled by the AuthContext
      }
    },
  });

  return (
    <Container maxWidth="lg" sx={{ minHeight: '100vh', display: 'flex' }}>
      <Grid container spacing={4} alignItems="center">
        {/* Left side - App Info */}
        <Grid item xs={12} md={6}>
          <Fade in timeout={1000}>
            <Box sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                <AIIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
                <Typography variant="h3" component="h1" sx={{ fontWeight: 700 }}>
                  Story App
                </Typography>
              </Box>
              <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
                Create Amazing Stories with AI
              </Typography>
              <Typography variant="body1" paragraph sx={{ color: 'text.secondary', mb: 4 }}>
                Welcome to Story App, where artificial intelligence meets creativity. 
                Create unique characters, generate engaging stories, and bring your 
                imagination to life with our AI-powered storytelling platform.
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Feature icon="🎭" text="Create and manage unique characters" />
                <Feature icon="📚" text="Generate AI-powered stories" />
                <Feature icon="✨" text="Customize story themes and genres" />
                <Feature icon="🔄" text="Save and edit your stories anytime" />
              </Box>
            </Box>
          </Fade>
        </Grid>

        {/* Right side - Login Form */}
        <Grid item xs={12} md={6}>
          <Slide direction="left" in timeout={500}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: 450,
                mx: 'auto',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 4,
                  background: 'linear-gradient(45deg, #FF69B4 30%, #9370DB 90%)',
                },
              }}
            >
              <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
                Welcome Back
              </Typography>

              <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4, textAlign: 'center' }}>
                Sign in to continue your creative journey
              </Typography>

              {error && (
                <Alert severity="error" sx={{ width: '100%', mb: 3 }}>
                  {error}
                </Alert>
              )}

              <Box
                component="form"
                onSubmit={formik.handleSubmit}
                sx={{ width: '100%' }}
              >
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  label="Email Address"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  margin="normal"
                  disabled={loading}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                  margin="normal"
                  disabled={loading}
                  sx={{ mb: 3 }}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={loading}
                  sx={{
                    py: 1.5,
                    mb: 2,
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {loading ? 'Signing in...' : (
                    <>
                      Sign In
                      <LoginIcon sx={{ ml: 1 }} />
                    </>
                  )}
                </Button>

                <Box sx={{ textAlign: 'center', mt: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Don't have an account?{' '}
                    <Link
                      component={RouterLink}
                      to="/register"
                      sx={{
                        color: 'primary.main',
                        textDecoration: 'none',
                        fontWeight: 500,
                        '&:hover': {
                          textDecoration: 'underline',
                        },
                      }}
                    >
                      Sign Up
                    </Link>
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Slide>
        </Grid>
      </Grid>
    </Container>
  );
};

// Helper component for features
const Feature = ({ icon, text }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
    <Typography variant="h6" sx={{ minWidth: 40 }}>
      {icon}
    </Typography>
    <Typography variant="body1" sx={{ color: 'text.secondary' }}>
      {text}
    </Typography>
  </Box>
);

export default Login; 