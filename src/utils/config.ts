import dotenv from 'dotenv';

dotenv.config();

export const config = {
  // Server configuration
  port: parseInt(process.env.PORT || '3000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // Cavos configuration
  cavos: {
    apiSecret: process.env.CAVOS_API_SECRET || '',
    hashSecret: process.env.CAVOS_HASH_SECRET || '',
    defaultNetwork: process.env.DEFAULT_NETWORK || 'sepolia'
  }
};

// Validate required environment variables
export function validateConfig(): void {
  const requiredVars = [
    'CAVOS_API_SECRET',
    'CAVOS_HASH_SECRET'
  ];

  const missingVars = requiredVars.filter(varName => !process.env[varName]);

  if (missingVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
  }

  if (!config.cavos.apiSecret || !config.cavos.hashSecret) {
    throw new Error('Cavos API credentials are not properly configured');
  }
}

export default config;