const express = require('express');

// Import custom middleware
const { clog } = require('../../middleware/clog');

// Import our modular router for /notes
const notesRouter = require('./notes');

const app = express();

app.use('/notes', notesRouter);

// Initialize custom middleware
app.use(clog);

module.exports = app;
