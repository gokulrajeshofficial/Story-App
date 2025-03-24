const mongoose = require('mongoose');

const StorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  content: {
    type: String,
    required: [true, 'Story content is required']
  },
  prompt: {
    type: String,
    required: [true, 'Story prompt is required']
  },
  storyType: {
    type: String,
    required: [true, 'Please specify a story type'],
    enum: ['adventure', 'romance', 'mystery', 'horror', 'fantasy', 'sci-fi', 'other']
  },
  characters: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Character'
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Story', StorySchema);