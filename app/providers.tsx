"use client";

import {SessionProvider} from "next-auth/react";
import {ThemeProvider} from "next-themes";
import {LoadingProvider} from "@/components/shared/loading-provider";

export function Providers({children}: {children: React.ReactNode}) {
  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem={false}
      >
        <LoadingProvider>{children}</LoadingProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
