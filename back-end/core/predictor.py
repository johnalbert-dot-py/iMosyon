from dataclasses import dataclass
from typing import Optional


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

    def predict(self) -> str:
        # enter your model here!
        sentence = self.sentence
        return ""

    def analyze_sentence(self) -> str:
        predicted_emotion = self.predict()
        return predicted_emotion.capitalize()
