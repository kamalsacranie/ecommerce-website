from django.urls import path
from base.views import order_views as views

urlpatterns = [
    path('', views.get_orders, name='orders'),
    path('add/', views.add_order_items, name='order-add'),
    path('myorders/', views.get_my_orders, name='myorders'), # this has to be above get order by id otherwise it gets confused
    path('<str:pk>/', views.get_order_by_id, name='order-add'),
    path('<str:pk>/pay/', views.update_order_to_paid, name='pay'),
]