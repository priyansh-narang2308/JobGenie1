"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sparkles } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function ResetPassword() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle password reset logic here
    console.log("Password reset requested for:", email)
    setSubmitted(true)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4">
      <Link href="/" className="mb-6 flex items-center gap-2">
        <Sparkles className="h-6 w-6 text-primary" />
        <span className="text-xl font-bold">JobGenie</span>
      </Link>
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Reset password</CardTitle>
          <CardDescription>
            {!submitted
              ? "Enter your email address and we'll send you a link to reset your password"
              : "Check your email for a link to reset your password"}
          </CardDescription>
        </CardHeader>
        {!submitted ? (
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full">
                Send reset link
              </Button>
              <div className="text-center text-sm">
                Remember your password?{" "}
                <Link href="/login" className="font-medium text-primary underline-offset-4 hover:underline">
                  Back to login
                </Link>
              </div>
            </CardFooter>
          </form>
        ) : (
          <CardContent className="space-y-4">
            <div className="rounded-lg bg-primary/10 p-4 text-center">
              <p className="text-sm font-medium text-primary">
                If an account exists with {email}, we've sent a password reset link.
              </p>
            </div>
            <Button asChild className="w-full">
              <Link href="/login">Back to login</Link>
            </Button>
          </CardContent>
        )}
      </Card>
    </div>
  )
}
