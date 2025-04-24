from fastapi import APIRouter, Request
from services import detect_language, translate_text, generate_ai_response, SYSTEM_PROMPT

router = APIRouter()

@router.post("/career-chatbot")
async def career_chatbot(request: Request):
    try:
        body = await request.json()
        message = body.get("message", "")
        history = body.get("history", [])
        
        if not message:
            return {"error": "No message provided"}
        
        # Detect language and translate if needed
        detected_language = detect_language(message)
        translated_message = message if detected_language == "en" else translate_text(message, target_language="en")
        
        # Create prompt with chat history and system instructions
        content = f"{SYSTEM_PROMPT}\n\nChat history for context (DO NOT repeat this):\n"
        for msg in history:
            role = msg.get("role", "")
            msg_content = msg.get("content", "")
            content += f"\n{role.upper()}: {msg_content}"
        
        content += f"\n\nUSER: {translated_message}\n\nPlease respond to the user's last message."
        
        # Get response from AI model
        response_text = generate_ai_response(content)
        
        if not response_text:
            return {"error": "No response from AI model"}
            
        # Translate response back if needed
        final_response = response_text if detected_language == "en" else translate_text(response_text, target_language=detected_language)
        
        return {"response": final_response, "language": detected_language}
    except Exception as e:
        print(f"Error in career-chatbot endpoint: {str(e)}")
        return {"response": f"I'm having trouble processing your request. Error: {str(e)}", "error": str(e)}