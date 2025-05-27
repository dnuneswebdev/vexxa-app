"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const chartData = [
  { name: 'Jan', propostas: 15 },
  { name: 'Fev', propostas: 14 },
  { name: 'Mar', propostas: 5 },
  { name: 'Abr', propostas: 8 },
  { name: 'Mai', propostas: 3 },
  { name: 'Jun', propostas: 14 },
  { name: 'Jul', propostas: 13 },
  { name: 'Ago', propostas: 15 },
  { name: 'Set', propostas: 16 },
  { name: 'Out', propostas: 18 },
  { name: 'Nov', propostas: 17 },
  { name: 'Dez', propostas: 19 },
]

export function ProposalsChart() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex flex-col space-y-1">
          <CardTitle className="text-base font-medium">Propostas por mês</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="propostas" fill="#7b3edf" name="Propostas geradas" radius={[4, 4, 0, 0]} barSize={50}/>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}