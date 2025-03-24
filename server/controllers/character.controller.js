const Character = require('../models/character.model');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc    Create new character
// @route   POST /api/characters
// @access  Private
exports.createCharacter = asyncHandler(async (req, res, next) => {
  // Add user to req.body
  req.body.user = req.user.id;

  const character = await Character.create(req.body);

  res.status(201).json({
    success: true,
    data: character
  });
});

// @desc    Get all characters for logged in user
// @route   GET /api/characters
// @access  Private
exports.getCharacters = asyncHandler(async (req, res, next) => {
  const characters = await Character.find({ user: req.user.id });

  res.status(200).json({
    success: true,
    count: characters.length,
    data: characters
  });
});

// @desc    Get single character
// @route   GET /api/characters/:id
// @access  Private
exports.getCharacter = asyncHandler(async (req, res, next) => {
  const character = await Character.findById(req.params.id);

  if (!character) {
    return next(
      new ErrorResponse(`Character not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user owns character
  if (character.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(`User not authorized to access this character`, 401)
    );
  }

  res.status(200).json({
    success: true,
    data: character
  });
});

// @desc    Update character
// @route   PUT /api/characters/:id
// @access  Private
exports.updateCharacter = asyncHandler(async (req, res, next) => {
  let character = await Character.findById(req.params.id);

  if (!character) {
    return next(
      new ErrorResponse(`Character not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user owns character
  if (character.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(`User not authorized to update this character`, 401)
    );
  }

  character = await Character.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: character
  });
});

// @desc    Delete character
// @route   DELETE /api/characters/:id
// @access  Private
exports.deleteCharacter = asyncHandler(async (req, res, next) => {
  const character = await Character.findById(req.params.id);

  if (!character) {
    return next(
      new ErrorResponse(`Character not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user owns character
  if (character.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(`User not authorized to delete this character`, 401)
    );
  }

  await character.deleteOne();

  res.status(200).json({
    success: true,
    data: {}
  });
});