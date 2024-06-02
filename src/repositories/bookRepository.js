const Book = require('../models/Book');

class BookRepository {
    static async save(book) {
        return book.save();
    }

    static async findAvailable() {
        return Book.find({ stock: { $gt: 0 } });
    }

    static async findByCode(code) {
        return Book.findOne({ code });
    }

    static async update(book) {
        return Book.findByIdAndUpdate(book._id, book, { new: true });
    }

    static async delete(id) {
        return Book.findByIdAndDelete(id);
    }
}

module.exports = BookRepository;
