import type {Metadata} from "next";
import {getAllBudgets} from "@/lib/actions/proposals.actions";
import {calculateDashboardMetrics} from "@/lib/utils/dashboard-calculations";
import {ProposalsChart} from "./Chart";
import {SummaryCards} from "./SummaryCards";
import {generateChartData} from "@/lib/utils/charts-calculations";

export const metadata: Metadata = {
  title: "VEXXA App | Dashboard",
  description: "Sistema de automação de propostas via WhatsApp",
};

export default async function DashboardPage() {
  try {
    const {data, count} = await getAllBudgets();

    // Se não há orçamentos ou erro na busca, passa métricas zeradas
    const metrics = data
      ? calculateDashboardMetrics(data, count)
      : {
          totalBudgets: 0,
          weeklyBudgets: 0,
          pendingBudgets: 0,
          completedBudgets: 0,
          weeklyTrend: 0,
          monthlyTrend: 0,
        };

    // Gera dados do gráfico dos últimos 12 meses
    const chartData = generateChartData(data || []);

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
          <ProposalsChart data={chartData} />
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

    const emptyChartData = generateChartData([]);

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
          <ProposalsChart data={emptyChartData} />
        </div>
      </div>
    );
  }
}
