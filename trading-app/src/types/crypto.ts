// types/crypto.ts
export interface Coin {
    id: string;
    symbol: string;
    name: string;
    current_price: number;
    market_cap: number;
    total_volume: number;
}

export type CryptoData = Coin[];

// types.ts
export interface User {
    _id: string;
    name: string;
    email: string;
    balance: string;
  }
  