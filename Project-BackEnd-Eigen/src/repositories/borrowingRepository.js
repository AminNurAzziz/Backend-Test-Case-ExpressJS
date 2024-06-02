const Borrowing = require('../models/Borrowing');

class BorrowingRepository {

    static async findAll() {
        return Borrowing.find();
    }


    static async save(borrowing) {
        return borrowing.save();
    }

    static async update(borrowing) {
        return Borrowing.findByIdAndUpdate(borrowing._id, borrowing, { new: true });
    }

    static async findActiveByMemberId(memberId) {
        return Borrowing.find({ member: memberId, returnedAt: { $exists: false } });
    }

    static async findActiveByBookCode(bookCode) {
        return Borrowing.findOne({ book: bookCode, returnedAt: { $exists: false } });
    }

    static async findActiveByMemberAndBook(memberId, bookCode) {
        return Borrowing.findOne({ member: memberId, book: bookCode, returnedAt: { $exists: false } });
    }
}



module.exports = BorrowingRepository;