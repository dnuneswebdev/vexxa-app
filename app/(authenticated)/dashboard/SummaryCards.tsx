"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardMetrics } from "@/lib/utils/dashboard-calculations";
import {
  ArrowDown,
  ArrowUp,
  Clock,
  FileCheck,
  FileClock,
  FileText,
} from "lucide-react";

interface SummaryCardsProps {
  metrics: DashboardMetrics;
}

export function SummaryCards({ metrics }: SummaryCardsProps) {
  const {
    totalBudgets,
    weeklyBudgets,
    pendingBudgets,
    completedBudgets,
    weeklyTrend,
    monthlyTrend,
  } = metrics;

  // Calcula percentuais para melhor visualização
  const pendingPercentage =
    totalBudgets > 0 ? Math.round((pendingBudgets / totalBudgets) * 100) : 0;

  const completedPercentage =
    totalBudgets > 0 ? Math.round((completedBudgets / totalBudgets) * 100) : 0;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <SummaryCard
        title="Total de orçamentos"
        value={totalBudgets.toString()}
        description="Desde o mês passado"
        trend={monthlyTrend}
        icon={<FileText className="h-6 w-6 text-secondary" />}
      />
      <SummaryCard
        title="Orçamentos da semana"
        value={weeklyBudgets.toString()}
        description="Comparado a semana passada"
        trend={weeklyTrend}
        icon={<FileClock className="h-6 w-6 text-secondary" />}
      />
      <SummaryCard
        title="Orçamentos pendentes"
        value={pendingBudgets.toString()}
        description={`${pendingPercentage}% do total`}
        trend={0} // Não mostra trend para pendentes
        icon={<Clock className="h-6 w-6 text-secondary" />}
      />
      <SummaryCard
        title="Orçamentos concluídos"
        value={completedBudgets.toString()}
        description={`${completedPercentage}% do total`}
        trend={0} // Não mostra trend para concluídos
        icon={<FileCheck className="h-6 w-6 text-secondary" />}
      />
    </div>
  );
}

interface SummaryCardProps {
  title: string;
  value: string;
  description: string;
  trend: number;
  icon: React.ReactNode;
}

function SummaryCard({
  title,
  value,
  description,
  trend,
  icon,
}: SummaryCardProps) {
  const getTrendColor = (trend: number) => {
    if (trend > 0) return "text-emerald-600";
    if (trend < 0) return "text-rose-500";
    return "text-muted-foreground";
  };

  const getTrendIcon = (trend: number) => {
    if (trend > 0) return <ArrowUp className="h-4 w-4" />;
    if (trend < 0) return <ArrowDown className="h-4 w-4" />;
    return null;
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium uppercase tracking-tight">
          {title}
        </CardTitle>
        <span className="opacity-70">{icon}</span>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground mb-1">{value}</div>
        <div className="flex items-center pt-1">
          {trend !== 0 && (
            <span className={`mr-1 flex items-center ${getTrendColor(trend)}`}>
              {getTrendIcon(trend)}
            </span>
          )}
          <p className={`text-xs ${getTrendColor(trend)}`}>
            {trend !== 0 && (
              <span className="font-medium">
                {trend > 0 ? "+" : ""}
                {trend}%{" "}
              </span>
            )}
            {description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
