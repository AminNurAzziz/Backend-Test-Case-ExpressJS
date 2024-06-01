const bookRepository = require('../repositories/bookRepository');

class BookService {
    async createBook(bookData) {
        const book = new Book(bookData);
        return bookRepository.save(book);
    }

    async getAllBooks() {
        return bookRepository.findAvailable();
    }

    async getBook(code) {
        const book = await bookRepository.findByCode(code);
        if (!book) {
            throw new Error('Book not found');
        }
        return book;
    }

    async updateBook(code, bookData) {
        const book = await bookRepository.findByCode(code);
        if (!book) {
            throw new Error('Book not found');
        }
        Object.assign(book, bookData);
        return bookRepository.update(book);
    }

    async deleteBook(code) {
        const book = await bookRepository.findByCode(code);
        if (!book) {
            throw new Error('Book not found');
        }
        return bookRepository.delete(book._id);
    }
}

module.exports = new BookService();
