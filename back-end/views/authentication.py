from flask import Blueprint, jsonify, request
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

authentication = Blueprint("authentication", __name__, url_prefix="/user")


@authentication.route("/login", methods=["POST"])
def login():
    username = request.json.get("username", None)
    password = request.json.get("password", None)

    if username != "test" or password != "test":
        return jsonify({"message": "Invalid credentials"}), 401
    id = 69
    access_token = create_access_token(identity={"username": username, "id": id})

    return jsonify({"access_token": access_token}), 200
