from django.shortcuts import render, get_object_or_404, get_list_or_404
from rest_framework import viewsets, status, renderers
# from rest_framework.renderers import JSONRenderer,TemplateHTMLRenderer
from rest_framework.decorators import api_view, action
from rest_framework.response import Response
from .serializers import OrderSerializer, FilterItemSerializer, ItemSerializer
from .models import Order, Item, ItemTypeLevel2, ItemTypeLevel1
from django.views import View
from django.http import JsonResponse, Http404
import datetime


@api_view(['GET'])
def api_overview(request):
    api_urls = {
        'notice': '**This list is only for api preview, please check ntulost/urls.py to see the newest api urls.**',
        'Items List and Create': '/item',
        'Item Update and Delete': '/item/<int:id>',
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


class TestView(View):
    def get(self, request):
        return render(request, "test.html")


class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

    def list(self, request):
        queryset = Item.objects.all()
        itemSerializer = ItemSerializer(queryset, many=True)
        return Response(itemSerializer.data)

    def retrieve(self, request, pk=None):
        queryset = Item.objects.all()
        item = get_object_or_404(queryset, pk=pk)
        itemSerializer = ItemSerializer(item)
        return Response(itemSerializer.data)

    @action(detail=False, methods=['post'], name="filter")
    def itemsFilter(self, request):
        itemPlace = request.data.get("itemPlace")
        itemTypeLevel1 = request.data.get("itemTypeLevel1")
        itemTypeLevel2 = request.data.get("itemTypeLevel2")
        startDatetime = request.data.get("startDatetime")
        endDatetime = request.data.get("endDatetime")
        if itemPlace in ["", None]:
            itemPlace = ""
        if itemTypeLevel1 not in ["", None] and itemTypeLevel2 not in ["", None]:
            itemTypeLevel2List = [itemTypeLevel2]
        if itemTypeLevel1 not in ["", None] and itemTypeLevel2 in ["", None]:
            itemTypeLevel1Id = []
            for itemtypelevel1 in ItemTypeLevel1.objects.filter(name=itemTypeLevel1):
                itemTypeLevel1Id.append(itemtypelevel1.level1Id)
            itemTypeLevel2List = []
            for itemTypeLevel2 in get_list_or_404(ItemTypeLevel2, level1Id__in=itemTypeLevel1Id):
                itemTypeLevel2List.append(itemTypeLevel2.name)
        if itemTypeLevel1 in ["", None] and itemTypeLevel2 in ["", None]:
            itemTypeLevel1Id = []
            for itemtypelevel1 in ItemTypeLevel1.objects.all():
                itemTypeLevel1Id.append(itemtypelevel1.level1Id)
            itemTypeLevel2List = []
            for itemTypeLevel2 in get_list_or_404(ItemTypeLevel2, level1Id__in=itemTypeLevel1Id):
                itemTypeLevel2List.append(itemTypeLevel2.name)
        if startDatetime in ["", None]:
            startDatetime = datetime.datetime(2019, 7, 1, 1, 30)
        if endDatetime in ["", None]:
            endDatetime = datetime.datetime(2022, 7, 1, 1, 30)

        filteredItem = get_list_or_404(
            Item,
            # status="U",
            itemPlace__icontains=itemPlace,
            itemType__in=itemTypeLevel2List,
            lossDatetime__range=(startDatetime, endDatetime)
        )

        serializer = FilterItemSerializer(filteredItem, many=True)
        if serializer != None:
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED, safe=False)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST, safe=False)

    # 根據使用者主頁面中你的遺失物資料
    @action(detail=False, methods=['get'], name="getlostitem by itemOwnerId")
    def getUserLostItem(self, request):
        itemOwnerId = request.query_params.get("itemOwnerId")
        userLostItem = get_list_or_404(
            Item,
            itemOwnerId=itemOwnerId
        )
        itemSerializer = ItemSerializer(userLostItem, many=True)
        return JsonResponse(itemSerializer.data, status=status.HTTP_200_OK, safe=False)
