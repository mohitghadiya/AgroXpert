import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import LabelEncoder
import pickle

# Load dataset
df = pd.read_csv('yield_prediction_proper_dataset_lowercase.csv')

# Encode categorical variables
le_crop = LabelEncoder()
le_soil = LabelEncoder()
df['Crop'] = le_crop.fit_transform(df['Crop'])
df['Soil'] = le_soil.fit_transform(df['Soil'])

# Save encoders
with open('crop_encoder_y.pkl', 'wb') as f:
    pickle.dump(le_crop, f)
with open('soil_encoder_y.pkl', 'wb') as f:
    pickle.dump(le_soil, f)

# Train model
X = df.drop('Yield', axis=1)
y = df['Yield']
model = RandomForestRegressor()
model.fit(X, y)

# Save model
with open('yield_model_y.pkl', 'wb') as f:
    pickle.dump(model, f)