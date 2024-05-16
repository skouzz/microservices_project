// app.js

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Require route modules
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes'); // Include comment routes

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/project', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

// Check MongoDB connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Use route modules
app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/comments', commentRoutes); // Mount comment routes

// Start Express server
app.listen(PORT, () => {
  console.log(`Express server is running on port ${PORT}`);
}).on('error', err => {
  console.error(`Failed to start Express server: ${err}`);
});
