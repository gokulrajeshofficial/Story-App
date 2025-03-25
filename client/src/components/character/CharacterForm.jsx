import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  TextField,
  Button,
  Typography,
  Chip,
  Stack,
  Paper,
} from '@mui/material';

const validationSchema = Yup.object({
  name: Yup.string()
    .required('Name is required')
    .max(50, 'Name cannot be more than 50 characters'),
  description: Yup.string()
    .required('Description is required')
    .max(1000, 'Description cannot be more than 1000 characters'),
  traits: Yup.array().of(Yup.string()),
  backstory: Yup.string()
    .max(2000, 'Backstory cannot be more than 2000 characters'),
});

const CharacterForm = ({ initialValues, onSubmit, submitButtonText = 'Create Character' }) => {
  return (
    <Formik
      initialValues={initialValues || {
        name: '',
        description: '',
        traits: [],
        backstory: '',
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ values, setFieldValue, handleChange, handleBlur, errors, touched }) => (
        <Form>
          <Paper sx={{ p: 3 }}>
            <Stack spacing={3}>
              <TextField
                fullWidth
                name="name"
                label="Character Name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
              />

              <TextField
                fullWidth
                multiline
                rows={3}
                name="description"
                label="Description"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.description && Boolean(errors.description)}
                helperText={touched.description && errors.description}
              />

              <TextField
                fullWidth
                multiline
                rows={4}
                name="backstory"
                label="Backstory"
                value={values.backstory}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.backstory && Boolean(errors.backstory)}
                helperText={touched.backstory && errors.backstory}
              />

              <Box>
                <Typography variant="subtitle1" gutterBottom>
                  Traits
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 1 }}>
                  {values.traits.map((trait, index) => (
                    <Chip
                      key={index}
                      label={trait}
                      onDelete={() => {
                        const newTraits = values.traits.filter((_, i) => i !== index);
                        setFieldValue('traits', newTraits);
                      }}
                    />
                  ))}
                </Box>
                <TextField
                  fullWidth
                  name="newTrait"
                  label="Add Trait"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      const input = e.target.value.trim();
                      if (input && !values.traits.includes(input)) {
                        setFieldValue('traits', [...values.traits, input]);
                        e.target.value = '';
                      }
                    }
                  }}
                />
              </Box>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                fullWidth
              >
                {submitButtonText}
              </Button>
            </Stack>
          </Paper>
        </Form>
      )}
    </Formik>
  );
};

export default CharacterForm; 