import DashboardLayout from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BriefcaseBusiness, FileText, LineChart, MessageSquare, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function Dashboard() {
  const stats = [
    {
      title: "Profile Completion",
      value: "85%",
      description: "Complete your profile to improve matches",
      icon: <LineChart className="h-5 w-5 text-muted-foreground" />,
      progress: 85,
    },
    {
      title: "Job Applications",
      value: "12",
      description: "Applications submitted this month",
      icon: <BriefcaseBusiness className="h-5 w-5 text-muted-foreground" />,
    },
    {
      title: "Interviews",
      value: "3",
      description: "Upcoming interviews scheduled",
      icon: <MessageSquare className="h-5 w-5 text-muted-foreground" />,
    },
    {
      title: "Resume Views",
      value: "28",
      description: "Employers viewed your resume",
      icon: <FileText className="h-5 w-5 text-muted-foreground" />,
    },
  ]

  const recommendedJobs = [
    {
      id: "1",
      title: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA (Remote)",
      matchScore: 92,
    },
    {
      id: "2",
      title: "UX/UI Designer",
      company: "Design Masters",
      location: "New York, NY",
      matchScore: 88,
    },
    {
      id: "3",
      title: "Product Manager",
      company: "Innovate Solutions",
      location: "Austin, TX (Hybrid)",
      matchScore: 85,
    },
  ]

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 p-4 md:gap-8 md:p-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's an overview of your job search progress.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                {stat.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
                {stat.progress && <Progress value={stat.progress} className="mt-3 h-2" />}
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="col-span-full lg:col-span-2">
            <CardHeader>
              <CardTitle>AI-Matched Job Recommendations</CardTitle>
              <CardDescription>Jobs that match your skills and experience</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recommendedJobs.map((job) => (
                  <Link href={`/jobs/${job.id}`} key={job.id}>
                    <div className="flex cursor-pointer items-start justify-between rounded-lg border p-4 hover:bg-muted/50">
                      <div className="space-y-1">
                        <h3 className="font-medium">{job.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {job.company} • {job.location}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-sm font-medium text-primary">{job.matchScore}% Match</div>
                        <div
                          className="h-10 w-10 rounded-full border-4"
                          style={{
                            borderColor: `hsl(${job.matchScore * 1.2}, 100%, 50%)`,
                            borderRightColor: "transparent",
                            transform: "rotate(45deg)",
                          }}
                        ></div>
                      </div>
                    </div>
                  </Link>
                ))}
                <Link href="/jobs">
                  <div className="flex cursor-pointer items-center justify-center rounded-lg border p-3 text-sm font-medium hover:bg-muted/50">
                    View all job matches
                  </div>
                </Link>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Career Growth</CardTitle>
              <CardDescription>Your skill development progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">React</div>
                    <div className="text-sm text-muted-foreground">Advanced</div>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">TypeScript</div>
                    <div className="text-sm text-muted-foreground">Intermediate</div>
                  </div>
                  <Progress value={65} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">Next.js</div>
                    <div className="text-sm text-muted-foreground">Intermediate</div>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">UI/UX Design</div>
                    <div className="text-sm text-muted-foreground">Beginner</div>
                  </div>
                  <Progress value={30} className="h-2" />
                </div>
                <Link href="/learning">
                  <div className="flex cursor-pointer items-center justify-center rounded-lg border p-3 text-sm font-medium hover:bg-muted/50">
                    View skill development plan
                  </div>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your recent job search activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4 rounded-lg border p-3">
                  <TrendingUp className="mt-1 h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Resume updated</p>
                    <p className="text-sm text-muted-foreground">
                      You updated your resume with new skills and experience
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">2 days ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 rounded-lg border p-3">
                  <BriefcaseBusiness className="mt-1 h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Applied to Senior Frontend Developer</p>
                    <p className="text-sm text-muted-foreground">at TechCorp Inc.</p>
                    <p className="mt-1 text-xs text-muted-foreground">3 days ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 rounded-lg border p-3">
                  <MessageSquare className="mt-1 h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Completed mock interview</p>
                    <p className="text-sm text-muted-foreground">Frontend development technical interview</p>
                    <p className="mt-1 text-xs text-muted-foreground">5 days ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Tasks</CardTitle>
              <CardDescription>Recommended actions to improve your job search</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4 rounded-lg border p-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                    1
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Complete your LinkedIn profile</p>
                    <p className="text-sm text-muted-foreground">
                      Enhance your online presence to attract more recruiters
                    </p>
                    <Link href="/profile" className="mt-2 inline-block text-sm font-medium text-primary">
                      Update profile
                    </Link>
                  </div>
                </div>
                <div className="flex items-start gap-4 rounded-lg border p-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                    2
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Practice for upcoming interview</p>
                    <p className="text-sm text-muted-foreground">Scheduled for TechCorp Inc. on Friday at 2:00 PM</p>
                    <Link href="/dashboard/practice/1" className="mt-2 inline-block text-sm font-medium text-primary">
                      Start practice
                    </Link>
                  </div>
                </div>
                <div className="flex items-start gap-4 rounded-lg border p-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                    3
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Improve your Next.js skills</p>
                    <p className="text-sm text-muted-foreground">Take recommended courses to fill skill gaps</p>
                    <Link href="/learning" className="mt-2 inline-block text-sm font-medium text-primary">
                      View courses
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
