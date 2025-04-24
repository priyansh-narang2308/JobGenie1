import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Bookmark, BookmarkCheck } from "lucide-react"
import { useState, useEffect } from "react"

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

interface JobResultsProps {
  skills: string[]
  jobs: Job[]
  message: string
}

export function JobResults({ skills, jobs, message }: JobResultsProps) {
  const [savedJobs, setSavedJobs] = useState<Job[]>([])
  const [minScore, setMinScore] = useState(0) // Default minimum score of 0

  // Load saved jobs from localStorage on component mount
  useEffect(() => {
    const saved = localStorage.getItem('savedJobs')
    console.log('Loading saved jobs from localStorage:', saved)
    if (saved) {
      try {
        const parsedSaved = JSON.parse(saved)
        console.log('Parsed saved jobs:', parsedSaved)
        setSavedJobs(parsedSaved)
      } catch (error) {
        console.error('Error parsing saved jobs:', error)
      }
    }
  }, [])

  // Save jobs to localStorage whenever savedJobs changes
  useEffect(() => {
    console.log('Saving jobs to localStorage:', savedJobs)
    localStorage.setItem('savedJobs', JSON.stringify(savedJobs))
  }, [savedJobs])

  const handleSaveJob = (job: Job) => {
    console.log('Saving job:', job)
    if (!savedJobs.some(savedJob => savedJob.url === job.url)) {
      const newSavedJobs = [...savedJobs, job]
      console.log('New saved jobs array:', newSavedJobs)
      setSavedJobs(newSavedJobs)
    }
  }

  const handleRemoveSavedJob = (job: Job) => {
    console.log('Removing job:', job)
    const newSavedJobs = savedJobs.filter(savedJob => savedJob.url !== job.url)
    console.log('New saved jobs array after removal:', newSavedJobs)
    setSavedJobs(newSavedJobs)
  }

  const isJobSaved = (job: Job) => {
    const isSaved = savedJobs.some(savedJob => savedJob.url === job.url)
    console.log('Checking if job is saved:', job.title, isSaved)
    return isSaved
  }

  // Function to calculate relative match score out of 100
  const getRelativeMatchScore = (score: number) => {
    // Original score is out of 10, but we'll make it look better
    // Add a base score of 50 and scale the remaining 50 points
    const baseScore = 50
    const scaledScore = Math.round((score / 10) * 50)
    return baseScore + scaledScore
  }

  // Debug function to log job scores
  const logJobScores = (jobs: Job[]) => {
    console.log('Original jobs:', jobs)
    const processedJobs = jobs.map(job => ({
      ...job,
      originalScore: job.match_score,
      modifiedScore: getRelativeMatchScore(job.match_score)
    }))
    console.log('Processed jobs with scores:', processedJobs)
    return processedJobs
  }

  return (
    <div className="space-y-6">
      {/* Skills Section */}
      <Card>
        <CardHeader>
          <CardTitle>Extracted Skills</CardTitle>
          <CardDescription>Skills found in your resume</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <Badge key={index} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Matched Jobs Section */}
      <Card>
        <CardHeader>
          <CardTitle>AI Matched Jobs</CardTitle>
          <CardDescription>{message}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {jobs.length > 0 ? (
            logJobScores(jobs)
              .filter(job => job.modifiedScore >= 0) // Filter based on modified score, starting from 0
              .sort((a, b) => b.modifiedScore - a.modifiedScore) // Sort by modified score
              .map((job, index) => (
                <Card key={index} className="border">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{job.title}</CardTitle>
                        <CardDescription className="mt-1">
                          {job.company} • {job.location}
                        </CardDescription>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-sm text-muted-foreground mb-1">Match Score</span>
                        <Badge variant="outline" className="text-lg font-bold px-3 py-1">
                          {job.modifiedScore}%
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                      {job.description}
                    </p>
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-2">
                        {job.skills_matched.map((skill, skillIndex) => (
                          <Badge key={skillIndex} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex justify-end items-center">
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(job.url, "_blank")}
                          >
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Apply
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => isJobSaved(job) ? handleRemoveSavedJob(job) : handleSaveJob(job)}
                          >
                            {isJobSaved(job) ? (
                              <BookmarkCheck className="mr-2 h-4 w-4" />
                            ) : (
                              <Bookmark className="mr-2 h-4 w-4" />
                            )}
                            {isJobSaved(job) ? "Saved" : "Save"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
          ) : (
            <p className="text-center text-muted-foreground">
              No matching jobs found. Try adjusting your search criteria.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

// Separate Saved Jobs Component
export function SavedJobs() {
  const [savedJobs, setSavedJobs] = useState<Job[]>([])

  // Load saved jobs from localStorage on component mount
  useEffect(() => {
    console.log('SavedJobs component mounted')
    const saved = localStorage.getItem('savedJobs')
    console.log('Loading saved jobs from localStorage:', saved)
    if (saved) {
      try {
        const parsedSaved = JSON.parse(saved)
        console.log('Parsed saved jobs:', parsedSaved)
        if (Array.isArray(parsedSaved)) {
          setSavedJobs(parsedSaved)
        } else {
          console.error('Saved jobs is not an array:', parsedSaved)
          setSavedJobs([])
        }
      } catch (error) {
        console.error('Error parsing saved jobs:', error)
        setSavedJobs([])
      }
    }
  }, [])

  const handleRemoveSavedJob = (job: Job) => {
    console.log('Removing job from saved jobs:', job)
    const newSavedJobs = savedJobs.filter(savedJob => savedJob.url !== job.url)
    console.log('New saved jobs after removal:', newSavedJobs)
    setSavedJobs(newSavedJobs)
    localStorage.setItem('savedJobs', JSON.stringify(newSavedJobs))
  }

  // Function to calculate relative match score out of 100
  const getRelativeMatchScore = (score: number) => {
    // Original score is out of 10, but we'll make it look better
    // Add a base score of 50 and scale the remaining 50 points
    const baseScore = 50
    const scaledScore = Math.round((score / 10) * 50)
    return baseScore + scaledScore
  }

  console.log('Rendering SavedJobs component with jobs:', savedJobs)

  if (savedJobs.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Saved Jobs</CardTitle>
          <CardDescription>No saved jobs yet</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Saved Jobs</CardTitle>
        <CardDescription>Jobs you've saved for later</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {savedJobs.map((job, index) => (
          <Card key={index} className="border">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{job.title}</CardTitle>
                  <CardDescription className="mt-1">
                    {job.company} • {job.location}
                  </CardDescription>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-sm text-muted-foreground mb-1">Match Score</span>
                  <Badge variant="outline" className="text-lg font-bold px-3 py-1">
                    {getRelativeMatchScore(job.match_score)}%
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                {job.description}
              </p>
              <div className="space-y-2">
                <div className="flex flex-wrap gap-2">
                  {job.skills_matched.map((skill, skillIndex) => (
                    <Badge key={skillIndex} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
                <div className="flex justify-end items-center">
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(job.url, "_blank")}
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Apply
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRemoveSavedJob(job)}
                    >
                      <BookmarkCheck className="mr-2 h-4 w-4" />
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  )
} 