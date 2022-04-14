from email.mime import base
import os

basedir = os.path.abspath(os.path.dirname(__file__))


def config_app(app):
    app.config["FLASK_APP"] = "app:iMosyon"
    app.config["JWT_SECRET_KEY"] = ".Tih!+wH}^|xdJ|(#sR:iG<7F)?N3t"
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///" + \
        os.path.join(basedir, "iMosyon.db")
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
