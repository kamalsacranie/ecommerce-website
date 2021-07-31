from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Product, Order, OrderItem, ShippingAddress, Review

from rest_framework_simplejwt.tokens import RefreshToken


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
        fields = ['_id', 'username', 'email', 'name', 'is_admin'] # returning all info for our Product model

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

class UserSerializerWithToken(UserSerializer):

    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['_id', 'username', 'email', 'name', 'is_admin', 'token']

    def get_token(self, obj):
        # As we are generating or serializing a user we are going to return
        # A refreshed token
        token = RefreshToken.for_user(obj)
        return str(token.access_token)

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__' # returning all info for our Product model

class ProductSerializer(serializers.ModelSerializer):
    '''
    This basically wraps around our model and turns it into json format
    '''
    reviews = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Product
        fields = '__all__' # returning all info for our Product model
     
    def get_reviews(self, obj):
        reviews = obj.review_set.all()
        # This allows us to nest all the information from the reviews model
        # In the reponse of our api along with the product details
        serializer = ReviewSerializer(reviews, many=True)
        return(serializer)

class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields = '__all__' # returning all info for our Product model

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = '__all__' # returning all info for our Product model

class OrderSerializer(serializers.ModelSerializer):

    order_items = serializers.SerializerMethodField(read_only=True)
    shipping_address = serializers.SerializerMethodField(read_only=True)
    user = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Order
        fields = '__all__' # returning all info for our Product model

    def get_order_items(self, obj):
        order_items = obj.orderitem_set.all() # could be place for errors
        serializer = OrderItemSerializer(order_items, many=True)
        return serializer.data

    def get_shipping_address(self, obj):
        # try:
            address = ShippingAddressSerializer(
                obj.shippingaddress, many=False # why the FUCK is this not either snake nor camel case wtf
            ).data
        # except:
        #     print(obj)
        #     address = False
            return address

    def get_user(self, obj):
        user = obj.user
        serializer = UserSerializer(user, many=False)
        return serializer.data

    # Good explanation for all this in 5. Order View & URL at 19:30