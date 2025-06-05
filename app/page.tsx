"use client";

import {redirect} from "next/navigation";
import {useEffect} from "react";
import {PageLoading} from "@/components/loading";
import {useSessionManager} from "@/hooks/useSessionManager";

export default function Home() {
  const {status} = useSessionManager();

  useEffect(() => {
    // If authenticated, redirect to dashboard
    if (status === "authenticated") {
      redirect("/dashboard");
    }
    // If not authenticated, redirect to login
    else if (status === "unauthenticated") {
      redirect("/login");
    }
  }, [status]);

  // Show loading state while checking authentication
  return <PageLoading message="Verificando autenticação..." />;
}
