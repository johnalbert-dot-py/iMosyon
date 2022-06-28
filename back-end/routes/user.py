from flask import Blueprint, jsonify, request
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_expects_json import expects_json
import jwt
from services.user import (
    update_users_data,
    update_password,
    delete_users_prediction_word,
    get_users_predictions_by_date,
)
from services.user import get_users_predictions as get_users_predictions_service
from services.user import delete_users_prediction as delete_users_prediction_service
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


@user_data.route("/my-predictions", methods=["GET"])
@jwt_required()
def get_users_predictions():
    try:
        user = get_jwt_identity()
        return get_users_predictions_service(request, user)
    except Exception as e:
        return (jsonify({"message": "Something went wrong", "reason": str(e)}), 500)


@user_data.route("/my-predictions-by-date", methods=["POST", "GET"])
@jwt_required()
def get_filterd_users_predictions():
    try:
        user = get_jwt_identity()
        return get_users_predictions_by_date(request, user)
    except Exception as e:
        return (jsonify({"message": "Something went wrong", "reason": str(e)}), 500)


@user_data.route("/delete-prediction", methods=["DELETE"])
@jwt_required()
def delete_users_prediciton():
    try:
        user = get_jwt_identity()
        return delete_users_prediction_service(request, user)
    except Exception as e:
        return (jsonify({"message": "Something went wrong", "reason": str(e)}), 500)


@user_data.route("/delete-word", methods=["DELETE"])
@jwt_required()
def delete_users_word():
    try:
        user = get_jwt_identity()
        return delete_users_prediction_word(request, user)
    except Exception as e:
        return (jsonify({"message": "Something went wrong", "reason": str(e)}), 500)
