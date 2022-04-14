from flask import Blueprint, jsonify, request

authentication = Blueprint("authentication", __name__, url_prefix="/user/")


@authentication.route("/")
def login():
    return jsonify({"message": "Hello World!"})
