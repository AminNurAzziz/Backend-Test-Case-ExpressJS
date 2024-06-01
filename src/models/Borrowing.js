const mongoose = require('mongoose');

const borrowingSchema = new mongoose.Schema({
    member: { type: mongoose.Schema.Types.ObjectId, ref: 'Member' },
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
    borrowedAt: { type: Date, default: Date.now },
    returnedAt: Date,
    status: { type: String, default: 'borrowed' }
});

module.exports = mongoose.model('Borrowing', borrowingSchema);
