const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/userRepository');
const User = require('../models/User');

class AuthService {
    async register(userData) {
        const { username, password } = userData;
        const existingUser = await userRepository.findByUsername(username);
        if (existingUser) {
            throw new Error('Username already exists');
        }
        const user = new User({ username, password });
        return userRepository.save(user);
    }

    async login(userData) {
        const { username, password } = userData;
        const user = await userRepository.findByUsername(username);
        if (!user || !(await user.matchPassword(password))) {
            throw new Error('Invalid username or password');
        }
        return this.generateToken(user._id);
    }

    generateToken(userId) {
        return jwt.sign({ id: userId }, 'your_jwt_secret', { expiresIn: '30d' });
    }

    verifyToken(token) {
        return jwt.verify(token, 'your_jwt_secret');
    }
}

module.exports = new AuthService();
