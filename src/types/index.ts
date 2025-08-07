// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: string;
}

// User management types
export interface RegisterUserRequest {
  email: string;
  password: string;
  network?: string;
}

export interface LoginUserRequest {
  email: string;
  password: string;
}

export interface DeleteUserRequest {
  user_id: string;
}

// Wallet types
export interface DeployWalletRequest {
  network?: string;
}

export interface GetBalanceRequest {
  address: string;
  tokenAddress: string;
  decimals?: number;
}

export interface ExecuteCallsRequest {
  network?: string;
  calls: TransactionCall[];
  address: string;
  hashedPk: string;
}

export interface TransactionCall {
  to: string;
  selector: string;
  calldata: string[];
}

export interface FormatAmountRequest {
  amount: string | number;
  decimals?: number;
}

// Cavos SDK response types (based on documentation)
export interface CavosAuthResponse {
  success: boolean;
  data: {
    user_id?: string;
    email?: string;
    wallet?: any;
    access_token?: string;
    refresh_token?: string;
    expires_in?: number;
    created_at?: string;
  };
  message?: string;
}

export interface CavosWalletResponse {
  success: boolean;
  data: any;
  message?: string;
}

export interface CavosBalanceResponse {
  success: boolean;
  data: any;
  message?: string;
}

// Error types
export class CavosApiError extends Error {
  public statusCode: number;
  public details?: any;

  constructor(message: string, statusCode: number = 500, details?: any) {
    super(message);
    this.name = 'CavosApiError';
    this.statusCode = statusCode;
    this.details = details;
  }
}