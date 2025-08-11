from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import SignupSerializer, LoginSerializer
from .models import User
import jwt
from django.conf import settings

class SignupView(APIView):
    def post(self, request):
        serializer = SignupSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)
        return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)





class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            user = User.objects(email=email).first()

            if user and user.check_password(password):
                # JWT Token Generation
                payload = {
                    'user_id': str(user.id),
                    'username': user.username,
                    'email': user.email,
                    'role': user.role
                }
                token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')

                return Response({
                    'token': token,
                    'user_id': str(user.id),  # <-- direct key
                    'user': payload           # <-- also keep the payload
                }, status=status.HTTP_200_OK)

            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

        return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)




from .models import SoilTestRequest, User
from .serializers import SoilTestRequestSerializer

# Create request
class CreateSoilTestRequestView(APIView):
    def post(self, request):
        serializer = SoilTestRequestSerializer(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            farmer = User.objects(id=data['farmer']).first()
            lab = User.objects(id=data['lab']).first()

            if not farmer or not lab:
                return Response({'error': 'Farmer or Lab not found'}, status=400)

            request_obj = SoilTestRequest(
                farmer=farmer,
                lab=lab,
                soil_type=data['soil_type'],
                appointment_date=data['appointment_date'],
                status=data.get('status', 'Pending'),
                notes=data.get('notes', ''),
            )
            request_obj.save()
            return Response({'message': 'Soil Test Request Created'}, status=201)
        return Response({'error': serializer.errors}, status=400)

# Farmer view own requests
class FarmerSoilTestListView(APIView):
    def get(self, request, farmer_id):
        tests = SoilTestRequest.objects(farmer=farmer_id)
        serializer = SoilTestRequestSerializer(tests, many=True)
        return Response(serializer.data)


# Lab view all incoming requests
class LabSoilTestListView(APIView):
    def get(self, request, lab_id):
        tests = SoilTestRequest.objects(lab=lab_id)
        serializer = SoilTestRequestSerializer(tests, many=True)
        return Response(serializer.data)


# Lab update status
class LabUpdateTestStatusView(APIView):
    def post(self, request, test_id):
        new_status = request.data.get("status")
        if new_status not in ["Accepted", "Rejected", "Completed"]:
            return Response({"error": "Invalid status"}, status=400)

        test = SoilTestRequest.objects(id=test_id).first()
        if test:
            test.status = new_status
            test.save()
            return Response({"message": f"Status updated to {new_status}"})
        return Response({"error": "Test not found"}, status=404)


# Lab upload result file
class UploadTestResultView(APIView):
    def post(self, request, test_id):
        file_url = request.data.get("result_file_url")
        test = SoilTestRequest.objects(id=test_id).first()

        if test:
            test.result_file_url = file_url
            test.status = "Completed"
            test.save()
            return Response({"message": "Result uploaded successfully"})
        return Response({"error": "Test not found"}, status=404)


# Get all labs
class LabListView(APIView):
    def get(self, request):
        labs = User.objects(role="Lab")
        lab_data = [
            {
                "id": str(lab.id),
                "name": lab.full_name,
                "email": lab.email,
                "phone_number": lab.phone_number,
                "location": lab.location
            }
            for lab in labs
        ]
        return Response(lab_data)



# yeild prediction model

import pickle
from rest_framework.decorators import api_view
from rest_framework.response import Response

# Load model and encoders (do this once at module load)
with open('ml/yield_model_y.pkl', 'rb') as f:
    yield_model = pickle.load(f)
with open('ml/crop_encoder_y.pkl', 'rb') as f:
    crop_encoder = pickle.load(f)
with open('ml/soil_encoder_y.pkl', 'rb') as f:
    soil_encoder = pickle.load(f)

@api_view(['POST'])
def predict_yield(request):
    try:
        data = request.data

        crop = crop_encoder.transform([data['crop']])[0]
        soil = soil_encoder.transform([data['soil']])[0]

        features = [
            crop,
            soil,
            float(data['N']),
            float(data['P']),
            float(data['K']),
            float(data['rainfall']),
            float(data['temperature']),
            float(data['area'])
        ]
        prediction = yield_model.predict([features])[0]
        return Response({'predicted_yield': round(prediction, 2)})
    except Exception as e:
        return Response({'error': str(e)}, status=400)







# leaf detaction

import requests
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from .serializers import ImageUploadSerializer

class PlantDiseaseDetectionView(APIView):
    parser_classes = [MultiPartParser, FormParser]
    serializer_class = ImageUploadSerializer


    def post(self, request):
        image_file = request.data.get('image')
        if not image_file:
            return Response({"error": "No image provided."}, status=status.HTTP_400_BAD_REQUEST)

        if not settings.PLANTNET_API_KEY:
            return Response({"error": "PlantNet API key not configured."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        api_url = f"https://my-api.plantnet.org/v2/identify/all?api-key={settings.PLANTNET_API_KEY}"
        
        payload = {'organs': 'leaf'}
        files = {'images': (image_file.name, image_file.read(), image_file.content_type)}
        
        try:
            response = requests.post(api_url, data=payload, files=files)
            response.raise_for_status()
            api_data = response.json()

            results = api_data.get('results')
            if not results:
                return Response({'plant_name': 'Could not identify plant.'}, status=status.HTTP_200_OK)

            best_match = results[0]
            suggestions = best_match.get('disease', {}).get('suggestions')
            score = best_match.get('score', 0)

            
            common_names = best_match.get('species', {}).get('commonNames', [])
            plant_name = common_names[0] if common_names else best_match.get('species', {}).get('scientificNameWithoutAuthor', 'N/A')
            

            if not suggestions:
                simplified_result = {
                    'is_healthy': True,
                    'disease_name': 'No disease detected',
                    'plant_name': plant_name,
                    'score': score
                }
            else:
                disease_info = suggestions[0]
                simplified_result = {
                    'is_healthy': disease_info.get('is_healthy', True),
                    'disease_name': disease_info.get('name', 'N/A'),
                    'plant_name': plant_name,
                    'score': score,
                    'description': disease_info.get('disease_details', {}).get('description', 'No details available.')
                }
            
            return Response(simplified_result, status=status.HTTP_200_OK)

        except requests.exceptions.RequestException as e:
            return Response({"error": f"Failed to communicate with API: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)






# contat us page

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.core.mail import send_mail
from django.conf import settings
from .serializers import ContactMessageSerializer

class ContactMessageView(APIView):
    def post(self, request):
        serializer = ContactMessageSerializer(data=request.data)
        if serializer.is_valid():
            contact = serializer.save()

            # Send email to admin with proper formatting
            admin_subject = f"New Contact Message: {contact.subject}"
            admin_message = f"""
            New Contact Form Submission - AgroXpert
            
            Contact Details:
            ----------------------------
            Name:    {contact.name}
            Email:   {contact.email}
            Subject: {contact.subject}
            
            Message:
            ----------------------------
            {contact.message}
            
            ----------------------------
            Received at: {contact.created_at.strftime('%Y-%m-%d %H:%M')}
            """
            
            # Confirmation email to user with better formatting
            user_subject = "Thank you for contacting AgroXpert"
            user_message = f"""
            Dear {contact.name},
            
            Thank you for reaching out to AgroXpert. We have received your message and our team will get back to you shortly.
            
            Here's a copy of your message for your reference:
            ----------------------------
            Subject: {contact.subject}
            
            {contact.message}
            
            ----------------------------
            If you have any further questions, please don't hesitate to contact us.
            
            Best regards,
            The AgroXpert Team
            """
            
            try:
                # Send email to admin
                send_mail(
                    subject=admin_subject,
                    message=admin_message.strip(),
                    from_email=settings.DEFAULT_FROM_EMAIL,
                    recipient_list=[settings.EMAIL_HOST_USER],
                    fail_silently=False,
                )

                # Confirmation email to user
                send_mail(
                    subject=user_subject,
                    message=user_message.strip(),
                    from_email=settings.DEFAULT_FROM_EMAIL,
                    recipient_list=[contact.email],
                    fail_silently=False,
                )

                return Response(
                    {"message": "Your message has been sent successfully!"}, 
                    status=status.HTTP_201_CREATED
                )
                
            except Exception as e:
                # Log the error in production
                return Response(
                    {"message": "Message was saved but there was an error sending emails."},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
                
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)