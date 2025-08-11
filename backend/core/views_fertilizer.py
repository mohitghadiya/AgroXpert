

# # core/views_fertilizer.py

# import pickle
# from rest_framework.decorators import api_view
# from rest_framework.response import Response

# # Load model and encoders
# with open('ml/fertilizer_model.pkl', 'rb') as f:
#     fertilizer_model = pickle.load(f)
# with open('ml/crop_encoder.pkl', 'rb') as f:
#     crop_encoder = pickle.load(f)
# with open('ml/soil_encoder.pkl', 'rb') as f:
#     soil_encoder = pickle.load(f)
# with open('ml/fertilizer_encoder.pkl', 'rb') as f:
#     fertilizer_decoder = pickle.load(f)

# @api_view(['POST'])
# def recommend_fertilizer(request):
#     try:
#         data = request.data

#         crop = crop_encoder.transform([data['crop'].lower()])[0]
#         soil = soil_encoder.transform([data['soil'].lower()])[0]

#         features = [
#             float(data['temperature']),
#             float(data['humidity']),
#             float(data['moisture']),
#             soil,
#             crop,
#             float(data['nitrogen']),
#             float(data['potassium']),
#             float(data['phosphorous']),
#         ]

#         prediction = fertilizer_model.predict([features])[0]
#         fertilizer = fertilizer_decoder.inverse_transform([prediction])[0]

#         return Response({"recommended_fertilizer": fertilizer})
#     except Exception as e:
#         return Response({"error": str(e)}, status=400)



from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import FertilizerInputSerializer
import joblib
import os

# Load model and encoders once
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL_PATH = os.path.join(BASE_DIR, 'ml')

model = joblib.load(os.path.join(MODEL_PATH, 'fertilizer_final.pkl'))
soil_encoder = joblib.load(os.path.join(MODEL_PATH, 'soil_encoder.pkl'))
crop_encoder = joblib.load(os.path.join(MODEL_PATH, 'crop_encoder.pkl'))
fertilizer_encoder = joblib.load(os.path.join(MODEL_PATH, 'fertilizer_encoder.pkl'))

class FertilizerRecommendationView(APIView):
    def post(self, request):
        serializer = FertilizerInputSerializer(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            try:
                soil_encoded = soil_encoder.transform([data["Soil_Type"]])[0]
                crop_encoded = crop_encoder.transform([data["Crop_Type"]])[0]
            except ValueError as e:
                return Response({"error": str(e)}, status=400)

            features = [
                data["Temparature"],
                data["Humidity"],
                data["Moisture"],
                soil_encoded,
                crop_encoded,
                data["Nitrogen"],
                data["Potassium"],
                data["Phosphorous"],
            ]

            prediction = model.predict([features])[0]
            fertilizer_name = fertilizer_encoder.inverse_transform([prediction])[0]
            return Response({"recommended_fertilizer": fertilizer_name})
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
