"use client"

import DashboardLayout from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BriefcaseBusiness, MapPin, Search } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function Jobs() {
  const [matchThreshold, setMatchThreshold] = useState(70)

  // Mock job data
  const jobs = [
    {
      id: "1",
      title: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA (Remote)",
      salary: "$120,000 - $150,000",
      posted: "2 days ago",
      matchScore: 92,
      skills: ["React", "TypeScript", "Next.js", "CSS"],
      description: "We're looking for a Senior Frontend Developer to join our team...",
    },
    {
      id: "2",
      title: "UX/UI Designer",
      company: "Design Masters",
      location: "New York, NY",
      salary: "$90,000 - $120,000",
      posted: "1 week ago",
      matchScore: 88,
      skills: ["Figma", "UI Design", "User Research", "Prototyping"],
      description: "Design Masters is seeking a talented UX/UI Designer to create beautiful interfaces...",
    },
    {
      id: "3",
      title: "Product Manager",
      company: "Innovate Solutions",
      location: "Austin, TX (Hybrid)",
      salary: "$110,000 - $140,000",
      posted: "3 days ago",
      matchScore: 85,
      skills: ["Product Strategy", "Agile", "User Stories", "Roadmapping"],
      description: "Join our product team to lead the development of innovative solutions...",
    },
    {
      id: "4",
      title: "Full Stack Developer",
      company: "WebTech Solutions",
      location: "Chicago, IL",
      salary: "$100,000 - $130,000",
      posted: "1 day ago",
      matchScore: 82,
      skills: ["JavaScript", "Node.js", "React", "MongoDB"],
      description: "Looking for a Full Stack Developer to build and maintain web applications...",
    },
    {
      id: "5",
      title: "DevOps Engineer",
      company: "Cloud Systems Inc.",
      location: "Seattle, WA (Remote)",
      salary: "$130,000 - $160,000",
      posted: "5 days ago",
      matchScore: 78,
      skills: ["AWS", "Docker", "Kubernetes", "CI/CD"],
      description: "Join our DevOps team to build and maintain our cloud infrastructure...",
    },
    {
      id: "6",
      title: "Data Scientist",
      company: "Data Insights Co.",
      location: "Boston, MA",
      salary: "$115,000 - $145,000",
      posted: "1 week ago",
      matchScore: 75,
      skills: ["Python", "Machine Learning", "SQL", "Data Visualization"],
      description: "We're looking for a Data Scientist to help us extract insights from our data...",
    },
    {
      id: "7",
      title: "Frontend Developer",
      company: "Creative Web Agency",
      location: "Portland, OR",
      salary: "$85,000 - $110,000",
      posted: "3 days ago",
      matchScore: 72,
      skills: ["JavaScript", "React", "CSS", "HTML"],
      description: "Join our creative team to build beautiful and responsive web interfaces...",
    },
  ]

  // Filter jobs based on match threshold
  const filteredJobs = jobs.filter((job) => job.matchScore >= matchThreshold)

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 p-4 md:gap-8 md:p-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Job Search</h1>
          <p className="text-muted-foreground">Find your perfect job match with our AI-powered job recommendations</p>
        </div>
        <Tabs defaultValue="matches">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <TabsList>
              <TabsTrigger value="matches">AI Matches</TabsTrigger>
              <TabsTrigger value="saved">Saved Jobs</TabsTrigger>
              <TabsTrigger value="applied">Applied</TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-2">
              <Label htmlFor="match-threshold" className="text-sm">
                Match Score: {matchThreshold}%+
              </Label>
              <Slider
                id="match-threshold"
                min={0}
                max={100}
                step={5}
                value={[matchThreshold]}
                onValueChange={(value) => setMatchThreshold(value[0])}
                className="w-[120px]"
              />
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-4 md:flex-row">
            <Card className="flex-1 md:max-w-xs">
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="search" className="text-sm font-medium">
                      Search
                    </Label>
                    <div className="mt-1 flex items-center gap-2">
                      <Input id="search" placeholder="Job title, company, skills..." className="flex-1" />
                      <Button size="icon" variant="outline">
                        <Search className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="location" className="text-sm font-medium">
                      Location
                    </Label>
                    <Input id="location" placeholder="City, state, or remote" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="job-type" className="text-sm font-medium">
                      Job Type
                    </Label>
                    <Select defaultValue="all">
                      <SelectTrigger id="job-type" className="mt-1">
                        <SelectValue placeholder="Select job type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="full-time">Full-time</SelectItem>
                        <SelectItem value="part-time">Part-time</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                        <SelectItem value="remote">Remote</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="experience" className="text-sm font-medium">
                      Experience Level
                    </Label>
                    <Select defaultValue="all">
                      <SelectTrigger id="experience" className="mt-1">
                        <SelectValue placeholder="Select experience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Levels</SelectItem>
                        <SelectItem value="entry">Entry Level</SelectItem>
                        <SelectItem value="mid">Mid Level</SelectItem>
                        <SelectItem value="senior">Senior Level</SelectItem>
                        <SelectItem value="executive">Executive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="salary" className="text-sm font-medium">
                      Salary Range
                    </Label>
                    <Select defaultValue="all">
                      <SelectTrigger id="salary" className="mt-1">
                        <SelectValue placeholder="Select salary range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Any Salary</SelectItem>
                        <SelectItem value="50k">$50k+</SelectItem>
                        <SelectItem value="75k">$75k+</SelectItem>
                        <SelectItem value="100k">$100k+</SelectItem>
                        <SelectItem value="150k">$150k+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full">Apply Filters</Button>
                </div>
              </CardContent>
            </Card>
            <TabsContent value="matches" className="flex-1 mt-0">
              <div className="space-y-4">
                {filteredJobs.length > 0 ? (
                  filteredJobs.map((job) => (
                    <Link href={`/jobs/${job.id}`} key={job.id}>
                      <Card className="cursor-pointer hover:bg-muted/50">
                        <CardContent className="p-6">
                          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                            <div className="space-y-1">
                              <h3 className="font-semibold">{job.title}</h3>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <BriefcaseBusiness className="h-4 w-4" />
                                <span>{job.company}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <MapPin className="h-4 w-4" />
                                <span>{job.location}</span>
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {job.salary} • Posted {job.posted}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="text-right">
                                <div className="text-lg font-bold text-primary">{job.matchScore}%</div>
                                <div className="text-xs text-muted-foreground">Match Score</div>
                              </div>
                              <div
                                className="h-16 w-16 rounded-full border-4"
                                style={{
                                  borderColor: `hsl(${job.matchScore * 1.2}, 100%, 50%)`,
                                  borderRightColor: "transparent",
                                  transform: "rotate(45deg)",
                                }}
                              ></div>
                            </div>
                          </div>
                          <div className="mt-4">
                            <div className="flex flex-wrap gap-2">
                              {job.skills.map((skill) => (
                                <div
                                  key={skill}
                                  className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                                >
                                  {skill}
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="mt-4 line-clamp-2 text-sm text-muted-foreground">{job.description}</div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                    <BriefcaseBusiness className="h-10 w-10 text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-medium">No matching jobs found</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Try adjusting your filters or lowering the match threshold
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
            <TabsContent value="saved" className="flex-1 mt-0">
              <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                <BriefcaseBusiness className="h-10 w-10 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">No saved jobs</h3>
                <p className="mt-2 text-sm text-muted-foreground">Jobs you save will appear here for easy access</p>
              </div>
            </TabsContent>
            <TabsContent value="applied" className="flex-1 mt-0">
              <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                <BriefcaseBusiness className="h-10 w-10 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">No applications yet</h3>
                <p className="mt-2 text-sm text-muted-foreground">Track your job applications and their status here</p>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
