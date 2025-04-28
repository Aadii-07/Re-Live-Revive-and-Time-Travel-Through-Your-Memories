import h5py

file_path = r"C:\Users\LENOVO\Downloads\grayscale_to_color_custom_gan_generator.h5"  # replace with your actual file name

with h5py.File(file_path, 'r') as f:
    def print_structure(name, obj):
        print(name)
    f.visititems(print_structure)

import tensorflow as tf
import numpy as np
from PIL import Image
import matplotlib.pyplot as plt
import os

# Load the trained generator model
model_path = r"E:\Model\grayscale_to_color_custom_gan_generator.h5"
generator = tf.keras.models.load_model(model_path)
print(f"Model loaded from {model_path}")

# Define preprocessing function
def preprocess_image(image_path, img_size=(128, 128)):
    img = Image.open(image_path).convert('L')  # Convert to grayscale
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

# Load and preprocess the custom grayscale image
input_image_path = r"C:\DTI Project\Gray Processed Image\image30001.jpg" # Update this path
if not os.path.exists(input_image_path):
    print(f"Error: Input image {input_image_path} does not exist.")
else:
    input_gray = preprocess_image(input_image_path)
    print(f"Input image shape: {input_gray.shape}")

    # Generate colorized image
    generated_rgb = generator.predict(input_gray)
    generated_rgb = postprocess_image(generated_rgb)

    # Load the original grayscale image for comparison
    original_gray = Image.open(input_image_path).convert('L')
    original_gray = original_gray.resize((128, 128), Image.Resampling.LANCZOS)
    original_gray = np.array(original_gray).astype('float32') / 255.0

    # Visualize results
    plt.figure(figsize=(10, 5))

    plt.subplot(1, 2, 1)
    plt.imshow(original_gray, cmap='gray')
    plt.title('Input Grayscale Image')
    plt.axis('off')

    plt.subplot(1, 2, 2)
    plt.imshow(generated_rgb[0])
    plt.title('Generated Color Image')
    plt.axis('off')

    plt.savefig(r'E:\test result')
    plt.show()

    print("Result saved to /content/drive/MyDrive/colorization_test_result.png")
