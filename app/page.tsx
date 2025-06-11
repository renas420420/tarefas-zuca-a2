"use client"

import { useStore } from "../hooks/useStore"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, User, Calendar, Trophy } from "lucide-react"

export default function Dashboard() {
  const { employees, getEmployeeNextTask, completeTask } = useStore()

  const handleCompleteTask = (taskId: string) => {
    completeTask(taskId)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <User className="h-8 w-8" />
        <h1 className="text-3xl font-bold">Dashboard - Funcionários</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {employees.map((employee) => {
          const nextTask = getEmployeeNextTask(employee.id)

          return (
            <Card key={employee.id} className="relative">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  {employee.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Próxima Tarefa */}
                <div className="space-y-2">
                  <h4 className="font-medium text-sm text-muted-foreground">Próxima Tarefa:</h4>
                  {nextTask ? (
                    <div className="space-y-2">
                      <p className="text-sm font-medium">{nextTask.name}</p>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{nextTask.points} pontos</Badge>
                        <Button
                          size="sm"
                          onClick={() => handleCompleteTask(nextTask.id)}
                          className="flex items-center gap-1"
                        >
                          <CheckCircle className="h-4 w-4" />
                          Feito
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">Nenhuma tarefa pendente</p>
                  )}
                </div>

                {/* Pontuação */}
                <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Calendar className="h-4 w-4 text-blue-500" />
                      <span className="text-xs font-medium text-muted-foreground">Hoje</span>
                    </div>
                    <p className="text-2xl font-bold text-blue-600">{employee.dailyPoints}</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Trophy className="h-4 w-4 text-orange-500" />
                      <span className="text-xs font-medium text-muted-foreground">Mês</span>
                    </div>
                    <p className="text-2xl font-bold text-orange-600">{employee.monthlyPoints}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {employees.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <User className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-lg font-medium text-muted-foreground">Nenhum funcionário cadastrado</p>
            <p className="text-sm text-muted-foreground">Vá para a aba Funcionários para adicionar funcionários</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
