const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
    code: { type: String, unique: true },
    name: String,
    penaltyEndDate: { type: Date, default: null }
});

module.exports = mongoose.model('Member', memberSchema);
