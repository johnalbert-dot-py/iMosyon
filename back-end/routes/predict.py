from flask import Blueprint, jsonify, request
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_expects_json import expects_json
from services.predictor import predict as main_predict

predictor = Blueprint("predictor", __name__, url_prefix="/api")


@predictor.route("/predict", methods=["POST"])

@jwt_required()
def predict():
    try:
        user = get_jwt_identity()
        predict_result = main_predict(request.json.get("words"), user)
    except Exception as e:
        print(e)
        return jsonify({"error": "Something went wrong"}), 500

    return jsonify(predict_result), 200
