from datetime import timedelta, datetime
from time import time
from flask import Blueprint, jsonify, request
from flask_jwt_extended import create_access_token, set_access_cookies
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_cors import cross_origin
from flask_expects_json import expects_json

from services.authentication import userRegistration, userLogin

authentication = Blueprint("authentication", __name__, url_prefix="/api/user")


@authentication.route("/login", methods=["POST"])
@expects_json(
    {
        "username": {"type": "string"},
        "password": {"type": "string"},
        "required": ["username", "password"],
    }
)
def login():
    return userLogin(request)


@authentication.route("/register", methods=["POST"])
@expects_json(
    {
        "name": {"type": "string"},
        "email": {"type": "email"},
        "username": {"type": "string"},
        "password": {"type": "string"},
        "required": ["username", "password", "email", "name"],
    }
)
def register():
    return userRegistration(request)


@authentication.route("/me", methods=["GET"])
@jwt_required()
def me():
    username = get_jwt_identity()
    print(request.cookies)
    return jsonify({"username": username}), 200
