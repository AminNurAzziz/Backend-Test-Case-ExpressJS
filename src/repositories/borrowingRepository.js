const Borrowing = require('../models/Borrowing');

class BorrowingRepository {

    async findAll() {
        return Borrowing.find();
    }


    async save(borrowing) {
        return borrowing.save();
    }

    async update(borrowing) {
        return Borrowing.findByIdAndUpdate(borrowing._id, borrowing, { new: true });
    }

    async findActiveByMemberId(memberId) {
        return Borrowing.find({ member: memberId, returnedAt: { $exists: false } });
    }

    async findActiveByBookCode(bookCode) {
        return Borrowing.findOne({ book: bookCode, returnedAt: { $exists: false } });
    }

    async findActiveByMemberAndBook(memberId, bookCode) {
        return Borrowing.findOne({ member: memberId, book: bookCode, returnedAt: { $exists: false } });
    }
}

module.exports = new BorrowingRepository();
