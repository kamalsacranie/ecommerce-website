from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Product


class ProductSerializer(serializers.ModelSerializer):
    '''
    This basically wraps around our model and turns it into json format
    '''
    class Meta:
        model = Product
        fields = '__all__' # returning all info for our Product model