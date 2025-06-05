import {Spinner} from "@/components/ui/spinner";
import {cn} from "@/lib/utils/utils";

interface PageLoadingProps {
  message?: string;
  className?: string;
}

export function PageLoading({
  message = "Carregando...",
  className,
}: PageLoadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center h-screen space-y-4",
        className
      )}
    >
      <Spinner size="xl" />
      <p className="text-muted-foreground text-sm animate-pulse">{message}</p>
    </div>
  );
}
