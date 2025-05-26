"use client"

import { useSession } from "next-auth/react"

export default function DashboardPage() {
  const { data: session } = useSession()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-2">Bem-vindo ao painel de controle do Vexxa App</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-card p-6 rounded-lg border border-border shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Bem-vindo!</h2>
          <p className="text-muted-foreground mb-4">
            Você está conectado com o email: <span className="font-medium">{session?.user?.email}</span>
          </p>
        </div>

        <div className="bg-card p-6 rounded-lg border border-border shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Orçamentos Recentes</h2>
          <p className="text-muted-foreground">Visualize seus orçamentos mais recentes aqui.</p>
        </div>

        <div className="bg-card p-6 rounded-lg border border-border shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Estatísticas</h2>
          <p className="text-muted-foreground">Acompanhe suas métricas de desempenho.</p>
        </div>
      </div>
    </div>
  )
}
