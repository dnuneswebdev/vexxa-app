"use server";

import { supabaseAdmin } from "../supabase";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function getBudgets(
  searchParams: { [key: string]: string | string[] | null }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      console.error("Authentication error: No user session found.");
      return { data: [], count: 0 };
    }
    const userId = session.user.id;
    const pageParam = searchParams?.page;
    const pageSize = 10;
    const page = pageParam ? parseInt(String(pageParam), 10) : 1;

    const idParam = searchParams?.budget_id;
    const idFilter = Array.isArray(idParam) ? idParam[0] : idParam;

    const statusParam = searchParams?.budget_status;
    const statusFilter = Array.isArray(statusParam) ? statusParam[0] : statusParam;

    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    let query = supabaseAdmin.from("budgets").select("*", { count: "exact" });

    query = query.eq("userId", userId);

    if (idFilter) {
      query = query.ilike("budget_id::text", `%${idFilter}%`);
    }

    if (statusFilter) {
      query = query.eq("status", statusFilter);
    }

    const {
      data: budgets,
      error,
      count,
    } = await query.order("created_at", { ascending: false }).range(from, to);

    if (error) {
      console.error("Error fetching budgets:", error.message);
      return { data: [], count: 0 };
    }

    return { data: budgets, count: count ?? 0 };
  } catch (error) {
    console.error("Unexpected error in getBudgets:", error);
    return { data: [], count: 0 };
  }
}