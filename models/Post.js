const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  user: {
    // Tells mongoose to reach into user model during population
    // Finds ObjectId from documents in user model
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  image: {
    type: String
    // required: true
  },
  postText: {
    type: String,
    maxlength: 500,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  handle: {
    type: String
  },
  avatar: {
    type: String
  },
  likes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
      }
    }
  ],
  comments: [
    // Comments will save all this information so that comments will continue to exist if the user ever deletes their account
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
      },
      text: {
        type: String,
        required: true
      },
      handle: {
        type: String
      },
      // Populate first name and last name?
      firstName: {
        type: String,
        required: true
      },
      lastName: {
        type: String,
        required: true
      },
      avatar: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  },
  edited: {
    type: Date
  },
  views: {
    type: Number,
    default: 0
  }
});

module.exports = Post = mongoose.model('post', PostSchema);
