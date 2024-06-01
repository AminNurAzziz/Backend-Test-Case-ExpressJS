const express = require('express');
const memberController = require('../controllers/memberController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, memberController.createMember);
router.get('/', authMiddleware, memberController.getAllMembers);
router.get('/:code', authMiddleware, memberController.getMember);
router.put('/:code', authMiddleware, memberController.updateMember);
router.delete('/:code', authMiddleware, memberController.deleteMember);

module.exports = router;
