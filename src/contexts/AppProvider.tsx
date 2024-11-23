import React from 'react';
import { GlobalLoadingProvider } from './GlobalLoadingProvider';
import { AuthProvider } from './AuthProvider';

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <AuthProvider>
      <GlobalLoadingProvider>{children}</GlobalLoadingProvider>
    </AuthProvider>
  );
};
