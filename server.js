const express = require('express');
const connectDB = require('./config/db');
// const path = require('path');

// Initialize express because it is not a core node module
const app = express();

// Connect to MongoDB
connectDB();

// Test to see if server is up
app.get('/', (req, res) => {
  console.log('API running');
  res.send('API running');
});

// Define/mount route handlers. Router instance is a complete middleware and routing system. Essentially appends our routes to these specified paths/endpoints/URI
// .use() configures middleware used by routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/auth', require('./routes/api/auth'));

// Look for port during production else run on localport:5000
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
