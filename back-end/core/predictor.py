from dataclasses import dataclass
from typing import Optional, Union


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
        # enter your model here!
        sentence = self.sentence
        return ["", 0.0]

    def analyze_sentence(self) -> Union[str, float]:
        predicted_emotion = self.predict()
        return [predicted_emotion[0].capitalize(), predicted_emotion[1]]
