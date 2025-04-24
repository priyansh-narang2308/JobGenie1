from googletrans import Translator
import google.generativeai as genai
import json
import fitz  # PyMuPDF
from apify_client import ApifyClient
from collections import Counter

# Initialize Gemini model
model = genai.GenerativeModel("gemini-2.5-flash-preview-04-17")

# System prompts
SYSTEM_PROMPT = '''You are a highly skilled career guidance assistant. You only answer questions related to career advice, professional development, skills acquisition, job opportunities, or education. If a user asks about mathematics, logic puzzles, or any unrelated topics, you should politely explain that your expertise is focused on career guidance and hence the query is invalid and ask them to ask questions based on such. Also, suggest some actual courses and course-links related to the query, if it is valid.'''

CAREER_PATH_PROMPT = """You are a career path expert. Generate a detailed career progression path for the specified career. The response MUST be valid JSON and follow this exact format:
{
    "skills": ["skill1", "skill2", "skill3"],
    "nodes": [
        {
            "id": "entry",
            "title": "Entry Level Position",
            "timeframe": "0-2 years",
            "requirements": ["requirement1", "requirement2", "requirement3"],
            "details": "Detailed description of responsibilities and expectations"
        },
        {
            "id": "mid",
            "title": "Mid-Level Position",
            "timeframe": "2-5 years",
            "requirements": ["requirement1", "requirement2", "requirement3"],
            "details": "Detailed description of responsibilities and expectations"
        },
        {
            "id": "senior",
            "title": "Senior Level Position",
            "timeframe": "5+ years",
            "requirements": ["requirement1", "requirement2", "requirement3"],
            "details": "Detailed description of responsibilities and expectations"
        }
    ]
}"""

def translate_text(text, target_language="en"):
    """Translate text to the target language"""
    translator = Translator()
    translation = translator.translate(text, dest=target_language)
    return translation.text

def detect_language(text):
    """Detect the language of the provided text"""
    translator = Translator()
    detection = translator.detect(text)
    return detection.lang

def generate_ai_response(prompt):
    """Generate a response using the Gemini AI model"""
    response = model.generate_content(prompt)
    response_text = response.text if hasattr(response, "text") else response.parts[0].text if hasattr(response, "parts") and response.parts else None
    return response_text

def process_career_path_response(response_text):
    """Process and extract JSON from the career path response"""
    try:
        # Find the first { and last } to extract just the JSON part
        start = response_text.find('{')
        end = response_text.rfind('}') + 1
        if start != -1 and end != -1:
            json_str = response_text[start:end]
            return json.loads(json_str)
        else:
            raise json.JSONDecodeError("No JSON found in response", response_text, 0)
    except json.JSONDecodeError as e:
        print(f"JSON Error: {str(e)}, Response: {response_text}")
        return None

def translate_career_path(career_path, target_language):
    """Translate a career path object to the target language"""
    return {
        "skills": [translate_text(skill, target_language) for skill in career_path["skills"]],
        "nodes": [{
            **node,
            "title": translate_text(node["title"], target_language),
            "requirements": [translate_text(req, target_language) for req in node["requirements"]],
            "details": translate_text(node["details"], target_language)
        } for node in career_path["nodes"]]
    }

def extract_resume_skills(pdf_path):
    """Extract skills from a resume PDF file"""
    doc = fitz.open(pdf_path)
    text = ""
    for page in doc:
        text += page.get_text()

    # Comprehensive skill keywords
    skill_keywords = [
        # Programming Languages
        'python', 'java', 'javascript', 'typescript', 'c++', 'c#', 'ruby', 'php', 'swift', 'kotlin', 'go', 'rust',
        # Web Development
        'html', 'css', 'react', 'angular', 'vue', 'node.js', 'express', 'django', 'flask', 'spring', 'laravel',
        # Databases
        'sql', 'mysql', 'postgresql', 'mongodb', 'redis', 'oracle', 'sqlite',
        # Cloud & DevOps
        'aws', 'azure', 'gcp', 'docker', 'kubernetes', 'terraform', 'ansible', 'jenkins', 'git',
        # Data Science & ML
        'machine learning', 'deep learning', 'tensorflow', 'pytorch', 'scikit-learn', 'pandas', 'numpy', 'matplotlib',
        # Soft Skills
        'communication', 'leadership', 'teamwork', 'problem solving', 'critical thinking', 'time management',
        # Business Skills
        'project management', 'agile', 'scrum', 'jira', 'confluence', 'excel', 'powerpoint', 'word',
        # Design
        'figma', 'adobe photoshop', 'adobe illustrator', 'ui/ux', 'wireframing', 'prototyping',
        # Testing
        'unit testing', 'integration testing', 'qa', 'selenium', 'junit', 'pytest',
        # Security
        'cybersecurity', 'penetration testing', 'owasp', 'encryption', 'authentication', 'authorization'
    ]

    # Normalize text and skills for better matching
    text = text.lower()
    found_skills = []
    
    # Check for exact matches
    for skill in skill_keywords:
        if skill.lower() in text:
            found_skills.append(skill)
    
    # Check for variations (e.g., "python programming" -> "python")
    for skill in skill_keywords:
        if any(variation in text for variation in [f"{skill} ", f"{skill},", f"{skill}.", f"{skill} programming", f"{skill} development"]):
            if skill not in found_skills:
                found_skills.append(skill)
    
    return list(set(found_skills))

def fetch_jobs_from_linkedin(position, location, job_type, skills):
    """Fetch and match jobs from LinkedIn based on position, location, job type, and skills"""
    try:
        client = ApifyClient('apify_api_1ME92f74YTvAlNRlVSa4goll79oZGH2hCXjf')
        actor_id = "BHzefUZlZRKWxkTck"

        # Format the search query with more flexibility
        search_query = f"{position} {job_type} jobs in {location}"
        print(f"Searching for jobs with query: {search_query}")
        print(f"Skills to match: {skills}")
        
        # Prepare the run input with more flexible filters
        run_input = {
            "query": search_query,
            "location": location,
            "filters": {
                "workType": job_type.lower(),
                "experience": ["entry", "mid", "senior"],  # Include all experience levels
            },
            "maxResults": 50  # Increase number of results
        }

        print("Running Apify actor with input:", run_input)
        # Run the actor
        run = client.actor(actor_id).call(run_input=run_input)
        
        # Get the results
        dataset = client.dataset(run["defaultDatasetId"])
        jobs = dataset.list_items().items

        if not jobs:
            print(f"No jobs found for query: {search_query}")
            return []

        print(f"Found {len(jobs)} jobs, processing matches...")
        # Process and score jobs
        processed_jobs = []
        for job in jobs:
            try:
                job_description = f"{job.get('title', '')} {job.get('description', '')}".lower()
                
                # Calculate match score based on skills and position relevance
                skill_matches = [skill for skill in skills if skill.lower() in job_description]
                position_match = 1 if position.lower() in job_description else 0
                match_score = len(skill_matches) + position_match
                
                if match_score > 0:  # Only include jobs with at least one match
                    processed_job = {
                        'title': job.get('title', 'Unknown Position'),
                        'company': job.get('companyName', 'Unknown Company'),
                        'location': job.get('location', 'Unknown Location'),
                        'description': job.get('description', ''),
                        'url': job.get('applyUrl') or job.get('url', ''),
                        'match_score': match_score,
                        'skills_matched': skill_matches,
                        'posted_date': job.get('postedDate', 'Unknown')
                    }
                    processed_jobs.append(processed_job)
            except Exception as e:
                print(f"Error processing job: {str(e)}")
                continue

        # Sort by highest skill match score
        processed_jobs.sort(key=lambda x: x.get('match_score', 0), reverse=True)
        print(f"Returning {len(processed_jobs)} processed jobs")
        return processed_jobs

    except Exception as e:
        print(f"Error fetching jobs from LinkedIn: {str(e)}")
        return []