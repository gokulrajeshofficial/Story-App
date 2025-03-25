import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  CircularProgress,
  Alert,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { storyService } from '../services/storyService';
import StoryForm from '../components/StoryForm';
import StoryCard from '../components/stories/StoryCard';
import StoryViewer from '../components/stories/StoryViewer';
import { useCharacter } from '../context/CharacterContext';

const Stories = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { selectedCharacter } = useCharacter();

  const fetchStories = async () => {
    try {
      setLoading(true);
      const {data=[]} = await storyService.getAllStories();
      setStories(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch stories. Please try again later.');
      console.error('Error fetching stories:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  const handleGenerateStory = async (values) => {
    try {
      setIsGenerating(true);
      await storyService.generateStory(values);
      setOpenDialog(false);
      fetchStories();
    } catch (err) {
      setError('Failed to generate story. Please try again.');
      console.error('Error generating story:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDeleteStory = async (id) => {
    if (window.confirm('Are you sure you want to delete this story?')) {
      try {
        await storyService.deleteStory(id);
        fetchStories();
      } catch (err) {
        setError('Failed to delete story. Please try again.');
        console.error('Error deleting story:', err);
      }
    }
  };

  const handleViewStory = (story) => {
    setSelectedStory(story);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" component="h1">
          Stories
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
          disabled={!selectedCharacter || isGenerating}
        >
          Create Story
        </Button>
      </Box>

      {!selectedCharacter && (
        <Alert severity="info" sx={{ mb: 2 }}>
          Please select a character from the Characters page to create a story.
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        {stories.map((story) => (
          <Grid item key={story._id} xs={12} md={6}>
            <StoryCard 
              story={story} 
              onDelete={handleDeleteStory}
              onView={handleViewStory}
            />
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={openDialog}
        onClose={() => !isGenerating && setOpenDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Create New Story</DialogTitle>
        <DialogContent>
          <StoryForm 
            onSubmit={handleGenerateStory}
            isSubmitting={isGenerating}
          />
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setOpenDialog(false)} 
            disabled={isGenerating}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {selectedStory && (
        <StoryViewer
          story={selectedStory}
          open={!!selectedStory}
          onClose={() => setSelectedStory(null)}
        />
      )}
    </Container>
  );
};

export default Stories; 