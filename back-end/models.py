from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=True)
    username = db.Column(db.String(40), unique=True, nullable=False)
    email = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.now())
    updated_at = db.Column(db.DateTime, default=db.func.now(), onupdate=db.func.now())


class PredictedWord(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    word = db.Column(db.String(220), nullable=False)
    emotion = db.Column(db.String(120), nullable=False)
    accuracy = db.Column(db.Float, nullable=False)
    user = db.relationship('User', backref=db.backref('predicted_words', lazy=True))
