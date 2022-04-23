from django.shortcuts import render, get_object_or_404, get_list_or_404
from django.views import View
from django.http import JsonResponse, Http404

from rest_framework import viewsets, status, renderers
from rest_framework.decorators import api_view, action
from rest_framework.response import Response

from .serializers import OrderSerializer, FilterItemSerializer, ItemSerializer
from .models import Order, Item, ItemTypeLevel2, ItemTypeLevel1
from . import itemFilterUtils



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

    # 主頁面
    @action(detail=False, methods=['post'], name="filter")
    def itemsFilter(self, request):
        itemPlace = itemFilterUtils.getItemPlace(request)
        itemTypeList = itemFilterUtils.getItemTypeList(request)
        lossDatetimeRange = itemFilterUtils.getDatetimeRange(request)

        filteredItem = get_list_or_404(
            Item,
            foundOrLoss="found",
            itemPlace__icontains=itemPlace,
            itemType__in=itemTypeList,
            lossDatetime__range=lossDatetimeRange
        )

        filterItemSerializer = FilterItemSerializer(filteredItem, many=True)
        if filterItemSerializer != None:
            return Response(filterItemSerializer.data, status=status.HTTP_201_CREATED)
        return Response(filterItemSerializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # 你的遺失物
    @action(detail=False, methods=['get'], name="getlostitem by itemOwnerId")
    def getUserLossItem(self, request):
        userId = "1"#jwt("mailId")

        userLossItem = get_list_or_404(
            Item,
            accountId=userId,
            foundOrLoss="loss"
        )
        itemSerializer = ItemSerializer(userLossItem, many=True)
        return Response(itemSerializer.data, status=status.HTTP_200_OK)

    
    # 你的拾獲案件
    @action(detail=False, methods=['get'], name="getlostitem by itemOwnerId")
    def getUserFoundItem(self, request):
        userId = "1"#jwt("mailId")

        userFoundItem = get_list_or_404(
            Item,
            accountId=userId,
            foundOrLoss="loss"
        )
        itemSerializer = ItemSerializer(userFoundItem, many=True)
        return Response(itemSerializer.data, status=status.HTTP_200_OK)
