import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Paper,
  Stack,
  Alert,
  CircularProgress,
} from '@mui/material';
import { useCharacter } from '../context/CharacterContext';

const storyTypes = [
  'adventure',
  'romance',
  'mystery',
  'horror',
  'fantasy',
  'sci-fi',
  'other'
];

const validationSchema = Yup.object({
  title: Yup.string()
    .required('Title is required')
    .max(100, 'Title cannot be more than 100 characters'),
  prompt: Yup.string()
    .required('Story prompt is required'),
  storyType: Yup.string()
    .required('Story type is required')
    .oneOf(storyTypes, 'Invalid story type'),
});

const StoryForm = ({ onSubmit, submitButtonText = 'Generate Story', isSubmitting }) => {
  const { selectedCharacter } = useCharacter();

  if (!selectedCharacter) {
    return (
      <Alert severity="warning">
        Please select a character before creating a story.
      </Alert>
    );
  }

  return (
    <Formik
      initialValues={{
        title: '',
        prompt: '',
        storyType: '',
        characters: [selectedCharacter._id]
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ values, handleChange, handleBlur, errors, touched }) => (
        <Form>
          <Paper sx={{ p: 3 }}>
            <Stack spacing={3}>
              <Typography variant="subtitle1" color="text.secondary">
                Creating story for: {selectedCharacter.name}
              </Typography>

              <TextField
                fullWidth
                name="title"
                label="Story Title"
                value={values.title}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.title && Boolean(errors.title)}
                helperText={touched.title && errors.title}
                disabled={isSubmitting}
              />

              <TextField
                fullWidth
                multiline
                rows={4}
                name="prompt"
                label="Story Prompt"
                value={values.prompt}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.prompt && Boolean(errors.prompt)}
                helperText={touched.prompt && errors.prompt}
                disabled={isSubmitting}
              />

              <TextField
                fullWidth
                select
                name="storyType"
                label="Story Type"
                value={values.storyType}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.storyType && Boolean(errors.storyType)}
                helperText={touched.storyType && errors.storyType}
                disabled={isSubmitting}
              >
                {storyTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </MenuItem>
                ))}
              </TextField>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                disabled={isSubmitting}
                startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : null}
              >
                {isSubmitting ? 'Generating Story...' : submitButtonText}
              </Button>

              {isSubmitting && (
                <Alert severity="info" sx={{ mt: 2 }}>
                  Please wait while we generate your story. This may take a few minutes...
                </Alert>
              )}
            </Stack>
          </Paper>
        </Form>
      )}
    </Formik>
  );
};

export default StoryForm; 