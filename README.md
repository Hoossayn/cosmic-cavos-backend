# Cosmic Cavos Backend API

A Node.js TypeScript backend API that integrates with the Cavos SDK to provide user management and wallet operations for Starknet blockchain applications.

## Features

- 🔐 **User Authentication**: Register, login, and delete users using Auth0
- 💰 **Wallet Management**: Deploy wallets and check token balances
- 🔄 **Transaction Execution**: Execute smart contract calls
- 🌌 **Smart Contract Integration**: Direct integration with Cosmic Trader contract
- 🎮 **Trading System**: Mock and real trading functionality
- 🛡️ **Security**: Helmet for security headers, CORS enabled
- 📝 **Logging**: Morgan for request logging
- 🎯 **TypeScript**: Full TypeScript support with type safety
- ⚡ **Error Handling**: Comprehensive error handling and validation

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Cavos API credentials

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd cosmic-cavos-backend
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env
```

Edit `.env` and add your Cavos credentials:

```env
PORT=3000
CAVOS_API_SECRET=your_api_secret_here
CAVOS_HASH_SECRET=your_hash_secret_here
DEFAULT_NETWORK=sepolia
NODE_ENV=development
```

## Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the TypeScript project
- `npm start` - Start production server
- `npm test` - Run tests (placeholder)

## API Endpoints

### Health Check

- **GET** `/health` - Check server status

### Authentication Endpoints

#### Register User

- **POST** `/api/auth/register`
- **Body**:

```json
{
  "email": "user@example.com",
  "password": "Password123",
  "network": "sepolia" // optional, defaults to sepolia
}
```

#### Login User

- **POST** `/api/auth/login`
- **Body**:

```json
{
  "email": "user@example.com",
  "password": "Password123"
}
```

#### Delete User

- **DELETE** `/api/auth/user/:user_id`
- **Params**: `user_id` - Auth0 user ID (e.g., 'auth0|abc123')

#### Refresh Token

- **POST** `/api/auth/refresh`
- **Body**:

```json
{
  "refreshToken": "your_refresh_token_here"
}
```

### Wallet Endpoints

#### Deploy Wallet

- **POST** `/api/wallet/deploy`
- **Body**:

```json
{
  "network": "sepolia" // optional, defaults to sepolia
}
```

#### Get Wallet Balance

- **GET** `/api/wallet/balance?address=0x...&tokenAddress=0x...&decimals=18`
- **Query Parameters**:
  - `address` (required) - Wallet address
  - `tokenAddress` (required) - Token contract address
  - `decimals` (optional) - Token decimals, defaults to 18

#### Execute Transaction Calls

- **POST** `/api/wallet/execute-calls`
- **Body**:

```json
{
  "network": "sepolia", // optional
  "calls": [
    {
      "to": "0x...", // contract address
      "selector": "0x...", // function selector
      "calldata": ["0x..."] // calldata array
    }
  ],
  "address": "0x...", // wallet address
  "hashedPk": "hashed_private_key"
}
```

#### Format Amount

- **POST** `/api/wallet/format-amount`
- **Body**:

```json
{
  "amount": "1.5", // amount to format
  "decimals": 18 // optional, defaults to 18
}
```

#### Get Wallet Info

- **GET** `/api/wallet/info/:address`
- **Params**: `address` - Wallet address

## Response Format

All API responses follow this structure:

```json
{
  "success": true,
  "data": {...}, // Response data
  "message": "Success message", // Optional
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

Error responses:

```json
{
  "success": false,
  "error": "Error message",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "details": {...} // Optional error details
}
```

## Example Usage

### Register a New User

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "SecurePassword123",
    "network": "sepolia"
  }'
```

### Login User

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "SecurePassword123"
  }'
```

### Deploy a Wallet

```bash
curl -X POST http://localhost:3000/api/wallet/deploy \
  -H "Content-Type: application/json" \
  -d '{"network": "sepolia"}'
```

### Get Token Balance

```bash
curl "http://localhost:3000/api/wallet/balance?address=0x123...&tokenAddress=0x456...&decimals=18"
```

### Execute Transaction

```bash
curl -X POST http://localhost:3000/api/wallet/execute-calls \
  -H "Content-Type: application/json" \
  -d '{
    "network": "sepolia",
    "calls": [
      {
        "to": "0x123...",
        "selector": "0x456...",
        "calldata": ["0x789..."]
      }
    ],
    "address": "0xabc...",
    "hashedPk": "your_hashed_private_key"
  }'
```

## Project Structure

```
src/
├── controllers/          # Request handlers
│   ├── authController.ts
│   └── walletController.ts
├── routes/              # Route definitions
│   ├── auth.ts
│   └── wallet.ts
├── types/               # TypeScript type definitions
│   └── index.ts
├── utils/               # Utility functions
│   ├── config.ts
│   └── responseHelper.ts
└── server.ts            # Main server file
```

## Error Handling

The API includes comprehensive error handling:

- **Validation Errors** (400): Invalid request data
- **Authentication Errors** (401): Invalid credentials
- **Authorization Errors** (403): Insufficient permissions
- **Not Found Errors** (404): Resource not found
- **Server Errors** (500): Internal server errors

## Security Features

- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing
- **Input Validation**: Request validation
- **Error Sanitization**: No sensitive data in error responses

## Development

### Running in Development Mode

```bash
npm run dev
```

This starts the server with hot reload using `ts-node-dev`.

### Building for Production

```bash
npm run build
npm start
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For issues related to the Cavos SDK, refer to the [Cavos SDK documentation](https://www.npmjs.com/package/cavos-service-sdk).

For API-specific issues, please create an issue in this repository.
