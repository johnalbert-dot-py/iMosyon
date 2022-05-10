from email.policy import default
from flask_sqlalchemy import SQLAlchemy
import string, random

db = SQLAlchemy()


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=True)
    username = db.Column(db.String(40), unique=True, nullable=False)
    email = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.now())
    updated_at = db.Column(db.DateTime, default=db.func.now(), onupdate=db.func.now())
    words = db.relationship(
        "UsersPredictedWords", backref="user", lazy="dynamic", cascade="all,delete"
    )


class UsersPredictedWords(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    predict_id = db.Column(db.String(12), unique=True, nullable=True)
    predicted_words = db.relationship(
        "PredictedWord",
        backref="user_words",
        lazy="select",
        passive_deletes=True,
    )

    created_at = db.Column(db.DateTime, default=db.func.now())
    updated_at = db.Column(db.DateTime, default=db.func.now(), onupdate=db.func.now())

    def __init__(self, *args, **kwargs):
        if not self.predict_id:
            self.predict_id = "".join(
                random.choice(string.ascii_letters + string.digits) for _ in range(12)
            )
        super().__init__(*args, **kwargs)


class PredictedWord(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    word = db.Column(db.Text, nullable=False)
    emotion = db.Column(db.String(120), nullable=False)
    accuracy = db.Column(db.Text, nullable=False, default="0.0%")
    users_predicted_words_id = db.Column(
        db.Integer,
        db.ForeignKey("users_predicted_words.id", ondelete="CASCADE"),
        nullable=False,
    )

    def __repr__(self):
        return f"{self.word[:10]}... | {self.emotion}"
