import { NavLink } from "react-router-dom"
import { CheckSquare, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function Navbar({ pendingCount }) {
  return (
    <header className="border-b bg-background">
      <div className="mx-auto flex max-w-2xl items-center justify-between p-4">
        <NavLink to="/" className="flex items-center gap-2 font-semibold">
          <CheckSquare className="size-5" />
          Task Manager
          <Badge variant="secondary">{pendingCount} pending</Badge>
        </NavLink>

        <Button asChild size="sm">
          <NavLink to="/new">
            <Plus /> New Task
          </NavLink>
        </Button>
      </div>
    </header>
  )
}
