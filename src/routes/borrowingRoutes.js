const express = require('express');
const borrowingController = require('../controllers/borrowingController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/borrow', authMiddleware, borrowingController.borrowBook);
router.post('/return', authMiddleware, borrowingController.returnBook);

module.exports = router;
