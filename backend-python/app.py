import os
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from fastapi import FastAPI
from dotenv import load_dotenv
import google.generativeai as genai
from routes.jobs_routes import router as jobs_router
from routes.career_guidance_routes import router as career_guidance_router
from fastapi.middleware.cors import CORSMiddleware
import google.generativeai as genai
from routes.jobs_routes import router as jobs_router
from routes.career_guidance_routes import router as career_guidance_router

load_dotenv()

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

app.include_router(career_guidance_router)
app.include_router(jobs_router)

@app.get("/")
async def root():
    return {"message": "The JobGenie API Service is up and running!"}

genai.configure(api_key=GEMINI_API_KEY)

