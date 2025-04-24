import json
from googletrans import Translator
import google.generativeai as genai

model = genai.GenerativeModel("gemini-2.5-flash-preview-04-17")

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
    translator = Translator()
    translation = translator.translate(text, dest=target_language)
    return translation.text

def detect_language(text):
    translator = Translator()
    detection = translator.detect(text)
    return detection.lang

def generate_ai_response(prompt):
    response = model.generate_content(prompt)
    response_text = response.text if hasattr(response, "text") else response.parts[0].text if hasattr(response, "parts") and response.parts else None
    return response_text

def process_career_path_response(response_text):
    try:
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
    return {
        "skills": [translate_text(skill, target_language) for skill in career_path["skills"]],
        "nodes": [{
            **node,
            "title": translate_text(node["title"], target_language),
            "requirements": [translate_text(req, target_language) for req in node["requirements"]],
            "details": translate_text(node["details"], target_language)
        } for node in career_path["nodes"]]
    }
