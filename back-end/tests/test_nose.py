from unittest import TestCase
from core import predictor


class TestNose(TestCase):
    def setUp(self) -> None:
        self.predictor = predictor.EmotionPrediction()

    def test_if_model_is_implemented(self):
        self.assertIsNot(
            self.predictor.predict(),
            "",
        )

    def test_if_emotion_is_valid(self):
        self.assertIn(
            self.predictor.analyze_sentence(),
            self.predictor.expected_emotions(),
        )
