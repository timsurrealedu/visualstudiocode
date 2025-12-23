const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const uploadMiddleware = require('../middlewares/upload');

router.get('/', bookController.getAllBooks);
router.post('/', uploadMiddleware, bookController.createBook); // Create with upload
router.put('/:id', uploadMiddleware, bookController.updateBook); // Update with upload
router.delete('/:id', bookController.deleteBook);

module.exports = router;