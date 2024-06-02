const BorrowingService = require('../src/services/borrowingService');
const memberRepository = require('../src/repositories/memberRepository');
const bookRepository = require('../src/repositories/bookRepository');
const borrowingRepository = require('../src/repositories/borrowingRepository');

jest.mock('../src/repositories/memberRepository', () => ({
    findByCode: jest.fn(),
    update: jest.fn(),
    findAll: jest.fn(),

}));

jest.mock('../src/repositories/bookRepository', () => ({
    findByCode: jest.fn(),
    update: jest.fn(),
    findAll: jest.fn(),


}));

jest.mock('../src/repositories/borrowingRepository', () => ({
    findActiveByMemberId: jest.fn(),
    findActiveByBookCode: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    findActiveByMemberAndBook: jest.fn(),
}));

describe('borrowBook', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should throw an error when member is not found', async () => {
        memberRepository.findByCode.mockResolvedValueOnce(null);

        await expect(BorrowingService.borrowBook('invalid-member', 'book-code')).rejects.toThrowError('Member not found');
        expect(memberRepository.findByCode).toHaveBeenCalledWith('invalid-member');
        expect(borrowingRepository.findActiveByMemberId).not.toHaveBeenCalled();
        expect(bookRepository.findByCode).not.toHaveBeenCalled();
    });

    test('should throw an error when member has more than 2 active borrowings', async () => {
        const mockMember = { _id: 'member-id', penaltyEndDate: null };
        memberRepository.findByCode.mockResolvedValueOnce(mockMember);
        borrowingRepository.findActiveByMemberId.mockResolvedValueOnce([{ _id: 'borrowing1' }, { _id: 'borrowing2' }]);

        await expect(BorrowingService.borrowBook('member-code', 'book-code')).rejects.toThrowError('Member cannot borrow more than 2 books');
        expect(memberRepository.findByCode).toHaveBeenCalledWith('member-code');
        expect(borrowingRepository.findActiveByMemberId).toHaveBeenCalledWith('member-id');
        expect(bookRepository.findByCode).not.toHaveBeenCalled();
    });

    test('should throw an error when member has a penalty', async () => {
        const mockMember = { _id: 'member-id', penaltyEndDate: new Date(Date.now() + 86400000) };
        memberRepository.findByCode.mockResolvedValueOnce(mockMember);
        borrowingRepository.findActiveByMemberId.mockResolvedValueOnce([]);

        await expect(BorrowingService.borrowBook('member-code', 'book-code')).rejects.toThrowError('Member has a penalty, cannot borrow book');
        expect(memberRepository.findByCode).toHaveBeenCalledWith('member-code');
        expect(borrowingRepository.findActiveByMemberId).toHaveBeenCalledWith('member-id');
        expect(bookRepository.findByCode).not.toHaveBeenCalled();
    });

    test('should throw an error when book is not available', async () => {
        const mockMember = { _id: 'member-id', penaltyEndDate: null };
        memberRepository.findByCode.mockResolvedValueOnce(mockMember);
        borrowingRepository.findActiveByMemberId.mockResolvedValueOnce([]);
        bookRepository.findByCode.mockResolvedValueOnce(null);

        await expect(BorrowingService.borrowBook('member-code', 'invalid-book-code')).rejects.toThrowError('Book is not available');
        expect(memberRepository.findByCode).toHaveBeenCalledWith('member-code');
        expect(borrowingRepository.findActiveByMemberId).toHaveBeenCalledWith('member-id');
        expect(bookRepository.findByCode).toHaveBeenCalledWith('invalid-book-code');
    });

    test('should throw an error when book is already borrowed by another member', async () => {
        const mockMember = { _id: 'member-id', penaltyEndDate: null };
        const mockBook = { _id: 'book-id', stock: 1 };
        memberRepository.findByCode.mockResolvedValueOnce(mockMember);
        borrowingRepository.findActiveByMemberId.mockResolvedValueOnce([]);
        bookRepository.findByCode.mockResolvedValueOnce(mockBook);
        borrowingRepository.findActiveByBookCode.mockResolvedValueOnce({ _id: 'active-borrowing' });

        await expect(BorrowingService.borrowBook('member-code', 'book-code')).rejects.toThrowError('Book is already borrowed by another member');
        expect(memberRepository.findByCode).toHaveBeenCalledWith('member-code');
        expect(borrowingRepository.findActiveByMemberId).toHaveBeenCalledWith('member-id');
        expect(bookRepository.findByCode).toHaveBeenCalledWith('book-code');
        expect(borrowingRepository.findActiveByBookCode).toHaveBeenCalledWith('book-id');
    });

    test('should borrow the book successfully', async () => {
        const mockMember = { _id: 'member-id', penaltyEndDate: null };
        const mockBook = { _id: 'book-id', stock: 1 };
        const mockBorrowing = {
            _id: 'borrow-id',
            member: 'member-id',
            book: 'book-id',
            borrowedAt: new Date(),
            status: 'borrowed'
        };

        memberRepository.findByCode.mockResolvedValueOnce(mockMember);
        borrowingRepository.findActiveByMemberId.mockResolvedValueOnce([]);
        bookRepository.findByCode.mockResolvedValueOnce(mockBook);
        borrowingRepository.findActiveByBookCode.mockResolvedValueOnce(null);
        borrowingRepository.save.mockImplementationOnce((borrowing) => ({ ...borrowing, _id: 'borrow-id', status: 'borrowed' }));
        bookRepository.update.mockResolvedValueOnce({ ...mockBook, stock: 0 });

        const borrowing = await BorrowingService.borrowBook('member-code', 'book-code');

        expect(memberRepository.findByCode).toHaveBeenCalledWith('member-code');
        expect(borrowingRepository.findActiveByMemberId).toHaveBeenCalledWith('member-id');
        expect(bookRepository.findByCode).toHaveBeenCalledWith('book-code');
        expect(borrowingRepository.findActiveByBookCode).toHaveBeenCalledWith('book-id');
        expect(borrowingRepository.save).toHaveBeenCalled();
        expect(bookRepository.update).toHaveBeenCalledWith({ ...mockBook, stock: 0 });
        expect(borrowing).toEqual(expect.objectContaining({
            status: 'borrowed',
        }));
    });
});

describe('returnBook', () => {
    test('should return the book successfully', async () => {
        const mockMember = { _id: 'member-id' };
        const mockBook = { _id: 'book-id' };
        const mockBorrowing = {
            _id: 'borrow-id',
            member: 'member-id',
            book: 'book-id',
            borrowedAt: new Date(),
            status: 'borrowed'
        };

        memberRepository.findByCode.mockResolvedValueOnce(mockMember);
        bookRepository.findByCode.mockResolvedValueOnce(mockBook);
        borrowingRepository.findActiveByMemberAndBook.mockResolvedValueOnce(mockBorrowing);
        borrowingRepository.update.mockResolvedValueOnce({ ...mockBorrowing, returnedAt: new Date(), status: 'returned' });

        const borrowing = await BorrowingService.returnBook('member-code', 'book-code');

        expect(memberRepository.findByCode).toHaveBeenCalledWith('member-code');
        expect(bookRepository.findByCode).toHaveBeenCalledWith('book-code');
        expect(borrowingRepository.findActiveByMemberAndBook).toHaveBeenCalledWith('member-id', 'book-id');
        expect(borrowingRepository.update).toHaveBeenCalledWith({ ...mockBorrowing, returnedAt: expect.any(Date) });
        expect(borrowing).toEqual(expect.objectContaining(
            {
                ...mockBorrowing, returnedAt: expect.any(Date)
            }));
    });
});


describe('checkBooks', () => {
    test('should return all books', async () => {
        const mockBooks = [{ _id: 'book1' }, { _id: 'book2' }];
        bookRepository.findAll.mockResolvedValueOnce(mockBooks);

        const result = await BorrowingService.checkBooks();

        expect(bookRepository.findAll).toHaveBeenCalledTimes(1);
        expect(result).toEqual(mockBooks);
    });
});

describe('checkMembers', () => {
    test('should return all members with borrowedBooks count', async () => {
        const mockMembers = [
            { _id: 'member1', borrowedBooks: ['book1', 'book2'] },
            { _id: 'member2', borrowedBooks: ['book3'] }
        ];

        memberRepository.findAll.mockResolvedValueOnce(mockMembers);

        const expected = mockMembers.map(member => ({
            _id: member._id,
            borrowedBooks: member.borrowedBooks.length,
        }));

        const result = await BorrowingService.checkMembers();

        expect(memberRepository.findAll).toHaveBeenCalledTimes(1);
        expect(result).toEqual(expected);
    });
});
