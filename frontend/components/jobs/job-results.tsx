import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

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

      {/* Jobs Section */}
      <Card>
        <CardHeader>
          <CardTitle>Matching Jobs</CardTitle>
          <CardDescription>{message}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {jobs.length > 0 ? (
            jobs.map((job, index) => (
              <Card key={index} className="border">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{job.title}</CardTitle>
                      <CardDescription className="mt-1">
                        {job.company} • {job.location}
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className="ml-2">
                      Match Score: {job.match_score}
                    </Badge>
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
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Posted: {job.posted_date}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(job.url, "_blank")}
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Apply
                      </Button>
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