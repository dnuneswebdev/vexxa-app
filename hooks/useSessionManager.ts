"use client";

import {useSession, signOut} from "next-auth/react";
import {useEffect, useRef} from "react";

export function useSessionManager() {
  const {data: session, status} = useSession();
  const sessionStartTime = useRef<number | null>(null);

  useEffect(() => {
    if (session && !sessionStartTime.current) {
      sessionStartTime.current = Date.now();
    }

    if (!session && sessionStartTime.current) {
      sessionStartTime.current = null;
    }
  }, [session]);

  // Marca que a página foi carregada (para detectar reloads)
  useEffect(() => {
    // SessionStorage persiste apenas durante a sessão da aba
    sessionStorage.setItem("vexxa-page-loaded", "true");

    // Remove qualquer marcador de limpeza se a página recarregou
    if (sessionStorage.getItem("vexxa-page-loaded")) {
      localStorage.removeItem("vexxa-session-cleanup");
    }
  }, []);

  useEffect(() => {
    if (!session) return;

    const checkSessionValidity = () => {
      if (sessionStartTime.current) {
        const elapsedTime = Date.now() - sessionStartTime.current;
        const maxSessionTime = 8 * 60 * 60 * 1000;

        if (elapsedTime >= maxSessionTime) {
          signOut({callbackUrl: "/login"});
          return;
        }
      }
    };

    const sessionCheckInterval = setInterval(
      checkSessionValidity,
      5 * 60 * 1000
    );

    // Detecta quando a aba está sendo fechada
    const handleBeforeUnload = () => {
      // Se sessionStorage existe, é um reload; se não existe, é fechamento de aba
      if (!sessionStorage.getItem("vexxa-page-loaded")) {
        // Aba sendo fechada definitivamente
        localStorage.setItem("vexxa-session-cleanup", "true");
      }

      // Remove o marcador para detectar próximo reload/fechamento
      sessionStorage.removeItem("vexxa-page-loaded");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    // Cleanup na desmontagem
    return () => {
      clearInterval(sessionCheckInterval);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [session]);

  useEffect(() => {
    // Verifica se deve fazer limpeza da sessão ao carregar
    const shouldCleanup = localStorage.getItem("vexxa-session-cleanup");
    if (shouldCleanup && session) {
      localStorage.removeItem("vexxa-session-cleanup");
      signOut({callbackUrl: "/login"});
    }
  }, [session]);

  return {
    session,
    status,
    isAuthenticated: status === "authenticated",
    isLoading: status === "loading",
  };
}
