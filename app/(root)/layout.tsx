"use client";

import {redirect} from "next/navigation";
import {useEffect} from "react";
import {useTheme} from "next-themes";
import Image from "next/image";
import {Sidebar} from "./components/Sidebar";
import {PageLoading} from "@/components/loading";
import {useSessionManager} from "@/hooks/useSessionManager";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {session, status} = useSessionManager();
  const {setTheme} = useTheme();

  // Restore user's previous theme preference after login
  useEffect(() => {
    const previousTheme = localStorage.getItem("vexxa-previous-theme");
    if (previousTheme) {
      setTheme(previousTheme);
      // Clear the stored theme after restoring it
      localStorage.removeItem("vexxa-previous-theme");
    }
  }, [setTheme]);

  // If the user is not authenticated, redirect to login
  if (status === "unauthenticated") {
    redirect("/login");
  }

  // Show loading state while checking authentication
  if (status === "loading") {
    return <PageLoading message="Aguarde..." />;
  }

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <Sidebar user={session?.user} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header - Only visible on mobile */}
        <header className="md:hidden flex items-center justify-between p-4 border-b">
          <div className="flex-1 flex justify-center">
            <Image
              src="/images/vexxa-horizontal-transparent.png"
              alt="Vexxa Logo"
              width={120}
              height={32}
              className="h-8 w-auto"
            />
          </div>
          <div className="w-10"></div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 bg-muted dark:bg-background">
          {children}
        </main>
      </div>
    </div>
  );
}
