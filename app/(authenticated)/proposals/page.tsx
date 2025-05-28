"use client";

import ProposalsTable from "./PorposalsTable";

export default function ProposalsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Orçamentos</h1>
        <p className="text-muted-foreground mt-2">
          Gerencie todos os orçamentos enviados
        </p>
      </div>

      <div className="bg-card p-6 rounded-lg border border-border shadow-sm">
        <ProposalsTable />
      </div>
    </div>
  );
}
