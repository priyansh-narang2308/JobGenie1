"use client"

import axios from 'axios'
import { useState, useEffect } from "react"
import { useRouter } from 'next/router'
import DashboardLayout from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { AlertCircle, Check, Download, FileText, Upload } from "lucide-react"

interface MatchedSkill {
  skill: string
  isMatch: boolean
}

interface ResumeIssue {
  type: "warning" | "info"
  message: string
  suggestion: string | null
}

interface AnalysisItem {
  type: 'done' | 'warning';
  text: string;
}

export default function Resume() {
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)
  const [jobDescription, setJobDescription] = useState("")
  const [selfDescription, setSelfDescription] = useState("")
  const [isDragging, setIsDragging] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [atsScore, setAtsScore] = useState<number | null>(null)
  const [resumeIssues, setResumeIssues] = useState<ResumeIssue[]>([])
  const [resumeSkills, setResumeSkills] = useState<string[]>([])
  const [jobSkills, setJobSkills] = useState<string[]>([])
  const [skillsMatchPercentage, setSkillsMatchPercentage] = useState<number>(0)
  const [isCustomizing, setIsCustomizing] = useState(false)
  const [isGeneratingCover, setIsGeneratingCover] = useState(false)
  const [extractedText, setExtractedText] = useState("")
  const [resumeUrl, setResumeUrl] = useState("")
  const [coverLetterUrl, setCoverLetterUrl] = useState("")

  useEffect(() => {
    if (isProcessing) { 
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [isProcessing])

  useEffect(() => {
    if (isComplete) {
      const timer = setTimeout(() => {
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [isComplete])

  const handleATSAnalysis = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/resume/eval-ats', {
        jdText: jobDescription,
        resumeText: extractedText,
      });

      if (response.data) {
        setAtsScore(response.data.score);
        setResumeIssues(
          response.data.analysis.map((item: AnalysisItem) => ({
            type: item.type === 'done' ? 'info' : 'warning',
            message: item.text,
            suggestion: null,
          }))
        );
      }
    } catch (error) {
      console.error('Error fetching ATS analysis:', error);
      alert('Failed to fetch ATS analysis. Please try again.');
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile?.type === "application/pdf") {
      setFile(droppedFile)
      await extractTextFromResume(droppedFile)
    } else {
      alert("Please upload a PDF file")
    }
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile?.type === "application/pdf") {
      setFile(selectedFile)
      await extractTextFromResume(selectedFile)
    } else {
      alert("Please upload a PDF file")
    }
  }

  const extractTextFromResume = async (file: File) => {
    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await axios.post('http://localhost:5000/api/resume/extract-text', formData)
      if (response.data.resumeText) {
        setExtractedText(response.data.resumeText)
      }
    } catch (error) {
      console.error('Error extracting text:', error)
      alert('Error extracting text from resume')
    }
  }

  const handleSubmit = async () => {
    if (!file) {
      alert("Please upload a resume first")
      return
    }
    if (!jobDescription.trim()) {
      alert("Please paste the job description")
      return
    }

    setIsProcessing(true)
    setIsCustomizing(true)
    setIsGeneratingCover(true)

    try {
      const skillsResponse = await axios.post('http://localhost:5000/api/resume/extract-skills', {
        text: extractedText
      })

      if (skillsResponse.data.skills) {
        setResumeSkills(skillsResponse.data.skills)
      }

      const jobSkillsResponse = await axios.post('http://localhost:5000/api/resume/extract-jd-skills', {
        text: jobDescription
      })

      if (jobSkillsResponse.data.skills) {
        setJobSkills(jobSkillsResponse.data.skills)

        const compareResponse = await axios.post('http://localhost:5000/api/resume/match-skills', {
          jdSkills: jobSkillsResponse.data.skills,
          resumeSkills: skillsResponse.data.skills
        })

        if (compareResponse.data) {
          setSkillsMatchPercentage(compareResponse.data.matchPercentage)
        }
      }
      setIsProcessing(true);

      await handleATSAnalysis();

      setIsComplete(true)
      
      Promise.all([
        axios.post('http://localhost:5000/api/resume/customise', {
          resumeText: extractedText,
          jobDescription,
          selfDescription
        }).then(resumeResponse => {
          if (resumeResponse.data.resume) {
            const blob = base64ToBlob(resumeResponse.data.resume, 'application/pdf')
            setResumeUrl(URL.createObjectURL(blob))
          }
          setIsCustomizing(false)
        }).catch(error => {
          console.error('Error customizing resume:', error)
          setIsCustomizing(false)
        }),

        axios.post('http://localhost:5000/api/resume/generate-cover-letter', {
          resumeText: extractedText,
          jobDescription,
          selfDescription
        }).then(coverResponse => {
          if (coverResponse.data.coverLetter) {
            const blob = base64ToBlob(coverResponse.data.coverLetter, 'application/pdf')
            setCoverLetterUrl(URL.createObjectURL(blob))
          }
          setIsGeneratingCover(false)
        }).catch(error => {
          console.error('Error generating cover letter:', error)
          setIsGeneratingCover(false)
        })
      ]).catch(error => {
        console.error('Error in optimization:', error)
        alert('An error occurred during processing')
        setIsProcessing(false)
        setIsCustomizing(false)
        setIsGeneratingCover(false)
      })

    } catch (error) {
      console.error('Error in optimization:', error)
      alert('An error occurred during processing')
      setIsProcessing(false)
      setIsCustomizing(false)
      setIsGeneratingCover(false)
    }
  }

  const base64ToBlob = (base64: string, mime: string) => {
    const byteCharacters = atob(base64)
    const byteNumbers = new Array(byteCharacters.length).fill(0).map((_, i) => byteCharacters.charCodeAt(i))
    const byteArray = new Uint8Array(byteNumbers)
    return new Blob([byteArray], { type: mime })
  }

  const downloadResume = () => {
    if (resumeUrl) {
      window.open(resumeUrl, '_blank')
    }
  }

  const downloadCoverLetter = () => {
    if (coverLetterUrl) {
      window.open(coverLetterUrl, '_blank')
    }
  }

  const getMatchColor = (match: "high" | "medium" | "low") => {
    switch (match) {
      case "high":
        return "bg-green-500/10 text-green-700"
      case "medium":
        return "bg-yellow-500/10 text-yellow-700"
      case "low":
        return "bg-red-500/10 text-red-700"
    }
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 p-4 md:gap-6 md:p-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Resume Tools</h1>
          <p className="text-muted-foreground">Upload your resume and customise it for specific job descriptions - cover letters too!</p>
        </div>

        <div className="relative">
          <div
            className={`space-y-6 transition-all duration-500 ${
              isProcessing ? "opacity-0 translate-y-[-1rem] pointer-events-none absolute inset-x-0" : "opacity-100"
            }`}
          >
            <Card>
              <CardHeader className="pb-4">
                <CardTitle>Upload Resume</CardTitle>
                <CardDescription>Drag and drop your resume or click to upload</CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                    isDragging ? "border-primary bg-primary/5" : "border-muted"
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="hidden"
                    id="resume-upload"
                  />
                  <label
                    htmlFor="resume-upload"
                    className="flex flex-col items-center gap-2 cursor-pointer"
                  >
                    <Upload className="h-6 w-6 text-muted-foreground" />
                    <span className="font-medium">
                      {file ? file.name : "Drop your resume here or click to browse"}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      Supports PDF files only
                    </span>
                  </label>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-4">
                <CardTitle>Job Description</CardTitle>
                <CardDescription>Paste the job description you want to optimize for</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Paste the job description here..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  rows={5}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-4">
                <CardTitle>Self Description (Optional)</CardTitle>
                <CardDescription>Add any additional information about yourself</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Describe your additional skills, experiences, or preferences..."
                  value={selfDescription}
                  onChange={(e) => setSelfDescription(e.target.value)}
                  rows={3}
                />
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button onClick={handleSubmit}>
                Analyse & Generate
              </Button>
            </div>
          </div>

          <div
            className={`grid gap-6 grid-cols-1 md:grid-cols-2 transition-all duration-500 ${
              isProcessing ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none absolute inset-x-0"
            }`}
          >
            <Card>
              <CardHeader>
                <CardTitle>{isComplete ? "Processed JD" : "Processing JD"}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    {!isComplete && (
                      <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                    )}
                  </div>
                  {isComplete && (
                    <div className="space-y-6 transition-opacity duration-300">
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-medium mb-2">Required Skills</h3>
                          <div className="flex flex-wrap gap-2">
                            {jobSkills.map((skill) => (
                              <div
                                key={skill}
                                className="px-2 py-1 rounded-md text-sm bg-yellow-500/10 text-yellow-700"
                              >
                                {skill}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="pt-4 border-t">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-medium">Skills Match</h3>
                            <span className="text-sm font-medium text-primary">
                              {skillsMatchPercentage}%
                            </span>
                          </div>
                          <div className="h-2 rounded-full bg-muted overflow-hidden">
                            <div
                              className="h-full bg-primary transition-all duration-1000 ease-in-out"
                              style={{ width: `${skillsMatchPercentage}%` }}
                            />
                          </div>
                          <div className="mt-8 text-right">
                            <Button 
                              variant="secondary"
                              onClick={() => router.push('/career-guidance')}
                            >
                              Get Career Guidance
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{isComplete ? "Analysed Resume" : "Analysing Resume"}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    {!isComplete && (
                      <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                    )}
                  </div>
                  {isComplete && atsScore !== null && (
                    <div className="space-y-6 opacity-0 transition-opacity duration-500" style={{ animation: 'fadeIn 0.5s ease-out 0.3s forwards' }}>
                      <div className="flex flex-col items-center">
                        <div
                          className="relative flex h-32 w-32 items-center justify-center rounded-full transition-all duration-1000"
                          style={{
                            background: `conic-gradient(hsl(${atsScore * 1.2}, 100%, 50%) ${atsScore}%, transparent 0)`,
                          }}
                        >
                          <div className="absolute inset-2 flex items-center justify-center rounded-full bg-card">
                            <div className="text-center">
                              <div className="text-3xl font-bold">{atsScore}</div>
                              <div className="text-xs text-muted-foreground">ATS Score</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="font-medium">ATS Analysis</h3>
                        <div className="space-y-3">
                          {resumeIssues.map((issue, index) => (
                            <div
                              key={index}
                              className="flex gap-2 p-3 rounded-lg border transition-all duration-300"
                              style={{
                                animation: `fadeIn 0.5s ease-out ${0.5 + index * 0.1}s forwards`,
                                opacity: 0
                              }}
                            >
                              <div className="mt-0.5">
                                {issue.type === "warning" ? (
                                  <AlertCircle className="h-4 w-4 text-yellow-500" />
                                ) : (
                                  <Check className="h-4 w-4 text-green-500" />
                                )}
                              </div>
                              <div>
                                <p className="text-sm font-medium">{issue.message}</p>
                                {issue.suggestion && (
                                  <p className="text-xs text-muted-foreground mt-1">{issue.suggestion}</p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {isComplete && (
              <div className="col-span-full flex justify-end gap-4 opacity-0 transition-opacity duration-300" style={{ animation: 'fadeIn 0.3s ease-out 0.6s forwards' }}>
                <Button variant="outline" disabled={isCustomizing} onClick={downloadResume}>
                  <div className="flex items-center gap-2">
                    {isCustomizing ? (
                      <>
                        <div className="h-4 w-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                        <span>Customizing Resume...</span>
                      </>
                    ) : (
                      <>
                        <Download className="h-4 w-4" />
                        <span>Download Resume</span>
                      </>
                    )}
                  </div>
                </Button>
                <Button 
                  variant="outline" 
                  disabled={isGeneratingCover} 
                  onClick={downloadCoverLetter}
                >
                  <div className="flex items-center gap-2">
                    {isGeneratingCover ? (
                      <>
                        <div className="h-4 w-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                        <span>Generating Cover Letter...</span>
                      </>
                    ) : (
                      <>
                        <Download className="h-4 w-4" />
                        <span>Download Cover Letter</span>
                      </>
                    )}
                  </div>
                </Button>
              </div>
            )}
          </div>
        </div>

        <style jsx>{`
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateX(-0.5rem);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
        `}</style>
      </div>
    </DashboardLayout>
  )
}
