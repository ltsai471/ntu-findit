from django.shortcuts import render
from rest_framework import viewsets
from .serializers import OrderSerializer
from .models import Order

# Create your views here.

class OrderView(viewsets.ModelViewSet):
    serializer_class = OrderSerializer

    def get_queryset(self):
        queryset = Order.objects.all()
        para = self.request.query_params.get('query')
        if para:
            queryset = Order.objects.filter(customer__icontains=para)

        return queryset
