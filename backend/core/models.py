from mongoengine import Document, StringField
from django.contrib.auth.hashers import make_password, check_password


# user model for signup and login   
class User(Document):
    meta = {'collection': 'users'}
    username = StringField(required=True, unique=True)
    full_name = StringField(required=True)
    email = StringField(required=True, unique=True)
    password = StringField(required=True)  
    phone_number = StringField(required=True)
    role = StringField(required=True, choices=['Farmer', 'Lab', 'Agronomist'])
    
    location = StringField(required=True)

    def set_password(self, raw_password):
        self.password = make_password(raw_password)

    def check_password(self, raw_password):
        return check_password(raw_password, self.password)



# SoilTestRequest model for soil test manafment
from mongoengine import ReferenceField, DateTimeField
from datetime import datetime
from django.core.validators import FileExtensionValidator

class SoilTestRequest(Document):
    meta = {'collection': 'soil_test_requests'}
    farmer = ReferenceField(User, required=True)
    lab = ReferenceField(User, required=True)
    soil_type = StringField(required=True)
    appointment_date = DateTimeField(required=True)
    status = StringField(choices=['Pending', 'Accepted', 'Rejected', 'Completed'], default='Pending')
    notes = StringField()
    result_file_url = StringField()
    created_at = DateTimeField(default=datetime.utcnow)






# conact page
from mongoengine import Document, StringField, EmailField, DateTimeField
from datetime import datetime

class ContactMessage(Document):
    name = StringField(required=True, max_length=100)
    email = EmailField(required=True)
    subject = StringField(required=True, max_length=200)
    message = StringField(required=True)
    created_at = DateTimeField(default=datetime.utcnow)