const express = require('express');
const app = express();
const routes = require('./routes/index');

// Middleware to parse form data (Essential for processing input)
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());

// Load routes
app.use('/', routes);

module.exports = app;