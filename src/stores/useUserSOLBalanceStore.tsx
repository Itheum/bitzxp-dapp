import create from 'zustand';
import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { notify } from 'utils/notifications';

interface UserSOLBalanceStore {
  balance: number;
  getUserSOLBalance: (publicKey: PublicKey, connection: Connection) => void;
}

const useUserSOLBalanceStore = create<UserSOLBalanceStore>((set, _get) => ({
  balance: 0,
  getUserSOLBalance: async (publicKey, connection) => {
    let balance = 0;
    try {
      balance = await connection.getBalance(publicKey, 'confirmed');
      balance = balance / LAMPORTS_PER_SOL;
    } catch (e) {
      notify({
        type: 'error',
        message: 'User SOL balance fetch failed',
        description: (e as Error).message,
      });
    }
    set((s) => {
      s.balance = balance;
    });
  },
}));

export default useUserSOLBalanceStore;
