from fastapi import APIRouter, Request
from services import detect_language, translate_text, generate_ai_response, SYSTEM_PROMPT

router = APIRouter()

@router.post("/career-guidance")
async def career_guidance(request: Request):
    body = await request.json()
    user_query = body.get("query", "")
    
    if not user_query:
        return {"error": "No query provided"}
    
    try:
        # Detect language and translate if needed
        detected_language = detect_language(user_query)
        translated_query = user_query if detected_language == "en" else translate_text(user_query, target_language="en")
        
        # Generate prompt with system instructions
        prompt_with_system = SYSTEM_PROMPT + "\n" + translated_query
        
        # Get response from AI model
        response_text = generate_ai_response(prompt_with_system)
        
        if not response_text:
            return {"error": "No response from AI model"}
            
        # Translate response back if needed
        final_response = response_text if detected_language == "en" else translate_text(response_text, target_language=detected_language)
        
        return {"response": final_response, "language": detected_language}
    except Exception as e:
        return {"error": str(e)}