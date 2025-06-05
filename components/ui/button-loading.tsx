import * as React from "react";
import {Button, buttonVariants} from "@/components/ui/button";
import {Spinner} from "@/components/ui/spinner";
import {cn} from "@/lib/utils/utils";
import {type VariantProps} from "class-variance-authority";

interface ButtonLoadingProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  loadingText?: string;
  spinnerVariant?: "default" | "white" | "muted";
  asChild?: boolean;
}

const ButtonLoading = React.forwardRef<HTMLButtonElement, ButtonLoadingProps>(
  (
    {
      children,
      loading = false,
      loadingText,
      spinnerVariant = "default",
      className,
      disabled,
      variant = "default",
      size = "default",
      asChild = false,
      ...props
    },
    ref
  ) => {
    const getSpinnerVariant = () => {
      if (spinnerVariant !== "default") return spinnerVariant;

      // Auto-detect spinner color based on button variant
      if (variant === "default") return "white";
      if (variant === "secondary") return "default";
      if (variant === "destructive") return "white";
      return "default";
    };

    return (
      <Button
        ref={ref}
        className={cn("gap-2", className)}
        disabled={disabled || loading}
        variant={variant}
        size={size}
        asChild={asChild}
        {...props}
      >
        {loading && <Spinner size="sm" variant={getSpinnerVariant()} />}
        {loading && loadingText ? loadingText : children}
      </Button>
    );
  }
);
ButtonLoading.displayName = "ButtonLoading";

export {ButtonLoading, type ButtonLoadingProps};
