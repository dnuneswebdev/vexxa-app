// utils/chart-calculations.ts
import { format, subMonths, startOfMonth, endOfMonth, isWithinInterval } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export interface Budget {
  id: string
  status: 'pendente' | 'concluido' | 'cancelado'
  created_at: string
}

export interface ChartDataPoint {
  name: string
  fullDate: string
  propostas: number
  month: number
  year: number
}

/**
 * Gera dados do gráfico para os últimos 12 meses
 * Sempre mostra os últimos 12 meses completos, independente do ano
 * @param budgets Array de orçamentos do usuário
 * @returns Array formatado para o gráfico com dados dos últimos 12 meses
 */
export function generateChartData(budgets: Budget[]): ChartDataPoint[] {
  if (!budgets || budgets.length === 0) {
    return generateEmptyChartData()
  }

  const now = new Date()
  const chartData: ChartDataPoint[] = []

  // Gera os últimos 12 meses (incluindo o mês atual)
  for (let i = 11; i >= 0; i--) {
    const targetDate = subMonths(now, i)
    const monthStart = startOfMonth(targetDate)
    const monthEnd = endOfMonth(targetDate)
    
    // Conta orçamentos criados neste mês específico
    const budgetsInMonth = budgets.filter(budget => {
      const budgetDate = new Date(budget.created_at)
      return isWithinInterval(budgetDate, {
        start: monthStart,
        end: monthEnd,
      })
    }).length

    const month = targetDate.getMonth() + 1
    const year = targetDate.getFullYear()
    
    chartData.push({
      name: format(targetDate, 'MMM yyyy', { locale: ptBR }), // "Jan 2025"
      fullDate: format(targetDate, 'yyyy-MM'), // "2025-01" para ordenação
      propostas: budgetsInMonth,
      month,
      year,
    })
  }

  return chartData
}

/**
 * Gera estrutura vazia do gráfico quando não há dados
 * Útil para manter consistência visual
 */
function generateEmptyChartData(): ChartDataPoint[] {
  const now = new Date()
  const chartData: ChartDataPoint[] = []

  for (let i = 11; i >= 0; i--) {
    const targetDate = subMonths(now, i)
    const month = targetDate.getMonth() + 1
    const year = targetDate.getFullYear()
    
    chartData.push({
      name: format(targetDate, 'MMM yyyy', { locale: ptBR }),
      fullDate: format(targetDate, 'yyyy-MM'),
      propostas: 0,
      month,
      year,
    })
  }

  return chartData
}

/**
 * Calcula estatísticas adicionais do gráfico
 * @param chartData Dados do gráfico
 * @returns Objeto com estatísticas calculadas
 */
export function calculateChartStats(chartData: ChartDataPoint[]) {
  if (!chartData || chartData.length === 0) {
    return {
      totalProposals: 0,
      averagePerMonth: 0,
      highestMonth: null,
      lowestMonth: null,
      trend: 0,
    }
  }

  const totalProposals = chartData.reduce((sum, item) => sum + item.propostas, 0)
  const averagePerMonth = Math.round(totalProposals / chartData.length)
  
  const sortedByValue = [...chartData].sort((a, b) => b.propostas - a.propostas)
  const highestMonth = sortedByValue[0]
  const lowestMonth = sortedByValue[sortedByValue.length - 1]
  
  // Calcula trend comparando os últimos 3 meses com os 3 anteriores
  const recentMonths = chartData.slice(-3)
  const previousMonths = chartData.slice(-6, -3)
  
  const recentAverage = recentMonths.reduce((sum, item) => sum + item.propostas, 0) / 3
  const previousAverage = previousMonths.reduce((sum, item) => sum + item.propostas, 0) / 3
  
  const trend = previousAverage === 0 
    ? recentAverage > 0 ? 100 : 0
    : Math.round(((recentAverage - previousAverage) / previousAverage) * 100)

  return {
    totalProposals,
    averagePerMonth,
    highestMonth,
    lowestMonth,
    trend,
  }
}