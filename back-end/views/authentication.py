from datetime import timedelta, datetime
from time import time
from flask import Blueprint, jsonify, request
from flask_jwt_extended import create_access_token, set_access_cookies
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_cors import cross_origin
from flask_expects_json import expects_json


authentication = Blueprint("authentication", __name__, url_prefix="/api/user")


@authentication.route("/login", methods=["POST"])
@cross_origin()
@expects_json({
    "username": {"type": "string"},
    "password": {"type": "string"},
    "required": ["username", "password"]
})
def login():
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    remember = request.json.get("remember", None)

    if username != "test" or password != "test":
        return jsonify({"message": " Username or Password is invalid."}), 401

    if remember:
        expired_on = timedelta(hours=24 * 15)
    else:
        expired_on = timedelta(seconds=20)

    access_token = create_access_token(
        identity={"username": username, "id": 0}, expires_delta=expired_on, fresh=True
    )
    response = jsonify(
        {"success": True, "expired_on": str(datetime.now() + expired_on)}
    )
    set_access_cookies(response, access_token, max_age=expired_on)
    return response, 200


@authentication.route("/register", methods=["POST"])
@cross_origin()
@expects_json({
    "name": {"type": "string"},
    "email": {"type": "email"},
    "username": {"type": "string"},
    "password": {"type": "string"},
    "required": ["username", "password"]
})
def register():
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    email = request.json.get("email", None)

    if username is None or password is None or email is None:
        return jsonify({"message": "Missing username or password"}), 400

    return jsonify({"message": "Successfully created user"}), 201


@authentication.route("/me", methods=["GET"])
@jwt_required()
@cross_origin()
def me():
    username = get_jwt_identity()
    print(request.cookies)
    return jsonify({"username": username}), 200
