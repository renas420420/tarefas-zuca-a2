export interface Employee {
  id: string
  name: string
  dailyPoints: number
  monthlyPoints: number
}

export interface Task {
  id: string
  name: string
  type: "pontual" | "rotina"
  employeeId: string
  completed: boolean
  points: number
  // Para tarefas pontuais
  impact?: number
  effort?: number
  urgency?: number
  // Para tarefas rotineiras
  frequency?: "diaria" | "semanal" | "quinzenal" | "mensal"
  // Para entregas e reparos
  date?: string
  category?: "manutencao" | "compra" | "entrega" | "reparo"
}
