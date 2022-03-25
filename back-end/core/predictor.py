from dataclasses import dataclass


@dataclass
class EmotionPrediction:

    """
    A Class for a prediction of an emotion.
    """

    sentence: str

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
        pass
