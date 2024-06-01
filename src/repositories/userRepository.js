const User = require('../models/User');

class UserRepository {
    async save(user) {
        return user.save();
    }

    async findByUsername(username) {
        return User.findOne({ username });
    }
}

module.exports = new UserRepository();
