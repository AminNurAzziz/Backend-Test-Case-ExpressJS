const bookService = require('../services/bookService');

class BookController {
    async createBook(req, res) {
        try {
            const book = await bookService.createBook(req.body);
            res.status(201).json(book);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getAllBooks(req, res) {
        try {
            const books = await bookService.getAllBooks();
            res.status(200).json(books);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getBook(req, res) {
        try {
            const book = await bookService.getBook(req.params.code);
            res.status(200).json(book);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    async updateBook(req, res) {
        try {
            const book = await bookService.updateBook(req.params.code, req.body);
            res.status(200).json(book);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async deleteBook(req, res) {
        try {
            await bookService.deleteBook(req.params.code);
            res.status(204).end();
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }
}

module.exports = new BookController();
