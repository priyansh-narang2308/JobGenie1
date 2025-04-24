import os
import sys
import uvicorn

current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(current_dir)

sys.path.append(parent_dir)
sys.path.append(current_dir)

if __name__ == "__main__":
    uvicorn.run("backend-python.app:app", host="0.0.0.0", port=8000, reload=True) 
