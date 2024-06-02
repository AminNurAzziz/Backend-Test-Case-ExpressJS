const authService = require('../services/authService');
const LoginDTO = require('../DTOs/loginDTO');
const RegisterDTO = require('../DTOs/registerDTO');

class AuthController {
    static async register(req, res) {
        try {
            const registerDTO = new RegisterDTO(req.body);
            const user = await authService.register(registerDTO);
            console.log(`[INFO] AuthController.register - User registered:`, user);
            res.status(201).json({
                success: true,
                message: 'User registered successfully',
                data: user
            });
        } catch (error) {
            console.error(`[ERROR] AuthController.register - Error registering user:`, error);
            res.status(400).json({
                success: false,
                error: `Failed to register user: ${error.message}`
            });
        }
    }

    static async login(req, res) {
        try {
            const loginDTO = new LoginDTO(req.body);
            const token = await authService.login(loginDTO);
            console.log(`[INFO] AuthController.login - User logged in`);
            res.status(200).json({
                success: true,
                message: 'User logged in successfully',
                data: { token }
            });
        } catch (error) {
            console.error(`[ERROR] AuthController.login - Error logging in:`, error);
            res.status(400).json({
                success: false,
                error: `Login failed: ${error.message}`
            });
        }
    }
}

module.exports = AuthController;
