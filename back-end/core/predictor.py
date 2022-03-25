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

    def predict(self, sentence) -> str:
        pass

    def analyze_sentence(self) -> str:
        predicted_emotion = self.predict(self.sentence)
        return predicted_emotion.capitalize()
