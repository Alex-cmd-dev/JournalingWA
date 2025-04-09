import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, BookOpen, MessageSquare, PenLine } from "lucide-react";

// Mock data for journal entries
const RECENT_ENTRIES = [
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
    excerpt:
      "I've been thinking a lot about my career path and whether I'm truly fulfilled by my current role...",
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
];

export default function Home() {
  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8">
      <div className="flex flex-col items-center text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Reflect<span style={{ color: "var(--color-primary)" }}>.ai</span>
        </h1>
        <p className="text-xl text-[var(--color-muted-foreground)] max-w-2xl">
          Your personal AI-powered journaling companion for mindfulness and
          growth
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <Card>
          <CardHeader>
            <PenLine
              className="h-8 w-8 mb-2"
              style={{ color: "var(--color-primary)" }}
            />
            <CardTitle>Journal Your Thoughts</CardTitle>
            <CardDescription>
              Write freely in a safe, private space designed for reflection
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Link to="/journal/new" className="w-full">
              <Button className="w-full">
                Start Writing <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <BookOpen
              className="h-8 w-8 mb-2"
              style={{ color: "var(--color-primary)" }}
            />
            <CardTitle>Review Entries</CardTitle>
            <CardDescription>
              Look back on your journey and see patterns in your thoughts
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Link to="/journal" className="w-full">
              <Button className="w-full" variant="outline">
                View Journal <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Recent Journal Entries</h2>
        <div className="space-y-4">
          {RECENT_ENTRIES.map((entry) => (
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
                  <p className="text-[var(--color-muted-foreground)] line-clamp-2">
                    {entry.excerpt}
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between text-sm text-[var(--color-muted-foreground)]">
                  <span>{entry.date}</span>
                  {entry.hasAiInsights && (
                    <span className="ml-2 px-2 py-1 text-xs rounded-full bg-[var(--color-secondary)]">
                      AI Insights
                    </span>
                  )}
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center mt-6">
          <Link to="/journal">
            <Button variant="outline">View All Entries</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
