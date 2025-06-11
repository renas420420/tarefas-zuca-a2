"use client"

import type React from "react"

import { useState } from "react"
import { useStore } from "../../hooks/useStore"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Truck, Settings, Plus, Trash2, Calendar } from "lucide-react"

export default function DeliveriesPage() {
  const { employees, tasks, addTask, removeTask } = useStore()
  const [deliveryData, setDeliveryData] = useState({
    name: "",
    date: "",
    employeeId: "",
  })
  const [repairData, setRepairData] = useState({
    name: "",
    date: "",
    employeeId: "",
  })

  const deliveryTasks = tasks.filter((task) => task.category === "entrega" && !task.completed)
  const repairTasks = tasks.filter((task) => task.category === "reparo" && !task.completed)

  const handleAddDelivery = (e: React.FormEvent) => {
    e.preventDefault()
    if (!deliveryData.name.trim() || !deliveryData.employeeId) return

    addTask({
      name: deliveryData.name,
      type: "pontual",
      employeeId: deliveryData.employeeId,
      completed: false,
      points: 30,
      category: "entrega",
      date: deliveryData.date || undefined,
    })
    setDeliveryData({ name: "", date: "", employeeId: "" })
  }

  const handleAddRepair = (e: React.FormEvent) => {
    e.preventDefault()
    if (!repairData.name.trim() || !repairData.employeeId) return

    addTask({
      name: repairData.name,
      type: "pontual",
      employeeId: repairData.employeeId,
      completed: false,
      points: 30,
      category: "reparo",
      date: repairData.date || undefined,
    })
    setRepairData({ name: "", date: "", employeeId: "" })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Truck className="h-8 w-8" />
        <h1 className="text-3xl font-bold">Entregas e Reparos</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Entregas */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="h-5 w-5" />
              Entregas (30 pontos cada)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleAddDelivery} className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="deliveryName">Descrição da Entrega</Label>
                <Input
                  id="deliveryName"
                  value={deliveryData.name}
                  onChange={(e) => setDeliveryData((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Descreva a entrega"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="deliveryDate">Data (opcional)</Label>
                <Input
                  id="deliveryDate"
                  type="date"
                  value={deliveryData.date}
                  onChange={(e) => setDeliveryData((prev) => ({ ...prev, date: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label>Funcionário Responsável</Label>
                <Select
                  value={deliveryData.employeeId}
                  onValueChange={(value) => setDeliveryData((prev) => ({ ...prev, employeeId: value }))}
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

              <Button type="submit" className="w-full" disabled={!deliveryData.name.trim() || !deliveryData.employeeId}>
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Entrega
              </Button>
            </form>

            <div className="space-y-2">
              <h4 className="font-medium">Entregas Pendentes</h4>
              {deliveryTasks.length === 0 ? (
                <p className="text-center text-muted-foreground py-4">Nenhuma entrega pendente</p>
              ) : (
                deliveryTasks.map((task) => {
                  const employee = employees.find((emp) => emp.id === task.employeeId)
                  return (
                    <div key={task.id} className="p-3 border rounded-lg space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{task.name}</span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeTask(task.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Responsável: {employee?.name}</span>
                        {task.date && (
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(task.date).toLocaleDateString("pt-BR")}
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </CardContent>
        </Card>

        {/* Reparos */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Reparos (30 pontos cada)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleAddRepair} className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="repairName">Descrição do Reparo</Label>
                <Input
                  id="repairName"
                  value={repairData.name}
                  onChange={(e) => setRepairData((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Descreva o reparo"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="repairDate">Data (opcional)</Label>
                <Input
                  id="repairDate"
                  type="date"
                  value={repairData.date}
                  onChange={(e) => setRepairData((prev) => ({ ...prev, date: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label>Funcionário Responsável</Label>
                <Select
                  value={repairData.employeeId}
                  onValueChange={(value) => setRepairData((prev) => ({ ...prev, employeeId: value }))}
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

              <Button type="submit" className="w-full" disabled={!repairData.name.trim() || !repairData.employeeId}>
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Reparo
              </Button>
            </form>

            <div className="space-y-2">
              <h4 className="font-medium">Reparos Pendentes</h4>
              {repairTasks.length === 0 ? (
                <p className="text-center text-muted-foreground py-4">Nenhum reparo pendente</p>
              ) : (
                repairTasks.map((task) => {
                  const employee = employees.find((emp) => emp.id === task.employeeId)
                  return (
                    <div key={task.id} className="p-3 border rounded-lg space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{task.name}</span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeTask(task.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Responsável: {employee?.name}</span>
                        {task.date && (
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(task.date).toLocaleDateString("pt-BR")}
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
