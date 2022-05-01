import bcrypt
from models import User, db
from flask import jsonify
from flask_bcrypt import Bcrypt

bcrypt = Bcrypt()


def password_generator(plaintext):
    return bcrypt.generate_password_hash(plaintext)


def validate_password(user_password, password):
    return bcrypt.check_password_hash(user_password, password)


def update_users_data(request, user):
    errors = []
    to_update_username = request.json.get("username", None)
    to_update_email = request.json.get("email", None)
    to_update_name = request.json.get("name", None)

    UserData = User.query.filter_by(id=user["id"]).first()
    db.session.add(UserData)

    if not UserData:
        return (
            jsonify({"message": "User not found", "success": False}),
            404,
        )

    # check if username exists
    if to_update_username:
        usernameExists = User.query.filter_by(username=to_update_username).first()
        if usernameExists:
            if usernameExists.username != UserData.username:
                errors.append(
                    {
                        "field": "username",
                        "message": "Username already exists",
                    }
                )

    # check if email exists
    if to_update_email:
        emailExists = User.query.filter_by(email=to_update_email).first()
        if emailExists:
            if emailExists.email != UserData.email:
                errors.append(
                    {
                        "field": "email",
                        "message": "Email already exists",
                    }
                )

    if errors:
        return jsonify({"error": errors, "success": False}), 400

    UserData.name = to_update_name
    UserData.username = to_update_username
    UserData.email = to_update_email
    db.session.commit()

    return jsonify({"success": True, "message": "User updated successfully"}), 200


def update_password(request, user):

    old_password = request.json.get("old-password", "")
    new_password = request.json.get("new-password", "")
    errors = []

    UserData = User.query.filter_by(id=user["id"]).first()
    db.session.add(UserData)

    if not UserData:
        return (
            jsonify({"message": "User not found", "success": False}),
            404,
        )

    # check if old password is correct
    if not validate_password(UserData.password, old_password):
        errors.append(
            {
                "field": "old-password",
                "message": "Old password is not correct",
            }
        )

    if errors:
        return jsonify({"error": errors, "success": False}), 400

    UserData.password = password_generator(new_password)
    db.session.commit()
    return jsonify({"success": True, "message": "Password updated successfully"}), 200
