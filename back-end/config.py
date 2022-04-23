from datetime import datetime
from datetime import timedelta
from datetime import timezone
import os

basedir = os.path.abspath(os.path.dirname(__file__))


class iMosyonConfig:
    # jwt
    JWT_COOKIE_SECURE = True
    JWT_TOKEN_LOCATION = ["cookies"]
    JWT_SECRET_KEY = ".Tih!+wH}^|xdJ|(#sR:iG<7F)?N3t"
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(seconds=20)
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(seconds=20)

    # sqlalchemy
    SQLALCHEMY_DATABASE_URI = "sqlite:///" + \
        os.path.join(basedir, "iMosyon.db")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
