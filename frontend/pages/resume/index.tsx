"use client"

import DashboardLayout from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, ArrowUpDown, Check, Download, FileText, Upload } from "lucide-react"
import { useState } from "react"

export default function Resume() {
  const [activeTab, setActiveTab] = useState("current")
  const [optimizing, setOptimizing] = useState(false)

  // Mock resume data
  const resumeScore = 78
  const resumeIssues = [
    {
      type: "warning",
      message: "Your resume lacks quantifiable achievements",
      suggestion: "Add metrics and specific results to your work experience",
    },
    {
      type: "warning",
      message: "Skills section needs improvement",
      suggestion: "Add more relevant technical skills based on job market demand",
    },
    {
      type: "info",
      message: "Education section is well formatted",
      suggestion: null,
    },
  ]

  const handleOptimize = () => {
    setOptimizing(true)
    // Simulate optimization process
    setTimeout(() => {
      setOptimizing(false)
      setActiveTab("optimized")
    }, 3000)
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 p-4 md:gap-8 md:p-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Resume Tools</h1>
          <p className="text-muted-foreground">Upload, analyze, and optimize your resume for specific jobs</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="col-span-full lg:col-span-2">
            <CardHeader>
              <CardTitle>Your Resume</CardTitle>
              <CardDescription>Upload your resume to analyze and optimize it for job applications</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                  <TabsTrigger value="current">Current Resume</TabsTrigger>
                  <TabsTrigger value="optimized" disabled={!optimizing && activeTab !== "optimized"}>
                    Optimized Resume
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="current" className="mt-4">
                  <div className="rounded-lg border">
                    <div className="flex items-center justify-between border-b p-4">
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <span className="font-medium">John_Doe_Resume.pdf</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                        <Button variant="outline" size="sm">
                          <Upload className="mr-2 h-4 w-4" />
                          Update
                        </Button>
                      </div>
                    </div>
                    <div className="h-[400px] overflow-auto p-4">
                      <div className="space-y-4">
                        <div>
                          <h2 className="text-xl font-bold">John Doe</h2>
                          <p className="text-muted-foreground">Frontend Developer | San Francisco, CA</p>
                          <p className="text-sm text-muted-foreground">john.doe@example.com | (555) 123-4567</p>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">Summary</h3>
                          <p className="text-sm">
                            Frontend Developer with 4 years of experience building responsive web applications using
                            React, TypeScript, and Next.js. Passionate about creating intuitive user interfaces and
                            optimizing web performance.
                          </p>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">Experience</h3>
                          <div className="mt-2 space-y-4">
                            <div>
                              <div className="flex items-center justify-between">
                                <h4 className="font-medium">Frontend Developer</h4>
                                <span className="text-sm text-muted-foreground">2020 - Present</span>
                              </div>
                              <p className="text-sm text-muted-foreground">WebTech Solutions, San Francisco, CA</p>
                              <ul className="mt-1 list-disc pl-5 text-sm">
                                <li>Developed responsive web applications using React and TypeScript</li>
                                <li>Collaborated with designers to implement UI/UX improvements</li>
                                <li>Worked with backend developers to integrate APIs</li>
                                <li>Implemented state management using Redux and Context API</li>
                              </ul>
                            </div>
                            <div>
                              <div className="flex items-center justify-between">
                                <h4 className="font-medium">Junior Web Developer</h4>
                                <span className="text-sm text-muted-foreground">2018 - 2020</span>
                              </div>
                              <p className="text-sm text-muted-foreground">Digital Creations, Portland, OR</p>
                              <ul className="mt-1 list-disc pl-5 text-sm">
                                <li>Built and maintained websites using HTML, CSS, and JavaScript</li>
                                <li>Assisted senior developers with frontend tasks</li>
                                <li>Participated in code reviews and team meetings</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">Education</h3>
                          <div className="mt-2">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium">Bachelor of Science in Computer Science</h4>
                              <span className="text-sm text-muted-foreground">2014 - 2018</span>
                            </div>
                            <p className="text-sm text-muted-foreground">University of Oregon</p>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">Skills</h3>
                          <div className="mt-2 flex flex-wrap gap-2">
                            <div className="rounded-full bg-muted px-3 py-1 text-xs">React</div>
                            <div className="rounded-full bg-muted px-3 py-1 text-xs">TypeScript</div>
                            <div className="rounded-full bg-muted px-3 py-1 text-xs">JavaScript</div>
                            <div className="rounded-full bg-muted px-3 py-1 text-xs">HTML</div>
                            <div className="rounded-full bg-muted px-3 py-1 text-xs">CSS</div>
                            <div className="rounded-full bg-muted px-3 py-1 text-xs">Next.js</div>
                            <div className="rounded-full bg-muted px-3 py-1 text-xs">Redux</div>
                            <div className="rounded-full bg-muted px-3 py-1 text-xs">Git</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="optimized" className="mt-4">
                  {optimizing ? (
                    <div className="flex flex-col items-center justify-center rounded-lg border p-12">
                      <div className="space-y-4 text-center">
                        <div className="relative h-16 w-16">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <ArrowUpDown className="h-8 w-8 text-primary animate-pulse" />
                          </div>
                          <div className="absolute inset-0 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                        </div>
                        <div>
                          <h3 className="text-lg font-medium">Optimizing Your Resume</h3>
                          <p className="text-sm text-muted-foreground">
                            Our AI is analyzing and optimizing your resume for the selected job...
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="rounded-lg border">
                      <div className="flex items-center justify-between border-b p-4">
                        <div className="flex items-center gap-2">
                          <FileText className="h-5 w-5 text-primary" />
                          <span className="font-medium">John_Doe_Resume_Optimized.pdf</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </Button>
                        </div>
                      </div>
                      <div className="h-[400px] overflow-auto p-4">
                        <div className="space-y-4">
                          <div>
                            <h2 className="text-xl font-bold">John Doe</h2>
                            <p className="text-muted-foreground">Senior Frontend Developer | San Francisco, CA</p>
                            <p className="text-sm text-muted-foreground">
                              john.doe@example.com | (555) 123-4567 | linkedin.com/in/johndoe
                            </p>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold">Summary</h3>
                            <p className="text-sm">
                              <span className="bg-primary/10 px-1">
                                Senior Frontend Developer with 4+ years of experience building high-performance web
                                applications using React, TypeScript, and Next.js.
                              </span>{" "}
                              Proven track record of{" "}
                              <span className="bg-primary/10 px-1">
                                developing reusable components and optimizing frontend performance
                              </span>
                              . Passionate about creating intuitive user interfaces and delivering exceptional user
                              experiences.
                            </p>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold">Experience</h3>
                            <div className="mt-2 space-y-4">
                              <div>
                                <div className="flex items-center justify-between">
                                  <h4 className="font-medium">Frontend Developer</h4>
                                  <span className="text-sm text-muted-foreground">2020 - Present</span>
                                </div>
                                <p className="text-sm text-muted-foreground">WebTech Solutions, San Francisco, CA</p>
                                <ul className="mt-1 list-disc pl-5 text-sm">
                                  <li>
                                    <span className="bg-primary/10 px-1">
                                      Developed and maintained multiple React applications, reducing load time by 40%
                                      through code optimization
                                    </span>
                                  </li>
                                  <li>
                                    <span className="bg-primary/10 px-1">
                                      Built a component library of 30+ reusable UI components, improving development
                                      efficiency by 25%
                                    </span>
                                  </li>
                                  <li>
                                    <span className="bg-primary/10 px-1">
                                      Implemented TypeScript across 5 projects, reducing bugs in production by 30%
                                    </span>
                                  </li>
                                  <li>
                                    <span className="bg-primary/10 px-1">
                                      Collaborated with UX designers to implement responsive designs that increased
                                      mobile user engagement by 45%
                                    </span>
                                  </li>
                                </ul>
                              </div>
                              <div>
                                <div className="flex items-center justify-between">
                                  <h4 className="font-medium">Junior Web Developer</h4>
                                  <span className="text-sm text-muted-foreground">2018 - 2020</span>
                                </div>
                                <p className="text-sm text-muted-foreground">Digital Creations, Portland, OR</p>
                                <ul className="mt-1 list-disc pl-5 text-sm">
                                  <li>
                                    <span className="bg-primary/10 px-1">
                                      Developed and maintained 10+ client websites using HTML, CSS, and JavaScript
                                    </span>
                                  </li>
                                  <li>
                                    <span className="bg-primary/10 px-1">
                                      Reduced page load times by 35% through image optimization and code refactoring
                                    </span>
                                  </li>
                                  <li>
                                    <span className="bg-primary/10 px-1">
                                      Participated in 20+ client meetings to gather requirements and present solutions
                                    </span>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold">Education</h3>
                            <div className="mt-2">
                              <div className="flex items-center justify-between">
                                <h4 className="font-medium">Bachelor of Science in Computer Science</h4>
                                <span className="text-sm text-muted-foreground">2014 - 2018</span>
                              </div>
                              <p className="text-sm text-muted-foreground">University of Oregon</p>
                            </div>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold">Skills</h3>
                            <div className="mt-2 flex flex-wrap gap-2">
                              <div className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                                React
                              </div>
                              <div className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                                TypeScript
                              </div>
                              <div className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                                Next.js
                              </div>
                              <div className="rounded-full bg-muted px-3 py-1 text-xs">JavaScript</div>
                              <div className="rounded-full bg-muted px-3 py-1 text-xs">HTML/CSS</div>
                              <div className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                                Redux
                              </div>
                              <div className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                                RESTful APIs
                              </div>
                              <div className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                                UI/UX
                              </div>
                              <div className="rounded-full bg-muted px-3 py-1 text-xs">Git</div>
                              <div className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                                Performance Optimization
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                Upload New Resume
              </Button>
              <Button onClick={handleOptimize} disabled={optimizing}>
                {optimizing ? "Optimizing..." : "Optimize for Job"}
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Resume Analysis</CardTitle>
              <CardDescription>AI-powered insights to improve your resume</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex flex-col items-center">
                  <div
                    className="relative flex h-32 w-32 items-center justify-center rounded-full"
                    style={{
                      background: `conic-gradient(hsl(${resumeScore * 1.2}, 100%, 50%) ${resumeScore}%, transparent 0)`,
                    }}
                  >
                    <div className="absolute inset-2 flex items-center justify-center rounded-full bg-card">
                      <div className="text-center">
                        <div className="text-3xl font-bold">{resumeScore}</div>
                        <div className="text-xs text-muted-foreground">Resume Score</div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <p className="text-sm text-muted-foreground">
                      Your resume is good, but there's room for improvement
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Key Insights</h3>
                  {resumeIssues.map((issue, index) => (
                    <div key={index} className="flex gap-3 rounded-lg border p-3">
                      <div className="mt-0.5">
                        {issue.type === "warning" ? (
                          <AlertCircle className="h-5 w-5 text-yellow-500" />
                        ) : (
                          <Check className="h-5 w-5 text-green-500" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{issue.message}</p>
                        {issue.suggestion && <p className="text-sm text-muted-foreground">{issue.suggestion}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
