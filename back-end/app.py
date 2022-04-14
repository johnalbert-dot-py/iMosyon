from flask import Flask
from flask import jsonify
from flask import request

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

# blueprints
from views.authentication import authentication

app = Flask(__name__)
app.register_blueprint(authentication)

if __name__ == "__main__":
    app.run(debug=True)
