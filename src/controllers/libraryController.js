const libraryService = require('../services/libraryService');

class LibraryController {
    async borrowBook(req, res) {
        try {
            const { memberCode, bookCode } = req.body;
            const borrowing = await libraryService.borrowBook(memberCode, bookCode);
            res.status(200).json(borrowing);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async returnBook(req, res) {
        try {
            const { memberCode, bookCode } = req.body;
            const borrowing = await libraryService.returnBook(memberCode, bookCode);
            res.status(200).json(borrowing);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getAllBooks(req, res) {
        try {
            const books = await libraryService.getAllBooks();
            res.status(200).json(books);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getAllMembers(req, res) {
        try {
            const members = await libraryService.getAllMembers();
            res.status(200).json(members);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new LibraryController();
