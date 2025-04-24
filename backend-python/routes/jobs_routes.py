import os
from typing import Dict, Any
from fastapi import APIRouter, UploadFile, File, HTTPException, Form
from services.jobs_service import extract_resume_skills, fetch_jobs_from_linkedin

router = APIRouter(prefix="/api/jobs", tags=["jobs"])

@router.post("/search")
async def search_jobs(
    position: str = Form(...),
    location: str = Form(...),
    job_type: str = Form(...),
    resume: UploadFile = File(..., alias="resume")
) -> Dict[str, Any]:
    try:
        print(f"Received job search request: position={position}, location={location}, job_type={job_type}")
        
        if not resume.filename.endswith('.pdf'):
            raise HTTPException(status_code=400, detail="Only PDF files are allowed")

        temp_path = f"temp_{resume.filename}"
        with open(temp_path, "wb") as buffer:
            content = await resume.read()
            buffer.write(content)
        
        print("Extracting skills from resume...")
        skills = extract_resume_skills(temp_path)
        print(f"Extracted skills: {skills}")
        
        if not skills:
            raise HTTPException(
                status_code=400, 
                detail="No skills could be extracted from the resume. Please ensure your resume contains relevant skills and experience."
            )
        
        print("Fetching matching jobs...")
        jobs = fetch_jobs_from_linkedin(position, location, job_type, skills)
        
        os.remove(temp_path)
        
        if not jobs:
            return {
                "success": True,
                "message": "No matching jobs found for the given criteria. Try adjusting your search parameters or consider expanding your search area.",
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
        print(f"HTTP Exception: {str(e)}")
        raise e
    except Exception as e:
        print(f"Unexpected error: {str(e)}")
        raise HTTPException(
            status_code=500, 
            detail=f"An unexpected error occurred while processing your request. Please try again later. Error: {str(e)}"
        )
