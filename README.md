# Run Undeployed Bytecode
If you'd like to run some on-chain code in an `eth_call` without deploying it for real, this may be the best way. See `./scripts/Run.ts` for details. Required params:
- `rpcAddr`: Node RPC
- `functionName`: Plain function name
- `params`: Array of function params
- `bytecode`: Bytecode of undeployed contract
- `abi`: ABI of contract

## Commands
- Run: `ts-node ./scripts/Run.ts`
- Compile: `npx hardhat compile`

### Other
- Compile: `npx hardhat compile`