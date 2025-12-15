import os
import sys

# Add the project root to the Python path
project_root = os.path.abspath(os.path.dirname(__file__))
sys.path.insert(0, project_root)

# Import the app after setting up the path
from audit_assistant.app import app as application

if __name__ == "__main__":
    port = int(os.environ.get('PORT', 10000))
    application.run(host='0.0.0.0', port=port, debug=False)
