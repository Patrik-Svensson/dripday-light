#!/bin/bash

# Check if venv directory exists
if [ ! -d "venv" ]; then
  echo "Creating virtual environment..."
  python3 -m venv venv
fi

# Activate the virtual environment
source venv/bin/activate

# Install requirements
if [ -f "requirements.txt" ]; then
  echo "Installing requirements..."
  pip install -r requirements.txt
else
  echo "requirements.txt not found."
fi

# Run the Flask application
python3 app.py
