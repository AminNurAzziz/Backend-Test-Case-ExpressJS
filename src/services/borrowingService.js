const Borrowing = require('../models/Borrowing');
const memberRepository = require('../repositories/memberRepository');
const bookRepository = require('../repositories/bookRepository');
const borrowingRepository = require('../repositories/borrowingRepository');

class BorrowingService {
    async borrowBook(memberCode, bookCode) {
        const member = await memberRepository.findByCode(memberCode);
        if (!member) {
            throw new Error('Member not found');
        }

        const activeBorrowings = await borrowingRepository.findActiveByMemberId(member._id);
        if (activeBorrowings.length >= 2) {
            throw new Error('Member cannot borrow more than 2 books');
        }

        if (member.penaltyEndDate && member.penaltyEndDate > new Date()) {
            throw new Error('Member has a penalty, cannot borrow book');
        }

        const book = await bookRepository.findByCode(bookCode);
        if (!book || book.stock <= 0) {
            throw new Error('Book is not available');
        }

        const activeBorrowing = await borrowingRepository.findActiveByBookCode(book._id);

        if (activeBorrowing) {
            throw new Error('Book is already borrowed by another member');
        }

        const borrowing = new Borrowing({
            member: member._id,
            book: book._id,
            borrowedAt: new Date(),
        });

        await borrowingRepository.save(borrowing);

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

        const borrowing = await borrowingRepository.findActiveByMemberAndBook(member._id, book._id);
        if (!borrowing) {
            throw new Error('This book was not borrowed by the member');
        }

        borrowing.returnedAt = new Date();
        await borrowingRepository.update(borrowing);

        // const book = await bookRepository.findByCode(bookCode);
        book.stock += 1;
        await bookRepository.update(book);

        const borrowingDuration = (borrowing.returnedAt - borrowing.borrowedAt) / (1000 * 60 * 60 * 24);
        if (borrowingDuration > 7) {
            member.penaltyEndDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
            await memberRepository.update(member);
        }

        return borrowing;
    }

    async checkBooks() {
        const books = await bookRepository.findAll();
        return books;
    }

    async checkMembers() {
        const members = await memberRepository.findAll();
        return members.map(member => ({
            ...member.toObject(),
            borrowedBooks: member.borrowedBooks.length,
        }));
    }
}

module.exports = new BorrowingService();
