from django.urls import path
from base.views import product_views as views

urlpatterns = [
    path('', views.get_products, name='products'),
    path('<str:pk>/', views.get_product, name='product'), # url for the specific product which passes thorugh the pk to the function

    path('delete/<str:pk>/', views.delete_product, name='product-delete')
]