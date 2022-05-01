from flask import jsonify
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token, set_access_cookies

from models import User, db

from datetime import timedelta, datetime

bcrypt = Bcrypt()


def password_generator(plaintext):
    return bcrypt.generate_password_hash(plaintext)


def validate_password(user_password, password):
    return bcrypt.check_password_hash(user_password, password)


def userRegistration(request):
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    name = request.json.get("name", None)
    email = request.json.get("email", None)

    print(username, password, name, email)

    # check if username and email exists
    if User.query.filter_by(email=email).first():
        return jsonify({"message": "Email already exists", "field": "email"}), 400

    if User.query.filter_by(username=username).first():
        return jsonify({"message": "Username already exists", "field": "username"}), 400

    # create user
    password = password_generator(password)
    user = User(username=username, password=password, name=name, email=email)
    db.session.add(user)
    db.session.commit()
    return jsonify({"message": "User Succesfully Registered!"}), 201


def userLogin(request):
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    remember = request.json.get("remember", None)

    if username is None and password is None:
        return jsonify({"message": "Username and Password is required."}), 400

    user = User.query.filter_by(username=username).first()
    if user:
        if validate_password(user.password, password):
            if remember:
                expired_on = timedelta(hours=24 * 15)
            else:
                expired_on = timedelta(hours=5)

            access_token = create_access_token(
                identity={"username": username, "id": user.id},
                expires_delta=expired_on,
                fresh=True,
            )
            response = jsonify(
                {
                    "message": "Login Successfully",
                    "expired_on": str(datetime.now() + expired_on),
                }
            )
            set_access_cookies(response, access_token, max_age=expired_on)
            return response, 200

        else:
            return (
                jsonify(
                    {"message": "Please check your credentials.", "field": "password"}
                ),
                400,
            )
    else:
        return jsonify({"message": "Username is invalid.", "field": "username"}), 400
