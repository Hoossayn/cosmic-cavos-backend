# 🌌 Cosmic Trader Contract Integration Guide

This guide shows you how to interact with your deployed Cosmic Trader contract using the API endpoints.

## 📋 Contract Information

- **Contract Address**: `0x034a2d5378925319ea42550a268a46cb04f33040ad97f3e3507e41fd59a67df1`
- **Class Hash**: `0x026e9f7afcd9810f46f7b6b38aac60307c4de204a7553d55079bc43046572407`
- **Network**: Sepolia Testnet

## 🚀 Getting Started

### 1. Get Contract Information

```bash
GET /api/cosmic-trader/contract-info
```

This endpoint returns all available functions and their selectors.

## 👤 User Management

### Register User

Register a user on the Cosmic Trader contract:

```bash
POST /api/cosmic-trader/register
Content-Type: application/json

{
  "address": "0x4ed7239a9c4c7a48fbab5c0be72d7e8efe2dbe4969b5fd3bbc975140bae3d94",
  "hashedPk": "5bf89aad29f355af3d18d1f037fa6a4ac6e971b057f871a8135872a30b8f8f44"
}
```

### Add XP to User

Add experience points to a user (admin function):

```bash
POST /api/cosmic-trader/add-xp
Content-Type: application/json

{
  "address": "0x4ed7239a9c4c7a48fbab5c0be72d7e8efe2dbe4969b5fd3bbc975140bae3d94",
  "targetUser": "0x6c9c59cf7fc9d4708b21c13330a9354deb52cecdb982697cfb5508456b9fb7f",
  "amount": 100
}
```

### Update User Streak

Update a user's daily activity streak:

```bash
POST /api/cosmic-trader/update-streak
Content-Type: application/json

{
  "address": "0x4ed7239a9c4c7a48fbab5c0be72d7e8efe2dbe4969b5fd3bbc975140bae3d94",
  "targetUser": "0x6c9c59cf7fc9d4708b21c13330a9354deb52cecdb982697cfb5508456b9fb7f"
}
```

### Update Trading Statistics

Update a user's trading volume statistics:

```bash
POST /api/cosmic-trader/update-trading-stats
Content-Type: application/json

{
  "address": "0x4ed7239a9c4c7a48fbab5c0be72d7e8efe2dbe4969b5fd3bbc975140bae3d94",
  "targetUser": "0x6c9c59cf7fc9d4708b21c13330a9354deb52cecdb982697cfb5508456b9fb7f",
  "volume": 1000.50
}
```

## 🎮 Mock Trading (Practice Mode)

### Start Mock Session

Start a practice trading session:

```bash
POST /api/cosmic-trader/start-mock-session
Content-Type: application/json

{
  "address": "0x4ed7239a9c4c7a48fbab5c0be72d7e8efe2dbe4969b5fd3bbc975140bae3d94"
}
```

**Response**: Returns a `session_id` that you'll use for subsequent mock trades.

### Place Mock Trade

Place a practice trade:

```bash
POST /api/cosmic-trader/place-mock-trade
Content-Type: application/json

{
  "address": "0x4ed7239a9c4c7a48fbab5c0be72d7e8efe2dbe4969b5fd3bbc975140bae3d94",
  "asset": "BTC",
  "amount": 0.1,
  "direction": "Long",
  "price": 65000
}
```

**Parameters**:

- `asset`: Asset symbol (e.g., "BTC", "ETH", "STRK")
- `amount`: Trade amount (decimal)
- `direction`: Either "Long" or "Short"
- `price`: Entry price (decimal)

**Response**: Returns a `trade_id` for the opened trade.

### Close Mock Trade

Close a practice trade:

```bash
POST /api/cosmic-trader/close-mock-trade
Content-Type: application/json

{
  "address": "0x4ed7239a9c4c7a48fbab5c0be72d7e8efe2dbe4969b5fd3bbc975140bae3d94",
  "tradeId": 123,
  "exitPrice": 67000
}
```

### End Mock Session

End a practice trading session:

```bash
POST /api/cosmic-trader/end-mock-session
Content-Type: application/json

{
  "address": "0x4ed7239a9c4c7a48fbab5c0be72d7e8efe2dbe4969b5fd3bbc975140bae3d94",
  "sessionId": 456
}
```

## 💰 Real Trading

### Place Real Trade

Place a real money trade:

```bash
POST /api/cosmic-trader/place-real-trade
Content-Type: application/json

{
  "address": "0x4ed7239a9c4c7a48fbab5c0be72d7e8efe2dbe4969b5fd3bbc975140bae3d94",
  "asset": "ETH",
  "amount": 1.0,
  "direction": "Short",
  "price": 3200
}
```

## 📊 Complete Trading Flow Example

### 1. Register User

```bash
curl -X POST http://localhost:3000/api/cosmic-trader/register \
  -H "Content-Type: application/json" \
  -d '{
    "address": "0x4ed7239a9c4c7a48fbab5c0be72d7e8efe2dbe4969b5fd3bbc975140bae3d94"
  }'
```

### 2. Start Mock Session

```bash
curl -X POST http://localhost:3000/api/cosmic-trader/start-mock-session \
  -H "Content-Type: application/json" \
  -d '{
    "address": "0x4ed7239a9c4c7a48fbab5c0be72d7e8efe2dbe4969b5fd3bbc975140bae3d94"
  }'
```

### 3. Place Mock Trade

```bash
curl -X POST http://localhost:3000/api/cosmic-trader/place-mock-trade \
  -H "Content-Type: application/json" \
  -d '{
    "address": "0x4ed7239a9c4c7a48fbab5c0be72d7e8efe2dbe4969b5fd3bbc975140bae3d94",
    "asset": "BTC",
    "amount": 0.1,
    "direction": "Long",
    "price": 65000
  }'
```

### 4. Close Mock Trade (after some time)

```bash
curl -X POST http://localhost:3000/api/cosmic-trader/close-mock-trade \
  -H "Content-Type: application/json" \
  -d '{
    "address": "0x4ed7239a9c4c7a48fbab5c0be72d7e8efe2dbe4969b5fd3bbc975140bae3d94",
    "tradeId": 1,
    "exitPrice": 67000
  }'
```

### 5. End Mock Session

```bash
curl -X POST http://localhost:3000/api/cosmic-trader/end-mock-session \
  -H "Content-Type: application/json" \
  -d '{
    "address": "0x4ed7239a9c4c7a48fbab5c0be72d7e8efe2dbe4969b5fd3bbc975140bae3d94",
    "sessionId": 1
  }'
```

## 🔧 Advanced Usage

### Using with Postman

1. **Set Base URL**: `http://localhost:3000`
2. **Add Headers**:
   - `Content-Type: application/json`
3. **Use wallet addresses from your login response**

### Error Handling

All endpoints return consistent error responses:

```json
{
  "success": false,
  "error": "Error message",
  "timestamp": "2025-08-07T17:57:02.943Z"
}
```

### Required Parameters

- **address**: Always required - the wallet address making the transaction
- **hashedPk**: Always required - the hashed private key for transaction signing
- **targetUser**: For admin functions - the user being affected
- **amounts/prices**: Automatically formatted to uint256 format
- **directions**: Must be exactly "Long" or "Short"

## 🎯 Key Features

1. **Automatic Formatting**: Numbers are automatically converted to blockchain format
2. **Validation**: All inputs are validated before sending to contract
3. **Error Handling**: Comprehensive error messages for debugging
4. **Function Selectors**: Pre-calculated for optimal performance
5. **Type Safety**: TypeScript ensures parameter correctness

## 📱 Postman Collection

You can test all endpoints in Postman using these examples. Make sure to:

1. Replace wallet addresses with your actual addresses
2. Use real session IDs and trade IDs returned from previous calls
3. Monitor the console logs for detailed transaction information

## 🔍 Troubleshooting

**Common Issues:**

- **Invalid address format**: Ensure addresses start with `0x`
- **Wrong direction**: Must be exactly "Long" or "Short" (case-sensitive)
- **Missing trade/session IDs**: Use IDs returned from previous calls
- **Network issues**: Ensure you're on Sepolia testnet

**Getting Help:**

- Check server logs for detailed error messages
- Use the `/health` endpoint to verify server status
- Verify contract address and network match your deployment

## 🚀 Ready to Trade!

Your Cosmic Trader contract is now fully integrated and ready for use. You can start with mock trading to test the system, then move to real trading when ready!
