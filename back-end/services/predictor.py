from typing import Union
from core import predictor
from random import randint
from models import User, PredictedWord, UsersPredictedWords, db


def predict(words, user, model, vectorizer):

    response = {"success": False}

    user = User.query.filter_by(id=user["id"]).first()
    if not user:
        response["message"] = "User not found"
        return response

    users_predicted_words = UsersPredictedWords(user_id=user.id)
    db.session.add(users_predicted_words)
    db.session.commit()

    for word in words:
        p = predictor.EmotionPrediction(
            sentence=word, model=model, vectorizer=vectorizer
        )
        result = p.analyze_sentence()
        pw = PredictedWord(
            word=word,
            emotion=", ".join(result[0]),
            accuracy=", ".join([str(x) + "%" for x in result[1]]),
            users_predicted_words_id=users_predicted_words.id,
        )
        db.session.add(pw)
        users_predicted_words.predicted_words.append(pw)

    try:
        user.words.append(users_predicted_words)
        db.session.commit()
        response["success"] = True
        response["user_predict_id"] = str(users_predicted_words.predict_id)
    except Exception as e:
        response["message"] = f"Error: {str(e)}"

    return response


def get_prediction_result(prediction_id, user):
    """
    returns the prediction result of a user

    ID: string
    Date Created: date
    Total Words: int

    Most Predicted Emotion:
        emotion: string
        count: int

    Least Predicted Emotion:
        emotion: string
        count: int

    Predicted Words: PredictedWord

    """

    response = {"success": False}

    user = User.query.filter_by(id=user["id"]).first()
    if not user:
        response["message"] = "User not found"
        return response

    user_prediction_words = UsersPredictedWords.query.filter_by(
        predict_id=prediction_id, user_id=user.id
    ).first()

    if not user_prediction_words:
        response["message"] = "User prediction not found"
        return response

    prediction_words = user_prediction_words.predicted_words
    all_emotions = []

    response["id"] = str(user_prediction_words.predict_id)
    response["date_created"] = user_prediction_words.created_at.strftime("%m-%d-%Y")
    response["total_words"] = len(prediction_words)
    response["predicted_words"] = []
    highest = ""
    least = []
    current_highest_count = 0

    for predicted_word in prediction_words:
        response["predicted_words"].append(
            {
                "word": predicted_word.word,
                "emotion": predicted_word.emotion,
                "accuracy": predicted_word.accuracy,
                "id": predicted_word.id,
            }
        )
        all_emotions.append(predicted_word.emotion.split(",")[0])

    for emotion in all_emotions:
        if all_emotions.count(emotion) > current_highest_count:
            highest = emotion
            current_highest_count = all_emotions.count(highest)

        if len(all_emotions) > 1:
            if all_emotions.count(emotion) == 1:
                least.append(emotion)
        else:
            least.append("N/A")

    response["most_predicted_emotion"] = highest
    response["least_predicted_emotion"] = ", ".join(least)
    response["success"] = True
    return response
