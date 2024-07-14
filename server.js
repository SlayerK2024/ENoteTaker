const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;

// Define the notes router
const notesRouter = require('./routes/notes.js');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// API routes
app.use('/api/notes', notesRouter);

// HTML Routes
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

