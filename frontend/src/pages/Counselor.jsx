

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send } from "lucide-react"

export default function Counselor() {
  const [messages, setMessages] = useState([
    {
      id: "1",
      role: "assistant",
      content:
        "Hello! I'm your AI counselor. How are you feeling today? Feel free to share what's on your mind, and I'll do my best to provide support and guidance.",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = async (e) => {
    e.preventDefault()

    if (!input.trim() || isLoading) return

    const userMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // This is a mock implementation since we can't actually call the AI API in this preview
      setTimeout(() => {
        const aiResponse = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: getMockResponse(input),
          timestamp: new Date(),
        }

        setMessages((prev) => [...prev, aiResponse])
        setIsLoading(false)
      }, 1500)
    } catch (error) {
      console.error("Error generating AI response:", error)
      setIsLoading(false)
    }
  }

  // Mock response function for demonstration
  const getMockResponse = (userInput) => {
    const lowerInput = userInput.toLowerCase()

    if (lowerInput.includes("anxious") || lowerInput.includes("anxiety")) {
      return "I notice you're feeling anxious. That's a common and valid emotion. Can you tell me more about what's triggering this anxiety? Sometimes identifying specific triggers can help us develop coping strategies."
    } else if (lowerInput.includes("sad") || lowerInput.includes("depressed")) {
      return "I'm sorry to hear you're feeling down. It takes courage to acknowledge these feelings. Would you like to explore what might be contributing to this sadness? Sometimes talking through our emotions can help us understand them better."
    } else if (lowerInput.includes("stress") || lowerInput.includes("overwhelmed")) {
      return "Feeling overwhelmed can be really challenging. Let's break this down together. What specific areas of your life are causing the most stress right now? Sometimes addressing one small piece can help the larger situation feel more manageable."
    } else {
      return "Thank you for sharing that with me. I'm here to listen and support you. Could you tell me more about how these experiences are affecting you? Understanding your perspective better will help me provide more meaningful guidance."
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Card className="h-[calc(100vh-140px)] flex flex-col">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="AI Counselor" />
              <AvatarFallback>AI</AvatarFallback>
            </Avatar>
            AI Counselor
          </CardTitle>
        </CardHeader>

        <CardContent className="flex-1 overflow-hidden">
          <ScrollArea className="h-full pr-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg p-4 ${
                      message.role === "user"
                        ? "bg-[var(--color-primary)] text-[var(--color-primary-foreground)]"
                        : "bg-[var(--color-muted)]"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
        </CardContent>

        <CardFooter>
          <form onSubmit={handleSendMessage} className="w-full">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button type="submit" disabled={isLoading || !input.trim()}>
                <Send className="h-4 w-4" />
                <span className="sr-only">Send message</span>
              </Button>
            </div>
          </form>
        </CardFooter>
      </Card>
    </div>
  )
}

