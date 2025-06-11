"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Trash2, Plus } from "lucide-react"

interface Task {
  id: string
  title: string
  description: string
  urgency: number
  impact: number
  effort: number
  priority: number
}

export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    urgency: 1,
    impact: 1,
    effort: 1,
  })

  const addTask = () => {
    if (formData.title.trim() === "") return

    const newTask: Task = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      urgency: formData.urgency,
      impact: formData.impact,
      effort: formData.effort,
      priority: formData.urgency * formData.impact * formData.effort,
    }

    setTasks((prev) => [...prev, newTask])
    setFormData({
      title: "",
      description: "",
      urgency: 1,
      impact: 1,
      effort: 1,
    })
  }

  const removeTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  const sortedTasks = [...tasks].sort((a, b) => b.priority - a.priority)

  const getPriorityColor = (priority: number) => {
    if (priority >= 100) return "bg-red-500"
    if (priority >= 50) return "bg-orange-500"
    if (priority >= 25) return "bg-yellow-500"
    if (priority >= 10) return "bg-blue-500"
    return "bg-gray-500"
  }

  const getPriorityLabel = (priority: number) => {
    if (priority >= 100) return "Crítica"
    if (priority >= 50) return "Alta"
    if (priority >= 25) return "Média"
    if (priority >= 10) return "Baixa"
    return "Muito Baixa"
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Gerenciador de Tarefas com Priorização</h1>
        <p className="text-muted-foreground">
          Organize suas tarefas por prioridade baseada em urgência, impacto e esforço
        </p>
      </div>

      {/* Formulário para adicionar tarefas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Adicionar Nova Tarefa
          </CardTitle>
          <CardDescription>Preencha os campos abaixo. A prioridade será calculada automaticamente.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                placeholder="Digite o título da tarefa"
                value={formData.title}
                onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label>Prioridade Calculada</Label>
              <div className="flex items-center gap-2">
                <Badge className={getPriorityColor(formData.urgency * formData.impact * formData.effort)}>
                  {formData.urgency * formData.impact * formData.effort}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {getPriorityLabel(formData.urgency * formData.impact * formData.effort)}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              placeholder="Descreva a tarefa em detalhes"
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              className="min-h-[80px]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="urgency">Urgência (1-5)</Label>
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
                      {num} -{" "}
                      {num === 1
                        ? "Muito Baixa"
                        : num === 2
                          ? "Baixa"
                          : num === 3
                            ? "Média"
                            : num === 4
                              ? "Alta"
                              : "Muito Alta"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="impact">Impacto (1-5)</Label>
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
                      {num} -{" "}
                      {num === 1
                        ? "Muito Baixo"
                        : num === 2
                          ? "Baixo"
                          : num === 3
                            ? "Médio"
                            : num === 4
                              ? "Alto"
                              : "Muito Alto"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="effort">Esforço (1-5)</Label>
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
                      {num} -{" "}
                      {num === 1
                        ? "Muito Baixo"
                        : num === 2
                          ? "Baixo"
                          : num === 3
                            ? "Médio"
                            : num === 4
                              ? "Alto"
                              : "Muito Alto"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button onClick={addTask} className="w-full" disabled={!formData.title.trim()}>
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Tarefa
          </Button>
        </CardContent>
      </Card>

      {/* Lista de tarefas */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Tarefas Ordenadas por Prioridade</h2>
          <Badge variant="outline">
            {tasks.length} {tasks.length === 1 ? "tarefa" : "tarefas"}
          </Badge>
        </div>

        {sortedTasks.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="text-center space-y-2">
                <p className="text-lg font-medium text-muted-foreground">Nenhuma tarefa cadastrada</p>
                <p className="text-sm text-muted-foreground">Adicione sua primeira tarefa usando o formulário acima</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {sortedTasks.map((task, index) => (
              <Card key={task.id} className="relative">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <Badge className="text-xs font-bold">#{index + 1}</Badge>
                        <CardTitle className="text-lg">{task.title}</CardTitle>
                        <Badge className={getPriorityColor(task.priority)}>
                          {task.priority} - {getPriorityLabel(task.priority)}
                        </Badge>
                      </div>
                      {task.description && <CardDescription className="mt-2">{task.description}</CardDescription>}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeTask(task.id)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <span className="font-medium">Urgência:</span>
                      <Badge variant="outline">{task.urgency}</Badge>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="font-medium">Impacto:</span>
                      <Badge variant="outline">{task.impact}</Badge>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="font-medium">Esforço:</span>
                      <Badge variant="outline">{task.effort}</Badge>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="font-medium">Cálculo:</span>
                      <span className="text-muted-foreground">
                        {task.urgency} × {task.impact} × {task.effort} = {task.priority}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
