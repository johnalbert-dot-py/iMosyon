from datetime import timedelta
from dotenv import dotenv_values

import os

basedir = os.path.abspath(os.path.dirname(__file__))
config = dotenv_values(".env")

class iMosyonConfig:
    # jwt
    JWT_COOKIE_SECURE = True
    JWT_TOKEN_LOCATION = ["cookies"]
    JWT_SECRET_KEY = ".Tih!+wH}^|xdJ|(#sR:iG<7F)?N3t"
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(seconds=20)
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(seconds=20)

    # sqlalchemy
    """
    SQLITE
    """
    # SQLALCHEMY_DATABASE_URI = "sqlite:///" + \
    #     os.path.join(basedir, "iMosyon.db")

    """
    MySQL
    """
    SQLALCHEMY_DATABASE_URI = f"mysql+pymysql://{config['MYSQL_USER']}:{config['MYSQL_PASSWORD']}@{config['MYSQL_HOST']}/{config['MYSQL_DB']}"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
