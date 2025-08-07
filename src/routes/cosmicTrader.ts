import { Router } from 'express';
import { CosmicTraderController } from '../controllers/cosmicTraderController';

const router = Router();

/**
 * @route   GET /api/cosmic-trader/contract-info
 * @desc    Get contract information and available functions
 * @access  Public
 */
router.get('/contract-info', CosmicTraderController.getContractInfo);

/**
 * USER MANAGEMENT ENDPOINTS
 */

/**
 * @route   POST /api/cosmic-trader/register
 * @desc    Register user on Cosmic Trader contract
 * @access  Public
 * @body    { address: string }
 */
router.post('/register', CosmicTraderController.registerUser);

/**
 * @route   POST /api/cosmic-trader/add-xp
 * @desc    Add XP to a user (admin function)
 * @access  Public
 * @body    { address: string, targetUser: string, amount: number }
 */
router.post('/add-xp', CosmicTraderController.addXP);

/**
 * @route   POST /api/cosmic-trader/update-streak
 * @desc    Update user streak
 * @access  Public
 * @body    { address: string, targetUser: string }
 */
router.post('/update-streak', CosmicTraderController.updateStreak);

/**
 * @route   POST /api/cosmic-trader/update-trading-stats
 * @desc    Update user trading statistics
 * @access  Public
 * @body    { address: string, targetUser: string, volume: number }
 */
router.post('/update-trading-stats', CosmicTraderController.updateTradingStats);

/**
 * MOCK TRADING ENDPOINTS
 */

/**
 * @route   POST /api/cosmic-trader/start-mock-session
 * @desc    Start a mock trading session
 * @access  Public
 * @body    { address: string }
 */
router.post('/start-mock-session', CosmicTraderController.startMockSession);

/**
 * @route   POST /api/cosmic-trader/place-mock-trade
 * @desc    Place a mock trade
 * @access  Public
 * @body    { address: string, asset: string, amount: number, direction: "Long"|"Short", price: number }
 */
router.post('/place-mock-trade', CosmicTraderController.placeMockTrade);

/**
 * @route   POST /api/cosmic-trader/close-mock-trade
 * @desc    Close a mock trade
 * @access  Public
 * @body    { address: string, tradeId: number, exitPrice: number }
 */
router.post('/close-mock-trade', CosmicTraderController.closeMockTrade);

/**
 * @route   POST /api/cosmic-trader/end-mock-session
 * @desc    End a mock trading session
 * @access  Public
 * @body    { address: string, sessionId: number }
 */
router.post('/end-mock-session', CosmicTraderController.endMockSession);

/**
 * REAL TRADING ENDPOINTS
 */

/**
 * @route   POST /api/cosmic-trader/place-real-trade
 * @desc    Place a real trade
 * @access  Public
 * @body    { address: string, asset: string, amount: number, direction: "Long"|"Short", price: number }
 */
router.post('/place-real-trade', CosmicTraderController.placeRealTrade);

export default router;