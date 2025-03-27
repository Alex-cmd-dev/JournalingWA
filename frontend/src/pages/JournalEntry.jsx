"use client"

import { useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Calendar, Edit2, MessageSquare, Trash2 } from "lucide-react"

// Mock data for a single journal entry
const MOCK_ENTRY = {
  id: "1",
  title: "Finding peace in uncertainty",
  content: `Today I realized that much of my anxiety comes from trying to control things that are beyond my control. I've been worrying about the future, about decisions that haven't even presented themselves yet, and it's been exhausting.

During my morning walk, I noticed how the trees bend with the wind rather than fighting against it. There's a lesson there about flexibility and acceptance that I want to remember.

I'm going to try to focus more on what I can control - my reactions, my daily habits, how I treat others - and let go of the rest. It won't be easy, but I think it's the path to more peace.`,
  date: "March 22, 2025",
  mood: "Reflective",
  aiInsights: `I notice a powerful insight in your entry about control and anxiety. You've made an important connection between your anxiety and attempting to control things beyond your influence. This is a fundamental principle in many therapeutic approaches, including Acceptance and Commitment Therapy.

The metaphor you used about trees bending with the wind is particularly meaningful. Nature often provides us with these perfect analogies for psychological flexibility.

Your intention to focus on what you can control (reactions, habits, relationships) while releasing what you cannot is an excellent strategy. This approach aligns with the Serenity Prayer concept that has helped many people find peace.

As you practice this new mindset, be patient with yourself. Old thought patterns take time to change. Perhaps you might consider a simple daily practice of identifying one thing you're trying to control that you could release, and one thing within your control that deserves your energy.

Would you like to explore specific techniques for letting go of the need for control in situations that trigger your anxiety?`,
}

export default function JournalEntryPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [entry] = useState(MOCK_ENTRY)

  const handleDelete = () => {
    // In a real app, you would call an API to delete the entry
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
        <div className="flex items-center text-[var(--color-muted-foreground)]">
          <Calendar className="mr-2 h-4 w-4" />
          {entry.date}
        </div>
        <span className="px-2 py-1 text-xs rounded-full border border-[var(--color-border)]">{entry.mood}</span>
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
                <MessageSquare className="mr-2 h-5 w-5" style={{ color: "var(--color-primary)" }} />
                AI Counselor Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose">
                {entry.aiInsights.split("\n\n").map((paragraph, index) => (
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

