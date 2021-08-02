from os import remove, stat
from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from base.models import Product, Review
from base.products import products
from base.serializers import ProductSerializer

from rest_framework import status

@api_view(['GET',])
def get_products(request):

    # Automatically pulls search keyword from our url    
    if request.query_params.get('keyword') == None:
        query = ''
    else:
        query = request.query_params.get('keyword')

    products = Product.objects.filter(name__icontains=query) # if the title of the product contains any chars in the query we return it also the i denotes case insensitivity
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
    try:
        remove(product.image.path)
    except:
        pass
    product.delete()
    return Response('Product Deleted')

@api_view(['POST',])
def upload_image(request):
    data = request.data

    product_id = data['product_id']
    product = Product.objects.get(_id=product_id)

    # This is a way to remove previous image files ascosiated with a product
    # pretty sloppy way to get round the fact that we dont want to delete our placeholder image
    try:
        remove(product.image.path)
    except:
        pass
    product.image = request.FILES.get('image') # we are going to using "multi-part form data" to send this image
    product.save()

    return Response('Image was uploaded')

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_product_review(request, pk):
    user = request.user
    product = Product.objects.get(_id=pk)
    data = request.data

    already_exists = product.review_set.filter(user=user).exists()

    # Review laready exists
    if already_exists:
        content = {
            'detail': 'Product already reviewed'
        }
        return Response(content, status=status.HTTP_400_BAD_REQUEST)
    # Didn't provide a rating
    elif data['rating'] == 0:
        content = {
            'detail': 'Please select a rating'
        }
        return Response(content, status=status.HTTP_400_BAD_REQUEST)
    # Create review
    else:
        review = Review.objects.create(
            user=user,
            product=product,
            name=user.first_name,
            rating=data['rating'],
            comment=data['comment']
        )
        
        # Updating related product number of reviews and total rating
        reviews = product.review_set.all()
        product.num_reviews = len(reviews)

        total = 0
        for i in reviews:
            total += i.rating
            product.rating = total / product.num_reviews
        product.save()

        return Response('Review added')