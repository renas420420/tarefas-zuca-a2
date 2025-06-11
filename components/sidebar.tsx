"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ClipboardList, Users, ShoppingCart, Truck, BarChart3, MenuIcon, X, Home } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const menuItems = [
    {
      name: "Dashboard",
      href: "/",
      icon: Home,
    },
    {
      name: "Tarefas e Rotinas",
      href: "/tarefas",
      icon: ClipboardList,
    },
    {
      name: "Funcionários",
      href: "/funcionarios",
      icon: Users,
    },
    {
      name: "Manutenção e Compras",
      href: "/manutencao",
      icon: ShoppingCart,
    },
    {
      name: "Entregas e Reparos",
      href: "/entregas",
      icon: Truck,
    },
    {
      name: "Performance",
      href: "/performance",
      icon: BarChart3,
    },
  ]

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
      </Button>

      {/* Overlay for mobile */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setIsOpen(false)} />}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed top-0 left-0 z-40 h-full w-64 bg-white dark:bg-gray-900 border-r transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
          className,
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center h-16 border-b">
            <h1 className="text-xl font-bold">Sistema de Gestão</h1>
          </div>
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-1">
              {menuItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                        isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted",
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.name}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
          <div className="p-4 border-t">
            <p className="text-xs text-muted-foreground text-center">© 2025 Sua Empresa</p>
          </div>
        </div>
      </div>
    </>
  )
}
