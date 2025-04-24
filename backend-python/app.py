from fastapi import FastAPI, UploadFile, File, HTTPException, Form
import os
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import google.generativeai as genai
from routes.jobs import router as jobs_router

# Load environment variables
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
app.include_router(career_guidance_routes)
app.include_router(jobs_router)

# Root endpoint
@app.get("/")
async def root():
    return {"message": "Welcome to JobGenie API"}

# Job search endpoints
genai.configure(api_key=GEMINI_API_KEY)

