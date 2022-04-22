from typing import Union
from core import predictor

def predict(sentence, user):
  p = predictor.EmotionPrediction(sentence)
  result: Union[str, float] = p.analyze_sentence()

  return {"sentence": sentence, "emotion": result[0], "accuracy": result[1]}
