"use client";

import {Spinner} from "@/components/ui/spinner";
import {cn} from "@/lib/utils/utils";

interface GlobalLoadingProps {
  isVisible: boolean;
  message?: string;
  backdrop?: boolean;
}

export function GlobalLoading({
  isVisible,
  message = "Carregando...",
  backdrop = true,
}: GlobalLoadingProps) {
  if (!isVisible) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center",
        backdrop && "bg-background/80 backdrop-blur-sm"
      )}
    >
      <div className="flex flex-col items-center space-y-4 p-6 rounded-lg bg-card border shadow-lg">
        <Spinner size="lg" />
        <p className="text-sm text-muted-foreground animate-pulse">{message}</p>
      </div>
    </div>
  );
}
