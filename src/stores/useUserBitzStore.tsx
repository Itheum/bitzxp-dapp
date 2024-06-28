import create from 'zustand';
import { Connection, PublicKey } from '@solana/web3.js';

interface UserBitzStore {
  bitzBalance: number;
  cooldown: number;
  givenBitzSum: number;
  collectedBitzSum: number;
  bonusBitzSum: number;
  bonusTries: number;
  updateBitzBalance: (bitzBalance: UserBitzStore['bitzBalance']) => void;
  updateCooldown: (cooldown: UserBitzStore['cooldown']) => void;
  updateGivenBitzSum: (givenBitzSum: UserBitzStore['givenBitzSum']) => void;
  updateCollectedBitzSum: (
    collectedBitzSum: UserBitzStore['collectedBitzSum'],
  ) => void;
  updateBonusBitzSum: (bonusBitzSum: UserBitzStore['bonusBitzSum']) => void;
  updateBonusTries: (bonusTries: UserBitzStore['bonusTries']) => void;
}

const useUserBitzStore = create<UserBitzStore>((set, _get) => ({
  bitzBalance: -2,
  cooldown: -2,
  givenBitzSum: -2,
  collectedBitzSum: -2,
  bonusBitzSum: -2,
  bonusTries: -2,
  updateBitzBalance: (value: number) => set(() => ({ bitzBalance: value })),
  updateCooldown: (value: number) => set(() => ({ cooldown: value })),
  updateGivenBitzSum: (value: number) => set(() => ({ givenBitzSum: value })),
  updateCollectedBitzSum: (value: number) =>
    set(() => ({ collectedBitzSum: value })),
  updateBonusBitzSum: (value: number) => set(() => ({ bonusBitzSum: value })),
  updateBonusTries: (value: number) => set(() => ({ bonusTries: value })),
}));

export default useUserBitzStore;
