const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false
  },
  refreshToken: {
    type: String,
    select: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Encrypt password using bcrypt
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function() {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

// // Generate refresh token
// UserSchema.methods.getRefreshToken = function() {
//   return jwt.sign({ id: this._id }, process.env.JWT_REFRESH_SECRET, {
//     expiresIn: process.env.JWT_REFRESH_EXPIRE
//   });
// };

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Add this after the UserSchema definition but before module.exports
UserSchema.post('save', function(error, doc, next) {
    if (error.code === 11000 && error.keyPattern.email) {
        next(new Error('Email address is already registered'));
    } else {
        next(error);
    }
});

// Add this for handling validation errors during updates
UserSchema.post('findOneAndUpdate', function(error, doc, next) {
    if (error.code === 11000 && error.keyPattern.email) {
        next(new Error('Email address is already registered'));
    } else {
        next(error);
    }
});

module.exports = mongoose.model('User', UserSchema);