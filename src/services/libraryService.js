const bookRepository = require('../repositories/bookRepository');
const memberRepository = require('../repositories/memberRepository');
const borrowingRepository = require('../repositories/borrowingRepository');

class LibraryService {
    async borrowBook(memberCode, bookCode) {
        const member = await memberRepository.findByCode(memberCode);
        if (!member) {
            throw new Error('Member not found');
        }

        const activeBorrowings = await borrowingRepository.findActiveByMemberId(member._id);
        if (activeBorrowings.length >= 2) {
            throw new Error('Member cannot borrow more than 2 books');
        }

        const activeBorrowing = await borrowingRepository.findActiveByBookId(bookCode);
        if (activeBorrowing) {
            throw new Error('Book is already borrowed by another member');
        }

        const book = await bookRepository.findByCode(bookCode);
        if (!book || book.stock <= 0) {
            throw new Error('Book is not available');
        }

        const borrowing = await borrowingRepository.save({
            member: member._id,
            book: book._id,
        });

        book.stock -= 1;
        await bookRepository.update(book);

        return borrowing;
    }

    async returnBook(memberCode, bookCode) {
        const member = await memberRepository.findByCode(memberCode);
        if (!member) {
            throw new Error('Member not found');
        }

        const book = await bookRepository.findByCode(bookCode);
        if (!book) {
            throw new Error('Book not found');
        }

        const borrowing = await borrowingRepository.findActiveByBookId(book._id);
        if (!borrowing || borrowing.member._id.toString() !== member._id.toString()) {
            throw new Error('Member did not borrow this book');
        }

        borrowing.returnedAt = new Date();
        await borrowingRepository.update(borrowing);

        book.stock += 1;
        await bookRepository.update(book);

        const borrowedAt = new Date(borrowing.borrowedAt);
        const now = new Date();
        const diffTime = Math.abs(now - borrowedAt);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays > 7) {
            member.penaltyEndDate = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000); // 3 days penalty
            await memberRepository.update(member);
        }

        return borrowing;
    }

    async getAllBooks() {
        return bookRepository.findAvailable();
    }

    async getAllMembers() {
        const members = await memberRepository.findAll();
        const borrowings = await borrowingRepository.findAll();
        const memberBorrowingMap = borrowings.reduce((acc, borrowing) => {
            acc[borrowing.member._id] = acc[borrowing.member._id] || [];
            if (!borrowing.returnedAt) acc[borrowing.member._id].push(borrowing.book);
            return acc;
        }, {});

        return members.map(member => ({
            ...member.toObject(),
            borrowedBooks: memberBorrowingMap[member._id] || [],
        }));
    }
}

module.exports = new LibraryService();