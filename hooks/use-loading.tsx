"use client";

import {useState, useCallback} from "react";
import {useLoading as useGlobalLoading} from "@/components/shared/loading-provider";

interface UseLoadingOptions {
  useGlobal?: boolean;
}

export function useLoading(options: UseLoadingOptions = {}) {
  const {useGlobal = false} = options;
  const [localLoading, setLocalLoading] = useState(false);
  const globalLoading = useGlobalLoading();

  const startLoading = useCallback(
    (message?: string) => {
      if (useGlobal) {
        globalLoading.showLoading(message);
      } else {
        setLocalLoading(true);
      }
    },
    [useGlobal, globalLoading]
  );

  const stopLoading = useCallback(() => {
    if (useGlobal) {
      globalLoading.hideLoading();
    } else {
      setLocalLoading(false);
    }
  }, [useGlobal, globalLoading]);

  const withLoading = useCallback(
    async <T,>(asyncFn: () => Promise<T>, message?: string): Promise<T> => {
      try {
        startLoading(message);
        const result = await asyncFn();
        return result;
      } finally {
        stopLoading();
      }
    },
    [startLoading, stopLoading]
  );

  return {
    isLoading: useGlobal ? globalLoading.isLoading : localLoading,
    startLoading,
    stopLoading,
    withLoading,
  };
}
