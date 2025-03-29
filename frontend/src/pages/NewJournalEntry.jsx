"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save } from "lucide-react"

const MOOD_OPTIONS = [
  "Happy",
  "Sad",
  "Anxious",
  "Calm",
  "Frustrated",
  "Grateful",
  "Reflective",
  "Excited",
  "Tired",
  "Contemplative",
]

export default function NewJournalEntry() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [mood, setMood] = useState("")
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!title || !content) {
      alert("Please fill in all required fields")
      return
    }

    // In a real app, you would call an API to save the entry
    navigate("/journal")
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/journal">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Journal
          </Button>
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-6">New Journal Entry</h1>

      <Card className="p-6">
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Give your entry a title"
                className="mt-1"
                required
              />
            </div>

            <div>
              <Label htmlFor="mood">How are you feeling?</Label>
              <Select value={mood} onValueChange={setMood}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select your mood" />
                </SelectTrigger>
                <SelectContent>
                  {MOOD_OPTIONS.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="content">Journal Entry</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your thoughts here..."
                className="mt-1 min-h-[300px]"
                required
              />
            </div>

            <div className="flex justify-end">
              <Button type="submit">
                <Save className="mr-2 h-4 w-4" />
                Save Entry
              </Button>
            </div>
          </div>
        </form>
      </Card>
    </div>
  )
}

