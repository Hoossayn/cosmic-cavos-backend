import { Router } from 'express';
import { WalletController } from '../controllers/walletController';

const router = Router();

/**
 * @route   POST /api/wallet/deploy
 * @desc    Deploy a new wallet
 * @access  Public (should be protected in production)
 * @body    { network?: string }
 */
router.post('/deploy', WalletController.deployWallet);

/**
 * @route   GET /api/wallet/balance
 * @desc    Get wallet balance for a specific token
 * @access  Public (should be protected in production)
 * @query   address: string, tokenAddress: string, decimals?: number
 */
router.get('/balance', WalletController.getBalance);

/**
 * @route   POST /api/wallet/execute-calls
 * @desc    Execute transaction calls
 * @access  Public (should be protected in production)
 * @body    { network?: string, calls: TransactionCall[], address: string, hashedPk: string }
 */
router.post('/execute-calls', WalletController.executeCalls);

/**
 * @route   POST /api/wallet/format-amount
 * @desc    Format amount for blockchain transactions
 * @access  Public
 * @body    { amount: string | number, decimals?: number }
 */
router.post('/format-amount', WalletController.formatAmount);

/**
 * @route   GET /api/wallet/info/:address
 * @desc    Get wallet information
 * @access  Public
 * @params  address: string
 */
router.get('/info/:address', WalletController.getWalletInfo);

export default router;