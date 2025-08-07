import { Request, Response } from 'express';
import { CavosAuth } from 'cavos-service-sdk';
import { ResponseHelper } from '../utils/responseHelper';
import { config } from '../utils/config';
import { 
  RegisterUserRequest, 
  LoginUserRequest, 
  DeleteUserRequest,
  CavosApiError 
} from '../types';

export class AuthController {
  /**
   * Register a new user
   * POST /api/auth/register
   */
  static async registerUser(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password, network = config.cavos.defaultNetwork }: RegisterUserRequest = req.body;

      // Validate required fields
      if (!email || !password) {
        return ResponseHelper.validationError(res, 'Email and password are required');
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return ResponseHelper.validationError(res, 'Invalid email format');
      }

      // Validate password strength (minimum 8 characters)
      if (password.length < 8) {
        return ResponseHelper.validationError(res, 'Password must be at least 8 characters long');
      }

      console.log(`Registering user: ${email} on network: ${network}`);

      // Call Cavos SDK to register user
      const cavosAuth = new CavosAuth(network, config.cavos.apiSecret);
      const result = await cavosAuth.signUp(
        email,
        password,
        config.cavos.apiSecret
      );

      console.log('Registration result:', result);

      // Extract the actual data from the Cavos SDK response
      const responseData = result.data || result;
      
      return ResponseHelper.success(
        res,
        responseData,
        'User registered successfully',
        201
      );

    } catch (error: any) {
      console.error('Registration error:', error);
      
      // Handle known Cavos API errors
      if (error.response?.data) {
        return ResponseHelper.error(
          res,
          error.response.data.message || 'Registration failed',
          error.response.status || 500,
          error.response.data
        );
      }

      return ResponseHelper.error(
        res,
        error.message || 'Internal server error during registration',
        500
      );
    }
  }

  /**
   * Login user
   * POST /api/auth/login
   */
  static async loginUser(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password }: LoginUserRequest = req.body;

      // Validate required fields
      if (!email || !password) {
        return ResponseHelper.validationError(res, 'Email and password are required');
      }

      console.log(`Logging in user: ${email}`);

      // Call Cavos SDK to login user
      const cavosAuth = new CavosAuth(config.cavos.defaultNetwork, config.cavos.apiSecret);
      const result = await cavosAuth.signIn(
        email,
        password,
        config.cavos.apiSecret
      );

      console.log('Login result:', result);

      // Extract the actual data from the Cavos SDK response
      const responseData = result.data || result;

      return ResponseHelper.success(
        res,
        responseData,
        'User logged in successfully'
      );

    } catch (error: any) {
      console.error('Login error:', error);
      
      // Handle known Cavos API errors
      if (error.response?.data) {
        return ResponseHelper.error(
          res,
          error.response.data.message || 'Login failed',
          error.response.status || 401,
          error.response.data
        );
      }

      return ResponseHelper.error(
        res,
        error.message || 'Internal server error during login',
        500
      );
    }
  }

  /**
   * Delete user
   * DELETE /api/auth/user/:user_id
   */
  static async deleteUser(req: Request, res: Response): Promise<Response> {
    try {
      const { user_id } = req.params;

      // Validate required fields
      if (!user_id) {
        return ResponseHelper.validationError(res, 'User ID is required');
      }

      console.log(`Deleting user: ${user_id}`);

      // Call Cavos SDK to delete user
      const cavosAuth = new CavosAuth(config.cavos.defaultNetwork, config.cavos.apiSecret);
      const result = await cavosAuth.deleteUser(
        user_id,
        config.cavos.apiSecret
      );

      console.log('Delete result:', result);

      // Extract the actual data from the Cavos SDK response
      const responseData = result.data || result;

      return ResponseHelper.success(
        res,
        responseData,
        'User deleted successfully'
      );

    } catch (error: any) {
      console.error('Delete user error:', error);
      
      // Handle known Cavos API errors
      if (error.response?.data) {
        return ResponseHelper.error(
          res,
          error.response.data.message || 'Delete user failed',
          error.response.status || 500,
          error.response.data
        );
      }

      return ResponseHelper.error(
        res,
        error.message || 'Internal server error during user deletion',
        500
      );
    }
  }

  /**
   * Refresh token
   * POST /api/auth/refresh
   */
  static async refreshToken(req: Request, res: Response): Promise<Response> {
    try {
      const { refreshToken } = req.body;

      // Validate required fields
      if (!refreshToken) {
        return ResponseHelper.validationError(res, 'Refresh token is required');
      }

      console.log('Refreshing token');

      // Call Cavos SDK to refresh token
      const cavosAuth = new CavosAuth(config.cavos.defaultNetwork, config.cavos.apiSecret);
      const result = await cavosAuth.refreshToken(
        refreshToken,
        config.cavos.defaultNetwork
      );

      console.log('Refresh token result:', result);

      // Extract the actual data from the Cavos SDK response
      const responseData = result.data || result;

      return ResponseHelper.success(
        res,
        responseData,
        'Token refreshed successfully'
      );

    } catch (error: any) {
      console.error('Refresh token error:', error);
      
      // Handle known Cavos API errors
      if (error.response?.data) {
        return ResponseHelper.error(
          res,
          error.response.data.message || 'Token refresh failed',
          error.response.status || 401,
          error.response.data
        );
      }

      return ResponseHelper.error(
        res,
        error.message || 'Internal server error during token refresh',
        500
      );
    }
  }
}