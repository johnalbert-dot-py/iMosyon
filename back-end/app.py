from flask import Flask
from config import config_app
from extensions import jwt

# blueprints
from views.authentication import authentication


def main():
    app = Flask(__name__)
    config_app(app)
    jwt.init_app(app)
    app.register_blueprint(authentication)
    app.run(debug=True)


if __name__ == "__main__":
    main()
