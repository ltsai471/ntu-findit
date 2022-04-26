from django.shortcuts import render, get_object_or_404, get_list_or_404
from django.views import View
from django.http import JsonResponse, Http404

from rest_framework import viewsets, status, renderers
from rest_framework.decorators import api_view, action
from rest_framework.response import Response

from .serializers import FilterItemSerializer, ItemSerializer
from .models import Item, ItemTypeLevel2, ItemTypeLevel1
from . import Utils


@api_view(['GET'])
def api_overview(request):
    api_urls = {
        'notice': '**This list is only for api preview, please check ntulost/urls.py to see the newest api urls.**',
        'Items List and Create': '/item',
        'Item Update and Delete': '/item/<int:id>',
    }
    return Response(api_urls)


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
        itemPlace = Utils.getItemPlace(request)
        itemTypeList = Utils.getItemTypeList(request)
        lossDatetimeRange = Utils.getDatetimeRange(request)

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
    @action(detail=False, methods=['get'], name="user loss item")
    def userLossItem(self, request):
        userId = Utils.getUserId(request)
        userLossItem = get_list_or_404(
            Item,
            accountId=userId,
            foundOrLoss="loss"
        )
        filterItemSerializer = FilterItemSerializer(userLossItem, many=True)
        if filterItemSerializer != None:
            return Response(filterItemSerializer.data, status=status.HTTP_201_CREATED)
        return Response(filterItemSerializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # 遺失物自動配對
    @action(detail=False, methods=['get'], name="loss item pair")
    def lossItemPair(self, request):
        itemId = request.query_params.get('itemId')
        itemPairList = Utils.getItemPairList(itemId)
        lossItemPairs = get_list_or_404(
            Item,
            id__in=itemPairList
        )
        filterItemSerializer = FilterItemSerializer(lossItemPairs, many=True)
        if filterItemSerializer != None:
            return Response(filterItemSerializer.data, status=status.HTTP_201_CREATED)
        return Response(filterItemSerializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # 你的拾獲案件
    @action(detail=False, methods=['get', 'post'], name="user found item")
    def userFoundItem(self, request):
        if request.method == 'GET':
            userId = Utils.getUserId(request)
            userFoundItem = get_list_or_404(
                Item,
                accountId=userId,
                foundOrLoss="found"
            )
            filterItemSerializer = FilterItemSerializer(
                userFoundItem, many=True)
            if filterItemSerializer != None:
                return Response(filterItemSerializer.data, status=status.HTTP_201_CREATED)
            return Response(filterItemSerializer.errors, status=status.HTTP_400_BAD_REQUEST)

        elif request.method == 'POST':
            userId = Utils.getUserId(request)
            itemStatus = Utils.getItemStatus(request)
            itemPlace = Utils.getItemPlace(request)
            itemTypeList = Utils.getItemTypeList(request)
            lossDatetimeRange = Utils.getDatetimeRange(request)

            filteredFoundItem = get_list_or_404(
                Item,
                foundOrLoss="found",
                accountId=userId,
                status=itemStatus,
                itemPlace__icontains=itemPlace,
                itemType__in=itemTypeList,
                lossDatetime__range=lossDatetimeRange
            )

            filterItemSerializer = FilterItemSerializer(
                filteredFoundItem, many=True)
            if filterItemSerializer != None:
                return Response(filterItemSerializer.data, status=status.HTTP_201_CREATED)
            return Response(filterItemSerializer.errors, status=status.HTTP_400_BAD_REQUEST)
