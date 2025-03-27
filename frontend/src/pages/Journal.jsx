import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { PenLine } from "lucide-react"

// Mock data for journal entries
const JOURNAL_ENTRIES = [
  {
    id: "1",
    title: "Finding peace in uncertainty",
    excerpt:
      "Today I realized that much of my anxiety comes from trying to control things that are beyond my control...",
    date: "March 22, 2025",
    mood: "Reflective",
    hasAiInsights: true,
  },
  {
    id: "2",
    title: "Career crossroads",
    excerpt: "I've been thinking a lot about my career path and whether I'm truly fulfilled by my current role...",
    date: "March 20, 2025",
    mood: "Contemplative",
    hasAiInsights: true,
  },
  {
    id: "3",
    title: "Morning gratitude practice",
    excerpt:
      "Started my day with a new gratitude practice. I listed five things I'm thankful for before even getting out of bed...",
    date: "March 18, 2025",
    mood: "Grateful",
    hasAiInsights: false,
  },
  {
    id: "4",
    title: "Weekend hike reflections",
    excerpt:
      "The hike through the mountains yesterday gave me so much mental clarity. Being in nature always helps me reset...",
    date: "March 15, 2025",
    mood: "Energized",
    hasAiInsights: true,
  },
  {
    id: "5",
    title: "Difficult conversation with a friend",
    excerpt: "Had to have a tough conversation with Alex today about boundaries. It was uncomfortable but necessary...",
    date: "March 12, 2025",
    mood: "Conflicted",
    hasAiInsights: true,
  },
]

export default function Journal() {
  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Your Journal</h1>
        <Link to="/journal/new">
          <Button>
            <PenLine className="mr-2 h-4 w-4" />
            New Entry
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
        {JOURNAL_ENTRIES.map((entry) => (
          <Link to={`/journal/${entry.id}`} key={entry.id} className="block">
            <Card className="hover:bg-[var(--color-muted)] hover:bg-opacity-50 transition-colors">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{entry.title}</CardTitle>
                  <span className="px-2 py-1 text-xs rounded-full border border-[var(--color-border)]">
                    {entry.mood}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-[var(--color-muted-foreground)] line-clamp-2">{entry.excerpt}</p>
              </CardContent>
              <CardFooter className="flex justify-between text-sm text-[var(--color-muted-foreground)]">
                <span>{entry.date}</span>
                {entry.hasAiInsights && (
                  <span className="ml-2 px-2 py-1 text-xs rounded-full bg-[var(--color-secondary)]">AI Insights</span>
                )}
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

