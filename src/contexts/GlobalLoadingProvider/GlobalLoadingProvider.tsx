import React, { createContext, useContext, useState } from 'react';
import LoadingOverlay from 'react-loading-overlay';

export interface GlobalLoadingOptions {
  isOverlayFixed?: boolean;
  loadingText?: string;
}

export type GlobalLoadingContextProps = {
  loading: boolean;
  showGlobalLoading: (shouldShow: boolean, options?: GlobalLoadingOptions) => void;
};

export const GlobalLoadingContext = createContext<GlobalLoadingContextProps>({
  loading: false,
  showGlobalLoading: () => true
});

export type GlobalLoadingProviderProps = {
  children: React.ReactNode;
};

export const GlobalLoadingProvider = ({ children }: GlobalLoadingProviderProps) => {
  const [state, setState] = useState<{ loading: boolean; options?: GlobalLoadingOptions }>({
    loading: false
  });
  const showGlobalLoading = (shouldShow: boolean, options?: GlobalLoadingOptions) => {
    if (options) {
      setState({
        loading: shouldShow,
        options: { ...options }
      });
    } else {
      setState({
        loading: shouldShow
      });
    }
  };
  const { loading, options } = state;
  return (
    <GlobalLoadingContext.Provider
      value={{
        loading,
        showGlobalLoading
      }}
    >
      <LoadingOverlay active={loading} spinner text={options?.loadingText || 'Loading'}>
        {children}
      </LoadingOverlay>
    </GlobalLoadingContext.Provider>
  );
};

export type GlobalLoadingContext = () => GlobalLoadingContextProps;

export const useGlobalLoadingContext: GlobalLoadingContext = () => {
  return useContext(GlobalLoadingContext);
};
