import joblib
import pandas as pd
from sklearn.tree import DecisionTreeClassifier

# Dummy training data (replace with real dataset if available)
data = pd.DataFrame({
    "heartRate": [60, 120, 80, 150, 40],
    "spo2": [98, 85, 92, 70, 99],
    "weight": [70, 80, 60, 90, 65],
    "label": ["normal", "critical", "normal", "critical", "warning"]
})

X = data[["heartRate", "spo2", "weight"]]
y = data["label"]

model = DecisionTreeClassifier()
model.fit(X, y)

# Save model
joblib.dump(model, "model.pkl")
print("✅ Model trained and saved as model.pkl")
