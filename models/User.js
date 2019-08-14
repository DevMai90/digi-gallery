const mongoose = require('mongoose');

// Everything is derived from a schema which creates the document's data structure (shape of the document)
const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true
  },
  handle: {
    type: String,
    minlength: 8,
    maxlength: 32,
    trim: true,
    unqiue: true
  },
  avatar: {
    type: String
  },
  about: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// Export model as variable called User
// model name is user and new instances will be put into a users collection on MongoDB
module.exports = User = mongoose.model('user', UserSchema);
