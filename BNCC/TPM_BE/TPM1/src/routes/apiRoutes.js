const express = require('express');
const router = express.Router(); // Modular routing [cite: 14]
const controller = require('../controllers/apiController');

// Route 1: Home/Form 
router.get('/', controller.getHome);

// Route 2: Submit Form (The input functionality) 
router.post('/snippet', controller.createSnippet);

// Route 3: View Data 
router.get('/snippets', controller.getAllSnippets);

module.exports = router;