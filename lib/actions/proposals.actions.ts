"use server";

import { supabaseAdmin } from "../supabase";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

/**
 * Retrieves budget data from Supabase for the authenticated user
 * @returns Array of budget objects for the current user
 */
export async function getBudgets() {
  try {
    // Get the current session
    const session = await getServerSession(authOptions);
    
    // If no session or user, return null
    if (!session || !session.user) {
      console.error('No authenticated user found');
      return null;
    }

    // Extract the user ID from the session
    const userId = session.user.id;
    
    if (!userId) {
      console.error('User ID not found in session');
      return null;
    }
    
    // Fetch budgets data from Supabase for the authenticated user
    const { data: budgets, error } = await supabaseAdmin
      .from('budgets')
      .select('*')
      .eq('userId', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching budgets:', error);
      return null;
    }
    
    return budgets;
  } catch (error) {
    console.error('Unexpected error in getBudgets:', error);
    return null;
  }
}