const bookRepository = require('../repositories/bookRepository');
const Book = require('../models/Book');

class BookService {
    static async createBook(bookData) {
        try {
            if (!bookData.title || !bookData.author) {
                throw new Error('Incomplete book data');
            }

            const book = new Book(bookData);
            return await bookRepository.save(book);
        } catch (error) {
            throw new Error(`Failed to create book: ${error.message}`);
        }
    }

    static async getAllBooks() {
        try {
            return await bookRepository.findAvailable();
        } catch (error) {
            throw new Error(`Failed to retrieve books: ${error.message}`);
        }
    }

    static async getBook(code) {
        try {
            const book = await bookRepository.findByCode(code);
            if (!book) {
                throw new Error('Book not found');
            }
            return book;
        } catch (error) {
            throw new Error(`Failed to retrieve book: ${error.message}`);
        }
    }

    static async updateBook(code, bookData) {
        try {
            const book = await bookRepository.findByCode(code);
            if (!book) {
                throw new Error('Book not found');
            }
            Object.assign(book, bookData);
            return await bookRepository.update(book);
        } catch (error) {
            throw new Error(`Failed to update book: ${error.message}`);
        }
    }

    static async deleteBook(code) {
        try {
            const book = await bookRepository.findByCode(code);
            if (!book) {
                throw new Error('Book not found');
            }
            return await bookRepository.delete(book._id);
        } catch (error) {
            throw new Error(`Failed to delete book: ${error.message}`);
        }
    }
}

module.exports = BookService;
