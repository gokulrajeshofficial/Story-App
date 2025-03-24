const express = require('express');
const {
  generateStory,
  getStories,
  getStory,
  deleteStory
} = require('../controllers/story.controller');

const router = express.Router();

const { protect } = require('../middleware/auth');

router
  .route('/')
  .get(protect, getStories)
  .post(protect, generateStory);

router
  .route('/:id')
  .get(protect, getStory)
  .delete(protect, deleteStory);

module.exports = router;