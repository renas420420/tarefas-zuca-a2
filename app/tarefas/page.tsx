"use client"

import type React from "react"

import { useState } from "react"
import { useStore } from "../../hooks/useStore"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Plus, ClipboardList, Trash2 } from "lucide-react"
import type { Task } from "../../types"

export default function TasksPage() {
  const { employees, tasks, addTask, removeTask } = useStore()
  const [formData, setFormData] = useState({
    name: "",
    type: "pontual" as "pontual" | "rotina",
    employeeId: "",
    impact: 1,
    effort: 1,
    urgency: 1,
    frequency: "diaria" as "diaria" | "semanal" | "quinzenal" | "mensal",
  })

  const calculatePoints = () => {
    if (formData.type === "pontual") {
      return formData.impact * formData.effort * formData.urgency
    } else {
      const frequencyPoints = {
        diaria: 5,
        semanal: 10,
        quinzenal: 15,
        mensal: 20,
      }
      return frequencyPoints[formData.frequency]
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.employeeId) return

    const newTask: Omit<Task, "id"> = {
      name: formData.name,
      type: formData.type,
      employeeId: formData.employeeId,
      completed: false,
      points: calculatePoints(),
      ...(formData.type === "pontual"
        ? {
            impact: formData.impact,
            effort: formData.effort,
            urgency: formData.urgency,
          }
        : {
            frequency: formData.frequency,
          }),
    }

    addTask(newTask)
    setFormData({
      name: "",
      type: "pontual",
      employeeId: "",
      impact: 1,
      effort: 1,
      urgency: 1,
      frequency: "diaria",
    })
  }

  const activeTasks = tasks.filter((task) => !task.completed && !task.category)

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <ClipboardList className="h-8 w-8" />
        <h1 className="text-3xl font-bold">Tarefas e Rotinas</h1>
      </div>

      {/* Formulário de Nova Tarefa */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Cadastrar Nova Tarefa
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="taskName">Nome da Tarefa</Label>
                <Input
                  id="taskName"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Digite o nome da tarefa"
                />
              </div>
              <div className="space-y-2">
                <Label>Funcionário</Label>
                <Select
                  value={formData.employeeId}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, employeeId: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um funcionário" />
                  </SelectTrigger>
                  <SelectContent>
                    {employees.map((employee) => (
                      <SelectItem key={employee.id} value={employee.id}>
                        {employee.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Tipo de Tarefa</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value: "pontual" | "rotina") => setFormData((prev) => ({ ...prev, type: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pontual">Pontual</SelectItem>
                    <SelectItem value="rotina">Rotina</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Pontos Calculados</Label>
                <div className="flex items-center gap-2">
                  <Badge className="text-lg px-3 py-1">{calculatePoints()} pontos</Badge>
                </div>
              </div>
            </div>

            {formData.type === "pontual" ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Impacto (1-5)</Label>
                  <Select
                    value={formData.impact.toString()}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, impact: Number.parseInt(value) }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num} - {num === 1 ? "Baixo" : num === 5 ? "Alto" : "Médio"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Esforço (1-5)</Label>
                  <Select
                    value={formData.effort.toString()}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, effort: Number.parseInt(value) }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num} - {num === 1 ? "Muito" : num === 5 ? "Pouco" : "Médio"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Urgência (1-5)</Label>
                  <Select
                    value={formData.urgency.toString()}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, urgency: Number.parseInt(value) }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num} - {num === 1 ? "Baixa" : num === 5 ? "Alta" : "Média"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <Label>Frequência</Label>
                <Select
                  value={formData.frequency}
                  onValueChange={(value: "diaria" | "semanal" | "quinzenal" | "mensal") =>
                    setFormData((prev) => ({ ...prev, frequency: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="diaria">Diária (5 pontos)</SelectItem>
                    <SelectItem value="semanal">Semanal (10 pontos)</SelectItem>
                    <SelectItem value="quinzenal">Quinzenal (15 pontos)</SelectItem>
                    <SelectItem value="mensal">Mensal (20 pontos)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <Button type="submit" className="w-full" disabled={!formData.name.trim() || !formData.employeeId}>
              <Plus className="h-4 w-4 mr-2" />
              Cadastrar Tarefa
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Lista de Tarefas */}
      <Card>
        <CardHeader>
          <CardTitle>Tarefas Ativas</CardTitle>
        </CardHeader>
        <CardContent>
          {activeTasks.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">Nenhuma tarefa cadastrada</p>
          ) : (
            <div className="space-y-3">
              {activeTasks.map((task) => {
                const employee = employees.find((emp) => emp.id === task.employeeId)
                return (
                  <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="space-y-1">
                      <h4 className="font-medium">{task.name}</h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>Funcionário: {employee?.name}</span>
                        <Badge variant="outline">{task.points} pontos</Badge>
                        <Badge variant="secondary">
                          {task.type === "pontual" ? "Pontual" : `Rotina ${task.frequency}`}
                        </Badge>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeTask(task.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
