from flask import Blueprint, request, jsonify, send_file
from PIL import Image
import io

formatting_blueprint = Blueprint('formatting_routes', __name__)

def resize_and_pad(image):
    desired_size = 224
    width, height = image.size
    ratio = min(desired_size / width, desired_size / height)
    new_size = (int(width * ratio), int(height * ratio))
    
    image = image.resize(new_size, Image.Resampling.LANCZOS)
    
    new_image = Image.new("RGB", (desired_size, desired_size), (255, 255, 255))
    left = (desired_size - new_size[0]) // 2
    top = (desired_size - new_size[1]) // 2
    
    new_image.paste(image, (left, top))
    
    return new_image

@formatting_blueprint.route('/resize-and-pad', methods=['POST'])
def resize_and_pad_endpoint():
    if 'image' not in request.files:
        return jsonify({"error": "No image file provided"}), 400
    
    image_file = request.files['image']
    
    try:
        image = Image.open(image_file.stream)
        resized_image = resize_and_pad(image)
        
        img_byte_arr = io.BytesIO()
        resized_image.save(img_byte_arr, format='JPEG')
        img_byte_arr.seek(0)
        
        return send_file(img_byte_arr, mimetype='image/jpeg')
    except Exception as e:
        return jsonify({"error": str(e)}), 500
