/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import {
  calculateChartStats,
  ChartDataPoint,
} from "@/lib/utils/charts-calculations";

interface ProposalsChartProps {
  data: ChartDataPoint[];
}

export function ProposalsChart({ data }: ProposalsChartProps) {
  const stats = calculateChartStats(data);

  // Custom tooltip para melhor UX
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const value = payload[0].value;
      return (
        <div className="bg-background border border-border rounded-lg shadow-lg p-3">
          <p className="font-medium text-foreground">{label}</p>
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-primary">{value}</span>
            {value === 1 ? " proposta gerada" : " propostas geradas"}
          </p>
        </div>
      );
    }
    return null;
  };

  // Ícone de trend baseado na tendência
  const getTrendIcon = () => {
    if (stats.trend > 0)
      return <TrendingUp className="h-4 w-4 text-emerald-600" />;
    if (stats.trend < 0)
      return <TrendingDown className="h-4 w-4 text-rose-500" />;
    return <Minus className="h-4 w-4 text-muted-foreground" />;
  };

  const getTrendColor = () => {
    if (stats.trend > 0) return "text-emerald-600";
    if (stats.trend < 0) return "text-rose-500";
    return "text-muted-foreground";
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex flex-col space-y-1">
          <CardTitle className="text-base font-medium">
            Propostas por mês (últimos 12 meses)
          </CardTitle>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>
              Total:{" "}
              <span className="font-medium text-foreground">
                {stats.totalProposals}
              </span>
            </span>
            <span>
              Média:{" "}
              <span className="font-medium text-foreground">
                {stats.averagePerMonth}/mês
              </span>
            </span>
            <div className="flex items-center gap-1">
              {getTrendIcon()}
              <span className={getTrendColor()}>
                {stats.trend !== 0 && (
                  <>
                    {stats.trend > 0 ? "+" : ""}
                    {stats.trend}%
                  </>
                )}
                {stats.trend === 0 && "Estável"}
              </span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                className="opacity-30"
              />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                allowDecimals={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: "12px" }} iconType="rect" />
              <Bar
                dataKey="propostas"
                fill="#7b3edf"
                name="Propostas geradas"
                radius={[4, 4, 0, 0]}
                barSize={50}
                className="hover:opacity-80 transition-opacity"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Informações adicionais */}
        {stats.highestMonth && (
          <div className="mt-4 pt-4 border-t border-border">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">
                  Mês com mais propostas:
                </span>
                <p className="font-medium text-foreground">
                  {stats.highestMonth.name} ({stats.highestMonth.propostas})
                </p>
              </div>
              <div>
                <span className="text-muted-foreground">
                  Mês com menos propostas:
                </span>
                <p className="font-medium text-foreground">
                  {stats.lowestMonth?.name} ({stats.lowestMonth?.propostas})
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
