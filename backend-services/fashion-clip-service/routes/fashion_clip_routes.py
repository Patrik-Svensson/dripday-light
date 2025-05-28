from flask import Blueprint, request, jsonify
from PIL import Image
from sklearn.metrics.pairwise import cosine_similarity
import torch
from utils.clip_model import model, processor

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

model.to(device)

fashion_clip_blueprint = Blueprint('fashion_clip_routes', __name__)

print("Using device:", device)  

@fashion_clip_blueprint.route('/fashion-clip/embed-image', methods=['POST'])
def embed_image():
    if 'image' not in request.files:
        return jsonify({"error": "No image file provided"}), 400
    
    image_file = request.files['image']
    image = Image.open(image_file.stream)
    inputs = processor(images=image, return_tensors="pt").to(device)  # Move inputs to the GPU if available

    with torch.no_grad():
        image_features = model.get_image_features(**inputs)
    
    image_features = image_features / image_features.norm(p=2, dim=-1, keepdim=True)
    image_features_list = image_features.tolist()[0]
    
    return jsonify({"features": image_features_list})

@fashion_clip_blueprint.route('/fashion-clip/image-image-similarity', methods=['POST'])
def compare_images():
    if 'image1' not in request.files or 'image2' not in request.files:
        return jsonify({"error": "Both image1 and image2 files must be provided"}), 400

    image1_file = request.files['image1']
    image2_file = request.files['image2']

    image1 = Image.open(image1_file.stream)
    image2 = Image.open(image2_file.stream)

    image1_inputs = processor(images=image1, return_tensors="pt").to(device)  # Move inputs to GPU
    image2_inputs = processor(images=image2, return_tensors="pt").to(device)  # Move inputs to GPU

    with torch.no_grad():
        image1_features = model.get_image_features(**image1_inputs)
        image2_features = model.get_image_features(**image2_inputs)

    image1_features = image1_features / image1_features.norm(p=2, dim=-1, keepdim=True)
    image2_features = image2_features / image2_features.norm(p=2, dim=-1, keepdim=True)

    cosine_sim = cosine_similarity(image1_features.cpu().numpy(), image2_features.cpu().numpy())  # Move to CPU for numpy operation
    similarity_score = float(cosine_sim[0][0])

    return jsonify({"similarity_score": similarity_score})

@fashion_clip_blueprint.route('/fashion-clip/embed-text', methods=['POST'])
def embed_text():
    if 'text' not in request.json:
        return jsonify({"error": "No text provided"}), 400

    text = request.json['text']
    inputs = processor(text=text, return_tensors="pt").to(device)  # Move inputs to GPU

    with torch.no_grad():
        text_features = model.get_text_features(**inputs)
    
    text_features = text_features / text_features.norm(p=2, dim=-1, keepdim=True)
    text_features_list = text_features.tolist()[0]

    return jsonify({"features": text_features_list})

@fashion_clip_blueprint.route('/fashion-clip/image-text-similarity', methods=['POST'])
def image_text_similarity():
    if 'image' not in request.files or 'text' not in request.form:
        return jsonify({"error": "Image file and text must be provided"}), 400
    
    image_file = request.files['image']
    text = request.form['text']
    image = Image.open(image_file.stream)
    
    image_inputs = processor(images=image, return_tensors="pt").to(device)  # Move inputs to GPU
    text_inputs = processor(text=text, return_tensors="pt").to(device)  # Move inputs to GPU

    with torch.no_grad():
        image_features = model.get_image_features(**image_inputs)
        text_features = model.get_text_features(**text_inputs)
    
    image_features = image_features / image_features.norm(p=2, dim=-1, keepdim=True)
    text_features = text_features / text_features.norm(p=2, dim=-1, keepdim=True)

    cosine_sim = cosine_similarity(image_features.cpu().numpy(), text_features.cpu().numpy())  # Move to CPU for numpy operation
    similarity_score = float(cosine_sim[0][0])
    
    return jsonify({"similarity_score": similarity_score})

@fashion_clip_blueprint.route('/fashion-clip/combine', methods=['POST'])
def combine_embeddings():
    if 'image' not in request.files or 'text' not in request.form:
        return jsonify({"error": "Image file and text must be provided"}), 400
    
    image_file = request.files['image']
    text = request.form['text']

    try:
        image = Image.open(image_file.stream)
        image_inputs = processor(images=image, return_tensors="pt").to(device)  # Move inputs to GPU

        text_inputs = processor(text=text, return_tensors="pt").to(device)  # Move inputs to GPU

        with torch.no_grad():
            image_features = model.get_image_features(**image_inputs)
            text_features = model.get_text_features(**text_inputs)

        image_features = image_features / image_features.norm(p=2, dim=-1, keepdim=True)
        text_features = text_features / text_features.norm(p=2, dim=-1, keepdim=True)

        combined_embedding = (image_features + text_features) / 2
        combined_embedding_list = combined_embedding.tolist()[0]

        return jsonify({"features": combined_embedding_list})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
