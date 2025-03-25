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
import { characterService } from '../services/characterService';
import CharacterCard from '../components/character/CharacterCard';
import CharacterForm from '../components/character/CharacterForm';
import { useCharacter } from '../context/CharacterContext';

const Characters = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingCharacter, setEditingCharacter] = useState(null);
  const { selectedCharacter, selectCharacter, clearSelectedCharacter } = useCharacter();

  const fetchCharacters = async () => {
    try {
      setLoading(true);
      const { data = [] } = await characterService.getAllCharacters();
      setCharacters(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch characters. Please try again later.');
      console.error('Error fetching characters:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  const handleCreateCharacter = async (values) => {
    try {
      await characterService.createCharacter(values);
      setOpenDialog(false);
      fetchCharacters();
    } catch (err) {
      setError('Failed to create character. Please try again.');
      console.error('Error creating character:', err);
    }
  };

  const handleUpdateCharacter = async (values) => {
    try {
      await characterService.updateCharacter(editingCharacter._id, values);
      setOpenDialog(false);
      setEditingCharacter(null);
      fetchCharacters();
    } catch (err) {
      setError('Failed to update character. Please try again.');
      console.error('Error updating character:', err);
    }
  };

  const handleDeleteCharacter = async (id) => {
    if (window.confirm('Are you sure you want to delete this character?')) {
      try {
        await characterService.deleteCharacter(id);
        if (selectedCharacter?._id === id) {
          clearSelectedCharacter();
        }
        fetchCharacters();
      } catch (err) {
        setError('Failed to delete character. Please try again.');
        console.error('Error deleting character:', err);
      }
    }
  };

  const handleEditCharacter = (character) => {
    setEditingCharacter(character);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingCharacter(null);
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
          Characters
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
        >
          Create Character
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {selectedCharacter && (
        <Alert severity="info" sx={{ mb: 2 }}>
          Selected character: {selectedCharacter.name}
        </Alert>
      )}

      <Grid container spacing={3}>
        {characters.map((character) => (
          <Grid item key={character._id} xs={12} sm={6} md={4}>
            <CharacterCard
              character={character}
              onEdit={handleEditCharacter}
              onDelete={handleDeleteCharacter}
              onSelect={() => selectCharacter(character)}
              isSelected={selectedCharacter?._id === character._id}
            />
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {editingCharacter ? 'Edit Character' : 'Create New Character'}
        </DialogTitle>
        <DialogContent>
          <CharacterForm
            initialValues={editingCharacter}
            onSubmit={editingCharacter ? handleUpdateCharacter : handleCreateCharacter}
            submitButtonText={editingCharacter ? 'Update Character' : 'Create Character'}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Characters; 