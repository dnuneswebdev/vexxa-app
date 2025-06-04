import { startOfWeek, endOfWeek, isWithinInterval, subWeeks, startOfMonth, subMonths } from 'date-fns'

export interface Budget {
  id: string
  status: 'pendente' | 'concluido' | 'cancelado'
  created_at: string
}

export interface DashboardMetrics {
  totalBudgets: number
  weeklyBudgets: number
  pendingBudgets: number
  completedBudgets: number
  weeklyTrend: number
  monthlyTrend: number
}

export function calculateDashboardMetrics(budgets: Budget[], count: number): DashboardMetrics {
  if (!budgets || budgets.length === 0) {
    return {
      totalBudgets: 0,
      weeklyBudgets: 0,
      pendingBudgets: 0,
      completedBudgets: 0,
      weeklyTrend: 0,
      monthlyTrend: 0,
    }
  }

  const now = new Date()
  
  // Períodos de tempo
  const currentWeekStart = startOfWeek(now, { weekStartsOn: 1 }) // Segunda-feira
  const currentWeekEnd = endOfWeek(now, { weekStartsOn: 1 })
  
  const lastWeekStart = startOfWeek(subWeeks(now, 1), { weekStartsOn: 1 })
  const lastWeekEnd = endOfWeek(subWeeks(now, 1), { weekStartsOn: 1 })
  
  const currentMonthStart = startOfMonth(now)
  const lastMonthStart = startOfMonth(subMonths(now, 1))

  // Métricas básicas
  const totalBudgets = count
  const pendingBudgets = budgets.filter(budget => budget.status === 'pendente').length
  const completedBudgets = budgets.filter(budget => budget.status === 'concluido').length

  // Orçamentos da semana atual
  const weeklyBudgets = budgets.filter(budget => {
    const budgetDate = new Date(budget.created_at)
    return isWithinInterval(budgetDate, {
      start: currentWeekStart,
      end: currentWeekEnd,
    })
  }).length

  // Orçamentos da semana passada (para trend)
  const lastWeekBudgets = budgets.filter(budget => {
    const budgetDate = new Date(budget.created_at)
    return isWithinInterval(budgetDate, {
      start: lastWeekStart,
      end: lastWeekEnd,
    })
  }).length

  // Orçamentos do mês atual e passado (para trend mensal)
  const currentMonthBudgets = budgets.filter(budget => {
    const budgetDate = new Date(budget.created_at)
    return budgetDate >= currentMonthStart
  }).length

  const lastMonthBudgets = budgets.filter(budget => {
    const budgetDate = new Date(budget.created_at)
    return budgetDate >= lastMonthStart && budgetDate < currentMonthStart
  }).length

  // Cálculo de trends (percentual de mudança)
  const weeklyTrend = lastWeekBudgets === 0 
    ? weeklyBudgets > 0 ? 100 : 0
    : Math.round(((weeklyBudgets - lastWeekBudgets) / lastWeekBudgets) * 100)

  const monthlyTrend = lastMonthBudgets === 0
    ? currentMonthBudgets > 0 ? 100 : 0
    : Math.round(((currentMonthBudgets - lastMonthBudgets) / lastMonthBudgets) * 100)

  return {
    totalBudgets,
    weeklyBudgets,
    pendingBudgets,
    completedBudgets,
    weeklyTrend,
    monthlyTrend,
  }
}