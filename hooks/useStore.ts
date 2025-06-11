"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Employee, Task } from "../types"

interface Store {
  employees: Employee[]
  tasks: Task[]
  maintenanceResponsible: string

  // Employee actions
  addEmployee: (name: string) => void
  removeEmployee: (id: string) => void
  updateEmployee: (id: string, name: string) => void

  // Task actions
  addTask: (task: Omit<Task, "id">) => void
  completeTask: (taskId: string) => void
  removeTask: (id: string) => void

  // Settings
  setMaintenanceResponsible: (employeeId: string) => void

  // Utils
  getEmployeeNextTask: (employeeId: string) => Task | undefined
  updateEmployeePoints: (employeeId: string, points: number) => void
}

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      employees: [
        { id: "1", name: "João Silva", dailyPoints: 0, monthlyPoints: 0 },
        { id: "2", name: "Maria Santos", dailyPoints: 0, monthlyPoints: 0 },
        { id: "3", name: "Pedro Costa", dailyPoints: 0, monthlyPoints: 0 },
      ],
      tasks: [],
      maintenanceResponsible: "1",

      addEmployee: (name) =>
        set((state) => ({
          employees: [
            ...state.employees,
            {
              id: Date.now().toString(),
              name,
              dailyPoints: 0,
              monthlyPoints: 0,
            },
          ],
        })),

      removeEmployee: (id) =>
        set((state) => ({
          employees: state.employees.filter((emp) => emp.id !== id),
          tasks: state.tasks.filter((task) => task.employeeId !== id),
        })),

      updateEmployee: (id, name) =>
        set((state) => ({
          employees: state.employees.map((emp) => (emp.id === id ? { ...emp, name } : emp)),
        })),

      addTask: (task) =>
        set((state) => ({
          tasks: [...state.tasks, { ...task, id: Date.now().toString() }],
        })),

      completeTask: (taskId) =>
        set((state) => {
          const task = state.tasks.find((t) => t.id === taskId)
          if (!task) return state

          return {
            tasks: state.tasks.map((t) => (t.id === taskId ? { ...t, completed: true } : t)),
            employees: state.employees.map((emp) =>
              emp.id === task.employeeId
                ? {
                    ...emp,
                    dailyPoints: emp.dailyPoints + task.points,
                    monthlyPoints: emp.monthlyPoints + task.points,
                  }
                : emp,
            ),
          }
        }),

      removeTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),

      setMaintenanceResponsible: (employeeId) => set({ maintenanceResponsible: employeeId }),

      getEmployeeNextTask: (employeeId) => {
        const { tasks } = get()
        return tasks.find((task) => task.employeeId === employeeId && !task.completed)
      },

      updateEmployeePoints: (employeeId, points) =>
        set((state) => ({
          employees: state.employees.map((emp) =>
            emp.id === employeeId
              ? {
                  ...emp,
                  dailyPoints: emp.dailyPoints + points,
                  monthlyPoints: emp.monthlyPoints + points,
                }
              : emp,
          ),
        })),
    }),
    {
      name: "task-management-store",
    },
  ),
)
