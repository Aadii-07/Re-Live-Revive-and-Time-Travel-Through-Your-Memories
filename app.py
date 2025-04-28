import h5py
import tensorflow as tf
import numpy as np
from PIL import Image
import io
import base64
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

# Load the trained generator model
model_path = r"C:\Users\LENOVO\Downloads\grayscale_to_color_custom_gan_generator.h5"  # Update as needed
try:
    generator = tf.keras.models.load_model(model_path)
    print(f"Model loaded from {model_path}")
except Exception as e:
    print(f"Error loading model: {e}")
    raise

# Define preprocessing function
def preprocess_image(image, img_size=(128, 128)):
    img = Image.open(image).convert('L')  # Convert to grayscale
    img = img.resize(img_size, Image.Resampling.LANCZOS)
    img_array = np.array(img).astype('float32') / 127.5 - 1.0
    img_array = np.expand_dims(img_array, axis=-1)  # Add channel dimension
    img_array = np.expand_dims(img_array, axis=0)   # Add batch dimension
    return img_array

# Define postprocessing function
def postprocess_image(img_array):
    img_array = (img_array + 1) / 2.0  # Rescale to [0, 1]
    img_array = np.clip(img_array, 0, 1)  # Ensure values are in valid range
    return (img_array * 255).astype(np.uint8)

@app.route('/enhance', methods=['POST'])
def enhance_image():
    try:
        # Check if an image file is included
        if 'image' not in request.files:
            return jsonify({'error': 'No image provided', 'success': False}), 400

        file = request.files['image']
        if file.filename == '':
            return jsonify({'error': 'No image selected', 'success': False}), 400

        # Validate file type
        if not file.mimetype.startswith('image/'):
            return jsonify({'error': 'Invalid file type. Please upload an image.', 'success': False}), 400

        # Preprocess the image
        input_gray = preprocess_image(file.stream)

        # Generate colorized image
        generated_rgb = generator.predict(input_gray)
        generated_rgb = postprocess_image(generated_rgb)

        # Convert to PIL Image
        colorized_img = Image.fromarray(generated_rgb[0])

        # Save to bytes
        img_byte_arr = io.BytesIO()
        colorized_img.save(img_byte_arr, format='PNG')
        encoded_img = base64.b64encode(img_byte_arr.getvalue()).decode('utf-8')

        return jsonify({
            'image': encoded_img,
            'format': 'png',
            'success': True
        }), 200

    except Exception as e:
        print(f"Error processing image: {e}")
        return jsonify({'error': str(e), 'success': False}), 500

@app.route('/')
def home():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
