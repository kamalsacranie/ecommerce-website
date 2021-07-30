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
    # slightly too late
    product.description = data['description']
    product.category = data['category']

    product.save()

    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)

@api_view(['DELETE',])
@permission_classes([IsAuthenticated])
def delete_product(request, pk):
    product = Product.objects.get(_id=pk)
    product.delete()
    return Response('Product Deleted')
