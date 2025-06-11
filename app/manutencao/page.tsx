"use client"

import type React from "react"

import { useState } from "react"
import { useStore } from "../../hooks/useStore"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Wrench, ShoppingCart, Plus, Trash2 } from "lucide-react"

export default function MaintenancePage() {
  const { employees, tasks, addTask, removeTask, maintenanceResponsible, setMaintenanceResponsible } = useStore()
  const [maintenanceTask, setMaintenanceTask] = useState("")
  const [purchaseTask, setPurchaseTask] = useState("")

  const maintenanceTasks = tasks.filter((task) => task.category === "manutencao" && !task.completed)
  const purchaseTasks = tasks.filter((task) => task.category === "compra" && !task.completed)

  const handleAddMaintenance = (e: React.FormEvent) => {
    e.preventDefault()
    if (!maintenanceTask.trim()) return

    addTask({
      name: maintenanceTask,
      type: "pontual",
      employeeId: maintenanceResponsible,
      completed: false,
      points: 5,
      category: "manutencao",
    })
    setMaintenanceTask("")
  }

  const handleAddPurchase = (e: React.FormEvent) => {
    e.preventDefault()
    if (!purchaseTask.trim()) return

    addTask({
      name: purchaseTask,
      type: "pontual",
      employeeId: maintenanceResponsible,
      completed: false,
      points: 5,
      category: "compra",
    })
    setPurchaseTask("")
  }

  const responsibleEmployee = employees.find((emp) => emp.id === maintenanceResponsible)

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Wrench className="h-8 w-8" />
        <h1 className="text-3xl font-bold">Manutenção e Compras</h1>
      </div>

      {/* Funcionário Responsável */}
      <Card>
        <CardHeader>
          <CardTitle>Funcionário Responsável</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Label>Responsável pelas tarefas de manutenção e compras:</Label>
            <Select value={maintenanceResponsible} onValueChange={setMaintenanceResponsible}>
              <SelectTrigger className="w-64">
                <SelectValue />
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
          {responsibleEmployee && (
            <p className="text-sm text-muted-foreground mt-2">
              Todas as tarefas serão atribuídas a {responsibleEmployee.name} e valem 5 pontos cada
            </p>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Manutenções */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wrench className="h-5 w-5" />
              Manutenções
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleAddMaintenance} className="space-y-2">
              <Label htmlFor="maintenance">Nova Manutenção</Label>
              <div className="flex gap-2">
                <Input
                  id="maintenance"
                  value={maintenanceTask}
                  onChange={(e) => setMaintenanceTask(e.target.value)}
                  placeholder="Descreva a manutenção necessária"
                />
                <Button type="submit" disabled={!maintenanceTask.trim()}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </form>

            <div className="space-y-2">
              {maintenanceTasks.length === 0 ? (
                <p className="text-center text-muted-foreground py-4">Nenhuma manutenção pendente</p>
              ) : (
                maintenanceTasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="text-sm">{task.name}</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeTask(task.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Compras */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Compras
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleAddPurchase} className="space-y-2">
              <Label htmlFor="purchase">Nova Compra</Label>
              <div className="flex gap-2">
                <Input
                  id="purchase"
                  value={purchaseTask}
                  onChange={(e) => setPurchaseTask(e.target.value)}
                  placeholder="Descreva o item a ser comprado"
                />
                <Button type="submit" disabled={!purchaseTask.trim()}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </form>

            <div className="space-y-2">
              {purchaseTasks.length === 0 ? (
                <p className="text-center text-muted-foreground py-4">Nenhuma compra pendente</p>
              ) : (
                purchaseTasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="text-sm">{task.name}</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeTask(task.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
