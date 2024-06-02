const User = require('../models/User');

class UserRepository {
    static async save(user) {
        return user.save();
    }

    static async findByUsername(username) {
        return User.findOne({ username });
    }
}

module.exports = UserRepository;
