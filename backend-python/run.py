import os
import sys

# Get the absolute path of the current directory
current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(current_dir)

# Add both the current directory and its parent to the Python path
sys.path.append(parent_dir)
sys.path.append(current_dir)

import uvicorn

if __name__ == "__main__":
    uvicorn.run("backend-python.app:app", host="0.0.0.0", port=8000, reload=True) 