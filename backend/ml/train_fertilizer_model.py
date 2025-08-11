# train_fertilizer_model.py

import pandas as pd
import pickle
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, accuracy_score

# Load the dataset
df = pd.read_csv("f2.csv")  # Make sure f2.csv is in the same directory

# Display column names and first rows (optional for debug)
print("Columns:", df.columns)
print(df.head())

# Encode categorical features
soil_encoder = LabelEncoder()
crop_encoder = LabelEncoder()
fertilizer_encoder = LabelEncoder()

df["Soil_Type_Enc"] = soil_encoder.fit_transform(df["Soil_Type"])
df["Crop_Type_Enc"] = crop_encoder.fit_transform(df["Crop_Type"])
df["Fertilizer_Enc"] = fertilizer_encoder.fit_transform(df["Fertilizer"])

# Define features (X) and target (y)
X = df[["Temparature", "Humidity", "Moisture", "Soil_Type_Enc", "Crop_Type_Enc", "Nitrogen", "Potassium", "Phosphorous"]]
y = df["Fertilizer_Enc"]

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Evaluation
y_pred = model.predict(X_test)
print("✅ Accuracy:", accuracy_score(y_test, y_pred))
print("✅ Classification Report:")
# print(classification_report(y_test, y_pred, target_names=fertilizer_encoder.classes_))

# Save the model and encoders
with open("fertilizer_final.pkl", "wb") as f:
    pickle.dump(model, f)

with open("soil_encoder.pkl", "wb") as f:
    pickle.dump(soil_encoder, f)

with open("crop_encoder.pkl", "wb") as f:
    pickle.dump(crop_encoder, f)

with open("fertilizer_encoder.pkl", "wb") as f:
    pickle.dump(fertilizer_encoder, f)

print("✅ Model and encoders saved successfully.")
    