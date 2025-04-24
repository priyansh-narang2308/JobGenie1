"use client"

import type React from "react"

import DashboardLayout from "@/components/layout/dashboard-layout"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Sparkles } from "lucide-react"
import { useState } from "react"

export default function CareerGuidance() {
  const [message, setMessage] = useState("")
  const [chatHistory, setChatHistory] = useState([
    {
      role: "assistant",
      content: "Hi there! I'm your AI career advisor. How can I help you with your career journey today?",
    },
  ])
  const [isTyping, setIsTyping] = useState(false)

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return

    // Add user message to chat
    const userMessage = { role: "user", content: message }
    setChatHistory([...chatHistory, userMessage])
    setMessage("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      let response
      if (message.toLowerCase().includes("career change")) {
        response = {
          role: "assistant",
          content:
            "Career changes can be challenging but rewarding! I recommend starting with a skills assessment to identify transferable skills. Then research industries that interest you and align with your strengths. Networking is crucial - try connecting with professionals in your target field. Would you like me to help you create a transition plan?",
        }
      } else if (message.toLowerCase().includes("interview")) {
        response = {
          role: "assistant",
          content:
            "Preparing for interviews is key to success! I recommend researching the company thoroughly, practicing common questions, and preparing examples that showcase your skills and experience. For technical roles, practice coding problems and system design. Would you like specific interview tips for your industry?",
        }
      } else if (message.toLowerCase().includes("resume")) {
        response = {
          role: "assistant",
          content:
            "Your resume is your professional story! Make sure it highlights your achievements with quantifiable results, not just job duties. Tailor it for each application by matching keywords from the job description. Keep it concise (1-2 pages) and error-free. Have you tried our Resume Optimization tool in the Resume section?",
        }
      } else {
        response = {
          role: "assistant",
          content:
            "That's a great question about your career development. I'd be happy to provide guidance based on your specific situation and goals. Could you share more details about your current role, skills, and what you're hoping to achieve in your career path?",
        }
      }
      setChatHistory([...chatHistory, userMessage, response])
      setIsTyping(false)
    }, 1500)
  }

  // Suggested questions for the user
  const suggestedQuestions = [
    "How do I prepare for a career change?",
    "What skills are in high demand right now?",
    "How can I improve my interview performance?",
    "Should I negotiate my job offer?",
    "How do I address employment gaps in my resume?",
  ]

  return (
    
    <DashboardLayout>
    
      <div className="flex flex-col gap-6 p-4 md:gap-8 md:p-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Career Guidance</h1>
          <p className="text-muted-foreground">Get personalized career advice from our AI career advisor</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <Card className="h-[calc(100vh-12rem)]">
              <CardHeader>
                <CardTitle>AI Career Advisor</CardTitle>
                <CardDescription>
                  Ask questions about your career path, job search, or professional development
                </CardDescription>
              </CardHeader>
              <CardContent className="flex h-[calc(100%-8rem)] flex-col justify-between">
                <div className="flex-1 overflow-auto pr-4">
                  <div className="space-y-4">
                    {chatHistory.map((chat, index) => (
                      <div key={index} className={`flex ${chat.role === "user" ? "justify-end" : "justify-start"}`}>
                        <div
                          className={`flex max-w-[80%] items-start gap-3 rounded-lg p-3 ${
                            chat.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                          }`}
                        >
                          {chat.role === "assistant" && (
                            <Avatar className="h-8 w-8">
                              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="AI" />
                              <AvatarFallback>AI</AvatarFallback>
                            </Avatar>
                          )}
                          <div className="text-sm">{chat.content}</div>
                        </div>
                      </div>
                    ))}
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="flex max-w-[80%] items-start gap-3 rounded-lg bg-muted p-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="AI" />
                            <AvatarFallback>AI</AvatarFallback>
                          </Avatar>
                          <div className="flex gap-1">
                            <span className="animate-bounce">•</span>
                            <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>
                              •
                            </span>
                            <span className="animate-bounce" style={{ animationDelay: "0.4s" }}>
                              •
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <form onSubmit={handleSendMessage} className="mt-4">
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder="Type your question here..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="flex-1"
                    />
                    <Button type="submit" size="icon">
                      <Sparkles className="h-4 w-4" />
                      <span className="sr-only">Send</span>
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Suggested Questions</CardTitle>
                <CardDescription>Not sure what to ask? Try one of these questions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {suggestedQuestions.map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full justify-start text-left"
                      onClick={() => setMessage(question)}
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Career Resources</CardTitle>
                <CardDescription>Helpful tools and resources for your career development</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start text-left" asChild>
                    <a href="/resume">Resume Optimization</a>
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-left" asChild>
                    <a href="/dashboard">Interview Preparation</a>
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-left" asChild>
                    <a href="/learning">Skill Development</a>
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-left" asChild>
                    <a href="/jobs">Job Search</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
