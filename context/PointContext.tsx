// StateContext.tsx
'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface PriorityType {
  isHold:boolean;
  memo:string;
  name:string;
}

interface User {
  id: number | null;
  gmtCreated: string | null;
  walletAddress: string | null;
  stone: number | null;
  crystal: number | null;
  inviteCode: string | null;
  inviteCount: number | null;
  inviteLimit: string | null;
  bonusPercent: number | undefined;
  isWhite?: boolean | undefined;
  isStarPlus?: boolean | undefined;
  hasNFT?: boolean;
  community7Day?:number;
  community3Day?:number;
  interests?:PriorityType[];
  extension: { neverPrompt: string; nonPrompt: string, s: string | undefined, er?: undefined | string }
}
interface State {
  user: User | null;
}

interface StateContextType {
  state: State;
  setUser: (user: User) => void;
}

const initialState: State = {
  user: {
    id: null,
    gmtCreated: null,
    walletAddress: null,
    stone: 0,
    crystal: 0,
    inviteCode: '',
    inviteCount: 0,
    inviteLimit: "20",
    bonusPercent: 0,
    isStarPlus: false,
    extension: { neverPrompt: '0', nonPrompt: '0', s: undefined, er: '0' }
  }
};

const StateContext = createContext<StateContextType | undefined>(undefined);

export const PointProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<State>(initialState);

  const setUser = (user: User) => {
    setState(prevState => ({ ...prevState, user }));
  };

  return (
    <StateContext.Provider value={{ state, setUser }}>
      {children}
    </StateContext.Provider>
  );
};

export const usePointContext = () => {
  const context = useContext(StateContext);
  if (context === undefined) {
    throw new Error('useStateContext must be used within a StateProvider');
  }
  return context;
};
