import requests
import base64
import os
import io
import mimetypes
from PIL import Image

# Configuration
URL = "http://127.0.0.1:5000/enhance"  # Backend URL (localhost for same-machine testing)
IMAGE_PATH = r"C:\DTI Project\Gray Processed Image\image33056.jpg" # Path to your image
OUTPUT_PATH = r"E:\colorized_output.png"  # Explicit output path

# Verify image exists
if not os.path.exists(IMAGE_PATH):
    print(f"Error: Image file {IMAGE_PATH} does not exist")
    exit(1)

# Verify file is readable
if not os.access(IMAGE_PATH, os.R_OK):
    print(f"Error: Cannot read file {IMAGE_PATH}. Check permissions.")
    exit(1)

# Check file MIME type
mime_type, _ = mimetypes.guess_type(IMAGE_PATH)
if not mime_type or not mime_type.startswith('image/'):
    print(f"Error: File {IMAGE_PATH} is not recognized as an image. Detected MIME type: {mime_type}")
    exit(1)

# Verify write permissions for output directory
output_dir = os.path.dirname(OUTPUT_PATH)
if not os.access(output_dir, os.W_OK):
    print(f"Error: No write permission for directory {output_dir}")
    exit(1)

try:
    # Open and send image to backend
    with open(IMAGE_PATH, 'rb') as img_file:
        files = {'image': (os.path.basename(IMAGE_PATH), img_file, mime_type)}
        print(f"Sending request to backend with file {IMAGE_PATH} (MIME type: {mime_type})...")
        response = requests.post(URL, files=files, timeout=30)

    # Process response
    if response.status_code == 200 and response.json()['success']:
        result = response.json()
        img_data = base64.b64decode(result['image'])
        img = Image.open(io.BytesIO(img_data))
        img.save(OUTPUT_PATH)
        print(f"Colorized image saved as {OUTPUT_PATH}")
    else:
        print(f"Error from backend: {response.json()['error']}")

except requests.exceptions.ConnectionError:
    print(f"Error: Could not connect to the backend. Ensure app.py is running on {URL}")
except PermissionError as e:
    print(f"Permission error: {e}")
except Exception as e:
    print(f"Unexpected error: {e}")
