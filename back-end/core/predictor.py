from dataclasses import dataclass
from typing import Optional, Union
from random import uniform, randint


@dataclass
class EmotionPrediction:

    """
    A Class for a prediction of an emotion.
    """

    sentence: Optional[str] = ""

    def expected_emotions(self):
        """Eight primary emotion base on research"""
        return [
            "Anger",
            "Anticipation",
            "Joy",
            "Sadness",
            "Trust",
            "Surprise",
            "Disgust",
        ]

    def predict(self) -> Union[str, float]:
        """
        Return a Prediciton from the main model.
        Enter the main function on your model that accepts
        a sentence and return a prediction.

        Returns:
            str: The predicted emotion.
            float: The accuracy of the prediction.

        """
        sentence = self.sentence
        return ["", 0.0]

    def random_prediction(self) -> Union[str, float]:
        """
        Return a random emotion prediction.
        """
        return [
            self.expected_emotions()[
                randint(0, len(self.expected_emotions()) - 1)
            ],
            round(uniform(0.0, 100.0), 2),
        ]

    def analyze_sentence(self) -> Union[str, float]:
        predicted_emotion = self.random_prediction()
        return [predicted_emotion[0].capitalize(), predicted_emotion[1]]
