from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .products import products

# Create your views here.

# Decorating our api functions telling them what requests they can handle
@api_view(['GET',]) # this tells what type of requests we want to allow to the endpoint
def get_routes(request) -> JsonResponse:
    return Response('Hello')

@api_view(['GET',])
def get_products(request):
    return Response(products)

@api_view(['GET',])
def get_product(request, pk):
    product = None
    for i in products:
        if i['_id'] == pk:
            product = i
            break
    
    return Response(product)