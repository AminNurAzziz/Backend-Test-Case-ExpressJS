const Borrowing = require('../models/Borrowing');

class BorrowingRepository {
    async findAll() {
        return Borrowing.find({}).populate('member book');
    }

    async findActiveByMemberId(memberId) {
        return Borrowing.find({ member: memberId, returnedAt: null }).populate('book');
    }

    async findActiveByBookId(bookId) {
        return Borrowing.findOne({ book: bookId, returnedAt: null }).populate('member');
    }

    async findById(id) {
        return Borrowing.findById(id).populate('member book');
    }

    async save(borrowing) {
        return borrowing.save();
    }

    async update(borrowing) {
        return Borrowing.findByIdAndUpdate(borrowing._id, borrowing, { new: true });
    }
}

module.exports = new BorrowingRepository();
