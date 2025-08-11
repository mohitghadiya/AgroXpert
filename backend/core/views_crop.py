import os
import numpy as np
import pickle
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

MODEL_PATH = os.path.join(os.path.dirname(__file__), '../ml/crop_recommendation_model.pkl')

with open(MODEL_PATH, 'rb') as f:
    model = pickle.load(f)

class CropRecommendAPIView(APIView):
    def post(self, request):
        try:
            data = request.data
            features = [
                float(data.get('N')),
                float(data.get('P')),
                float(data.get('K')),
                float(data.get('temperature')),
                float(data.get('humidity')),
                float(data.get('ph')),
                float(data.get('rainfall')),
            ]
            pred = model.predict([features])[0]
            return Response({'recommended_crop': pred})
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)