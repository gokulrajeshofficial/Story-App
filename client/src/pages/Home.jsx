import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  useTheme,
} from '@mui/material';
import {
  AutoAwesome as AIIcon,
  Psychology as BrainIcon,
  Lightbulb as IdeaIcon,
  Group as UsersIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const FeatureCard = ({ icon, title, description }) => {
  const theme = useTheme();
  
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
        <Box
          sx={{
            display: 'inline-flex',
            p: 2,
            borderRadius: '50%',
            background: theme.palette.mode === 'dark'
              ? 'linear-gradient(45deg, rgba(167, 139, 250, 0.1) 30%, rgba(244, 114, 182, 0.1) 90%)'
              : 'linear-gradient(45deg, rgba(124, 58, 237, 0.1) 30%, rgba(236, 72, 153, 0.1) 90%)',
            mb: 2,
          }}
        >
          {icon}
        </Box>
        <Typography variant="h6" component="h3" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

const Home = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(45deg, rgba(15, 23, 42, 0.9) 30%, rgba(30, 41, 59, 0.9) 90%)'
            : 'linear-gradient(45deg, rgba(248, 250, 252, 0.9) 30%, rgba(241, 245, 249, 0.9) 90%)',
          py: 8,
          mb: 6,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h2"
                component="h1"
                gutterBottom
                sx={{
                  background: theme.palette.mode === 'dark'
                    ? 'linear-gradient(45deg, #A78BFA 30%, #F472B6 90%)'
                    : 'linear-gradient(45deg, #7C3AED 30%, #EC4899 90%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Transform Your Storytelling with AI
              </Typography>
              <Typography variant="h5" color="text.secondary" paragraph>
                Create compelling characters and immersive stories with the power of artificial intelligence.
              </Typography>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/stories')}
                sx={{ mt: 2 }}
              >
                Start Creating
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="/aiData.jpg"
                alt="AI Storytelling"
                className='border-radius-lg rounded-lg'
                sx={{
                  width: '100%',
                  maxWidth: 500,
                  display: 'block',
                  margin: 'auto',
                  filter: theme.palette.mode === 'dark' ? 'brightness(0.8)' : 'none',
                  borderRadius: '10px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Typography
          variant="h3"
          component="h2"
          align="center"
          gutterBottom
          sx={{
            mb: 6,
            background: theme.palette.mode === 'dark'
              ? 'linear-gradient(45deg, #A78BFA 30%, #F472B6 90%)'
              : 'linear-gradient(45deg, #7C3AED 30%, #EC4899 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Powered by Advanced AI
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6} lg={3}>
            <FeatureCard
              icon={<AIIcon sx={{ fontSize: 40, color: 'primary.main' }} />}
              title="GPT-4 Integration"
              description="Leveraging OpenAI's GPT-4 for intelligent character development and story generation."
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <FeatureCard
              icon={<BrainIcon sx={{ fontSize: 40, color: 'primary.main' }} />}
              title="Smart Character Creation"
              description="AI-powered suggestions for character traits, backgrounds, and development arcs."
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <FeatureCard
              icon={<IdeaIcon sx={{ fontSize: 40, color: 'primary.main' }} />}
              title="Creative Inspiration"
              description="Get AI-generated ideas and prompts to spark your creativity and develop unique storylines."
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <FeatureCard
              icon={<UsersIcon sx={{ fontSize: 40, color: 'primary.main' }} />}
              title="Character Management"
              description="Organize and manage your characters with AI-assisted insights and development tracking."
            />
          </Grid>
        </Grid>
      </Container>

      {/* How It Works Section */}
      <Box
        sx={{
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(45deg, rgba(15, 23, 42, 0.9) 30%, rgba(30, 41, 59, 0.9) 90%)'
            : 'linear-gradient(45deg, rgba(248, 250, 252, 0.9) 30%, rgba(241, 245, 249, 0.9) 90%)',
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            component="h2"
            align="center"
            gutterBottom
            sx={{
              mb: 6,
              background: theme.palette.mode === 'dark'
                ? 'linear-gradient(45deg, #A78BFA 30%, #F472B6 90%)'
                : 'linear-gradient(45deg, #7C3AED 30%, #EC4899 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            How It Works
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    1. Create Your Character
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Start by creating a new character with basic information. Our AI will help you develop rich, detailed character profiles.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    2. AI-Assisted Development
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Use our AI chat interface to develop your character's personality, backstory, and relationships.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    3. Story Integration
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Seamlessly integrate your characters into stories and get AI suggestions for plot development.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Home; 