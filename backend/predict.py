
import sys
import json
import os
import joblib
import numpy as np

def main():
    try:
       
        if len(sys.argv) > 1:
            with open(sys.argv[1], "r") as f:
                data = json.load(f)
        else:
            raw = sys.stdin.read()
            data = json.loads(raw)

        # Extract inputs
        features = data.get("features")
        top_n = int(data.get("top_n", 3))
        model_path = data.get("model_path") or os.environ.get("MODEL_PATH", "./models/career_model.pkl")
        encoder_path = data.get("encoder_path") or os.environ.get("ENCODER_PATH", "./models/label_encoder.pkl")

        if not isinstance(features, list) or len(features) != 30:
            print(json.dumps({"error": "features must be a list of 30 numeric values"}))
            sys.exit(1)

        X = np.array(features, dtype=float).reshape(1, -1)

        if not os.path.isfile(model_path):
            print(json.dumps({"error": f"model file not found at {model_path}"}))
            sys.exit(1)
        if not os.path.isfile(encoder_path):
            print(json.dumps({"error": f"encoder file not found at {encoder_path}"}))
            sys.exit(1)

        model = joblib.load(model_path)
        le = joblib.load(encoder_path)

        probs = model.predict_proba(X)[0]
        classes = model.classes_

        idx = np.argsort(probs)[::-1][:top_n]
        top_careers = [classes[i] for i in idx]
        top_probs = {str(classes[i]): float(round(probs[i], 6)) for i in idx}

        try:
            if all(isinstance(c, (int, np.integer)) for c in classes):
                human_classes = le.inverse_transform(classes.astype(int))
                top_careers = [human_classes[i] for i in idx]
                top_probs = {str(human_classes[i]): float(round(probs[i], 6)) for i in idx}
        except Exception:
            pass

        output = {
            "predicted_career": top_careers[0],
            "top_careers": top_careers,
            "probabilities": top_probs,
            "raw_probs": probs.tolist(),
            "encoded_classes": classes.tolist(),
        }

        print(json.dumps(output, indent=2))

    except Exception as e:
        print(json.dumps({"error": f"unexpected error: {e}"}))
        sys.exit(1)

if __name__ == "__main__":
    main()

