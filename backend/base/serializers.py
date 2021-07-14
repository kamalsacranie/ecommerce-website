from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Product


class UserSerializer(serializers.ModelSerializer):
    '''
    This basically wraps around our model and turns it into json format
    '''
    # Making our serialiser aware of the name field we create
    name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    is_admin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['_id', 'username', 'email', 'name'] # returning all info for our Product model

    # We HAVE to use the keyword get according to the docs we can then display it in the class meta
    def get_name(self, obj):
        name = obj.first_name
        if name == '':
            name = obj.email

        return name

    def get__id(self, obj):
        return obj.id

    def get_is_admin(self, obj):
        return obj.is_staff

class ProductSerializer(serializers.ModelSerializer):
    '''
    This basically wraps around our model and turns it into json format
    '''
    class Meta:
        model = Product
        fields = '__all__' # returning all info for our Product model