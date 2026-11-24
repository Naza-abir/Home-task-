import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const PRIORITIES = ["low", "medium", "high"]

export default function NewTask({ addTask }) {
  const navigate = useNavigate()

  // useState: one state variable per form field
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState("medium")
  const [error, setError] = useState("")

  // useEffect: clear the error message as soon as the user starts typing a title
  useEffect(() => {
    if (title.trim()) setError("")
  }, [title])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim()) {
      setError("Title is required")
      return
    }
    addTask({ title: title.trim(), description: description.trim(), priority })
    // useNavigate: go back to the list after saving
    navigate("/")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>New Task</CardTitle>
        <CardDescription>Add something you need to get done.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="e.g. Finish React assignment"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Optional details..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Priority</Label>
            <div className="flex gap-2">
              {PRIORITIES.map((p) => (
                <Button
                  key={p}
                  type="button"
                  size="sm"
                  className="capitalize"
                  variant={priority === p ? "default" : "outline"}
                  onClick={() => setPriority(p)}
                >
                  {p}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <Button type="submit">Save Task</Button>
            <Button type="button" variant="outline" onClick={() => navigate(-1)}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
