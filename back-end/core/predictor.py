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
        predictionproba = self.model.predict_proba(transformed_input)
        predictionproba = predictionproba.tolist()

        # sort then reverse the array
        sorted_prediction_proba = predictionproba[0].copy()
        sorted_prediction_proba.sort()
        sorted_prediction_proba = sorted_prediction_proba[::-1]

        # get the first 3 and their index
        first_result = predictionproba[0].index(sorted_prediction_proba[0])
        second_result = predictionproba[0].index(sorted_prediction_proba[1])
        third_result = predictionproba[0].index(sorted_prediction_proba[2])

        highest_result = self.expected_emotions()[first_result]
        mid_result = self.expected_emotions()[second_result]
        low_result = self.expected_emotions()[third_result]
        return [
            [highest_result, mid_result, low_result],
            [
                round(sorted_prediction_proba[0] * 100),
                round(sorted_prediction_proba[1] * 100),
                round(sorted_prediction_proba[2] * 100),
            ],
        ]

    def random_prediction(self):
        """
        Return a random emotion prediction.
        """
        sleep(randint(1, 2))
        return [
            [
                self.expected_emotions()[randint(0, len(self.expected_emotions()) - 1)]
                for _ in range(3)
            ],
            [
                round(uniform(0.0, 100.0), 2),
                round(uniform(0.0, 100.0), 2),
                round(uniform(0.0, 100.0), 2),
            ],
        ]

    def analyze_sentence(self):
        # predicted_emotion = self.random_prediction()
        predicted_emotion = self.predict()
        return [predicted_emotion[0], predicted_emotion[1]]
