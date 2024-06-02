const BookService = require('../src/services/bookService');
const bookRepository = require('../src/repositories/bookRepository');

jest.mock('../src/repositories/bookRepository', () => ({
    save: jest.fn(),
    findByCode: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    findAvailable: jest.fn()
}));

describe('createBook', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should save the book and return it', async () => {
        const mockBookData = { title: 'Sample Book', author: 'Sample Author' };
        const mockSavedBook = { _id: '123', ...mockBookData };

        bookRepository.save.mockResolvedValueOnce(mockSavedBook);

        const createdBook = await BookService.createBook(mockBookData);

        expect(bookRepository.save).toHaveBeenCalledWith(expect.any(Object));
        expect(createdBook).toEqual(mockSavedBook);
    });
});

describe('getAllBooks', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should return available books', async () => {
        const mockAvailableBooks = [{ _id: '1', title: 'Book 1', author: 'Author 1' }, { _id: '2', title: 'Book 2', author: 'Author 2' }];

        bookRepository.findAvailable.mockResolvedValueOnce(mockAvailableBooks);

        const availableBooks = await BookService.getAllBooks();

        expect(bookRepository.findAvailable).toHaveBeenCalled();
        expect(availableBooks).toEqual(mockAvailableBooks);
    });

    test('should return an empty array if no books are available', async () => {
        bookRepository.findAvailable.mockResolvedValueOnce([]);

        const availableBooks = await BookService.getAllBooks();

        expect(bookRepository.findAvailable).toHaveBeenCalled();
        expect(availableBooks).toEqual([]);
    });
});


describe('getBook', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should return the book when given a valid code', async () => {
        const mockBook = { _id: '123', title: 'Sample Book', author: 'Sample Author' };

        bookRepository.findByCode.mockResolvedValueOnce(mockBook);

        const foundBook = await BookService.getBook('123');

        expect(bookRepository.findByCode).toHaveBeenCalledWith('123');
        expect(foundBook).toEqual(mockBook);
    });

    test('should throw an error if the book is not found', async () => {

        bookRepository.findByCode.mockResolvedValueOnce(null);

        await expect(BookService.getBook('123')).rejects.toThrow('Book not found');
    });
});

describe('updateBook', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should update and return the book when given a valid code', async () => {
        const mockBook = { _id: '123', title: 'Old Title', author: 'Old Author' };
        const updatedBookData = { title: 'New Title', author: 'New Author' };
        const mockUpdatedBook = { ...mockBook, ...updatedBookData };

        bookRepository.findByCode.mockResolvedValueOnce(mockBook);

        bookRepository.update.mockResolvedValueOnce(mockUpdatedBook);

        const updatedBook = await BookService.updateBook('123', updatedBookData);

        expect(bookRepository.findByCode).toHaveBeenCalledWith('123');
        expect(bookRepository.update).toHaveBeenCalledWith(mockUpdatedBook);
        expect(updatedBook).toEqual(mockUpdatedBook);
    });

    test('should throw an error when the book is not found', async () => {
        const updatedBookData = { title: 'New Title', author: 'New Author' };

        bookRepository.findByCode.mockResolvedValueOnce(null);

        await expect(BookService.updateBook('invalid-code', updatedBookData)).rejects.toThrowError('Book not found');
        expect(bookRepository.findByCode).toHaveBeenCalledWith('invalid-code');
        expect(bookRepository.update).not.toHaveBeenCalled();
    });
});

describe('deleteBook', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should delete the book when given a valid code', async () => {
        const mockBook = { _id: '123', title: 'Sample Book', author: 'Sample Author' };


        bookRepository.findByCode.mockResolvedValueOnce(mockBook);

        bookRepository.delete.mockResolvedValueOnce(true);

        const result = await BookService.deleteBook('123');

        expect(bookRepository.findByCode).toHaveBeenCalledWith('123');
        expect(bookRepository.delete).toHaveBeenCalledWith('123');
        expect(result).toBe(true);
    });

    test('should throw an error when the book is not found', async () => {

        bookRepository.findByCode.mockResolvedValueOnce(null);

        await expect(BookService.deleteBook('invalid-code')).rejects.toThrowError('Book not found');
        expect(bookRepository.findByCode).toHaveBeenCalledWith('invalid-code');
        expect(bookRepository.delete).not.toHaveBeenCalled();
    });
});