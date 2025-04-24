from fastapi import APIRouter, Request
from services import (
    detect_language, translate_text, generate_ai_response, 
    process_career_path_response, translate_career_path,
    CAREER_PATH_PROMPT
)

router = APIRouter(prefix="/api")  # Add prefix for all routes in this router

@router.post("/career-path")
async def generate_career_path(request: Request):
    try:
        body = await request.json()
        career = body.get("career", "")
        
        if not career:
            return {"error": "No career specified"}
        
        # Detect language and translate if needed
        detected_language = detect_language(career)
        translated_career = career if detected_language == "en" else translate_text(career, target_language="en")
        
        # Create prompt for career path
        prompt = f"{CAREER_PATH_PROMPT}\nGenerate a career path for: {translated_career}"
        
        # Get response from AI model
        response_text = generate_ai_response(prompt)
        
        if not response_text:
            return {"error": "No response from AI model"}
        
        # Process the response to extract JSON
        career_path = process_career_path_response(response_text)
        
        if not career_path:
            return {
                "error": "Failed to parse career path data",
                "raw_response": response_text
            }
        
        # Translate back if needed
        if detected_language != "en":
            career_path = translate_career_path(career_path, detected_language)
            
        return career_path
    except Exception as e:
        print(f"Error in career path endpoint: {str(e)}")
        return {"error": str(e)}