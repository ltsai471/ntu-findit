from django.shortcuts import render,get_object_or_404,get_list_or_404
from django.views import View
from django.http import JsonResponse
from rest_framework import viewsets
from .serializers import OrderSerializer ,FilterItemSerializer
from .models import Order,Item
from rest_framework.response import Response
from rest_framework.decorators import action #ian
from rest_framework import renderers #ian
from rest_framework.renderers import JSONRenderer,TemplateHTMLRenderer
import datetime
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
class TestView(View):
    def get(self,request):
        return render(request,"test.html")
class MainViewset(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.

    Additionally we also provide an extra `highlight` action.
    """
    #api使用測試
    # renderer_classes = [TemplateHTMLRenderer]

    # template_name = 'items.html'

    queryset = Item.objects.all()
    serializer_class = FilterItemSerializer(queryset, many=True)

    # @action(d etail=True, methods=['post'],name='filter')
    def filter(self, request):

        itemPlace=request.POST.get("itemPlace")
        itemType=request.POST.get("itemType")
        # startDatetime=request.POST.get("startDatetime")
        # endDatetime=request.POST.get("endDatetime")
        # itemPlace=""
        # itemType=""
        startDatetime=datetime.datetime(2021,7,1,1,30)
        endDatetime=datetime.datetime(2022,7,1,1,30)
        queryset=Item.objects.all()
        serializer = FilterItemSerializer(queryset, many=True)
        json = JSONRenderer().render(serializer.data)
        print(itemPlace)
        if itemPlace!=None:
            filtereditem = get_list_or_404(Item,
            itemPlace__icontains=itemPlace,itemType__icontains=itemType,
            lossDatetime__range=(startDatetime,endDatetime)
            )

            serializer = FilterItemSerializer(filtereditem, many=True)

            # json = JSONRenderer().render(serializer.data)
            # print(json)
        # return Response({'items':filtereditem}) #類似傳一個context到template.html
            return JsonResponse(serializer.data,safe=False)


        return JsonResponse(serializer.data,safe=False)
    # @action(detail=True, methods=['get'],name='show')
    def show(self, request):
        queryset=Item.objects.all()
        serializer = FilterItemSerializer(queryset, many=True)

        # return Response({'items': queryset})
        return queryset
    # @action(detail=True, methods=['get'],name='filter')
    # def filter(self, request):

    #     return render(request,"test.html")

    def list(self, request):
        queryset = Item.objects.all()
        serializer = FilterItemSerializer(queryset, many=True)
        return render(request,"test.html")

