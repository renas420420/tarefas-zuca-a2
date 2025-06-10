import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

export type Task = {
  id: string
  title: string
  description: string | null
  assignee: "Victor" | "Lucas"
  completed: boolean
  created_at: string
  updated_at: string
}
