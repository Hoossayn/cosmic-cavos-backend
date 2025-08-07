import { Request, Response } from 'express';
import { deployWallet, getBalanceOf, formatAmount, executeCalls } from 'cavos-service-sdk';
import { ResponseHelper } from '../utils/responseHelper';
import { config } from '../utils/config';
import { 
  DeployWalletRequest,
  GetBalanceRequest,
  ExecuteCallsRequest,
  FormatAmountRequest,
  CavosApiError 
} from '../types';

export class WalletController {
  /**
   * Deploy a new wallet
   * POST /api/wallet/deploy
   */
  static async deployWallet(req: Request, res: Response): Promise<Response> {
    try {
      const { network = config.cavos.defaultNetwork }: DeployWalletRequest = req.body;

      console.log(`Deploying wallet on network: ${network}`);

      // Call Cavos SDK to deploy wallet
      const result = await deployWallet(network, config.cavos.apiSecret);

      console.log('Deploy wallet result:', result);

      // Extract the actual data from the Cavos SDK response
      const responseData = result.data || result;

      return ResponseHelper.success(
        res,
        responseData,
        'Wallet deployed successfully',
        201
      );

    } catch (error: any) {
      console.error('Deploy wallet error:', error);
      
      // Handle known Cavos API errors
      if (error.response?.data) {
        return ResponseHelper.error(
          res,
          error.response.data.message || 'Wallet deployment failed',
          error.response.status || 500,
          error.response.data
        );
      }

      return ResponseHelper.error(
        res,
        error.message || 'Internal server error during wallet deployment',
        500
      );
    }
  }

  /**
   * Get wallet balance
   * GET /api/wallet/balance
   */
  static async getBalance(req: Request, res: Response): Promise<Response> {
    try {
      const { 
        address, 
        tokenAddress, 
        decimals = 18 
      }: GetBalanceRequest = req.query as any;

      // Validate required fields
      if (!address || !tokenAddress) {
        return ResponseHelper.validationError(
          res, 
          'Address and tokenAddress are required'
        );
      }

      console.log(`Getting balance for address: ${address}, token: ${tokenAddress}`);

      // Call Cavos SDK to get balance
      const result = await getBalanceOf(
        address,
        tokenAddress,
        decimals.toString(),
        config.cavos.apiSecret
      );

      console.log('Get balance result:', result);

      // Extract the actual data from the Cavos SDK response
      const responseData = result.data || result;

      return ResponseHelper.success(
        res,
        responseData,
        'Balance retrieved successfully'
      );

    } catch (error: any) {
      console.error('Get balance error:', error);
      
      // Handle known Cavos API errors
      if (error.response?.data) {
        return ResponseHelper.error(
          res,
          error.response.data.message || 'Failed to get balance',
          error.response.status || 500,
          error.response.data
        );
      }

      return ResponseHelper.error(
        res,
        error.message || 'Internal server error while getting balance',
        500
      );
    }
  }

  /**
   * Execute transaction calls
   * POST /api/wallet/execute-calls
   */
  static async executeCalls(req: Request, res: Response): Promise<Response> {
    try {
      const { 
        network = config.cavos.defaultNetwork,
        calls,
        address,
        hashedPk
      }: ExecuteCallsRequest = req.body;

      // Validate required fields
      if (!calls || !address || !hashedPk) {
        return ResponseHelper.validationError(
          res, 
          'calls, address, and hashedPk are required'
        );
      }

      // Validate calls array
      if (!Array.isArray(calls) || calls.length === 0) {
        return ResponseHelper.validationError(
          res, 
          'calls must be a non-empty array'
        );
      }

      // Validate each call in the array
      for (const call of calls) {
        if (!call.to || !call.selector || !Array.isArray(call.calldata)) {
          return ResponseHelper.validationError(
            res,
            'Each call must have "to", "selector", and "calldata" fields'
          );
        }
      }

      console.log(`Executing ${calls.length} calls for address: ${address} on network: ${network}`);

      // Call Cavos SDK to execute calls
      const result = await executeCalls(
        network,
        calls,
        address,
        config.cavos.apiSecret
      );

      console.log('Execute calls result:', result);

      // Extract the actual data from the Cavos SDK response
      const responseData = result.data || result;

      return ResponseHelper.success(
        res,
        responseData,
        'Transaction calls executed successfully'
      );

    } catch (error: any) {
      console.error('Execute calls error:', error);
      
      // Handle known Cavos API errors
      if (error.response?.data) {
        return ResponseHelper.error(
          res,
          error.response.data.message || 'Failed to execute calls',
          error.response.status || 500,
          error.response.data
        );
      }

      return ResponseHelper.error(
        res,
        error.message || 'Internal server error while executing calls',
        500
      );
    }
  }

  /**
   * Format amount for blockchain transactions
   * POST /api/wallet/format-amount
   */
  static async formatAmount(req: Request, res: Response): Promise<Response> {
    try {
      const { amount, decimals = 18 }: FormatAmountRequest = req.body;

      // Validate required fields
      if (amount === undefined || amount === null) {
        return ResponseHelper.validationError(res, 'Amount is required');
      }

      console.log(`Formatting amount: ${amount} with decimals: ${decimals}`);

      // Call Cavos SDK to format amount
      const result = await formatAmount(amount, decimals);

      console.log('Format amount result:', result);

      // The formatAmount function returns the data directly, not wrapped
      return ResponseHelper.success(
        res,
        result,
        'Amount formatted successfully'
      );

    } catch (error: any) {
      console.error('Format amount error:', error);
      
      return ResponseHelper.error(
        res,
        error.message || 'Internal server error while formatting amount',
        500
      );
    }
  }

  /**
   * Get wallet info (custom endpoint to demonstrate additional functionality)
   * GET /api/wallet/info/:address
   */
  static async getWalletInfo(req: Request, res: Response): Promise<Response> {
    try {
      const { address } = req.params;

      // Validate required fields
      if (!address) {
        return ResponseHelper.validationError(res, 'Wallet address is required');
      }

      console.log(`Getting wallet info for address: ${address}`);

      // This is a placeholder - you could extend this to get comprehensive wallet info
      // For now, we'll return basic address validation and format
      const walletInfo = {
        address,
        isValid: address.length === 66 && address.startsWith('0x'),
        network: config.cavos.defaultNetwork,
        timestamp: new Date().toISOString()
      };

      return ResponseHelper.success(
        res,
        walletInfo,
        'Wallet info retrieved successfully'
      );

    } catch (error: any) {
      console.error('Get wallet info error:', error);
      
      return ResponseHelper.error(
        res,
        error.message || 'Internal server error while getting wallet info',
        500
      );
    }
  }
}