import { Router } from 'express';
import { AuthController } from '../controllers/authController';

const router = Router();

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 * @body    { email: string, password: string, network?: string }
 */
router.post('/register', AuthController.registerUser);

/**
 * @route   POST /api/auth/login
 * @desc    Login user
 * @access  Public
 * @body    { email: string, password: string }
 */
router.post('/login', AuthController.loginUser);

/**
 * @route   DELETE /api/auth/user/:user_id
 * @desc    Delete user
 * @access  Public (should be protected in production)
 * @params  user_id: string
 */
router.delete('/user/:user_id', AuthController.deleteUser);

/**
 * @route   POST /api/auth/refresh
 * @desc    Refresh access token
 * @access  Public
 * @body    { refreshToken: string }
 */
router.post('/refresh', AuthController.refreshToken);

export default router;