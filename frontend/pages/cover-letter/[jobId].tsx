"use client"

import DashboardLayout from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUpDown, Copy, Download, FileText, Pencil, Sparkles } from "lucide-react"
import { useRouter } from "next/router"
import { useState } from "react"

export default function CoverLetter() {
  const router = useRouter()
  const { jobId } = router.query

  const [generating, setGenerating] = useState(false)
  const [generated, setGenerated] = useState(false)
  const [activeTab, setActiveTab] = useState("professional")

  // Mock job data
  const job = {
    id: jobId || "1",
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
  }

  const handleGenerate = () => {
    setGenerating(true)
    // Simulate generation process
    setTimeout(() => {
      setGenerating(false)
      setGenerated(true)
    }, 3000)
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 p-4 md:gap-8 md:p-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Cover Letter Generator</h1>
          <p className="text-muted-foreground">Create customized cover letters for your job applications</p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Generate Cover Letter</CardTitle>
            <CardDescription>
              {job.title} at {job.company}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!generated ? (
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <span className="font-medium">Your Resume</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    We'll use your uploaded resume to create a personalized cover letter
                  </p>
                </div>
                <div className="rounded-lg border p-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-muted-foreground" />
                    <span className="font-medium">Job Description</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    We'll analyze the job description to highlight relevant skills and experience
                  </p>
                </div>
                {generating ? (
                  <div className="flex flex-col items-center justify-center rounded-lg border p-12">
                    <div className="space-y-4 text-center">
                      <div className="relative h-16 w-16">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <ArrowUpDown className="h-8 w-8 text-primary animate-pulse" />
                        </div>
                        <div className="absolute inset-0 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium">Generating Cover Letter</h3>
                        <p className="text-sm text-muted-foreground">
                          Our AI is creating a personalized cover letter for {job.title} at {job.company}...
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Button className="w-full" onClick={handleGenerate}>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Cover Letter
                  </Button>
                )}
              </div>
            ) : (
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="professional">Professional</TabsTrigger>
                  <TabsTrigger value="creative">Creative</TabsTrigger>
                  <TabsTrigger value="concise">Concise</TabsTrigger>
                </TabsList>
                <TabsContent value="professional" className="mt-4">
                  <div className="rounded-lg border p-6">
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm">John Doe</p>
                        <p className="text-sm">San Francisco, CA</p>
                        <p className="text-sm">john.doe@example.com</p>
                        <p className="text-sm">(555) 123-4567</p>
                      </div>
                      <div>
                        <p className="text-sm">[Current Date]</p>
                      </div>
                      <div>
                        <p className="text-sm">Hiring Manager</p>
                        <p className="text-sm">{job.company}</p>
                        <p className="text-sm">San Francisco, CA</p>
                      </div>
                      <div>
                        <p className="text-sm">Dear Hiring Manager,</p>
                      </div>
                      <div>
                        <p className="text-sm">
                          I am writing to express my interest in the {job.title} position at {job.company}. With over 4
                          years of experience in frontend development using React, TypeScript, and Next.js, I am
                          confident in my ability to make a significant contribution to your team.
                        </p>
                      </div>
                      <div>
                        <p className="text-sm">
                          Throughout my career, I have focused on building responsive, user-friendly web applications
                          with an emphasis on performance optimization and component reusability. At WebTech Solutions,
                          I reduced load times by 40% through code optimization and built a library of 30+ reusable UI
                          components that improved development efficiency by 25%. I also implemented TypeScript across
                          multiple projects, which reduced bugs in production by 30%.
                        </p>
                      </div>
                      <div>
                        <p className="text-sm">
                          I am particularly drawn to {job.company}'s innovative approach to web development and your
                          commitment to creating exceptional user experiences. Your recent project [mention a recent
                          project or product] demonstrates the kind of forward-thinking solutions I am passionate about
                          contributing to.
                        </p>
                      </div>
                      <div>
                        <p className="text-sm">
                          I would welcome the opportunity to discuss how my skills and experience align with your needs
                          for the {job.title} position. Thank you for considering my application.
                        </p>
                      </div>
                      <div>
                        <p className="text-sm">Sincerely,</p>
                        <p className="text-sm">John Doe</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="creative" className="mt-4">
                  <div className="rounded-lg border p-6">
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm">John Doe</p>
                        <p className="text-sm">San Francisco, CA</p>
                        <p className="text-sm">john.doe@example.com</p>
                        <p className="text-sm">(555) 123-4567</p>
                      </div>
                      <div>
                        <p className="text-sm">[Current Date]</p>
                      </div>
                      <div>
                        <p className="text-sm">Hello {job.company} Team!</p>
                      </div>
                      <div>
                        <p className="text-sm">
                          When I discovered the {job.title} opening at {job.company}, I couldn't help but feel it was
                          the perfect match for my skills and passion. As someone who lives and breathes frontend
                          development, I'm excited about the possibility of bringing my creative problem-solving
                          approach to your innovative team.
                        </p>
                      </div>
                      <div>
                        <p className="text-sm">
                          My journey in web development has been driven by a fascination with creating digital
                          experiences that delight users. At WebTech Solutions, I transformed the user experience by
                          implementing responsive designs that increased mobile engagement by 45%. I thrive in
                          collaborative environments where I can turn design concepts into pixel-perfect,
                          high-performance interfaces.
                        </p>
                      </div>
                      <div>
                        <p className="text-sm">
                          What excites me most about {job.company} is your commitment to pushing the boundaries of
                          what's possible on the web. I've been following your work on [mention a specific project or
                          technology], and I'm eager to contribute my expertise in React, TypeScript, and Next.js to
                          help you continue to innovate.
                        </p>
                      </div>
                      <div>
                        <p className="text-sm">
                          I'd love to chat about how my passion for creating exceptional user interfaces aligns with
                          your vision. Looking forward to the possibility of collaborating with your talented team!
                        </p>
                      </div>
                      <div>
                        <p className="text-sm">Enthusiastically,</p>
                        <p className="text-sm">John Doe</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="concise" className="mt-4">
                  <div className="rounded-lg border p-6">
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm">John Doe</p>
                        <p className="text-sm">john.doe@example.com | (555) 123-4567</p>
                      </div>
                      <div>
                        <p className="text-sm">[Current Date]</p>
                      </div>
                      <div>
                        <p className="text-sm">Re: {job.title} Position</p>
                      </div>
                      <div>
                        <p className="text-sm">Dear Hiring Team,</p>
                      </div>
                      <div>
                        <p className="text-sm">
                          I am applying for the {job.title} position at {job.company} with 4+ years of experience in
                          frontend development specializing in React, TypeScript, and Next.js.
                        </p>
                      </div>
                      <div>
                        <p className="text-sm">Key achievements:</p>
                        <ul className="list-disc pl-5 text-sm">
                          <li>Reduced load times by 40% through code optimization</li>
                          <li>Built 30+ reusable UI components, improving development efficiency by 25%</li>
                          <li>Implemented TypeScript across 5 projects, reducing production bugs by 30%</li>
                        </ul>
                      </div>
                      <div>
                        <p className="text-sm">
                          I'm drawn to {job.company}'s innovative approach and would welcome the opportunity to discuss
                          how I can contribute to your team.
                        </p>
                      </div>
                      <div>
                        <p className="text-sm">Regards,</p>
                        <p className="text-sm">John Doe</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            )}
          </CardContent>
          {generated && (
            <CardFooter className="flex justify-between">
              <div className="flex gap-2">
                <Button variant="outline" size="icon">
                  <Copy className="h-4 w-4" />
                  <span className="sr-only">Copy</span>
                </Button>
                <Button variant="outline" size="icon">
                  <Download className="h-4 w-4" />
                  <span className="sr-only">Download</span>
                </Button>
                <Button variant="outline">
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </Button>
              </div>
              <Button>Use This Cover Letter</Button>
            </CardFooter>
          )}
        </Card>
      </div>
    </DashboardLayout>
  )
}
