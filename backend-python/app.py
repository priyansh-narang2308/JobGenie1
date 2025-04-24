from fastapi import FastAPI, UploadFile, File, HTTPException, Form
import os
from fastapi import FastAPI
from dotenv import load_dotenv
import google.generativeai as genai
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import google.generativeai as genai
import os
from typing import Dict, Any
from services import extract_resume_skills, fetch_jobs_from_linkedin
from routers.jobs import router as jobs_router
from routers.career_guidance import router as career_guidance_router
from routers.career_path import router as career_path_router
from routers.career_chatbot import router as career_chatbot_router

# Load environment variables
load_dotenv()

load_dotenv()

from routes import career_guidance_routes

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
FRONTEND_URL = os.getenv("FRONTEND_URL")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routerr
app.include_router(career_guidance_router)
app.include_router(career_path_router)
app.include_router(career_chatbot_router)
app.include_router(jobs_router)

# Root endpoint
@app.get("/")
async def root():
    return {"message": "Welcome to JobGenie API"}

# Job search endpoints
genai.configure(api_key=GEMINI_API_KEY)

