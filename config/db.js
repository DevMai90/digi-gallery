const mongoose = require('mongoose');
// config dependency allows us to use global values throughout our app. Reaches for default.json which will have our separate credentials
const config = require('config');
// MongoDB database that we are connecting to
const db = config.get('mongoURI');

// Use mongoose to connect to database. Returns a promise.
// Put connectDB into a variable because we'll need something to call in server.js
const connectDB = async () => {
  // Try this.
  try {
    // await for promise
    await mongoose.connect(db, { useNewUrlParser: true, useCreateIndex: true });

    console.log('MongoDB connected...');
    // If any of it fails...
  } catch (err) {
    console.log(err.message);

    // Exit Node process with failure. We want the application to fail.
    process.exit(1);
  }
};

module.exports = connectDB;
