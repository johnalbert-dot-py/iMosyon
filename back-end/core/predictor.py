from dataclasses import dataclass
from typing import Any, Optional, Union
from random import uniform, randint
from time import sleep


@dataclass
class EmotionPrediction:

    """
    A Class for a prediction of an emotion.
    """

    vectorizer: Optional[Any] = None
    model: Optional[Any] = None
    sentence: Optional[str] = ""

    def expected_emotions(self):
        return [
            "Anger",
            "Annoyed",
            "Disgust",
            "Fear",
            "Joy",
            "Others",
            "Outraged",
            "Sadness",
            "Strong",
            "Upset",
        ]

    def predict(self) -> Union[str, float]:
        transformed_input = self.vectorizer.transform([self.sentence])
        prediction = self.model.predict(transformed_input)
        result = self.expected_emotions()[prediction[0]]
        return [result, 0.0]

    def random_prediction(self) -> Union[str, float]:
        """
        Return a random emotion prediction.
        """
        sleep(randint(1, 2))
        return [
            self.expected_emotions()[randint(0, len(self.expected_emotions()) - 1)],
            round(uniform(0.0, 100.0), 2),
        ]

    def analyze_sentence(self) -> Union[str, float]:
        # predicted_emotion = self.random_prediction()
        predicted_emotion = self.predict()
        return [predicted_emotion[0].capitalize(), predicted_emotion[1]]
