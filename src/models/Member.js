const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
    code: { type: String, unique: true },
    name: String,
});

module.exports = mongoose.model('Member', memberSchema);
