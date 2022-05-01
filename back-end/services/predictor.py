from typing import Union
from core import predictor
from random import randint
from models import User, PredictedWord, UsersPredictedWords, db


def predict(words, user):

    response = {"success": False}

    user = User.query.filter_by(id=user["id"]).first()
    if not user:
        response["message"] = "User not found"
        return response

    users_predicted_words = UsersPredictedWords(user_id=user.id)
    db.session.add(users_predicted_words)
    db.session.commit()

    for word in words:
        p = predictor.EmotionPrediction(word)
        result: Union[str, float] = p.analyze_sentence()
        pw = PredictedWord(
            word=word,
            emotion=result[0],
            accuracy=result[1],
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

    response["id"] = str(user_prediction_words.predict_id)
    response["date_created"] = user_prediction_words.created_at.strftime("%m-%d-%Y")
    response["total_words"] = len(prediction_words)
    response["predicted_words"] = []

    for predicted_word in prediction_words:
        response["predicted_words"].append(
            {
                "word": predicted_word.word,
                "emotion": predicted_word.emotion,
                "accuracy": predicted_word.accuracy,
            }
        )

    all_emotions_in_user = []
    emotions_in_user = set()
    for predicted_word in prediction_words:
        all_emotions_in_user.append(predicted_word.emotion)
    emotions_in_user.update(all_emotions_in_user)

    # most_predicted_emotion
    most_predicted_emotion = ""
    most_predicted_count = 0
    for emotion in emotions_in_user:
        count = all_emotions_in_user.count(emotion)
        if count > most_predicted_count:
            most_predicted_emotion = emotion
            most_predicted_count = count

    response["most_predicted_emotion"] = {
        "emotion": most_predicted_emotion,
        "count": most_predicted_count,
    }

    # least_predicted_emotion
    least_predicted_emotion = ""
    least_predicted_count = 1
    for emotion in emotions_in_user:
        count = all_emotions_in_user.count(emotion)
        if count <= least_predicted_count:
            least_predicted_emotion = emotion
            least_predicted_count = count

    response["least_predicted_emotion"] = {
        "emotion": least_predicted_emotion,
        "count": least_predicted_count,
    }

    response["success"] = True
    return response
