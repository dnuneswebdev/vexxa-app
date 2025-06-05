import type {Metadata} from "next";
import {getBudgets} from "@/lib/actions/proposals.actions";
import ProposalsTable from "./PorposalsTable";

export const metadata: Metadata = {
  title: "VEXXA App | Orçamentos",
  description: "Sistema de automação de propostas via WhatsApp",
};

export default async function ProposalsPage({
  searchParams,
}: {
  searchParams: {[key: string]: string | string[] | null};
}) {
  try {
    const budgetData = await getBudgets(searchParams);
    const budgets = budgetData?.data || [];
    const totalBudgets = budgetData?.count || 0;

    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Orçamentos</h1>
          <p className="text-muted-foreground mt-2">
            Gerencie todos os orçamentos enviados
          </p>
        </div>

        <div className="bg-card p-6 rounded-lg border border-border shadow-sm">
          <ProposalsTable
            initialBudgets={budgets}
            totalBudgets={totalBudgets}
          />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching budgets:", error);

    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Orçamentos</h1>
          <p className="text-muted-foreground mt-2">
            Gerencie todos os orçamentos enviados
          </p>
        </div>

        <div className="bg-card p-6 rounded-lg border border-border shadow-sm">
          <p className="text-red-500">
            Erro ao carregar orçamentos. Por favor, tente novamente.
          </p>
          <ProposalsTable initialBudgets={[]} totalBudgets={0} />
        </div>
      </div>
    );
  }
}
