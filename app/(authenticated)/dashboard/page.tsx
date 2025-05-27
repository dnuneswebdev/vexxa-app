"use client"

import { ProposalsChart } from "./Chart"
import { SummaryCards } from "./SummaryCards"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-2">Bem-vindo ao painel de controle do Vexxa App</p>
      </div>

      {/* Summary Cards */}
      <SummaryCards />

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
        <ProposalsChart />
      </div>
    </div>
  )
}
