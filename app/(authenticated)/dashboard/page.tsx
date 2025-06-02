import { getBudgets } from "@/lib/actions/proposals.actions";
import { calculateDashboardMetrics } from "@/lib/utils/dashboard-calculations";
import { ProposalsChart } from "./Chart";
import { SummaryCards } from "./SummaryCards";

export default async function DashboardPage() {
  try {
    // Fetch proposals data server-side
    const budgets = await getBudgets();

    // Se não há orçamentos ou erro na busca, passa métricas zeradas
    const metrics = budgets
      ? calculateDashboardMetrics(budgets)
      : {
          totalBudgets: 0,
          weeklyBudgets: 0,
          pendingBudgets: 0,
          completedBudgets: 0,
          weeklyTrend: 0,
          monthlyTrend: 0,
        };

    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Bem-vindo ao painel de controle do Vexxa App
          </p>
        </div>

        {/* Summary Cards com dados calculados */}
        <SummaryCards metrics={metrics} />

        {/* Charts */}
        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
          <ProposalsChart />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error loading dashboard:", error);

    // Fallback com métricas zeradas em caso de erro
    const emptyMetrics = {
      totalBudgets: 0,
      weeklyBudgets: 0,
      pendingBudgets: 0,
      completedBudgets: 0,
      weeklyTrend: 0,
      monthlyTrend: 0,
    };

    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Bem-vindo ao painel de controle do Vexxa App
          </p>
        </div>

        <SummaryCards metrics={emptyMetrics} />

        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
          <ProposalsChart />
        </div>
      </div>
    );
  }
}
