const Book = require('../models/Book');

class BookRepository {
    async findAll() {
        return Book.find({});
    }

    async findAvailable() {
        const books = await Book.find({});
        const borrowedBooks = await Borrowing.find({ returnedAt: null }).populate('book');
        const borrowedBookCodes = borrowedBooks.map(b => b.book.code);

        return books.filter(book => !borrowedBookCodes.includes(book.code));
    }

    async findByCode(code) {
        return Book.findOne({ code });
    }

    async save(book) {
        return book.save();
    }

    async update(book) {
        return Book.findOneAndUpdate({ code: book.code }, book, { new: true });
    }
}

module.exports = new BookRepository();
