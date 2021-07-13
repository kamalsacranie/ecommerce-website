from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
)

urlpatterns = [
    path('', views.get_routes, name='routes'),
    path('products/', views.get_products, name='products'),
    path('products/<str:pk>', views.get_product, name='product'), # url for the specific product which passes thorugh the pk to the function
    path('users/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
]