from rest_framework import serializers
from .models import User

class SignupSerializer(serializers.Serializer):
    username = serializers.CharField()
    full_name = serializers.CharField()
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)
    phone_number = serializers.CharField()
    role = serializers.CharField()
    location = serializers.CharField()

    def validate(self, data):
        # Unique username/email check
        if User.objects(username=data['username']).first():
            raise serializers.ValidationError("Username already exists.")
        if User.objects(email=data['email']).first():
            raise serializers.ValidationError("Email already exists.")
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError("Passwords do not match.")
        if len(data['phone_number']) != 10 or not data['phone_number'].isdigit():
            raise serializers.ValidationError("Phone number must be 10 digits.")
        return data

    def create(self, validated_data):
        validated_data.pop('confirm_password')
        user = User(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)



# below your User model
from mongoengine import ReferenceField, DateTimeField
from datetime import datetime
from rest_framework import serializers      

class SoilTestRequestSerializer(serializers.Serializer):
    id = serializers.CharField(required=False)
    farmer = serializers.CharField()  # Accept farmer as input (ObjectId string)
    lab = serializers.CharField()     # Accept lab as input (ObjectId string)
    soil_type = serializers.CharField()
    appointment_date = serializers.DateTimeField()
    status = serializers.CharField(required=False)
    notes = serializers.CharField(required=False, allow_blank=True)
    created_at = serializers.DateTimeField(required=False)
    
    result_file_url = serializers.CharField(required=False, allow_blank=True)


    def to_representation(self, instance):
        data = super().to_representation(instance)
        
        data['farmer_id'] = str(instance.farmer.id)
        data['farmer_name'] = instance.farmer.full_name if hasattr(instance.farmer, 'full_name') else "Unknown"
        

        
        data['lab_id'] = str(instance.lab.id)
        data['lab_name'] = instance.lab.full_name if hasattr(instance.lab, 'full_name') else "Unknown"
    
        return data


class ImageUploadSerializer(serializers.Serializer):
    image = serializers.ImageField()


from rest_framework import serializers

class FertilizerInputSerializer(serializers.Serializer):
    Temparature = serializers.IntegerField()
    Humidity = serializers.IntegerField()
    Moisture = serializers.IntegerField()
    Soil_Type = serializers.CharField()
    Crop_Type = serializers.CharField()
    Nitrogen = serializers.IntegerField()
    Potassium = serializers.IntegerField()
    Phosphorous = serializers.IntegerField()





from rest_framework import serializers
from .models import ContactMessage

class ContactMessageSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=100)
    email = serializers.EmailField()
    subject = serializers.CharField(max_length=200)
    message = serializers.CharField()

    def create(self, validated_data):
        return ContactMessage(**validated_data).save()