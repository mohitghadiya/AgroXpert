# from django.urls import path
# from . import views

# from .views import get_7_day_weather

# urlpatterns = [
#     path('', views.api_overview),
#     path('crop/', views.crop_advisor),
#     path('disease/', views.disease_detection),
#     # path('market/', views.marketplace),
#     # path('forum/', views.forum_posts),
#     path('analyze-soil/', views.analyze_soil),
#     path('weather/', get_7_day_weather),
#     path('register/', views.register, name='register'),
#     path('login/', views.login, name='login'),
# ]



# from django.urls import path
# from .views import (
#     SignupView, LoginView,
#     CreateSoilTestRequestView,
#     FarmerSoilTestListView,
#     LabSoilTestListView,
#     LabUpdateTestStatusView,
#     UploadTestResultView,
#     LabListView,
#     )
# from .views_crop import CropRecommendAPIView
# from .views import predict_yield
# from .views_fertilizer import FertilizerRecommendationView
# from .views import PlantDiseaseDetectionView # Import your new view
# from .views import UserProfileView, UpdateUserProfileView
# from .views import ContactMessageView



# # from .views import UpdateProfileView


# urlpatterns = [
#     path('users/signup/', SignupView.as_view(), name='signup'),
#     path('users/login/', LoginView.as_view(), name='login'),
#     path('soiltest/create/', CreateSoilTestRequestView.as_view(), name='create_soil_test'),
#     path('soiltest/farmer/<str:farmer_id>/', FarmerSoilTestListView.as_view(), name='farmer_soil_tests'),
#     path('soiltest/lab/<str:lab_id>/', LabSoilTestListView.as_view(), name='lab_soil_tests'),
#     path('soiltest/status/<str:test_id>/', LabUpdateTestStatusView.as_view(), name='update_soil_status'),
#     path('soiltest/upload/<str:test_id>/', UploadTestResultView.as_view(), name='upload_soil_result'),
#     path('crop/recommend/', CropRecommendAPIView.as_view(), name='crop_recommend'),
#     path('labs/', LabListView.as_view(), name='lab_list'),
#     path('yield/predict/', predict_yield, name='predict_yield'),
#     path('fertilizer/recommend/', FertilizerRecommendationView.as_view(), name='fertilizer_recommend'),
#     path('predict/disease/', PlantDiseaseDetectionView.as_view(), name='predict-disease'),
#     path('users/profile/', UserProfileView.as_view()),
#     path('users/profile/update/', UpdateUserProfileView.as_view()),
#     path("contact/", ContactMessageView.as_view(), name="contact"),
    
# ]

from django.urls import path
from .views import (
    SignupView, LoginView,
    CreateSoilTestRequestView,
    FarmerSoilTestListView,
    LabSoilTestListView,
    LabUpdateTestStatusView,
    UploadTestResultView,
    LabListView,
    ContactMessageView,
)
from .views_crop import CropRecommendAPIView
from .views import predict_yield
from .views_fertilizer import FertilizerRecommendationView
from .views import PlantDiseaseDetectionView

urlpatterns = [
    path('users/signup/', SignupView.as_view(), name='signup'),
    path('users/login/', LoginView.as_view(), name='login'),

    # Soil Test
    path('soiltest/create/', CreateSoilTestRequestView.as_view(), name='create_soil_test'),
    path('soiltest/farmer/<str:farmer_id>/', FarmerSoilTestListView.as_view(), name='farmer_soil_tests'),
    path('soiltest/lab/<str:lab_id>/', LabSoilTestListView.as_view(), name='lab_soil_tests'),
    path('soiltest/status/<str:test_id>/', LabUpdateTestStatusView.as_view(), name='update_soil_status'),
    path('soiltest/upload/<str:test_id>/', UploadTestResultView.as_view(), name='upload_soil_result'),

    # Crops & Yield
    path('crop/recommend/', CropRecommendAPIView.as_view(), name='crop_recommend'),
    path('yield/predict/', predict_yield, name='predict_yield'),

    # Fertilizer
    path('fertilizer/recommend/', FertilizerRecommendationView.as_view(), name='fertilizer_recommend'),

    # Labs
    path('labs/', LabListView.as_view(), name='lab_list'),

    # Plant Disease
    path('predict/disease/', PlantDiseaseDetectionView.as_view(), name='predict-disease'),

    # Contact
    path("contact/", ContactMessageView.as_view(), name="contact"),
]
