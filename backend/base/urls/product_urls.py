from django.urls import path
from base.views import product_views as views

# Word on the street is that it's best practice to have the hard coded
# URLs at the top to avoid errors
urlpatterns = [
    path('', views.get_products, name='products'),
    path('create/', views.create_product, name='product-create'),
    path('upload/', views.upload_image, name='image-upload'),

    path('<str:pk>/', views.get_product, name='product'), # url for the specific product which passes thorugh the pk to the function
    path('update/<str:pk>/', views.update_product, name='product-update'),
    path('delete/<str:pk>/', views.delete_product, name='product-delete')
]