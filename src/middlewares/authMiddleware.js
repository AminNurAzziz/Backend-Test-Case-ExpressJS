const authService = require('../services/authService');

const authMiddleware = (req, res, next) => {
    if (process.env.NODE_ENV === 'development') {
        return next();
    }
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ error: 'No token, authorization denied' });
    }
    try {
        const decoded = authService.verifyToken(token);
        req.user = decoded.id;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Token is not valid' });
    }
};

module.exports = authMiddleware;
