const Story = require('../models/story.model');
const Character = require('../models/character.model');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const openaiService = require('../services/openai.service');

// @desc    Generate story with OpenAI
// @route   POST /api/stories
// @access  Private
exports.generateStory = asyncHandler(async (req, res, next) => {
  const { title, characters, storyType, additionalPrompt } = req.body;

  if (!title || !characters || !storyType) {
    return next(new ErrorResponse('Please provide title, characters, and story type', 400));
  }

  // Verify all characters belong to user
  for (const characterId of characters) {
    const character = await Character.findById(characterId);
    
    if (!character) {
      return next(new ErrorResponse(`Character not found with id ${characterId}`, 404));
    }
    
    if (character.user.toString() !== req.user.id) {
      return next(new ErrorResponse('Not authorized to use some of these characters', 401));
    }
  }

  // Get character details for the prompt
  const characterDetails = await Promise.all(
    characters.map(async (characterId) => {
      const character = await Character.findById(characterId);
      return {
        name: character.name,
        description: character.description,
        traits: character.traits,
        backstory: character.backstory
      };
    })
  );

  // Construct prompt for OpenAI
  const promptText = await openaiService.constructStoryPrompt(
    title,
    characterDetails,
    storyType,
    additionalPrompt
  );

  // Generate story
  const storyContent = await openaiService.generateStory(promptText);

  // Create story in database
  const story = await Story.create({
    title,
    content: storyContent,
    prompt: promptText,
    storyType,
    characters,
    user: req.user.id
  });

  res.status(201).json({
    success: true,
    data: story
  });
});

// @desc    Get all stories for logged in user
// @route   GET /api/stories
// @access  Private
exports.getStories = asyncHandler(async (req, res, next) => {
  const stories = await Story.find({ user: req.user.id })
    .populate('characters', 'name')
    .sort('-createdAt');

  res.status(200).json({
    success: true,
    count: stories.length,
    data: stories
  });
});

// @desc    Get single story
// @route   GET /api/stories/:id
// @access  Private
exports.getStory = asyncHandler(async (req, res, next) => {
  const story = await Story.findById(req.params.id)
    .populate('characters', 'name description traits');

  if (!story) {
    return next(
      new ErrorResponse(`Story not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user owns story
  if (story.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(`User not authorized to access this story`, 401)
    );
  }

  res.status(200).json({
    success: true,
    data: story
  });
});

// @desc    Delete story
// @route   DELETE /api/stories/:id
// @access  Private
exports.deleteStory = asyncHandler(async (req, res, next) => {
  const story = await Story.findById(req.params.id);

  if (!story) {
    return next(
      new ErrorResponse(`Story not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user owns story
  if (story.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(`User not authorized to delete this story`, 401)
    );
  }

  await story.deleteOne();

  res.status(200).json({
    success: true,
    data: {}
  });
});