# train.py

import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import classification_report
from imblearn.over_sampling import SMOTE
import xgboost as xgb
import joblib


data = pd.read_csv("careers.csv")


X = data[[f"q{i}" for i in range(1, 31)]]

y = data["predicted_domain"]


le = LabelEncoder()
y_encoded = le.fit_transform(y)


X_train, X_test, y_train, y_test = train_test_split(
    X, y_encoded, test_size=0.2, random_state=42, stratify=y_encoded
)


smote = SMOTE(random_state=42)
X_res, y_res = smote.fit_resample(X_train, y_train)

print("Before SMOTE:", dict(zip(*np.unique(y_train, return_counts=True))))
print("After SMOTE :", dict(zip(*np.unique(y_res, return_counts=True))))


model = xgb.XGBClassifier(
    eval_metric="mlogloss",
    use_label_encoder=False,
    random_state=42
)
model.fit(X_res, y_res)


y_pred = model.predict(X_test)
print("Classification Report:")
print(classification_report(y_test, y_pred, target_names=le.classes_))


joblib.dump(model, "career_model.pkl")
joblib.dump(le, "label_encoder.pkl")
print("Model and label encoder saved successfully.")


sample_user = {f"q{i}": np.random.randint(1, 6) for i in range(1, 31)}
sample_df = pd.DataFrame([sample_user])

proba = model.predict_proba(sample_df)
top_n = proba[0].argsort()[::-1][:3]

recommendation = {
    "predicted_career": le.inverse_transform([top_n[0]])[0],
    "top_careers": le.inverse_transform(top_n).tolist(),
    "probabilities": {
        le.inverse_transform([i])[0]: float(round(proba[0][i], 4)) for i in top_n
    }
}

print("\nSample User Responses:", sample_user)
print("Recommendation:", recommendation)
