import { useState } from "react"
import { ResumeUpload } from "./resume-upload"
import { JobResults } from "./job-results"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import axios from "axios"

interface JobSearchResponse {
  success: boolean
  message: string
  skills: string[]
  jobs: Array<{
    title: string
    company: string
    location: string
    description: string
    url: string
    match_score: number
    skills_matched: string[]
    posted_date: string
  }>
}

export function JobSearch() {
  const [position, setPosition] = useState("")
  const [location, setLocation] = useState("")
  const [jobType, setJobType] = useState("")
  const [searchResults, setSearchResults] = useState<JobSearchResponse | null>(null)
  const [isSearching, setIsSearching] = useState(false)
  const [error, setError] = useState("")
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  const handleUpload = (file: File) => {
    setUploadedFile(file)
  }

  const handleSearch = async () => {
    if (!uploadedFile) {
      setError("Please upload a resume first")
      return
    }

    if (!position || !location || !jobType) {
      setError("Please fill in all search criteria (position, location, job type)")
      return
    }

    setIsSearching(true)
    setError("")
    
    try {
      const formData = new FormData()
      formData.append("resume", uploadedFile)
      formData.append("position", position)
      formData.append("location", location)
      formData.append("job_type", jobType)

      console.log("Sending form data with fields:", {
        position,
        location,
        jobType,
        fileName: uploadedFile.name
      })

      const response = await axios.post<JobSearchResponse>("http://localhost:8000/api/jobs/search", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      console.log("Response received:", response.data)

      if (response.data.success) {
        setSearchResults(response.data)
      } else {
        setError("API request was not successful")
        console.error("API request was not successful:", response.data)
      }
    } catch (error) {
      console.error("Error searching for jobs:", error)
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.detail || error.message
        setError(`Error: ${errorMessage}`)
        console.error("Error details:", error.response?.data)
      } else {
        setError("An unexpected error occurred")
      }
    } finally {
      setIsSearching(false)
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Left side - Input form */}
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="position">Position</Label>
          <Input
            id="position"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            placeholder="e.g., Software Engineer"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g., New York"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="jobType">Job Type</Label>
          <Select value={jobType} onValueChange={setJobType}>
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

        <ResumeUpload onUpload={handleUpload} />

        <Button 
          onClick={handleSearch}
          disabled={isSearching || !uploadedFile}
          className="w-full"
        >
          <Search className="mr-2 h-4 w-4" />
          {isSearching ? "Searching..." : "Search Jobs"}
        </Button>

        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}
      </div>

      {/* Right side - Results */}
      <div className="space-y-6">
        {searchResults && (
          <JobResults
            skills={searchResults.skills}
            jobs={searchResults.jobs}
            message={searchResults.message}
          />
        )}
      </div>
    </div>
  )
} 