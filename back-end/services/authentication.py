from flask import jsonify
from models import User, db
from flask_bcrypt import Bcrypt

bcrypt = Bcrypt()


def password_generator(plaintext):
    return bcrypt.generate_password_hash(plaintext)


def validate_password(text):
    enc = password_generator(text)
    return bcrypt.check_password_hash(enc, text)


def userRegistration(request):
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    name = request.json.get("name", None)
    email = request.json.get("email", None)

    print(username, password, name, email)

    # check if username and email exists
    if User.query.filter_by(username=username).first():
        return jsonify({"message": "Username already exists"}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"message": "Email already exists"}), 400

    # create user
    password = password_generator(password)
    user = User(username=username, password=password, name=name, email=email)
    db.session.add(user)
    db.session.commit()
    return jsonify({"message": "User Succesfully Registered!"}), 201
