const borrowingService = require('../services/borrowingService');
const BorrowBookDTO = require('../dtos/borrowBookDTO');
class BorrowingController {
    static async borrowBook(req, res) {
        try {
            const borrowBookDTO = new BorrowBookDTO(req.body);
            const borrowing = await borrowingService.borrowBook(borrowBookDTO.memberCode, borrowBookDTO.bookCode);
            console.log(`[INFO] BorrowingController.borrowBook - Book borrowed` + borrowing);
            const formattedBorrowing = {
                memberCode: borrowing.member,
                bookCode: borrowing.book,
                borrowedDate: borrowing.borrowedAt,
                returnedDate: borrowing.returnedAt
            };
            console.log(`[INFO] BorrowingController.borrowBook - Book borrowed`);
            res.status(201).json({
                success: true,
                message: 'Book borrowed successfully',
                data: formattedBorrowing
            });
        } catch (error) {
            console.error(`[ERROR] BorrowingController.borrowBook - Error borrowing book:`, error);
            res.status(400).json({
                success: false,
                error: `Failed to borrow book: ${error.message}`
            });
        }
    }

    static async returnBook(req, res) {
        try {
            const borrowBookDTO = new BorrowBookDTO(req.body);
            const borrowing = await borrowingService.returnBook(borrowBookDTO.memberCode, borrowBookDTO.bookCode);
            console.log(`[INFO] BorrowingController.returnBook - Book returned` + borrowing);
            const formattedBorrowing = {
                memberCode: borrowing.member,
                bookCode: borrowing.book,
                borrowedDate: borrowing.borrowedAt,
                returnedDate: borrowing.returnedAt
            };
            console.log(`[INFO] BorrowingController.returnBook - Book returned`);
            res.status(200).json({
                success: true,
                message: 'Book returned successfully',
                data: formattedBorrowing
            });
        } catch (error) {
            console.error(`[ERROR] BorrowingController.returnBook - Error returning book:`, error);
            res.status(400).json({
                success: false,
                error: `Failed to return book: ${error.message}`
            });
        }
    }
}

module.exports = BorrowingController;
