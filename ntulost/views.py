from django.shortcuts import render,get_object_or_404
from rest_framework import viewsets
from .serializers import OrderSerializer ,FilterItemSerializer
from .models import Order,Item
from rest_framework.response import Response
from rest_framework.decorators import action #ian
from rest_framework import renderers #ian
from rest_framework.renderers import JSONRenderer
# Create your views here.

class OrderView(viewsets.ModelViewSet):
    serializer_class = OrderSerializer

    def get_queryset(self):
        queryset = Order.objects.all()
        para = self.request.query_params.get('query')
        if para:
            queryset = Order.objects.filter(customer__icontains=para)

        return queryset
#ian
class MainViewset(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.

    Additionally we also provide an extra `highlight` action.
    """

    queryset = Item.objects.all()
    serializer_class = FilterItemSerializer(queryset, many=True)

    # @action(detail=True, methods=['post'],name='filter')
    def filter(self, request):
        itemPlace=request.POST.get("itemPlace")
        # print(itemPlace)
        if itemPlace!=None:

            # name=request.POST.get("searchname")
            queryset=Item.objects.filter(itemPlace__contains=itemPlace).all()
            serializer = FilterItemSerializer(queryset, many=True)

            json = JSONRenderer().render(serializer.data)
            print(json)
            return Response(json)


        return render(request,"test.html")
    # @action(detail=True, methods=['get'],name='show')
    def show(self, request):
        queryset=Item.objects.all()
        serializer = FilterItemSerializer(queryset, many=True)

        return render(request,"test.html")

    # @action(detail=True, methods=['get'],name='filter')
    # def filter(self, request):

    #     return render(request,"test.html")

    def list(self, request):
        queryset = Item.objects.all()
        serializer = FilterItemSerializer(queryset, many=True)
        return render(request,"test.html")

