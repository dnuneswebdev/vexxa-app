"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDown, ArrowUp, Clock, FileCheck, FileClock, FileText } from "lucide-react"

export function SummaryCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <SummaryCard 
        title="Total de orçamentos"
        value="542"
        description="Desde o mês passado"
        trend={12}
        icon={<FileText className="h-6 w-6 text-secondary" />}
      />
      <SummaryCard 
        title="Orçamentos da semana"
        value="35"
        description="Comparado a semana passada"
        trend={-16}
        icon={<FileClock className="h-6 w-6 text-secondary" />}
      />
      <SummaryCard 
        title="Orçamentos pendentes"
        value="42"
        description="15% do total"
        trend={0}
        icon={<Clock className="h-6 w-6 text-secondary" />}
      />
      <SummaryCard 
        title="Orçamentos concluídos"
        value="500"
        description="85% do total"
        trend={0}
        icon={<FileCheck className="h-6 w-6 text-secondary" />}
      />
    </div>
  )
}

interface SummaryCardProps {
  title: string
  value: string
  description: string
  trend: number
  icon: React.ReactNode
}

function SummaryCard({ title, value, description, trend, icon }: SummaryCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium uppercase">
          {title}
        </CardTitle>
        <span>{icon}</span>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center pt-1">
          {trend !== 0 && (
            <span className={`mr-1 ${trend > 0 ? 'text-secondary' : 'text-rose-500'}`}>
              {trend > 0 ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
            </span>
          )}
          <p className={`text-xs ${trend > 0 ? 'text-secondary' : trend < 0 ? 'text-rose-500' : ''}`}>
            {trend !== 0 ? `${Math.abs(trend)}%` : ''} {description}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}