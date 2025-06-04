"use server";

import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {supabaseAdmin} from "@/lib/supabase";

export async function updateUserPassword(newPassword: string) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id)
      return {success: false, message: "Usuario não autenticado"};

    const {error} = await supabaseAdmin.auth.admin.updateUserById(
      session.user.id,
      {password: newPassword}
    );

    if (error) return {success: false, error: error.message};

    return {success: true, message: "Senha atualizada com sucesso!"};
  } catch (error) {
    console.error("Erro inesperado:", error);
    return {success: false, error: "Ocorreu um erro inesperado"};
  }
}
