"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2 } from "lucide-react"
import { supabase, type Task } from "@/lib/supabase"
import { TaskForm } from "./task-form"

interface TaskItemProps {
  task: Task
  onTaskUpdated: () => void
}

export function TaskItem({ task, onTaskUpdated }: TaskItemProps) {
  const [loading, setLoading] = useState(false)

  const toggleCompleted = async () => {
    setLoading(true)
    try {
      const { error } = await supabase.from("tasks").update({ completed: !task.completed }).eq("id", task.id)

      if (error) throw error
      onTaskUpdated()
    } catch (error) {
      console.error("Error updating task:", error)
    } finally {
      setLoading(false)
    }
  }

  const deleteTask = async () => {
    if (!confirm("Tem certeza que deseja excluir esta tarefa?")) return

    setLoading(true)
    try {
      const { error } = await supabase.from("tasks").delete().eq("id", task.id)

      if (error) throw error
      onTaskUpdated()
    } catch (error) {
      console.error("Error deleting task:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className={`transition-opacity ${task.completed ? "opacity-60" : ""}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3 flex-1">
            <Checkbox checked={task.completed} onCheckedChange={toggleCompleted} disabled={loading} />
            <div className="flex-1">
              <h3 className={`font-medium ${task.completed ? "line-through text-muted-foreground" : ""}`}>
                {task.title}
              </h3>
              {task.description && (
                <p
                  className={`text-sm mt-1 ${task.completed ? "line-through text-muted-foreground" : "text-muted-foreground"}`}
                >
                  {task.description}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant={task.completed ? "secondary" : "default"}>
              {task.completed ? "Concluída" : "Pendente"}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">
            Criada em {new Date(task.created_at).toLocaleDateString("pt-BR")}
          </span>
          <div className="flex space-x-2">
            <TaskForm
              task={task}
              onTaskSaved={onTaskUpdated}
              trigger={
                <Button variant="ghost" size="sm" disabled={loading}>
                  <Edit className="w-4 h-4" />
                </Button>
              }
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={deleteTask}
              disabled={loading}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
