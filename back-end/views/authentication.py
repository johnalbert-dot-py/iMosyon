from flask import Blueprint, jsonify, request
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_cors import cross_origin
authentication = Blueprint("authentication", __name__, url_prefix="/api/user")


@authentication.route("/login", methods=["POST"])
@cross_origin()
def login():
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    remember = request.json.get("remember", None)

    print(remember)

    if username != "test" or password != "test":
        return jsonify({"message": " Username or Password is invalid."}), 401
    id = 69
    access_token = create_access_token(
        identity={"username": username, "id": id})

    return jsonify({"access_token": access_token}), 200


@authentication.route("/register", methods=["POST"])
@cross_origin()
def new_user():
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    email = request.json.get("email", None)

    if username is None or password is None or email is None:
        return jsonify({"message": "Missing username or password"}), 400

    return jsonify({"message": "Successfully created user"}), 201
