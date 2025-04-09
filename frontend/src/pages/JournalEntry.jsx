"use client"

import { useState, useEffect } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Calendar, Edit2, MessageSquare, Trash2 } from "lucide-react"
import api from "@/api"

export default function JournalEntryPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [entry, setEntry] = useState({
    title: "",
    date: "",
    mood: "",
    content: "",
    analysis: "",
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getEntry()
  }, [id])

  const getEntry = () => {
    setIsLoading(true)
    api
      .get(`/api/journalentry/${id}/`)
      .then((res) => res.data)
      .then((data) => {
        setEntry(data)
        setIsLoading(false)
      })
      .catch((err) => {
        setError("Failed to load journal entry")
        setIsLoading(false)
        console.error(err)
      })
  }

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this journal entry?")) {
      api
        .delete(`/api/journalentry/${id}/delete/`)
        .then((res) => {
          if (res.status === 204) {
            alert("Journal entry deleted!")
            navigate("/journal")
          } else {
            alert("Failed to delete journal entry.")
          }
        })
        .catch((error) => {
          console.error(error)
          alert("An error occurred while deleting the journal entry.")
        })
    }
  }

  if (isLoading) {
    return <div className="max-w-3xl mx-auto px-4 py-8">Loading journal entry...</div>
  }

  if (error) {
    return <div className="max-w-3xl mx-auto px-4 py-8 text-red-500">{error}</div>
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

      <div className="flex justify-between items-start mb-6">
        <h1 className="text-3xl font-bold">{entry.title}</h1>
        <div className="flex gap-2">
          <Link to={`/journal/${id}/edit`}>
            <Button variant="outline" size="sm">
              <Edit2 className="mr-2 h-4 w-4" />
              Edit
            </Button>
          </Link>
          <Button variant="outline" size="sm" onClick={handleDelete}>
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center text-muted-foreground">
          <Calendar className="mr-2 h-4 w-4" />
          {entry.date}
        </div>
        <span className="px-2 py-1 text-xs rounded-full border border-border">{entry.mood}</span>
      </div>

      <Tabs defaultValue="entry">
        <TabsList className="mb-4">
          <TabsTrigger value="entry">Journal Entry</TabsTrigger>
          <TabsTrigger value="insights">
            <MessageSquare className="mr-2 h-4 w-4" />
            AI Insights
          </TabsTrigger>
        </TabsList>

        <TabsContent value="entry">
          <Card>
            <CardContent className="pt-6">
              <div className="prose">
                {entry.content.split("\n\n").map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <MessageSquare className="mr-2 h-5 w-5 text-primary" />
                AI Counselor Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose">
                {entry.analysis.split("\n\n").map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
