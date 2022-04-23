from flask import Flask
from config import iMosyonConfig
from extensions import jwt, cors, bcrypt
from flask_migrate import Migrate
from models import db, User, PredictedWord
from flask import make_response, jsonify
from jsonschema import ValidationError


# blueprints
from routes.authentication import authentication
from routes.predict import predictor

app = Flask(__name__)

app.config.from_object(iMosyonConfig)
jwt.init_app(app)
cors.init_app(app)
db.init_app(app)
bcrypt.init_app(app)
migrate = Migrate(app, db)

@app.errorhandler(400)
def bad_request(error):
    if isinstance(error.description, ValidationError):
        original_error = error.description
        return make_response(jsonify({"error": original_error.message}), 400)
    return error

@app.cli.command("setwords")
def populate_words():
    u = User.query.first()
    words = [
        {"word": "hello", "emotion": "happy", "accuracy": 0.9, "user_id": u.id},
        {"word": "world", "emotion": "happy", "accuracy": 0.9, "user_id": u.id},
    ]
    for word in words:
        w = PredictedWord(**word)
        db.session.add(w)
        u.words.append(w)
    db.session.commit()



if __name__ == "__main__":
    app.register_blueprint(authentication, bcrypt=bcrypt)
    app.register_blueprint(predictor)
    app.run(debug=True, host="0.0.0.0")


