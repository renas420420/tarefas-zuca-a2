"use client"

import { useStore } from "../../hooks/useStore"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Medal, Award, User } from "lucide-react"

export default function PerformancePage() {
  const { employees } = useStore()

  const sortedEmployees = [...employees].sort((a, b) => b.monthlyPoints - a.monthlyPoints)

  const getRankIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Trophy className="h-6 w-6 text-yellow-500" />
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />
      case 3:
        return <Award className="h-6 w-6 text-amber-600" />
      default:
        return <User className="h-6 w-6 text-muted-foreground" />
    }
  }

  const getRankColor = (position: number) => {
    switch (position) {
      case 1:
        return "bg-yellow-100 border-yellow-300 dark:bg-yellow-900/20"
      case 2:
        return "bg-gray-100 border-gray-300 dark:bg-gray-900/20"
      case 3:
        return "bg-amber-100 border-amber-300 dark:bg-amber-900/20"
      default:
        return ""
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Trophy className="h-8 w-8" />
        <h1 className="text-3xl font-bold">Performance - Ranking Mensal</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Ranking de Funcionários por Pontos do Mês</CardTitle>
        </CardHeader>
        <CardContent>
          {sortedEmployees.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">Nenhum funcionário cadastrado</p>
          ) : (
            <div className="space-y-3">
              {sortedEmployees.map((employee, index) => {
                const position = index + 1
                return (
                  <div
                    key={employee.id}
                    className={`flex items-center justify-between p-4 border rounded-lg ${getRankColor(position)}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        {getRankIcon(position)}
                        <Badge variant="outline" className="text-lg font-bold px-3 py-1">
                          #{position}
                        </Badge>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{employee.name}</h3>
                        <p className="text-sm text-muted-foreground">Pontos hoje: {employee.dailyPoints}</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">{employee.monthlyPoints}</div>
                      <div className="text-sm text-muted-foreground">pontos no mês</div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Estatísticas Gerais */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              <div>
                <p className="text-sm text-muted-foreground">Maior Pontuação</p>
                <p className="text-2xl font-bold">
                  {sortedEmployees.length > 0 ? sortedEmployees[0].monthlyPoints : 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Total de Funcionários</p>
                <p className="text-2xl font-bold">{employees.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Pontos Totais</p>
                <p className="text-2xl font-bold">{employees.reduce((total, emp) => total + emp.monthlyPoints, 0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
