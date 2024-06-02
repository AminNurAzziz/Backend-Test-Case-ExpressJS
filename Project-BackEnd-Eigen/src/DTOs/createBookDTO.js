class CreateBookDTO {
    constructor({ code, title, author, stock }) {
        if (!code || typeof code !== 'string') {
            throw new Error('Code is required and must be a string');
        }
        if (!title || typeof title !== 'string') {
            throw new Error('Title is required and must be a string');
        }
        if (!author || typeof author !== 'string') {
            throw new Error('Author is required and must be a string');
        }
        if (typeof stock !== 'number' || stock < 0) {
            throw new Error('Stock must be a non-negative number');
        }

        this.code = code;
        this.title = title;
        this.author = author;
        this.stock = stock;
    }
}

module.exports = CreateBookDTO;
