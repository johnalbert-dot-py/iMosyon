import uuid
from flask import Flask, send_from_directory
from config import iMosyonConfig
from extensions import jwt, cors, bcrypt
from flask_migrate import Migrate
from models import db
from flask import make_response, jsonify
from jsonschema import ValidationError
from joblib import load
import os
import mimetypes

mimetypes.add_type("application/javascript", ".js")

# blueprints
from routes.authentication import authentication
from routes.predict import build_blueprint as predictor
from routes.user import user_data

app = Flask(__name__, static_folder="build/")

app.config.from_object(iMosyonConfig)
jwt.init_app(app)
cors.init_app(app)
db.init_app(app)
bcrypt.init_app(app)
migrate = Migrate(app, db)

# REACT APP
@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve(path):
    if path != "" and os.path.exists(app.static_folder + "/" + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, "index.html")


@app.errorhandler(400)
def bad_request(error):
    if isinstance(error.description, ValidationError):
        original_error = error.description
        return make_response(jsonify({"error": original_error.message}), 400)
    return error


@app.cli.command("populate")
def populate():
    """
    Populate the database with sample data.
    """
    from models import User, PredictedWord, UsersPredictedWords

    print("CLEANING DATABASE...")
    db.drop_all()
    db.create_all()
    print("DATABASE CLEANED")
    print("POPULATING DATABASE")
    u1 = User(
        username="albertdotpy",
        name="John Albert Flores",
        email="albertdotpy@gmail.com",
        password=bcrypt.generate_password_hash("albert123"),
    )
    db.session.add(u1)
    db.session.commit()
    users_predicted_words = UsersPredictedWords(
        # predict_id=str(uuid.uuid4()),
        user_id=u1.id,
    )
    db.session.add(users_predicted_words)
    db.session.commit()

    words = [
        {
            "word": "hello",
            "emotion": "happy",
            "accuracy": 0.9,
            "users_predicted_words_id": users_predicted_words.id,
        },
        {
            "word": "world",
            "emotion": "happy",
            "accuracy": 0.9,
            "users_predicted_words_id": users_predicted_words.id,
        },
    ]
    print(words)

    for word in words:
        w = PredictedWord(**word)
        db.session.add(w)
        users_predicted_words.predicted_words.append(w)

    try:
        u1.words.append(users_predicted_words)
        db.session.commit()
    except Exception as e:
        print(e)


@app.cli.command("reset_db")
def reset_db():
    db.drop_all()
    db.create_all()
    # populate()


if __name__ == "__main__":

    print("=== LOADING MODELS ===")
    model = load(open("./core/iMosyon.pkl", "rb"))
    with open("./core/vectorizer.pkl", "rb") as f:
        vectorizer = load(f)

    app.register_blueprint(authentication, bcrypt=bcrypt)
    app.register_blueprint(predictor(model, vectorizer))
    app.register_blueprint(user_data)
    app.run(debug=True, host="0.0.0.0")

    f.close()

else:
    print("=== LOADING MODELS ===")
    model = load(open("./core/iMosyon.pkl", "rb"))
    with open("./core/vectorizer.pkl", "rb") as f:
        vectorizer = load(f)
