from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import joblib
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


app = Flask(__name__)
CORS(app)

model = joblib.load("fraud_model.pkl")

@app.route("/")
def home():
    return "Fraud Detection API Running"

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()
        features = data["features"]
        input_data = np.array([features])

        prediction = model.predict(input_data)[0]
        probability = model.predict_proba(input_data)[0][1]

        return jsonify({
            "prediction": int(prediction),
            "probability": float(probability)
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
