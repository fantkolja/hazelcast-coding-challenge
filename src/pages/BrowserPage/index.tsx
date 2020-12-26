import React, { FC, useContext } from 'react'
import { AuthContext } from '../../components/AuthProvider';

type BrowserPageProps = {};

export const BrowserPage: FC<BrowserPageProps> = () => {
  const { token } = useContext(AuthContext);

  return(
    <h2>Browser Page, Token: {token}</h2>
  );
};
