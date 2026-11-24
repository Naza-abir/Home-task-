import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ClipboardList, Plus, Search, Trash2 } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const priorityVariant = { high: "destructive", medium: "default", low: "secondary" }
const FILTERS = ["all", "active", "done"]

export default function Home({ tasks, toggleTask, deleteTask }) {
  const navigate = useNavigate()

  // useState: UI state for filtering and searching
  const [filter, setFilter] = useState("all")
  const [query, setQuery] = useState("")

  const pending = tasks.filter((t) => !t.done).length

  // useEffect: keep the browser tab title in sync with pending tasks
  useEffect(() => {
    document.title = pending > 0 ? `(${pending}) Task Manager` : "Task Manager"
  }, [pending])

  const visible = tasks.filter((t) => {
    const matchesFilter =
      filter === "all" || (filter === "done" ? t.done : !t.done)
    const matchesQuery = t.title.toLowerCase().includes(query.toLowerCase())
    return matchesFilter && matchesQuery
  })

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
          <Input
            className="pl-9"
            placeholder="Search tasks..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          {FILTERS.map((f) => (
            <Button
              key={f}
              size="sm"
              variant={filter === f ? "default" : "outline"}
              className="capitalize"
              onClick={() => setFilter(f)}
            >
              {f}
            </Button>
          ))}
        </div>
      </div>

      {visible.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-3 py-6 text-center">
            <ClipboardList className="size-10 text-muted-foreground" />
            <p className="text-muted-foreground">
              {tasks.length === 0 ? "No tasks yet." : "No tasks match your filter."}
            </p>
            {tasks.length === 0 && (
              // useNavigate: programmatic navigation from a button click
              <Button onClick={() => navigate("/new")}>
                <Plus /> Add your first task
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        visible.map((task) => (
          <Card
            key={task.id}
            className="cursor-pointer py-4 transition-shadow hover:shadow-md"
            onClick={() => navigate(`/task/${task.id}`)}
          >
            <CardContent className="flex items-center gap-3">
              <div onClick={(e) => e.stopPropagation()}>
                <Checkbox
                  checked={task.done}
                  onCheckedChange={() => toggleTask(task.id)}
                  aria-label="Mark task as done"
                />
              </div>

              <div className="min-w-0 flex-1">
                <p className={cn("truncate font-medium", task.done && "text-muted-foreground line-through")}>
                  {task.title}
                </p>
                {task.description && (
                  <p className="truncate text-sm text-muted-foreground">{task.description}</p>
                )}
              </div>

              <Badge variant={priorityVariant[task.priority]} className="capitalize">
                {task.priority}
              </Badge>

              <Button
                variant="ghost"
                size="icon"
                aria-label="Delete task"
                onClick={(e) => {
                  e.stopPropagation()
                  deleteTask(task.id)
                }}
              >
                <Trash2 className="text-destructive" />
              </Button>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  )
}
