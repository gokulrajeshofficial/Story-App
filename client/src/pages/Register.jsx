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
  Stepper,
  Step,
  StepLabel,
  Fade,
  Slide,
} from '@mui/material';
import {
  SmartToy as AIIcon,
  PersonAdd as PersonAddIcon,
  Email as EmailIcon,
  Lock as LockIcon,
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    )
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

const Register = () => {
  const navigate = useNavigate();
  const { register, error, loading } = useAuth();
  const [activeStep, setActiveStep] = React.useState(0);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await register({
          name: values.name,
          email: values.email,
          password: values.password,
        });
        navigate('/');
      } catch (err) {
        // Error is handled by the AuthContext
      }
    },
  });

  const steps = ['Personal Info', 'Account Security'];

  const handleNext = () => {
    if (activeStep === 0 && !formik.errors.name && !formik.errors.email) {
      setActiveStep(1);
    }
  };

  const handleBack = () => {
    setActiveStep(0);
  };

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
                  Join Story App
                </Typography>
              </Box>
              <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
                Start Your Creative Journey
              </Typography>
              <Typography variant="body1" paragraph sx={{ color: 'text.secondary', mb: 4 }}>
                Create an account to unlock the full potential of AI-powered storytelling.
                Join our community of creative writers and let your imagination soar.
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <BenefitCard
                  icon="🎨"
                  title="Unlimited Creativity"
                  description="Create as many characters and stories as you want"
                />
                <BenefitCard
                  icon="🤖"
                  title="AI Assistance"
                  description="Get help from advanced AI to enhance your stories"
                />
                <BenefitCard
                  icon="💾"
                  title="Save & Share"
                  description="Save your work and share it with the community"
                />
              </Box>
            </Box>
          </Fade>
        </Grid>

        {/* Right side - Registration Form */}
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
              <Stepper activeStep={activeStep} sx={{ width: '100%', mb: 4 }}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>

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
                <Fade in={activeStep === 0} unmountOnExit>
                  <Box>
                    <TextField
                      fullWidth
                      id="name"
                      name="name"
                      label="Full Name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.name && Boolean(formik.errors.name)}
                      helperText={formik.touched.name && formik.errors.name}
                      disabled={loading}
                      sx={{ mb: 2 }}
                      InputProps={{
                        startAdornment: <PersonAddIcon sx={{ mr: 1, color: 'primary.main' }} />,
                      }}
                    />
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
                      disabled={loading}
                      sx={{ mb: 3 }}
                      InputProps={{
                        startAdornment: <EmailIcon sx={{ mr: 1, color: 'primary.main' }} />,
                      }}
                    />
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={handleNext}
                      disabled={loading || !formik.values.name || !formik.values.email}
                      sx={{ py: 1.5 }}
                    >
                      Next
                    </Button>
                  </Box>
                </Fade>

                <Fade in={activeStep === 1} unmountOnExit>
                  <Box>
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
                      disabled={loading}
                      sx={{ mb: 2 }}
                      InputProps={{
                        startAdornment: <LockIcon sx={{ mr: 1, color: 'primary.main' }} />,
                      }}
                    />
                    <TextField
                      fullWidth
                      id="confirmPassword"
                      name="confirmPassword"
                      label="Confirm Password"
                      type="password"
                      value={formik.values.confirmPassword}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                      helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                      disabled={loading}
                      sx={{ mb: 3 }}
                      InputProps={{
                        startAdornment: <LockIcon sx={{ mr: 1, color: 'primary.main' }} />,
                      }}
                    />
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Button
                        variant="outlined"
                        onClick={handleBack}
                        disabled={loading}
                        sx={{ py: 1.5, flex: 1 }}
                      >
                        Back
                      </Button>
                      <Button
                        type="submit"
                        variant="contained"
                        disabled={loading}
                        sx={{ py: 1.5, flex: 1 }}
                      >
                        {loading ? 'Creating Account...' : 'Create Account'}
                      </Button>
                    </Box>
                  </Box>
                </Fade>

                <Box sx={{ textAlign: 'center', mt: 3 }}>
                  <Typography variant="body2" color="text.secondary">
                    Already have an account?{' '}
                    <Link
                      component={RouterLink}
                      to="/login"
                      sx={{
                        color: 'primary.main',
                        textDecoration: 'none',
                        fontWeight: 500,
                        '&:hover': {
                          textDecoration: 'underline',
                        },
                      }}
                    >
                      Sign In
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

// Helper component for benefits
const BenefitCard = ({ icon, title, description }) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'flex-start',
      gap: 2,
      p: 2,
      borderRadius: 2,
      bgcolor: 'background.paper',
      transition: 'transform 0.2s ease-in-out',
      '&:hover': {
        transform: 'translateX(8px)',
      },
    }}
  >
    <Typography variant="h4" sx={{ minWidth: 40 }}>
      {icon}
    </Typography>
    <Box>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </Box>
  </Box>
);

export default Register; 