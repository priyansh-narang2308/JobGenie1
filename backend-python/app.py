from fastapi import FastAPI, UploadFile, File, HTTPException, Form
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import google.generativeai as genai
import os
from typing import Dict, Any
from services import extract_resume_skills, fetch_jobs_from_linkedin
from routers.career_guidance import router as career_guidance_router
from routers.career_path import router as career_path_router
from routers.career_chatbot import router as career_chatbot_router
from routers.jobs import router as jobs_router

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI()

# Configure CORS for local frontend development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure Gemini API
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=GEMINI_API_KEY)

# Include routers
app.include_router(career_guidance_router)
app.include_router(career_path_router)
app.include_router(career_chatbot_router)
app.include_router(jobs_router)

# Root endpoint
@app.get("/")
async def root():
    return {"message": "Welcome to JobGenie API"}

# Job search endpoints
@app.post("/api/jobs/search")
async def search_jobs(
    position: str = Form(...),
    location: str = Form(...),
    job_type: str = Form(...),
    resume: UploadFile = File(...)
) -> Dict[str, Any]:
    try:
        # Validate file type
        if not resume.filename.endswith('.pdf'):
            raise HTTPException(status_code=400, detail="Only PDF files are allowed")

        # Save the uploaded file temporarily
        temp_path = f"temp_{resume.filename}"
        with open(temp_path, "wb") as buffer:
            content = await resume.read()
            buffer.write(content)
        
        # Extract skills from resume
        skills = extract_resume_skills(temp_path)
        if not skills:
            raise HTTPException(status_code=400, detail="No skills could be extracted from the resume")
        
        # Fetch matching jobs
        jobs = fetch_jobs_from_linkedin(position, location, job_type, skills)
        
        # Clean up temporary file
        os.remove(temp_path)
        
        if not jobs:
            return {
                "success": True,
                "message": "No matching jobs found for the given criteria",
                "skills": skills,
                "jobs": []
            }
        
        return {
            "success": True,
            "message": f"Found {len(jobs)} matching jobs",
            "skills": skills,
            "jobs": jobs
        }
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing request: {str(e)}")

@app.get("/api/jobs/test")
async def test_endpoint():
    return {"message": "Job search API is working!"}
