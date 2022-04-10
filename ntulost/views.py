from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import OrderSerializer, ItemSerializer
from .models import Order, Item


@api_view(['GET'])
def api_overview(request):
    api_urls = {
        'notice':'**This list is only for api preview, please check ntulost/urls.py to see the newest api urls.**',
        'Items List and Create':'/item',
        'Item Update and Delete':'/item/<int:id>',
    }
    return Response(api_urls)


class OrderView(viewsets.ModelViewSet):
    serializer_class = OrderSerializer

    def get_queryset(self):
        queryset = Order.objects.all()
        para = self.request.query_params.get('query')
        if para:
            queryset = Order.objects.filter(customer__icontains=para)
        return queryset
