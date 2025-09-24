from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib

app = Flask(__name__)
CORS(app)

# load trained model
model = joblib.load("model.pkl")

@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.json
    hr = data.get("heartRate", 0)
    spo2 = data.get("spo2", 0)
    weight = data.get("weight", 0)

    # Dummy rule + model prediction
    if spo2 < 90:
        status = "critical"
        insight = "Low oxygen detected – possible hypoxemia"
    elif hr > 150 :
        status = "critical"
        insight = "High heart rate – possible arrhythmia"
    elif hr < 60 :
        status = "warning"
        insight = "Low heart rate – possible bradycardia"
    else:
        status = "stable"
        insight = "Vitals within safe range"

    return jsonify({"status": status, "insight": insight})

if __name__ == "__main__":
    import os
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)


