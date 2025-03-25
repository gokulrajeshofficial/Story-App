import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
  Chip,
  Paper,
  Divider,
  IconButton,
  Button,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

const StoryViewer = ({ story, open, onClose }) => {
  // Split the story content into sections based on headers marked with **
  const sections = story.content.split(/(?=\*\*.*?\*\*)/);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          minHeight: '80vh',
          maxHeight: '90vh',
        }
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        borderBottom: 1,
        borderColor: 'divider',
      }}>
        <Typography variant="h5" component="h2">
          {story.title}
        </Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ p: 3 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Story Type: <Chip label={story.storyType} size="small" sx={{ ml: 1 }} />
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Character: <Chip label={story.characters[0].name} size="small" sx={{ ml: 1 }} />
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Prompt: {story.prompt}
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        {sections.map((section, index) => {
          // Skip empty sections
          if (!section.trim()) return null;

          // Extract section header if it exists
          const headerMatch = section.match(/\*\*(.*?)\*\*/);
          const header = headerMatch ? headerMatch[1] : null;
          const content = section.replace(/\*\*.*?\*\*/, '').trim();

          // Skip if no content after header
          if (!content) return null;

          return (
            <Paper 
              key={index} 
              sx={{ 
                p: 3, 
                mb: 3,
                backgroundColor: 'background.default',
                '&:last-child': { mb: 0 }
              }}
            >
              {header && (
                <Typography 
                  variant="h6" 
                  component="h3" 
                  gutterBottom
                  sx={{ 
                    color: 'primary.main',
                    fontWeight: 'bold',
                    textTransform: 'capitalize',
                  }}
                >
                  {header}
                </Typography>
              )}
              <Typography 
                variant="body1" 
                sx={{ 
                  whiteSpace: 'pre-line',
                  lineHeight: 1.8,
                }}
              >
                {content}
              </Typography>
            </Paper>
          );
        })}
      </DialogContent>
      <DialogActions sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default StoryViewer; 