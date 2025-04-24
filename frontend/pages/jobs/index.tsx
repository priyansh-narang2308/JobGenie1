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
import { ResumeUpload } from "@/components/jobs/resume-upload"
import { JobResults } from "@/components/jobs/job-results"
import { toast } from "sonner"
import { Badge } from "@/components/ui/badge"

interface Job {
  title: string
  company: string
  location: string
  description: string
  url: string
  match_score: number
  skills_matched: string[]
  posted_date: string
}

export default function Jobs() {
  const [matchThreshold, setMatchThreshold] = useState(70)
  const [jobs, setJobs] = useState<Job[]>([])
  const [skills, setSkills] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [searchParams, setSearchParams] = useState({
    position: "",
    location: "",
    jobType: "all",
  })
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [searchMessage, setSearchMessage] = useState("")

  const handleSearch = async () => {
    if (!resumeFile) {
      toast.error("Please upload your resume first")
      return
    }

    if (!searchParams.position || !searchParams.location) {
      toast.error("Please fill in position and location")
      return
    }

    setLoading(true)
    try {
      const formData = new FormData()
      formData.append("resume", resumeFile)
      formData.append("position", searchParams.position)
      formData.append("location", searchParams.location)
      formData.append("job_type", searchParams.jobType)

      console.log("Sending search request with:", {
        position: searchParams.position,
        location: searchParams.location,
        jobType: searchParams.jobType
      })

      const response = await fetch("http://localhost:8000/api/jobs/search", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()
      console.log("Received response:", data)

      if (!response.ok) {
        throw new Error(typeof data === 'string' ? data : JSON.stringify(data))
      }

      if (data.success) {
        setJobs(data.jobs || [])
        setSkills(data.skills || [])
        setSearchMessage(data.message || "Found matching jobs")
        toast.success(data.message || "Jobs found successfully")
      } else {
        throw new Error(data.message || "Failed to fetch jobs")
      }
    } catch (error) {
      console.error("Search error:", error)
      const errorMessage = error instanceof Error ? error.message : "Failed to fetch jobs. Please try again."
      toast.error(errorMessage)
      setJobs([])
      setSkills([])
      setSearchMessage("")
    } finally {
      setLoading(false)
    }
  }

  // Filter jobs based on match threshold
  const filteredJobs = jobs.filter((job) => {
    // Convert match score to percentage (assuming max score is 10)
    const matchPercentage = (job.match_score / 10) * 100
    return matchPercentage >= matchThreshold
  })

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
          <TabsContent value="matches" className="space-y-4">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-1/3 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="position">Position</Label>
                  <Input
                    id="position"
                    value={searchParams.position}
                    onChange={(e) => setSearchParams({ ...searchParams, position: e.target.value })}
                    placeholder="e.g., Software Engineer"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={searchParams.location}
                    onChange={(e) => setSearchParams({ ...searchParams, location: e.target.value })}
                    placeholder="e.g., New York"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="jobType">Job Type</Label>
                  <Select
                    value={searchParams.jobType}
                    onValueChange={(value) => setSearchParams({ ...searchParams, jobType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select job type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Full Time</SelectItem>
                      <SelectItem value="part-time">Part Time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="internship">Internship</SelectItem>
                      <SelectItem value="all">All Types</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <ResumeUpload onUpload={setResumeFile} />
                <Button
                  onClick={handleSearch}
                  disabled={loading || !resumeFile}
                  className="w-full"
                >
                  <Search className="mr-2 h-4 w-4" />
                  {loading ? "Searching..." : "Search Jobs"}
                </Button>
              </div>
              <div className="w-full md:w-2/3">
                {loading ? (
                  <div className="flex items-center justify-center h-32">
                    <p className="text-muted-foreground">Searching for jobs...</p>
                  </div>
                ) : (
                  <JobResults
                    skills={skills}
                    jobs={filteredJobs}
                    message={`${searchMessage} (showing ${filteredJobs.length} jobs with ${matchThreshold}%+ match)`}
                  />
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
