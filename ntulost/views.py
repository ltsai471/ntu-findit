from django.shortcuts import render,get_object_or_404,get_list_or_404
from django.views import View
from django.http import JsonResponse,Http404
from rest_framework import viewsets,status
from .serializers import OrderSerializer ,FilterItemSerializer,ItemSerializer
from .models import Order,Item,ItemTypeLevel2,ItemTypeLevel1
from rest_framework.response import Response
from rest_framework.decorators import action #ian
from rest_framework import renderers #ian
from rest_framework.renderers import JSONRenderer,TemplateHTMLRenderer
import datetime
from rest_framework.decorators import api_view
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

#跟Item有關的API
class ItemViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for listing or retrieving users.
    """
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    # permission_classes = [IsAccountAdminOrReadOnly]
    def list(self, request):
        queryset = Item.objects.all()
        serializer = ItemSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = Item.objects.all()
        item = get_object_or_404(queryset, pk=pk)
        serializer = ItemSerializer(item)
        return Response(serializer.data)

    #C-1搜尋功能
    @action(detail=False, methods=['get'],name="filter")
    def itemsFilter(self,request):
        #取得request.Post 的 data

        itemPlace=request.query_params.get("itemPlace")
        itemTypeLevel1=request.query_params.get("itemTypeLevel1")
        itemTypeLevel2=request.query_params.get("itemTypeLevel2")
        print(request.query_params )

        startDatetime=request.query_params.get("startDatetime")
        endDatetime=request.query_params.get("endDatetime")
        if itemPlace in ["",None]:
            itemPlace=""
        # 分類
        if itemTypeLevel1 not in ["",None]  and itemTypeLevel2 not in ["",None]:
            # print("大項細項都有")

            itemTypeLevel2_list=[itemTypeLevel2]

        if itemTypeLevel1 not in ["",None] and itemTypeLevel2 in ["",None]:
            # print("只有大項")
            itemTypeLevel1_id=[]
            for itemtypelevel1 in ItemTypeLevel1.objects.filter(name=itemTypeLevel1):
                itemTypeLevel1_id.append(itemtypelevel1.level1Id)
            itemTypeLevel2_list=[]
            for itemTypeLevel2 in get_list_or_404(ItemTypeLevel2,level1Id__in=itemTypeLevel1_id):
                itemTypeLevel2_list.append(itemTypeLevel2.name)

        if itemTypeLevel1 in ["",None] and itemTypeLevel2 in ["",None]:
            # print("大項細項都沒有")
            itemTypeLevel1_id=[]
            for itemtypelevel1 in ItemTypeLevel1.objects.all():
                itemTypeLevel1_id.append(itemtypelevel1.level1Id)
            itemTypeLevel2_list=[]
            for itemTypeLevel2 in get_list_or_404(ItemTypeLevel2,level1Id__in=itemTypeLevel1_id):
                itemTypeLevel2_list.append(itemTypeLevel2.name)

        #時間範圍搜尋
        if startDatetime in ["",None]  :
            startDatetime=datetime.datetime(2019,7,1,1,30)
        if endDatetime in ["",None] :
            endDatetime=datetime.datetime(2022,7,1,1,30)

        filteredItem = get_list_or_404(
        Item,
        # status="U",
        itemPlace__icontains=itemPlace,
        itemType__in=itemTypeLevel2_list,
        lossDatetime__range=(startDatetime,endDatetime)
        )

        serializer = FilterItemSerializer(filteredItem, many=True)
        if serializer!=None:

            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED,safe=False)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST,safe=False)
    #根據使用者主頁面中你的遺失物資料
    @action(detail=False, methods=['get'],name="getlostitem by itemOwnerId")
    def getUserLostItem(self,request):
        itemOwnerId=request.query_params.get("itemOwnerId")
        userLostItem = get_list_or_404(
        Item,
        itemOwnerId=itemOwnerId
        )
        serializer = ItemSerializer(userLostItem, many=True)
        return JsonResponse(serializer.data, status=status.HTTP_200_OK,safe=False)
