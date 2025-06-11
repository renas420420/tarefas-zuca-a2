"use client"

import type React from "react"

import { useState } from "react"
import { useStore } from "../../hooks/useStore"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Users, Plus, Edit, Trash2, Save, X } from "lucide-react"

export default function EmployeesPage() {
  const { employees, addEmployee, removeEmployee, updateEmployee } = useStore()
  const [newEmployeeName, setNewEmployeeName] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingName, setEditingName] = useState("")

  const handleAddEmployee = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newEmployeeName.trim()) return

    addEmployee(newEmployeeName.trim())
    setNewEmployeeName("")
  }

  const handleStartEdit = (id: string, currentName: string) => {
    setEditingId(id)
    setEditingName(currentName)
  }

  const handleSaveEdit = () => {
    if (!editingName.trim() || !editingId) return

    updateEmployee(editingId, editingName.trim())
    setEditingId(null)
    setEditingName("")
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setEditingName("")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Users className="h-8 w-8" />
        <h1 className="text-3xl font-bold">Gestão de Funcionários</h1>
      </div>

      {/* Formulário para Adicionar Funcionário */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Adicionar Novo Funcionário
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddEmployee} className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="employeeName">Nome do Funcionário</Label>
              <Input
                id="employeeName"
                value={newEmployeeName}
                onChange={(e) => setNewEmployeeName(e.target.value)}
                placeholder="Digite o nome do funcionário"
              />
            </div>
            <div className="flex items-end">
              <Button type="submit" disabled={!newEmployeeName.trim()}>
                <Plus className="h-4 w-4 mr-2" />
                Adicionar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Lista de Funcionários */}
      <Card>
        <CardHeader>
          <CardTitle>Funcionários Cadastrados ({employees.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {employees.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">Nenhum funcionário cadastrado</p>
          ) : (
            <div className="space-y-3">
              {employees.map((employee) => (
                <div key={employee.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-muted-foreground" />
                    {editingId === employee.id ? (
                      <Input
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                        className="max-w-xs"
                        autoFocus
                      />
                    ) : (
                      <div>
                        <h4 className="font-medium">{employee.name}</h4>
                        <p className="text-sm text-muted-foreground">Pontos do mês: {employee.monthlyPoints}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {editingId === employee.id ? (
                      <>
                        <Button size="sm" onClick={handleSaveEdit} disabled={!editingName.trim()}>
                          <Save className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={handleCancelEdit}>
                          <X className="h-4 w-4" />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button size="sm" variant="outline" onClick={() => handleStartEdit(employee.id, employee.name)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => removeEmployee(employee.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
