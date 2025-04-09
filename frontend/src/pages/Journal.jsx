"use client";

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PenLine } from "lucide-react";
import api from "@/api";

export default function Journal() {
  const [entries, setEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchJournalEntries = () => {
    api
      .get("/api/journalentry/")
      .then((res) => res.data)
      .then((data) => {
        setEntries(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError("Failed to load topics");
        setIsLoading(false);
        console.error(err);
      });
  };

  useEffect(() => {
    fetchJournalEntries();
  }, []);

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
        {isLoading ? (
          <p>Loading journal entries...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : entries.length === 0 ? (
          <p>No journal entries yet. Create your first one!</p>
        ) : (
          entries.map((entry) => (
            <Link to={`/journal/${entry.id}`} key={entry.id} className="block">
              <Card className="hover:bg-muted hover:bg-opacity-50 transition-colors">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{entry.title}</CardTitle>
                    <span className="px-2 py-1 text-xs rounded-full border border-border">
                      {entry.mood}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground line-clamp-2">
                    {entry.excerpt}
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between text-sm text-muted-foreground">
                  <span>{entry.date}</span>
                  {entry.hasAiInsights && (
                    <span className="ml-2 px-2 py-1 text-xs rounded-full bg-secondary">
                      AI Insights
                    </span>
                  )}
                </CardFooter>
              </Card>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
