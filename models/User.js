const mongoose = require('mongoose');

// Everything is derived from a schema which creates the document's data structure (shape of the document)
const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  // @todo Validate email format through regex
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true,
    trim: true
  },
  handle: {
    type: String,
    // minlength: 8,
    // maxlength: 32,
    // Custom validation. Empty strings would fail because it does not meet minlength requirement.
    validate: function(value) {
      if (value === '') return true;
      else return value.length >= 8 && value.length <= 32;
    },
    trim: true,
    unqiue: true
  },
  avatar: {
    type: String
  },
  about: {
    type: String,
    maxlength: 1000
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// Export model as variable called User
// model name is user and new instances will be put into a users collection on MongoDB
module.exports = User = mongoose.model('user', UserSchema);
