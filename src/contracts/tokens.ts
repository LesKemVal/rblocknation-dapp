// kit/dapp/src/contracts/tokens.ts
import { erc20Abi } from "viem";

export type Address = `0x${string}`;
export type ChainId = 11155111; // Sepolia

export type UiToken = {
  name: string;
  symbolHint?: string;
  address: Address;
  chainId: ChainId;
  abi: typeof erc20Abi;
};

export const TOKENS: Record<string, UiToken> = {
  regCF: {
    name: "FranchiseToken – Platform Buildout",
    symbolHint: "FRANCH",
    address: "0x769780C2BA4492Ac4B0C3C38fbD0B2CB4bb9Ba5f",
    chainId: 11155111,
    abi: erc20Abi,
  },
  regA: {
    name: "BFTKN – Scale Raise",
    symbolHint: "BFTKN",
    address: "0x9F2bc4CC40f7e39866F7DcBFe0127E9Dbc925858",
    chainId: 11155111,
    abi: erc20Abi,
  },
};

