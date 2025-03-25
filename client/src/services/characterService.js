import axios from 'axios';

// Helper function to handle API errors
const handleApiError = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    throw new Error(error.response.data.message || 'An error occurred with the server');
  } else if (error.request) {
    // The request was made but no response was received
    throw new Error('No response received from server. Please check your connection.');
  } else {
    // Something happened in setting up the request that triggered an Error
    throw new Error('Error setting up the request. Please try again.');
  }
};

export const characterService = {
  // Get all characters
  getAllCharacters: async () => {
    try {
      const response = await axios.get('/api/characters');
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  // Get a single character
  getCharacter: async (id) => {
    try {
      if (!id) {
        throw new Error('Character ID is required');
      }
      const response = await axios.get(`/api/characters/${id}`);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  // Create a new character
  createCharacter: async (characterData) => {
    try {
      if (!characterData || !characterData.name || !characterData.description) {
        throw new Error('Name and description are required for creating a character');
      }
      const response = await axios.post('/api/characters', characterData);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  // Update a character
  updateCharacter: async (id, characterData) => {
    try {
      if (!id) {
        throw new Error('Character ID is required for updating');
      }
      if (!characterData || !characterData.name || !characterData.description) {
        throw new Error('Name and description are required for updating a character');
      }
      const response = await axios.put(`/api/characters/${id}`, characterData);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  // Delete a character
  deleteCharacter: async (id) => {
    try {
      if (!id) {
        throw new Error('Character ID is required for deletion');
      }
      const response = await axios.delete(`/api/characters/${id}`);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  }
}; 