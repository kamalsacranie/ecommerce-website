from django.urls import path
from base.views import user_views as views

urlpatterns = [
    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('profile/', views.get_user_profile, name='user-profile'),
    path('profile/update/', views.update_user_profile, name='user-profile-update'),
    path('register/', views.register_user, name='register'),
    path('', views.get_users, name='user'),
    
    # Path to delete a user using their id/pk
    path('<str:pk>/', views.get_user_by_id, name='user'),
    path('update/<str:pk>/', views.update_user, name='user-update'),
    path('delete/<str:pk>/', views.delete_user, name='user-delete'),
]