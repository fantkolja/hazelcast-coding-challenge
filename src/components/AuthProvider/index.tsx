import React, { createContext, FC } from 'react';
import { GithubAuthService } from '../../services/auth';
import { AuthContextValue } from '../../types';
import { tokenStorageKey } from '../../constants';

const authService = new GithubAuthService();

// @todo: obtain new token if this invalidates
const state: AuthContextValue = {
  token: sessionStorage.getItem(tokenStorageKey),
  onCodeReceive: async (code: string) => {
    const token = await authService.exchangeCode(code);
    if (token) {
      sessionStorage.setItem(tokenStorageKey, token);
      state.token = token;
    }
  },
  onAuthStart() {
    if (!state.token) {
      authService.init(`${window.location.origin}/auth-callback`);
    } else {
      console.warn('[WARN:AuthProvider] Token already acquired!');
    }
  },
};
export const AuthContext = createContext(state);

export const AuthProvider: FC = ({ children }) => {
  return (
    <AuthContext.Provider value={state}>
      {children}
    </AuthContext.Provider>
  );
};

