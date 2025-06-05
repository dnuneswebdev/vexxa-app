"use client";

import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useState, useTransition} from "react";
import {Eye, EyeOff} from "lucide-react";
import {toast} from "sonner";
import * as z from "zod";
import {updateUserPassword} from "@/lib/actions/user.actions";

const formSchema = z
  .object({
    newPassword: z.string().min(6, {
      message: "A nova senha precisa conter pelo menos 6 caracteres.",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "As senhas não coincidem.",
  });

export default function AccountPage() {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  function onSubmitNewPassword(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      try {
        const result = await updateUserPassword(values.newPassword);

        if (result.success) {
          toast.success(result.message);
          form.reset();
        } else {
          toast.error(result.error);
        }
      } catch (error) {
        toast.error("Erro inesperado ao atualizar senha");
        console.error("Erro:", error);
      }
    });
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Conta</h1>
        <p className="text-muted-foreground mt-2">
          Configurações da sua conta, como alterar senha e preferências.
        </p>
      </div>

      <div className="max-w-md mt-10">
        <h1 className="text-2xl font-bold mb-2">Alterar Senha</h1>
        <form
          onSubmit={form.handleSubmit(onSubmitNewPassword)}
          className="space-y-4"
        >
          <div className="space-y-2">
            <label htmlFor="newPassword" className="text-sm font-medium">
              Nova senha
            </label>
            <div className="relative">
              <Input
                id="newPassword"
                type={showNewPassword ? "text" : "password"}
                {...form.register("newPassword")}
                className="pr-10"
                disabled={isPending}
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
                disabled={isPending}
              >
                {showNewPassword ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
              </button>
            </div>
            {form.formState.errors.newPassword && (
              <p className="text-sm text-destructive">
                {form.formState.errors.newPassword.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="text-sm font-medium">
              Confirme a nova senha
            </label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                {...form.register("confirmPassword")}
                className="pr-10"
                disabled={isPending}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
                disabled={isPending}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
              </button>
            </div>
            {form.formState.errors.confirmPassword && (
              <p className="text-sm text-destructive">
                {form.formState.errors.confirmPassword.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full cursor-pointer"
            disabled={isPending}
          >
            {isPending ? "Atualizando..." : "Confirmar"}
          </Button>
        </form>
      </div>
    </div>
  );
}
