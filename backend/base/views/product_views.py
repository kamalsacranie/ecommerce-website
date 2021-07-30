from os import remove
from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from base.models import Product
from base.products import products
from base.serializers import ProductSerializer

from rest_framework import status

@api_view(['GET',])
def get_products(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['GET',])
def get_product(request, pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)

@api_view(['POST',])
@permission_classes([IsAuthenticated])
def create_product(request):
    user = request.user
    product = Product.objects.create(
        user=user,
        name='Product Name',
        price=0,
        brand='Product Brand',
        count_in_stock=0,
        category='Product Category',
        description='',
    )

    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)

@api_view(['PUT',])
@permission_classes([IsAuthenticated])
def update_product(request, pk):
    data = request.data
    product = Product.objects.get(_id=pk)
    product.name = data['name']
    product.price = data['price']
    product.brand = data['brand']
    product.count_in_stock = data['countInStock'] # This is camelCase becasue we will name it as such in the form in the frontend
    # we are jsut following these naming conventions for this project bacuase I realised its better to not mix and match
    # slightly too late. Figured out that it is named snake_case in the state and camelCase was assigning no value which meant
    # that React was throwing a message saying that one of our form elements' state wasnt being controlled properly becasue
    # on load the form element would conflict with the react state which was empty or some such.
    product.description = data['description']
    product.category = data['category']

    product.save()

    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)

@api_view(['DELETE',])
@permission_classes([IsAuthenticated])
def delete_product(request, pk):
    product = Product.objects.get(_id=pk)
    # Removing product associated image
    remove(product.image.path)
    product.delete()
    return Response('Product Deleted')

@api_view(['POST',])
def upload_image(request):
    data = request.data

    product_id = data['product_id']
    product = Product.objects.get(_id=product_id)

    # This is a nice clean way to remove the previous image path and not have duplicates for one product
    remove(product.image.path)
    product.image = request.FILES.get('image') # we are going to using "multi-part form data" to send this image
    product.save()

    return Response('Image was uploaded')