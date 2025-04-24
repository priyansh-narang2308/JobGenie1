"use client"

import DashboardLayout from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowUpRight,
  Bookmark,
  BriefcaseBusiness,
  Building2,
  Calendar,
  Clock,
  FileText,
  Globe,
  MapPin,
  Share2,
  ThumbsUp,
  MessageSquare,
} from "lucide-react"
import { useRouter } from "next/router"
import Link from "next/link"

export default function JobDetails() {
  const router = useRouter()
  const { id } = router.query

  // Mock job data - in a real app, you would fetch this based on the ID
  const job = {
    id: id || "1",
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA (Remote)",
    salary: "$120,000 - $150,000",
    posted: "2 days ago",
    matchScore: 92,
    type: "Full-time",
    experience: "5+ years",
    skills: [
      { name: "React", match: 95 },
      { name: "TypeScript", match: 90 },
      { name: "Next.js", match: 85 },
      { name: "CSS/SCSS", match: 80 },
      { name: "JavaScript", match: 95 },
      { name: "UI/UX", match: 75 },
    ],
    description: `
      <p>TechCorp Inc. is looking for a Senior Frontend Developer to join our growing team. You will be responsible for building and maintaining our web applications, working closely with our design and backend teams.</p>
      
      <h3>Responsibilities:</h3>
      <ul>
        <li>Develop new user-facing features using React.js</li>
        <li>Build reusable components and front-end libraries for future use</li>
        <li>Translate designs and wireframes into high-quality code</li>
        <li>Optimize components for maximum performance across devices and browsers</li>
        <li>Collaborate with the design team to implement visual elements</li>
      </ul>
      
      <h3>Requirements:</h3>
      <ul>
        <li>5+ years of experience in frontend development</li>
        <li>Strong proficiency in JavaScript, including DOM manipulation and the JavaScript object model</li>
        <li>Thorough understanding of React.js and its core principles</li>
        <li>Experience with TypeScript and Next.js</li>
        <li>Familiarity with RESTful APIs and GraphQL</li>
        <li>Knowledge of modern authorization mechanisms, such as JSON Web Token</li>
        <li>Familiarity with code versioning tools such as Git</li>
      </ul>
      
      <h3>Benefits:</h3>
      <ul>
        <li>Competitive salary and equity package</li>
        <li>Health, dental, and vision insurance</li>
        <li>Flexible work hours and remote work options</li>
        <li>Professional development budget</li>
        <li>Home office stipend</li>
        <li>401(k) matching</li>
      </ul>
    `,
    companyInfo: {
      name: "TechCorp Inc.",
      size: "501-1000 employees",
      industry: "Software Development",
      founded: "2010",
      website: "https://techcorp-example.com",
      about:
        "TechCorp Inc. is a leading software development company specializing in creating innovative solutions for businesses of all sizes. We are committed to delivering high-quality products that help our clients achieve their goals.",
    },
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 p-4 md:gap-8 md:p-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{job.title}</h1>
            <div className="flex flex-wrap items-center gap-2 text-muted-foreground">
              <span className="flex items-center gap-1">
                <Building2 className="h-4 w-4" /> {job.company}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" /> {job.location}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" /> Posted {job.posted}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-4 sm:mt-0">
            <Button variant="outline" size="icon">
              <Bookmark className="h-4 w-4" />
              <span className="sr-only">Save job</span>
            </Button>
            <Button variant="outline" size="icon">
              <Share2 className="h-4 w-4" />
              <span className="sr-only">Share job</span>
            </Button>
            <Button>Apply Now</Button>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Job Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex items-center gap-2">
                    <BriefcaseBusiness className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="text-sm font-medium">Job Type</div>
                      <div className="text-sm text-muted-foreground">{job.type}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="text-sm font-medium">Experience</div>
                      <div className="text-sm text-muted-foreground">{job.experience}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <ThumbsUp className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="text-sm font-medium">Salary</div>
                      <div className="text-sm text-muted-foreground">{job.salary}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="text-sm font-medium">Location</div>
                      <div className="text-sm text-muted-foreground">{job.location}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Tabs defaultValue="description">
              <TabsList>
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="company">Company</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="mt-4">
                <Card>
                  <CardContent className="p-6">
                    <div
                      className="prose max-w-none dark:prose-invert"
                      dangerouslySetInnerHTML={{ __html: job.description }}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="company" className="mt-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-medium">{job.companyInfo.name}</h3>
                        <div className="mt-2 grid gap-2 sm:grid-cols-2">
                          <div className="flex items-center gap-2">
                            <Building2 className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">{job.companyInfo.size}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <BriefcaseBusiness className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">{job.companyInfo.industry}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">Founded in {job.companyInfo.founded}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Globe className="h-4 w-4 text-muted-foreground" />
                            <a
                              href={job.companyInfo.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-primary hover:underline flex items-center gap-1"
                            >
                              Website <ArrowUpRight className="h-3 w-3" />
                            </a>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-md font-medium">About</h4>
                        <p className="mt-2 text-sm text-muted-foreground">{job.companyInfo.about}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Match Analysis</CardTitle>
                <CardDescription>How well your profile matches this job</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center">
                  <div
                    className="relative flex h-36 w-36 items-center justify-center rounded-full"
                    style={{
                      background: `conic-gradient(hsl(${job.matchScore * 1.2}, 100%, 50%) ${job.matchScore}%, transparent 0)`,
                    }}
                  >
                    <div className="absolute inset-2 flex items-center justify-center rounded-full bg-card">
                      <div className="text-center">
                        <div className="text-3xl font-bold">{job.matchScore}%</div>
                        <div className="text-xs text-muted-foreground">Match Score</div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 w-full space-y-4">
                    {job.skills.map((skill) => (
                      <div key={skill.name} className="space-y-1">
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-medium">{skill.name}</div>
                          <div className="text-sm text-muted-foreground">{skill.match}%</div>
                        </div>
                        <Progress value={skill.match} className="h-2" />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Recommended Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Link href={`/resume?jobId=${job.id}`}>
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <FileText className="h-4 w-4" />
                      Optimize Resume for This Job
                    </Button>
                  </Link>
                  <Link href={`/cover-letter/${job.id}`}>
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <FileText className="h-4 w-4" />
                      Generate Cover Letter
                    </Button>
                  </Link>
                  <Link href={`/dashboard/practice/${job.id}`}>
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <MessageSquare className="h-4 w-4" />
                      Practice Interview
                    </Button>
                  </Link>
                  <Button className="w-full">Apply Now</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
