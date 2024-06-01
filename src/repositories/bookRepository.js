const Book = require('../models/Book');

class BookRepository {
    async save(book) {
        return book.save();
    }

    async findAvailable() {
        return Book.find({ stock: { $gt: 0 } });
    }

    async findByCode(code) {
        return Book.findOne({ code });
    }

    async update(book) {
        return Book.findByIdAndUpdate(book._id, book, { new: true });
    }

    async delete(id) {
        return Book.findByIdAndDelete(id);
    }
}

module.exports = new BookRepository();
