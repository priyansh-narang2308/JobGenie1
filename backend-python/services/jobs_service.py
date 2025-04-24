import os
import fitz
from dotenv import load_dotenv
from apify_client import ApifyClient

load_dotenv()

APIFY_API_KEY = os.getenv("APIFY_API_KEY")
APIFY_ACTOR_ID = os.getenv("APIFY_ACTOR_ID")

def extract_resume_skills(pdf_path):
    doc = fitz.open(pdf_path)
    text = ""
    for page in doc:
        text += page.get_text()

    skill_keywords = [
        'python', 'java', 'javascript', 'typescript', 'c++', 'c#', 'ruby', 'php', 'swift', 'kotlin', 'go', 'rust',
        'html', 'css', 'react', 'angular', 'vue', 'node.js', 'express', 'django', 'flask', 'spring', 'laravel',
        'sql', 'mysql', 'postgresql', 'mongodb', 'redis', 'oracle', 'sqlite',
        'aws', 'azure', 'gcp', 'docker', 'kubernetes', 'terraform', 'ansible', 'jenkins', 'git',
        'machine learning', 'deep learning', 'tensorflow', 'pytorch', 'scikit-learn', 'pandas', 'numpy', 'matplotlib',
        'communication', 'leadership', 'teamwork', 'problem solving', 'critical thinking', 'time management',
        'project management', 'agile', 'scrum', 'jira', 'confluence', 'excel', 'powerpoint', 'word',
        'figma', 'adobe photoshop', 'adobe illustrator', 'ui/ux', 'wireframing', 'prototyping',
        'unit testing', 'integration testing', 'qa', 'selenium', 'junit', 'pytest',
        'cybersecurity', 'penetration testing', 'owasp', 'encryption', 'authentication', 'authorization'
    ]

    text = text.lower()
    found_skills = []
    
    for skill in skill_keywords:
        if skill.lower() in text:
            found_skills.append(skill)
    
    for skill in skill_keywords:
        if any(variation in text for variation in [f"{skill} ", f"{skill},", f"{skill}.", f"{skill} programming", f"{skill} development"]):
            if skill not in found_skills:
                found_skills.append(skill)
    
    return list(set(found_skills))

def fetch_jobs_from_linkedin(position, location, job_type, skills):
    try:
        client = ApifyClient(APIFY_API_KEY)
        actor_id = APIFY_ACTOR_ID

        search_query = f"{position} {job_type} jobs in {location}"
        print(f"Searching for jobs with query: {search_query}")
        print(f"Skills to match: {skills}")
        
        run_input = {
            "query": search_query,
            "location": location,
            "filters": {
                "workType": job_type.lower(),
                "experience": ["entry", "mid", "senior"],
            },
            "maxResults": 50 
        }

        print("Running Apify actor with input:", run_input)
        run = client.actor(actor_id).call(run_input=run_input)
        
        dataset = client.dataset(run["defaultDatasetId"])
        jobs = dataset.list_items().items

        if not jobs:
            print(f"No jobs found for query: {search_query}")
            return []

        print(f"Found {len(jobs)} jobs, processing matches...")
        processed_jobs = []
        for job in jobs:
            try:
                job_description = f"{job.get('title', '')} {job.get('description', '')}".lower()
                
                skill_matches = [skill for skill in skills if skill.lower() in job_description]
                position_match = 1 if position.lower() in job_description else 0
                match_score = len(skill_matches) + position_match
                
                if match_score > 0: 
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

        processed_jobs.sort(key=lambda x: x.get('match_score', 0), reverse=True)
        print(f"Returning {len(processed_jobs)} processed jobs")
        return processed_jobs

    except Exception as e:
        print(f"Error fetching jobs from LinkedIn: {str(e)}")
        return []
