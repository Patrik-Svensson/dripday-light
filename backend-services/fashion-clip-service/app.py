from flask import Flask
from routes.formatting_routes import formatting_blueprint
from routes.fashion_clip_routes import fashion_clip_blueprint

app = Flask(__name__)

# Register Blueprints
app.register_blueprint(formatting_blueprint)
app.register_blueprint(fashion_clip_blueprint)

if __name__ == '__main__':
    print("Starting the server...")
    app.run(debug=True, host='0.0.0.0', port=5001)
