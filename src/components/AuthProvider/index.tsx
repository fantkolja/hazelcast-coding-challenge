import React, { createContext, FC } from 'react';
import { GithubAuthService } from '../../services/auth';
import { AuthContextValue } from '../../types';
import { tokenStorageKey } from '../../constants';

const authService = new GithubAuthService();

const onCodeReceive = async (code: string) => {
  const token = await authService.exchangeCode(code);
  if (token) {
    sessionStorage.setItem(tokenStorageKey, token);
    state.token = token;
  }
};

const checkToken = (token: string | null) => {
  if (!token) {
    authService.init(`${window.location.origin}/auth-callback`);
  } else {
    console.warn('[WARN:AuthProvider] Token already acquired!');
  }
};

// @todo: obtain new token if this invalidates
const state: AuthContextValue = {
  token: sessionStorage.getItem(tokenStorageKey),
  onAuthStart: () => checkToken(state.token),
  onCodeReceive,
};
export const AuthContext = createContext(state);

export const AuthProvider: FC = ({ children }) => {
  return (
    <AuthContext.Provider value={state}>
      {children}
    </AuthContext.Provider>
  );
};

