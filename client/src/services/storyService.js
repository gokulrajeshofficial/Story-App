import axios from 'axios';

// Helper function to handle API errors
const handleApiError = (error) => {
  if (error.response) {
    throw new Error(error.response.data.message || 'An error occurred with the server');
  } else if (error.request) {
    throw new Error('No response received from server. Please check your connection.');
  } else {
    throw new Error('Error setting up the request. Please try again.');
  }
};

export const storyService = {
  // Get all stories
  getAllStories: async () => {
    try {
      const response = await axios.get('/api/stories');
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  // Get a single story
  getStory: async (id) => {
    try {
      if (!id) {
        throw new Error('Story ID is required');
      }
      const response = await axios.get(`/api/stories/${id}`);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  // Generate a new story
  generateStory: async (storyData) => {
    try {
      if (!storyData || !storyData.title || !storyData.prompt || !storyData.storyType) {
        throw new Error('Title, prompt, and story type are required');
      }
      if (!storyData.characters || storyData.characters.length === 0) {
        throw new Error('At least one character must be selected');
      }
      const response = await axios.post('/api/stories', storyData);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  // Delete a story
  deleteStory: async (id) => {
    try {
      if (!id) {
        throw new Error('Story ID is required for deletion');
      }
      const response = await axios.delete(`/api/stories/${id}`);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  }
}; 