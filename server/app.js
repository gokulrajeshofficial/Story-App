const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/error');

// Route files
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const characterRoutes = require('./routes/character.routes');
const storyRoutes = require('./routes/story.routes');

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());

// Mount routers
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/characters', characterRoutes);
app.use('/api/stories', storyRoutes);

// Error handler middleware
app.use(errorHandler);

module.exports = app;