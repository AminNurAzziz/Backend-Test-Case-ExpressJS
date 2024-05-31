const express = require('express');
const libraryController = require('../controllers/libraryController');

const router = express.Router();

router.post('/borrow', libraryController.borrowBook);
router.post('/return', libraryController.returnBook);
router.get('/books', libraryController.getAllBooks);
router.get('/members', libraryController.getAllMembers);

module.exports = router;
