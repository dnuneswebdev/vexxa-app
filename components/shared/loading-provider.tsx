"use client";

import React, {createContext, useContext, useState, ReactNode} from "react";
import {GlobalLoading} from "@/components/loading/global-loading";

interface LoadingContextType {
  isLoading: boolean;
  showLoading: (message?: string) => void;
  hideLoading: () => void;
  setLoading: (loading: boolean, message?: string) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

interface LoadingProviderProps {
  children: ReactNode;
}

export function LoadingProvider({children}: LoadingProviderProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("Carregando...");

  const showLoading = (loadingMessage = "Carregando...") => {
    setMessage(loadingMessage);
    setIsLoading(true);
  };

  const hideLoading = () => {
    setIsLoading(false);
  };

  const setLoading = (loading: boolean, loadingMessage = "Carregando...") => {
    if (loading) {
      showLoading(loadingMessage);
    } else {
      hideLoading();
    }
  };

  const value: LoadingContextType = {
    isLoading,
    showLoading,
    hideLoading,
    setLoading,
  };

  return (
    <LoadingContext.Provider value={value}>
      {children}
      <GlobalLoading isVisible={isLoading} message={message} />
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
}
