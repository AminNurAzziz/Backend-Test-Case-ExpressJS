class UpdateBookDTO {
    constructor({ title, author, stock }) {
        if (title !== undefined && typeof title !== 'string') {
            throw new Error('Title must be a string');
        }
        if (author !== undefined && typeof author !== 'string') {
            throw new Error('Author must be a string');
        }
        if (stock !== undefined && (typeof stock !== 'number' || stock < 0)) {
            throw new Error('Stock must be a non-negative number');
        }

        if (title !== undefined) {
            this.title = title;
        }
        if (author !== undefined) {
            this.author = author;
        }
        if (stock !== undefined) {
            this.stock = stock;
        }
    }
}

module.exports = UpdateBookDTO;
