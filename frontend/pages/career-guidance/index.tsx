import { Button } from "@/components/ui/button"
import { ArrowRight, BriefcaseBusiness, FileText, MessageSquare, Sparkles } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">JobGenie</span>
          </Link>
          <nav className="hidden gap-6 md:flex">
            <Link href="/jobs" className="text-sm font-medium hover:underline">
              Find Jobs
            </Link>
            <Link href="/resume" className="text-sm font-medium hover:underline">
              Resume Tools
            </Link>
            <Link href="/interviews" className="text-sm font-medium hover:underline">
              Interview Prep
            </Link>
            <Link href="/career-guidance" className="text-sm font-medium hover:underline">
              Career Guidance
            </Link>
          </nav>
          <div className="flex gap-4">
            <Link href="/login">
              <Button variant="outline">Log In</Button>
            </Link>
            <Link href="/signup">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Find Your Perfect Job with AI-Powered Precision
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                    JobGenie uses advanced AI to match you with the perfect job opportunities, optimize your resume, and
                    prepare you for interviews.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/signup">
                    <Button size="lg" className="gap-1">
                      Get Started <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/placeholder.svg?height=550&width=550"
                  width={550}
                  height={550}
                  alt="JobGenie Dashboard Preview"
                  className="rounded-lg object-cover"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full bg-muted py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">AI-Powered Features</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Our advanced AI tools help you navigate every step of your job search journey
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <BriefcaseBusiness className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">AI Job Matching</h3>
                <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                  Get personalized job recommendations with compatibility scores based on your skills and experience.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <FileText className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Resume Optimization</h3>
                <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                  Our AI analyzes and optimizes your resume for specific job roles to increase your chances of getting
                  noticed.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <MessageSquare className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Interview Preparation</h3>
                <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                  Practice with our AI-powered mock interviews and receive real-time feedback to improve your
                  performance.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t bg-background">
        <div className="container flex flex-col gap-4 py-10 md:flex-row md:items-center md:justify-between md:py-12">
          <div className="flex flex-col gap-2">
            <Link href="/" className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">JobGenie</span>
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400">© 2023 JobGenie. All rights reserved.</p>
          </div>
          <nav className="flex gap-4 sm:gap-6">
            <Link href="/about" className="text-sm font-medium hover:underline">
              About
            </Link>
            <Link href="/privacy" className="text-sm font-medium hover:underline">
              Privacy
            </Link>
            <Link href="/terms" className="text-sm font-medium hover:underline">
              Terms
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:underline">
              Contact
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
