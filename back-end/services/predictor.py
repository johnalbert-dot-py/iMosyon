from typing import Union
from core import predictor
from random import randint
from models import User, PredictedWord, UsersPredictedWords, db


def predict(words, user):

    response = {"success": False}

    user = User.query.filter_by(id=user["id"], username=user["username"]).first()
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
