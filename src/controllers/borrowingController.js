const borrowingService = require('../services/borrowingService');

class BorrowingController {
    async borrowBook(req, res) {
        try {
            const borrowing = await borrowingService.borrowBook(req.body.memberCode, req.body.bookCode);
            res.status(201).json(borrowing);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async returnBook(req, res) {
        try {
            const borrowing = await borrowingService.returnBook(req.body.memberCode, req.body.bookCode);
            res.status(200).json(borrowing);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new BorrowingController();
