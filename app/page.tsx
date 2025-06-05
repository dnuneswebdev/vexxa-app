"use client";

import {useSession} from "next-auth/react";
import {redirect} from "next/navigation";
import {useEffect} from "react";
import {PageLoading} from "@/components/loading";

export default function Home() {
  const {status} = useSession();

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
