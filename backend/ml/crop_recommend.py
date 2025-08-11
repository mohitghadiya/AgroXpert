import pandas as pd
from sklearn.ensemble import RandomForestClassifier
import pickle

# Load your dataset (update the path if needed)
df = pd.read_csv('Crop_recommendation.csv')

# Features and target
X = df[['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall']]
y = df['label']

# Train model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X, y)

# Save model
with open('crop_recommendation_model.pkl', 'wb') as f:
    pickle.dump(model, f)

print("Model trained and saved as crop_recommendation_model.pkl")