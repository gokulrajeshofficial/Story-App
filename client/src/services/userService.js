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

export const userService = {
  // Get current user profile
  getCurrentUser: async () => {
    try {
      const response = await axios.get('/api/auth/me');
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

}; 