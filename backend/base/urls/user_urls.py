from django.urls import path
from base.views import user_views as views

urlpatterns = [
    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('profile/', views.get_user_profile, name='user-profile'),
    path('register/', views.register_user, name='register'),
    path('', views.get_users, name='user'),
]