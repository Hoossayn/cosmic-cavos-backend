import { Request, Response } from 'express';
import { CavosAuth, formatAmount } from 'cavos-service-sdk';
import { ResponseHelper } from '../utils/responseHelper';
import { config } from '../utils/config';
import { COSMIC_TRADER_CONFIG, getFunctionSelector, toFelt252, tradeDirectionToFelt, formatAddress } from '../utils/starknet';

export class CosmicTraderController {
  
  /**
   * Register user on Cosmic Trader contract
   * POST /api/cosmic-trader/register
   */
  static async registerUser(req: Request, res: Response): Promise<Response> {
    try {
      const { address } = req.body;
      const authHeader = req.headers.authorization || '';
      const accessToken = req.body.accessToken || (authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '');

      if (!address || !accessToken) {
        return ResponseHelper.validationError(res, 'Wallet address and accessToken are required');
      }

      const calls = [{
        contractAddress: COSMIC_TRADER_CONFIG.CONTRACT_ADDRESS,
        entrypoint: COSMIC_TRADER_CONFIG.SELECTORS.REGISTER_USER,
        calldata: []
      }];

      const cavosAuth = new CavosAuth(config.cavos.defaultNetwork, config.cavos.appId);
      const result = await cavosAuth.executeCalls(
        formatAddress(address),
        calls,
        accessToken
      );

      const responseData = result.data || result;
      return ResponseHelper.success(res, responseData, 'User registered successfully');

    } catch (error: any) {
      console.error('Register user error:', error);
      return ResponseHelper.error(res, error.message || 'Failed to register user', 500);
    }
  }

  /**
   * Start a mock trading session
   * POST /api/cosmic-trader/start-mock-session
   */
  static async startMockSession(req: Request, res: Response): Promise<Response> {
    try {
      const { address } = req.body;
      const authHeader = req.headers.authorization || '';
      const accessToken = req.body.accessToken || (authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '');

      if (!address || !accessToken) {
        return ResponseHelper.validationError(res, 'Wallet address and accessToken are required');
      }

      const calls = [{
        contractAddress: COSMIC_TRADER_CONFIG.CONTRACT_ADDRESS,
        entrypoint: 'start_mock_session',
        calldata: []
      }];

      const cavosAuth = new CavosAuth(config.cavos.defaultNetwork, config.cavos.appId);
      const result = await cavosAuth.executeCalls(
        formatAddress(address),
        calls,
        accessToken
      );

      const responseData = result.data || result;
      return ResponseHelper.success(res, responseData, 'Mock session started successfully');

    } catch (error: any) {
      console.error('Start mock session error:', error);
      return ResponseHelper.error(res, error.message || 'Failed to start mock session', 500);
    }
  }

  /**
   * Place a mock trade
   * POST /api/cosmic-trader/place-mock-trade
   */
  static async placeMockTrade(req: Request, res: Response): Promise<Response> {
    try {
      const { address, asset, amount, direction, price } = req.body;
      const authHeader = req.headers.authorization || '';
      const accessToken = req.body.accessToken || (authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '');

      if (!address || !accessToken || !asset || !amount || !direction || !price) {
        return ResponseHelper.validationError(res, 'address, accessToken, asset, amount, direction, and price are required');
      }

      if (!['Long', 'Short'].includes(direction)) {
        return ResponseHelper.validationError(res, 'direction must be either "Long" or "Short"');
      }

      // Format amount and price using Cavos SDK
      const formattedAmount = await formatAmount(amount.toString(), 18);
      const formattedPrice = await formatAmount(price.toString(), 18);

      const calls = [{
        contractAddress: COSMIC_TRADER_CONFIG.CONTRACT_ADDRESS,
        entrypoint: 'place_mock_trade',
        calldata: [
          toFelt252(asset),
          String(formattedAmount.uint256.low),
          String(formattedAmount.uint256.high),
          tradeDirectionToFelt(direction),
          String(formattedPrice.uint256.low),
          String(formattedPrice.uint256.high)
        ]
      }];

      const cavosAuth = new CavosAuth(config.cavos.defaultNetwork, config.cavos.appId);
      const result = await cavosAuth.executeCalls(
        formatAddress(address),
        calls,
        accessToken
      );

      const responseData = result.data || result;
      return ResponseHelper.success(res, responseData, 'Mock trade placed successfully');

    } catch (error: any) {
      console.error('Place mock trade error:', error);
      return ResponseHelper.error(res, error.message || 'Failed to place mock trade', 500);
    }
  }

  /**
   * Close a mock trade
   * POST /api/cosmic-trader/close-mock-trade
   */
  static async closeMockTrade(req: Request, res: Response): Promise<Response> {
    try {
      const { address, tradeId, exitPrice } = req.body;
      const authHeader = req.headers.authorization || '';
      const accessToken = req.body.accessToken || (authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '');

      if (!address || !accessToken || tradeId === undefined || tradeId === null || !exitPrice) {
        return ResponseHelper.validationError(res, 'address, accessToken, tradeId, and exitPrice are required');
      }

      // Format exit price using Cavos SDK
      const formattedExitPrice = await formatAmount(exitPrice.toString(), 18);

      const calls = [{
        contractAddress: COSMIC_TRADER_CONFIG.CONTRACT_ADDRESS,
        entrypoint: 'close_mock_trade',
        calldata: [
          String(tradeId),
          String(formattedExitPrice.uint256.low),
          String(formattedExitPrice.uint256.high)
        ]
      }];

      const cavosAuth = new CavosAuth(config.cavos.defaultNetwork, config.cavos.appId);
      const result = await cavosAuth.executeCalls(
        formatAddress(address),
        calls,
        accessToken
      );

      const responseData = result.data || result;
      return ResponseHelper.success(res, responseData, 'Mock trade closed successfully');

    } catch (error: any) {
      console.error('Close mock trade error:', error);
      return ResponseHelper.error(res, error.message || 'Failed to close mock trade', 500);
    }
  }

  /**
   * Place a real trade
   * POST /api/cosmic-trader/place-real-trade
   */
  static async placeRealTrade(req: Request, res: Response): Promise<Response> {
    try {
      const { address, asset, amount, direction, price } = req.body;
      const authHeader = req.headers.authorization || '';
      const accessToken = req.body.accessToken || (authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '');

      if (!address || !accessToken || !asset || !amount || !direction || !price) {
        return ResponseHelper.validationError(res, 'address, accessToken, asset, amount, direction, and price are required');
      }

      if (!['Long', 'Short'].includes(direction)) {
        return ResponseHelper.validationError(res, 'direction must be either "Long" or "Short"');
      }

      // Format amount and price using Cavos SDK
      const formattedAmount = await formatAmount(amount.toString(), 18);
      const formattedPrice = await formatAmount(price.toString(), 18);

      const calls = [{
        contractAddress: COSMIC_TRADER_CONFIG.CONTRACT_ADDRESS,
        entrypoint: 'place_real_trade',
        calldata: [
          toFelt252(asset),
          String(formattedAmount.uint256.low),
          String(formattedAmount.uint256.high),
          tradeDirectionToFelt(direction),
          String(formattedPrice.uint256.low),
          String(formattedPrice.uint256.high)
        ]
      }];

      const cavosAuth = new CavosAuth(config.cavos.defaultNetwork, config.cavos.appId);
      const result = await cavosAuth.executeCalls(
        formatAddress(address),
        calls,
        accessToken
      );

      const responseData = result.data || result;
      return ResponseHelper.success(res, responseData, 'Real trade placed successfully');

    } catch (error: any) {
      console.error('Place real trade error:', error);
      return ResponseHelper.error(res, error.message || 'Failed to place real trade', 500);
    }
  }

  /**
   * Add XP to a user
   * POST /api/cosmic-trader/add-xp
   */
  static async addXP(req: Request, res: Response): Promise<Response> {
    try {
      const { address, targetUser, amount } = req.body;
      const authHeader = req.headers.authorization || '';
      const accessToken = req.body.accessToken || (authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '');

      if (!address || !accessToken || !targetUser || !amount) {
        return ResponseHelper.validationError(res, 'address, accessToken, targetUser, and amount are required');
      }

      // Format XP amount
      const formattedAmount = await formatAmount(amount.toString(), 18);

      const calls = [{
        contractAddress: COSMIC_TRADER_CONFIG.CONTRACT_ADDRESS,
        entrypoint: 'add_xp',
        calldata: [
          formatAddress(targetUser),
          String(formattedAmount.uint256.low),
          String(formattedAmount.uint256.high)
        ]
      }];

      const cavosAuth = new CavosAuth(config.cavos.defaultNetwork, config.cavos.appId);
      const result = await cavosAuth.executeCalls(
        formatAddress(address),
        calls,
        accessToken
      );

      const responseData = result.data || result;
      return ResponseHelper.success(res, responseData, 'XP added successfully');

    } catch (error: any) {
      console.error('Add XP error:', error);
      return ResponseHelper.error(res, error.message || 'Failed to add XP', 500);
    }
  }

  /**
   * Update user streak
   * POST /api/cosmic-trader/update-streak
   */
  static async updateStreak(req: Request, res: Response): Promise<Response> {
    try {
      const { address, targetUser } = req.body;
      const authHeader = req.headers.authorization || '';
      const accessToken = req.body.accessToken || (authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '');

      if (!address || !accessToken || !targetUser) {
        return ResponseHelper.validationError(res, 'address, accessToken, and targetUser are required');
      }

      const calls = [{
        contractAddress: COSMIC_TRADER_CONFIG.CONTRACT_ADDRESS,
        entrypoint: 'update_streak',
        calldata: [formatAddress(targetUser)]
      }];

      const cavosAuth = new CavosAuth(config.cavos.defaultNetwork, config.cavos.appId);
      const result = await cavosAuth.executeCalls(
        formatAddress(address),
        calls,
        accessToken
      );

      const responseData = result.data || result;
      return ResponseHelper.success(res, responseData, 'Streak updated successfully');

    } catch (error: any) {
      console.error('Update streak error:', error);
      return ResponseHelper.error(res, error.message || 'Failed to update streak', 500);
    }
  }

  /**
   * Update trading stats
   * POST /api/cosmic-trader/update-trading-stats
   */
  static async updateTradingStats(req: Request, res: Response): Promise<Response> {
    try {
      const { address, targetUser, volume } = req.body;
      const authHeader = req.headers.authorization || '';
      const accessToken = req.body.accessToken || (authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '');

      if (!address || !accessToken || !targetUser || !volume) {
        return ResponseHelper.validationError(res, 'address, accessToken, targetUser, and volume are required');
      }

      // Format volume
      const formattedVolume = await formatAmount(volume.toString(), 18);

      const calls = [{
        contractAddress: COSMIC_TRADER_CONFIG.CONTRACT_ADDRESS,
        entrypoint: 'update_trading_stats',
        calldata: [
          formatAddress(targetUser),
          String(formattedVolume.uint256.low),
          String(formattedVolume.uint256.high)
        ]
      }];

      const cavosAuth = new CavosAuth(config.cavos.defaultNetwork, config.cavos.appId);
      const result = await cavosAuth.executeCalls(
        formatAddress(address),
        calls,
        accessToken
      );

      const responseData = result.data || result;
      return ResponseHelper.success(res, responseData, 'Trading stats updated successfully');

    } catch (error: any) {
      console.error('Update trading stats error:', error);
      return ResponseHelper.error(res, error.message || 'Failed to update trading stats', 500);
    }
  }

  /**
   * End mock session
   * POST /api/cosmic-trader/end-mock-session
   */
  static async endMockSession(req: Request, res: Response): Promise<Response> {
    try {
      const { address, sessionId } = req.body;
      const authHeader = req.headers.authorization || '';
      const accessToken = req.body.accessToken || (authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '');

      if (!address || !accessToken || sessionId === undefined || sessionId === null) {
        return ResponseHelper.validationError(res, 'address, accessToken, and sessionId are required');
      }

      const calls = [{
        contractAddress: COSMIC_TRADER_CONFIG.CONTRACT_ADDRESS,
        entrypoint: 'end_mock_session',
        calldata: [String(sessionId)]
      }];

      const cavosAuth = new CavosAuth(config.cavos.defaultNetwork, config.cavos.appId);
      const result = await cavosAuth.executeCalls(
        formatAddress(address),
        calls,
        accessToken
      );

      const responseData = result.data || result;
      return ResponseHelper.success(res, responseData, 'Mock session ended successfully');

    } catch (error: any) {
      console.error('End mock session error:', error);
      return ResponseHelper.error(res, error.message || 'Failed to end mock session', 500);
    }
  }

  /**
   * Get contract information
   * GET /api/cosmic-trader/contract-info
   */
  static async getContractInfo(req: Request, res: Response): Promise<Response> {
    try {
      const contractInfo = {
        contractAddress: COSMIC_TRADER_CONFIG.CONTRACT_ADDRESS,
        classHash: COSMIC_TRADER_CONFIG.CLASS_HASH,
        network: config.cavos.defaultNetwork,
        availableFunctions: {
          userManagement: [
            'register_user',
            'get_user_profile',
            'is_user_registered',
            'add_xp',
            'update_streak',
            'update_trading_stats'
          ],
          trading: [
            'start_mock_session',
            'place_mock_trade',
            'close_mock_trade',
            'end_mock_session',
            'place_real_trade',
            'close_real_trade'
          ],
          views: [
            'get_trade',
            'get_user_trades',
            'get_active_trades',
            'get_streak_info',
            'get_total_users',
            'get_total_trades'
          ]
        },
        functionSelectors: COSMIC_TRADER_CONFIG.SELECTORS,
        // Debug info
        debugInfo: {
          registerUserSelector: getFunctionSelector('register_user'),
          registerUserCall: {
            to: COSMIC_TRADER_CONFIG.CONTRACT_ADDRESS,
            selector: getFunctionSelector('register_user'),
            calldata: []
          }
        }
      };

      return ResponseHelper.success(res, contractInfo, 'Contract information retrieved successfully');

    } catch (error: any) {
      console.error('Get contract info error:', error);
      return ResponseHelper.error(res, error.message || 'Failed to get contract info', 500);
    }
  }
}