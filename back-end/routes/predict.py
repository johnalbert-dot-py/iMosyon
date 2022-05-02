from flask import Blueprint, jsonify, request
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_expects_json import expects_json
from services.predictor import predict as main_predict
from services.predictor import get_prediction_result


def build_blueprint(model, vectorizer):
    predictor = Blueprint("predictor", __name__, url_prefix="/api")

    @predictor.route("/predict", methods=["POST"])
    @jwt_required()
    def predict():
        try:
            user = get_jwt_identity()
            predict_result = main_predict(
                request.json.get("words"), user, model, vectorizer
            )
            if predict_result["success"]:
                return jsonify(predict_result), 200
            return jsonify(predict_result), 400

        except Exception as e:
            return (
                jsonify(
                    {
                        "success": False,
                        "message": "Something went wrong",
                        "reason": str(e),
                    }
                ),
                500,
            )

    @predictor.route("/predict/<prediction_id>", methods=["GET"])
    @jwt_required()
    def get_prediction(prediction_id):
        try:
            user = get_jwt_identity()
            predict_result = get_prediction_result(prediction_id, user)
            if predict_result["success"]:
                return jsonify(predict_result), 200
            return jsonify(predict_result), 400
        except Exception as e:
            return (
                jsonify(
                    {
                        "success": False,
                        "message": "Something went wrong",
                        "reason": str(e),
                    }
                ),
                500,
            )

    return predictor
