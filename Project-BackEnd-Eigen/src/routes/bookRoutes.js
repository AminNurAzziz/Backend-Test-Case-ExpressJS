const express = require('express');
const bookController = require('../controllers/bookController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();


router.post('/', authMiddleware, bookController.createBook);
router.get('/', authMiddleware, bookController.getAllBooks);
router.get('/:code', authMiddleware, bookController.getBook);
router.put('/:code', authMiddleware, bookController.updateBook);
router.delete('/:code', authMiddleware, bookController.deleteBook);

module.exports = router;
