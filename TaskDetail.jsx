import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ArrowLeft, Pencil, Trash2 } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const priorityVariant = { high: "destructive", medium: "default", low: "secondary" }

export default function TaskDetail({ tasks, toggleTask, updateTask, deleteTask }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const task = tasks.find((t) => t.id === id)

  // useState: edit mode + the draft values while editing
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  // useEffect: if the task doesn't exist (bad URL or just deleted), redirect home
  useEffect(() => {
    if (!task) navigate("/", { replace: true })
  }, [task, navigate])

  // useEffect: show the task title in the browser tab
  useEffect(() => {
    if (task) document.title = `${task.title} | Task Manager`
  }, [task])

  if (!task) return null

  const startEdit = () => {
    setTitle(task.title)
    setDescription(task.description)
    setIsEditing(true)
  }

  const saveEdit = () => {
    if (!title.trim()) return
    updateTask(task.id, { title: title.trim(), description: description.trim() })
    setIsEditing(false)
  }

  const handleDelete = () => {
    deleteTask(task.id)
    navigate("/")
  }

  return (
    <div className="space-y-4">
      <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
        <ArrowLeft /> Back
      </Button>

      <Card>
        <CardHeader>
          {isEditing ? (
            <div className="space-y-2">
              <Label htmlFor="edit-title">Title</Label>
              <Input id="edit-title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
          ) : (
            <CardTitle className="flex items-center justify-between gap-2 text-xl">
              <span className={task.done ? "text-muted-foreground line-through" : ""}>
                {task.title}
              </span>
              <Badge variant={priorityVariant[task.priority]} className="capitalize">
                {task.priority}
              </Badge>
            </CardTitle>
          )}
        </CardHeader>

        <CardContent className="space-y-4">
          {isEditing ? (
            <div className="space-y-2">
              <Label htmlFor="edit-desc">Description</Label>
              <Textarea
                id="edit-desc"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          ) : (
            <p className="text-muted-foreground">
              {task.description || "No description provided."}
            </p>
          )}

          <div className="flex items-center gap-2">
            <Checkbox
              id="done"
              checked={task.done}
              onCheckedChange={() => toggleTask(task.id)}
            />
            <Label htmlFor="done">Completed</Label>
          </div>

          <p className="text-xs text-muted-foreground">
            Created {new Date(task.createdAt).toLocaleString()}
          </p>
        </CardContent>

        <CardFooter className="gap-2">
          {isEditing ? (
            <>
              <Button onClick={saveEdit}>Save</Button>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={startEdit}>
                <Pencil /> Edit
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                <Trash2 /> Delete
              </Button>
            </>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
