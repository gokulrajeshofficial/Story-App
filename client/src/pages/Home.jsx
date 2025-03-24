import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  Container,
} from '@mui/material';
import {
  AutoStories as StoryIcon,
  People as CharacterIcon,
  Add as AddIcon,
} from '@mui/icons-material';

const Home = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: 'Create New Story',
      description: 'Start writing a new story with AI assistance',
      icon: <StoryIcon sx={{ fontSize: 40 }} />,
      action: () => navigate('/stories/new'),
    },
    {
      title: 'Create Character',
      description: 'Design a new character for your stories',
      icon: <CharacterIcon sx={{ fontSize: 40 }} />,
      action: () => navigate('/characters/new'),
    },
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to Story App
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" paragraph>
          Create amazing stories with AI assistance and manage your characters all in one place.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {quickActions.map((action) => (
          <Grid item xs={12} sm={6} md={4} key={action.title}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  transition: 'transform 0.2s ease-in-out',
                },
              }}
              onClick={action.action}
            >
              <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                <Box sx={{ color: 'primary.main', mb: 2 }}>
                  {action.icon}
                </Box>
                <Typography gutterBottom variant="h5" component="h2">
                  {action.title}
                </Typography>
                <Typography color="text.secondary">
                  {action.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" gutterBottom>
          Recent Activity
        </Typography>
        <Card>
          <CardContent>
            <Typography color="text.secondary" align="center">
              No recent activity to show
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default Home; 