from datetime import datetime
from datetime import timedelta
from datetime import timezone
import os

basedir = os.path.abspath(os.path.dirname(__file__))


def config_app(app):
    # jwt
    app.config["JWT_COOKIE_SECURE"] = True
    app.config["JWT_TOKEN_LOCATION"] = ["cookies"]
    app.config["JWT_SECRET_KEY"] = ".Tih!+wH}^|xdJ|(#sR:iG<7F)?N3t"
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(seconds=20)

    # sqlalchemy
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///" + \
        os.path.join(basedir, "iMosyon.db")
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
