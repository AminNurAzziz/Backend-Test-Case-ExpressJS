class BorrowBookDTO {
    constructor({ memberCode, bookCode }) {
        if (!memberCode || typeof memberCode !== 'string') {
            throw new Error('Member code is required and must be a string');
        }
        if (!bookCode || typeof bookCode !== 'string') {
            throw new Error('Book code is required and must be a string');
        }

        this.memberCode = memberCode;
        this.bookCode = bookCode;
    }
}

module.exports = BorrowBookDTO;
