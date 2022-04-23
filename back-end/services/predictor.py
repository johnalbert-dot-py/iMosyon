from typing import Union
from core import predictor
from time import sleep
from random import randint

def predict(words, user):
    results = []
    for word in words:
        sleep(randint(1, 2))
        p = predictor.EmotionPrediction(word)
        result: Union[str, float] = p.analyze_sentence()
        results.append(
        {
            "word": word,
            "emotion": result[0],
            "accuracy": result[1]
        }
        )

    return {
        "success": True,
        "results": results
    }