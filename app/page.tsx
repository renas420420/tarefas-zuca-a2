"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { supabase, type Task } from "@/lib/supabase"
import { TaskForm } from "@/components/task-form"
import { TaskItem } from "@/components/task-item"
import { CheckCircle, Clock, User } from "lucide-react"

export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)

  const fetchTasks = async () => {
    try {
      const { data, error } = await supabase.from("tasks").select("*").order("created_at", { ascending: false })

      if (error) throw error
      setTasks(data || [])
    } catch (error) {
      console.error("Error fetching tasks:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const groupedTasks = tasks.reduce(
    (acc, task) => {
      if (!acc[task.assignee]) {
        acc[task.assignee] = []
      }
      acc[task.assignee].push(task)
      return acc
    },
    {} as Record<string, Task[]>,
  )

  const getStats = (assigneeTasks: Task[]) => {
    const completed = assigneeTasks.filter((task) => task.completed).length
    const total = assigneeTasks.length
    return { completed, total, pending: total - completed }
  }

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-muted-foreground">Carregando tarefas...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Gerenciador de Tarefas</h1>
          <p className="text-muted-foreground mt-2">Organize e acompanhe as tarefas da equipe</p>
        </div>
        <TaskForm onTaskSaved={fetchTasks} />
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-orange-500" />
              <div>
                <p className="text-2xl font-bold">{tasks.filter((task) => !task.completed).length}</p>
                <p className="text-sm text-muted-foreground">Tarefas Pendentes</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-2xl font-bold">{tasks.filter((task) => task.completed).length}</p>
                <p className="text-sm text-muted-foreground">Tarefas Concluídas</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">{tasks.length}</p>
                <p className="text-sm text-muted-foreground">Total de Tarefas</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tasks by Assignee */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {(["Victor", "Lucas"] as const).map((assignee) => {
          const assigneeTasks = groupedTasks[assignee] || []
          const stats = getStats(assigneeTasks)

          return (
            <Card key={assignee} className="h-fit">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <User className="w-5 h-5" />
                    <span>{assignee}</span>
                  </CardTitle>
                  <div className="flex space-x-2">
                    <Badge variant="outline">
                      {stats.total} {stats.total === 1 ? "tarefa" : "tarefas"}
                    </Badge>
                    {stats.completed > 0 && (
                      <Badge variant="secondary">
                        {stats.completed} concluída{stats.completed !== 1 ? "s" : ""}
                      </Badge>
                    )}
                  </div>
                </div>
                {stats.total > 0 && (
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{
                        width: `${(stats.completed / stats.total) * 100}%`,
                      }}
                    />
                  </div>
                )}
              </CardHeader>
              <CardContent>
                {assigneeTasks.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <User className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Nenhuma tarefa atribuída</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {assigneeTasks.map((task) => (
                      <TaskItem key={task.id} task={task} onTaskUpdated={fetchTasks} />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
