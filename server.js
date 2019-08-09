const express = require('express');
const connectDB = require('./config/db');
// const path = require('path');

// Initialize express because it is not a core node module
const app = express();

// Connecto to MongoDB
connectDB();

// Test to see if server is up
app.get('/', (req, res) => {
  console.log('API running');
  res.send('API running');
});

// Look for port during production else run on localport:5000
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
