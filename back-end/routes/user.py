from flask import Blueprint, jsonify, request
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_expects_json import expects_json
from services.user import update_users_data, update_password
from models import User

user_data = Blueprint("user_data", __name__, url_prefix="/api/user")


@user_data.route("/", methods=["GET"])
@jwt_required()
def get_user():
    try:
        user = get_jwt_identity()
        print(user)
        UserData = User.query.filter_by(id=user["id"]).first()
        print(UserData)
        return (
            jsonify(
                {
                    "username": UserData.username,
                    "id": UserData.id,
                    "email": UserData.email,
                    "name": UserData.name,
                    "created_at": UserData.created_at,
                    "updated_at": UserData.updated_at,
                }
            ),
            200,
        )

    except Exception as e:
        return (
            jsonify(
                {"success": False, "message": "Something went wrong", "reason": str(e)}
            ),
            500,
        )


@user_data.route("/update", methods=["PUT"])
@jwt_required()
def update_user():
    try:
        user = get_jwt_identity()
        return update_users_data(request, user)
    except Exception as e:
        return (
            jsonify({"message": "Something went wrong", "reason": str(e)}),
            500,
        )


@user_data.route("/update-password", methods=["PUT"])
@jwt_required()
def update_user_password():
    try:
        user = get_jwt_identity()
        return update_password(request, user)
    except Exception as e:
        return (
            jsonify({"message": "Something went wrong", "reason": str(e)}),
            500,
        )
