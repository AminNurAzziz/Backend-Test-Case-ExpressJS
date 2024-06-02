const bookService = require('../services/bookService');
const CreateBookDTO = require('../dtos/createBookDTO');
const UpdateBookDTO = require('../dtos/updateBookDTO');

class BookController {
    static async createBook(req, res) {
        try {
            const createBookDTO = new CreateBookDTO(req.body);
            await bookService.createBook(createBookDTO);
            console.log(`[INFO] BookController.createBook - Book created`);
            res.status(201).json({ success: true, message: 'Book created successfully' });
        } catch (error) {
            console.error(`[ERROR] BookController.createBook - Error creating book:`, error);
            res.status(400).json({ success: false, error: `Failed to create book: ${error.message}` });
        }
    }

    static async getAllBooks(req, res) {
        try {
            const books = await bookService.getAllBooks();
            console.log(`[INFO] BookController.getAllBooks - All books retrieved`);
            const formattedBooks = books.map(book => {
                return {
                    code: book.code,
                    title: book.title,
                    author: book.author,
                    stock: book.stock
                };
            });
            res.status(200).json({ success: true, message: 'All books retrieved successfully', data: formattedBooks });
        } catch (error) {
            console.error(`[ERROR] BookController.getAllBooks - Error getting all books:`, error);
            res.status(500).json({ success: false, error: `Failed to retrieve books: ${error.message}` });
        }
    }

    static async getBook(req, res) {
        try {
            const book = await bookService.getBook(req.params.code);
            if (!book) {
                console.log(`[INFO] BookController.getBook - Book not found for code:`, req.params.code);
                return res.status(404).json({ success: false, error: `Book not found for code: ${req.params.code}` });
            }
            console.log(`[INFO] BookController.getBook - Book retrieved:`, book);
            const formattedBook = {
                code: book.code,
                title: book.title,
                author: book.author,
                stock: book.stock
            };

            res.status(200).json({ success: true, message: 'Book retrieved successfully', data: formattedBook });
        } catch (error) {
            console.error(`[ERROR] BookController.getBook - Error getting book:`, error);
            res.status(500).json({ success: false, error: `Failed to retrieve book: ${error.message}` });
        }
    }

    static async updateBook(req, res) {
        try {
            const updateBookDTO = new UpdateBookDTO(req.body);
            console.log(`[INFO] BookController.updateBook - Updating book for code:`, req.params.code);
            const book = await bookService.updateBook(req.params.code, updateBookDTO);
            console.log(`[INFO] BookController.updateBook - Book updated`);
            res.status(200).json({ success: true, message: 'Book updated successfully' });
        } catch (error) {
            console.error(`[ERROR] BookController.updateBook - Error updating book:`, error);
            res.status(400).json({ success: false, error: `Failed to update book: ${error.message}` });
        }
    }

    static async deleteBook(req, res) {
        try {
            await bookService.deleteBook(req.params.code);
            console.log(`[INFO] BookController.deleteBook - Book deleted for code:`, req.params.code);
            res.status(200).json({ success: true, message: 'Book deleted successfully' });
        } catch (error) {
            console.error(`[ERROR] BookController.deleteBook - Error deleting book:`, error);
            res.status(500).json({ success: false, error: `Failed to delete book: ${error.message}` });
        }
    }
}

module.exports = BookController;
