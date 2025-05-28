import os
from transformers import CLIPProcessor, CLIPModel

model_name = "patrickjohncyh/fashion-clip"
local_model_dir = "local_clip_model"

# Check if the model is already saved locally
if not os.path.exists(local_model_dir):
    # Download and save the model locally
    model = CLIPModel.from_pretrained(model_name)
    processor = CLIPProcessor.from_pretrained(model_name)
    model.save_pretrained(local_model_dir)
    processor.save_pretrained(local_model_dir)
else:
    model = CLIPModel.from_pretrained(local_model_dir)
    processor = CLIPProcessor.from_pretrained(local_model_dir)
