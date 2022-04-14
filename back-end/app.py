from flask import Flask
from config import config_app
from extensions import jwt, cors
from models import db

# blueprints
from views.authentication import authentication

app = Flask(__name__)


def create_app():
    config_app(app)
    jwt.init_app(app)
    cors.init_app(app)
    db.init_app(app)
    app.register_blueprint(authentication)

    try:
        db.create_all()
    except:
        pass
    app.run(debug=True, host="0.0.0.0")


if __name__ == "__main__":
    create_app()
