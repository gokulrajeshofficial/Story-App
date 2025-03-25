import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Box,
  Chip,
  IconButton,
  Tooltip,
} from '@mui/material';
import { 
  Delete as DeleteIcon,
  Book as BookIcon,
} from '@mui/icons-material';

const StoryCard = ({ story, onDelete, onView }) => {
  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        transition: 'all 0.2s ease-in-out',
        position: 'relative',
        '&:hover': {
          boxShadow: 3,
        },
      }}
    >
      <Box sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}>
        <Tooltip title="View Story">
          <IconButton
            onClick={() => onView(story)}
            color="primary"
            size="small"
            sx={{
              backgroundColor: 'background.paper',
              '&:hover': {
                backgroundColor: 'action.hover',
              },
            }}
          >
            <BookIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          {story.title}
        </Typography>

        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          <Chip 
            label={story.storyType} 
            size="small" 
            color="primary"
            variant="outlined"
          />
          <Chip 
            label={story.characters[0].name} 
            size="small" 
            color="secondary"
            variant="outlined"
          />
        </Box>

        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Prompt: {story.prompt}
        </Typography>
      </CardContent>

      <CardActions>
        <Tooltip title="Delete Story">
          <IconButton
            onClick={() => onDelete(story._id)}
            color="error"
            size="small"
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

export default StoryCard; 