const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/userRepository');
const User = require('../models/User');

class AuthService {
    static async register(userData) {
        const { username, password } = userData;
        try {
            const existingUser = await userRepository.findByUsername(username);
            if (existingUser) {
                throw new Error('Username already exists');
            }
            const user = new User({ username, password });
            return await userRepository.save(user);
        } catch (error) {
            throw new Error(`Registration failed: ${error.message}`);
        }
    }

    static async login(userData) {
        const { username, password } = userData;
        try {
            const user = await userRepository.findByUsername(username);
            if (!user || !(await user.matchPassword(password))) {
                throw new Error('Invalid username or password');
            }
            return AuthService.generateToken(user._id);
        } catch (error) {
            throw new Error(`Login failed: ${error.message}`);
        }
    }

    static generateToken(userId) {
        return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1d' });
    }

    static verifyToken(token) {
        return jwt.verify(token, process.env.JWT_SECRET);
    }
}

module.exports = AuthService;
