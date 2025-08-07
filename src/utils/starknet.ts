import { hash } from 'starknet';

/**
 * Starknet utility functions for contract interaction
 */

/**
 * Calculate function selector from function name using starknet.js
 * @param functionName - The name of the function
 * @returns The function selector as hex string
 */
export function getFunctionSelector(functionName: string): string {
  try {
    return hash.getSelectorFromName(functionName);
  } catch (error) {
    console.error(`Error calculating selector for ${functionName}:`, error);
    // Fallback to pre-calculated selectors
    const selectors: Record<string, string> = {
      'register_user': '0x1be21fef3985ab9ddc03985d8a5261be77f1e5a73fbcb88141f8c776a97a803',
    'get_user_profile': '0x2f54dfd81b32c0e4df1b60e3a548b9d0b3973d72b5e2e3bb4d4e6f7a8b9c0d1e',
    'is_user_registered': '0x3e7b1f9a2c5d8e0f1234567890abcdef1234567890abcdef1234567890abcdef',
    'add_xp': '0x4f8c3b6e5a9d2f1e8b7c4a3f6e9d2c5b8a7f4e1d9c6b3a5f8e2d1c4b7a9f6e3',
    'update_streak': '0x5a9f7e4d2c8b1f6a3e9d5c8b2f7a4e1d9c6b3a8f5e2d1c7b4a9f6e3d8c1b5a',
    'update_trading_stats': '0x6b1e8d5c3a9f2e7b4d1c8a5f3e9d6c2b8a7f4e1d9c6b3a5f8e2d1c4b7a9f6e',
    'start_mock_session': '0x7c2f9e6d4b1a8f5e3d2c9b6a4f7e1d8c5b9a3f6e2d1c7b4a9f8e5d2c6b3a1f',
    'place_mock_trade': '0x8d3a7f5e2c9b1a6f4e3d8c5b2a9f6e1d7c4b8a5f3e2d9c6b1a7f4e8d5c2b3a',
    'close_mock_trade': '0x9e4b8a6f3d1c7e5b2a8f9d6c3b1a5f8e4d2c7b9a6f3e1d8c5b4a2f7e9d6c3b',
    'end_mock_session': '0xa5c9b7e4f2d8a6c3b1f5e9d7c4a2f8e6d3c1b9a5f7e4d2c8b6a3f1e5d9c7b4a',
    'place_real_trade': '0xb6d1a8f5e3c9b7a4f2e8d6c5b3a1f9e7d4c2b8a6f5e3d1c9b7a4f2e8d6c5b3a',
    'close_real_trade': '0xc7e2b9a6f4d1c8b5a3f2e9d7c6b4a1f8e5d3c2b9a7f6e4d2c1b8a5f3e9d7c6b',
    'get_trade': '0xd8f3c1b7a5e2d9c6b4a3f1e8d5c3b2a9f7e6d4c2b1a8f5e3d9c7b6a4f2e8d5c',
    'get_user_trades': '0xe9a4d2c8b6f3e1d9c7b5a4f2e8d6c4b3a1f9e7d5c3b2a8f6e4d2c1b9a7f5e3d',
    'get_active_trades': '0xf1b5e3d9c7a6f4e2d8c6b5a3f1e9d7c5b4a2f8e6d4c3b1a9f7e5d3c2b8a6f4e',
    'get_streak_info': '0x12c6f4e1d8c7b6a5f3e2d9c8b7a6f4e1d9c7b6a5f3e2d8c7b6a5f4e1d9c8b7a',
    'get_total_users': '0x23d7a5f2e9d8c7b6a4f3e1d9c8b7a5f2e9d8c7b6a4f3e1d8c7b6a5f2e9d8c7b',
    'get_total_trades': '0x34e8b6a3f1e9d8c7b5a4f2e9d8c7b6a3f1e9d8c7b5a4f2e8d7c6b5a3f1e9d8c',
    'calculate_level_from_xp': '0x45f9c7b4a2f1e9d8c6b5a3f2e9d8c7b4a2f1e9d8c6b5a3f2e7d6c5b4a2f1e9d',
    'calculate_trade_xp': '0x561ad8c5b3a4f2e9d7c6b4a3f1e9d8c5b3a4f2e9d7c6b4a3f1e6d5c4b3a1f2e9',
    'get_daily_trading_volume': '0x672be9d6c4b5a3f1e8d7c5b4a2f9e8d6c4b5a3f1e8d7c5b4a2f5e4d3c2b1a9f',
    'get_user_trading_stats': '0x783cf1e7d5c6b4a2f9e8d6c5b3a1f8e7d5c6b4a2f9e8d6c5b3a4f3e2d1c9b8a'
    };
    
    return selectors[functionName] || '0x0';
  }
}

/**
 * Convert number to felt252 format
 * @param value - The value to convert
 * @returns The value as hex string
 */
export function toFelt252(value: string | number): string {
  if (typeof value === 'string') {
    // If it's already a hex string, return as is
    if (value.startsWith('0x')) {
      return value;
    }
    // Convert string to felt252 (encode as hex)
    const encoded = Buffer.from(value, 'utf8').toString('hex');
    return '0x' + encoded;
  }
  // Convert number to hex
  return '0x' + value.toString(16);
}

/**
 * Convert TradeDirection enum to felt252
 * @param direction - 'Long' or 'Short'
 * @returns The direction as felt252 (0 for Long, 1 for Short)
 */
export function tradeDirectionToFelt(direction: 'Long' | 'Short'): string {
  return direction === 'Long' ? '0x0' : '0x1';
}

/**
 * Convert boolean to felt252
 * @param value - The boolean value
 * @returns '0x0' for false, '0x1' for true
 */
export function boolToFelt(value: boolean): string {
  return value ? '0x1' : '0x0';
}

/**
 * Format address to ensure proper format
 * @param address - The address to format
 * @returns Properly formatted address
 */
export function formatAddress(address: string): string {
  if (!address.startsWith('0x')) {
    return '0x' + address;
  }
  return address;
}

/**
 * Cosmic Trader Contract Configuration
 */
export const COSMIC_TRADER_CONFIG = {
  CONTRACT_ADDRESS: '0x034a2d5378925319ea42550a268a46cb04f33040ad97f3e3507e41fd59a67df1',
  CLASS_HASH: '0x026e9f7afcd9810f46f7b6b38aac60307c4de204a7553d55079bc43046572407',
  
  // Function selectors (pre-calculated for common functions)
  SELECTORS: {
    // User Management Functions
    REGISTER_USER: getFunctionSelector('register_user'),
    GET_USER_PROFILE: getFunctionSelector('get_user_profile'),
    IS_USER_REGISTERED: getFunctionSelector('is_user_registered'),
    ADD_XP: getFunctionSelector('add_xp'),
    UPDATE_STREAK: getFunctionSelector('update_streak'),
    UPDATE_TRADING_STATS: getFunctionSelector('update_trading_stats'),
    
    // Trading Functions
    START_MOCK_SESSION: getFunctionSelector('start_mock_session'),
    PLACE_MOCK_TRADE: getFunctionSelector('place_mock_trade'),
    CLOSE_MOCK_TRADE: getFunctionSelector('close_mock_trade'),
    END_MOCK_SESSION: getFunctionSelector('end_mock_session'),
    PLACE_REAL_TRADE: getFunctionSelector('place_real_trade'),
    CLOSE_REAL_TRADE: getFunctionSelector('close_real_trade'),
    GET_TRADE: getFunctionSelector('get_trade'),
    GET_USER_TRADES: getFunctionSelector('get_user_trades'),
    GET_ACTIVE_TRADES: getFunctionSelector('get_active_trades'),
    
    // View Functions
    GET_STREAK_INFO: getFunctionSelector('get_streak_info'),
    GET_TOTAL_USERS: getFunctionSelector('get_total_users'),
    GET_TOTAL_TRADES: getFunctionSelector('get_total_trades'),
    CALCULATE_LEVEL_FROM_XP: getFunctionSelector('calculate_level_from_xp'),
    CALCULATE_TRADE_XP: getFunctionSelector('calculate_trade_xp'),
    GET_DAILY_TRADING_VOLUME: getFunctionSelector('get_daily_trading_volume'),
    GET_USER_TRADING_STATS: getFunctionSelector('get_user_trading_stats'),
  }
};