"use client"
import client from '@/utils/Apolloclient';
import { ApolloProvider as Provider } from '@apollo/client';
import type { ReactNode } from 'react';

interface ApolloProviderProps {
  children: ReactNode;
}

export default function ApolloProvider({ children }: ApolloProviderProps) {
  return (
    <Provider client={client}>
      {children}
    </Provider>
  );
}
