import bcrypt
from models import User, db, UsersPredictedWords, PredictedWord
from flask import jsonify
from flask_bcrypt import Bcrypt
from datetime import date, datetime
from sqlalchemy import and_, func

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


def get_users_predictions(request, user):
    UserData = User.query.filter_by(id=user["id"]).first()
    db.session.add(UserData)

    # get users predicted words by id
    users_predicted_words = UsersPredictedWords.query.filter_by(
        user_id=UserData.id
    ).all()

    if not users_predicted_words:
        return (
            jsonify({"words": [], "success": True}),
            200,
        )

    words = []
    for word in users_predicted_words:
        words.append(
            {
                "id": word.id,
                "prediction_id": word.predict_id,
                "count": len(word.predicted_words),
                "created_at": word.created_at.strftime("%m-%d-%Y"),
            }
        )

    return jsonify({"words": words, "success": True}), 200


def get_users_predictions_by_date(request, user):

    starting_date_ = request.json.get("starting_date", None)
    end_date_ = request.json.get("end_date", None)

    if not starting_date_ and not end_date_:
        return (
            jsonify({"message": "Starting and End date is required", "success": False}),
            400,
        )

    starting_date = starting_date_.split("-")
    end_date = end_date_.split("-")

    if len(starting_date) != 3 and end_date != 3:
        return (
            jsonify(
                {
                    "message": "Starting and End should have YEAR-MONTH-DAY",
                    "success": False,
                }
            ),
            400,
        )

    starting_year, starting_month, starting_day = starting_date
    ending_year, ending_month, ending_day = end_date

    UserData = User.query.filter_by(id=user["id"]).first()
    db.session.add(UserData)

    users_predicted_words = UsersPredictedWords.query.filter_by(user_id=UserData.id)

    if not len(users_predicted_words.all()):
        return (
            jsonify({"results": [], "success": True}),
            200,
        )

        # if starting_date_ != end_date_:
    users_predicted_words_filtered_by_date = users_predicted_words.filter(
        func.date(UsersPredictedWords.created_at)
        <= datetime(year=int(ending_year), month=int(ending_month), day=int(ending_day))
    ).filter(
        func.date(UsersPredictedWords.created_at)
        >= datetime(
            year=int(starting_year),
            month=int(starting_month),
            day=int(starting_day),
        )
    )

    print("Starting Date: " + starting_year, starting_month, starting_day)
    print("Ending Date: " + ending_year, ending_month, ending_day)

    emotions_counts = {
        "Anger": 0,
        "Annoyed": 0,
        "Disgust": 0,
        "Fear": 0,
        "Joy": 0,
        "Others": 0,
        "Outraged": 0,
        "Sadness": 0,
        "Strong": 0,
        "Upset": 0,
    }

    for emotion in emotions_counts:
        for predicted_word in users_predicted_words_filtered_by_date.all():
            for word in predicted_word.predicted_words:
                highest = word.emotion.split(", ")[0]
                if emotion == highest:
                    emotions_counts[highest] += 1

    return (
        jsonify({"results": list(emotions_counts.values()), "success": True}),
        200,
    )


def delete_users_prediction(request, user):
    prediction_id = request.json.get("prediction_id", None)

    if not prediction_id:
        return (
            jsonify({"message": "Prediction id is required", "success": False}),
            400,
        )

    UserData = UsersPredictedWords.query.filter_by(
        user_id=user["id"], predict_id=prediction_id
    ).first()
    db.session.add(UserData)

    if not UserData:
        return (
            jsonify({"message": "Prediction not found", "success": False}),
            404,
        )

    db.session.delete(UserData)
    db.session.commit()
    return jsonify({"success": True, "message": "Prediction deleted successfully"}), 200


def delete_users_prediction_word(request, user):
    id = request.json.get("id", None)

    if not id:
        return (
            jsonify({"message": "ID is required", "success": False}),
            400,
        )

    word = PredictedWord.query.filter_by(id=id).first()
    all_users_word_id = []
    db.session.add(word)
    UserData = UsersPredictedWords.query.filter_by(user_id=user["id"]).all()
    for user_word in UserData:
        for words in user_word.predicted_words:
            all_users_word_id.append(words.id)

    if not UserData:
        return (
            jsonify({"message": "User not found", "success": False}),
            404,
        )

    if word.id not in all_users_word_id:
        return (
            jsonify({"message": "Word not found", "success": False}),
            404,
        )

    db.session.delete(word)
    db.session.commit()
    return jsonify({"success": True, "message": "Word deleted successfully"}), 200
