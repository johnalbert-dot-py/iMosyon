from flask import Flask
from config import config_app
from extensions import jwt, cors, bcrypt
from models import db, User
from flask import make_response, jsonify
from jsonschema import ValidationError


# blueprints
from routes.authentication import authentication
from routes.predict import predictor

app = Flask(__name__)


@app.errorhandler(400)
def bad_request(error):
    if isinstance(error.description, ValidationError):
        original_error = error.description
        return make_response(jsonify({"error": original_error.message}), 400)
    return error


def create_app():
    config_app(app)
    jwt.init_app(app)
    cors.init_app(app)
    db.init_app(app)
    bcrypt.init_app(app)

    with app.app_context():
        try:
            db.create_all()
            db.session.commit()
        except Exception as e:
            print("Error:", e)
            pass

    app.register_blueprint(authentication, bcrypt=bcrypt)
    app.register_blueprint(predictor)
    app.run(debug=True, host="0.0.0.0")


if __name__ == "__main__":
    create_app()
