from fastapi import APIRouter, Request
from services.career_guidance_service import (
    detect_language, 
    translate_text, 
    generate_ai_response, 
    process_career_path_response, 
    translate_career_path,
    SYSTEM_PROMPT, 
    CAREER_PATH_PROMPT
)

router = APIRouter()

@router.post("/career-chatbot")
async def career_chatbot(request: Request):
    try:
        body = await request.json()
        message = body.get("message", "")
        history = body.get("history", [])
        
        if not message:
            return {"error": "No message provided"}
        
        detected_language = detect_language(message)
        translated_message = message if detected_language == "en" else translate_text(message, target_language="en")
        
        content = f"{SYSTEM_PROMPT}\n\nChat history for context (DO NOT repeat this):\n"
        for msg in history:
            role = msg.get("role", "")
            msg_content = msg.get("content", "")
            content += f"\n{role.upper()}: {msg_content}"
        
        content += f"\n\nUSER: {translated_message}\n\nPlease respond to the user's last message."
        
        response_text = generate_ai_response(content)
        
        if not response_text:
            return {"error": "No response from AI model"}
            
        final_response = response_text if detected_language == "en" else translate_text(response_text, target_language=detected_language)
        
        return {"response": final_response, "language": detected_language}
    except Exception as e:
        print(f"Error in career-chatbot endpoint: {str(e)}")
        return {"response": f"I'm having trouble processing your request. Error: {str(e)}", "error": str(e)}


@router.post("/career-guidance")
async def career_guidance(request: Request):
    body = await request.json()
    user_query = body.get("query", "")
    
    if not user_query:
        return {"error": "No query provided"}
    
    try:
        detected_language = detect_language(user_query)
        translated_query = user_query if detected_language == "en" else translate_text(user_query, target_language="en")
        
        prompt_with_system = SYSTEM_PROMPT + "\n" + translated_query
        response_text = generate_ai_response(prompt_with_system)
        
        if not response_text:
            return {"error": "No response from AI model"}
            
        final_response = response_text if detected_language == "en" else translate_text(response_text, target_language=detected_language)
        
        return {"response": final_response, "language": detected_language}
    except Exception as e:
        return {"error": str(e)}


@router.post("/career-path")
async def generate_career_path(request: Request):
    try:
        body = await request.json()
        career = body.get("career", "")
        
        if not career:
            return {"error": "No career specified"}
        
        detected_language = detect_language(career)
        translated_career = career if detected_language == "en" else translate_text(career, target_language="en")

        prompt = f"{CAREER_PATH_PROMPT}\nGenerate a career path for: {translated_career}"
        response_text = generate_ai_response(prompt)
        
        if not response_text:
            return {"error": "No response from AI model"}
        
        career_path = process_career_path_response(response_text)
        
        if not career_path:
            return {
                "error": "Failed to parse career path data",
                "raw_response": response_text
            }
        
        if detected_language != "en":
            career_path = translate_career_path(career_path, detected_language)
            
        return career_path
    except Exception as e:
        print(f"Error in career path endpoint: {str(e)}")
        return {"error": str(e)}
