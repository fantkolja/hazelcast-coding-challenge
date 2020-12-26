import React, { FC } from 'react';
import { ApolloProvider } from '@apollo/client';
import { getApiClient } from '../../services/api';

const client = getApiClient();

export const ApiProvider: FC = ({ children }) => {
  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  );
};
