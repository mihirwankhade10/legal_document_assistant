from flask import Flask
from main.document_ai import documentAI


def create_app():
    app = Flask(__name__)
    app.register_blueprint(documentAI)

    return app