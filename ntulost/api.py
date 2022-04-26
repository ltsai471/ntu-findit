from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import ItemSerializer, AccountSerializer, ItemPairSerializer
from .models import Item, Account


@api_view(['GET'])
def api_overview(request):
    api_urls = {
        'notice': '**This list is only for api preview, please check ntulost/urls.py to see the newest api urls.**',
        'Items List and Create': '/item',
        'Item Update and Delete': '/item/<int:id>',
    }
    return Response(api_urls)


@api_view(['GET', 'POST'])
def item_list(request):
    if request.method == 'GET':
        items = Item.objects.all()
        itemSerializer = ItemSerializer(items, many=True)
        return Response(itemSerializer.data)

    elif request.method == 'POST':
        itemSerializer = ItemSerializer(data=request.data)
        if itemSerializer.is_valid():
            itemSerializer.save()
            return Response(itemSerializer.data, status=status.HTTP_201_CREATED)
        return Response(itemSerializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def item_detail(request, pk):
    try:
        item = Item.objects.get(pk=pk)
    except Item.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        itemSerializer = ItemSerializer(item)
        return Response(itemSerializer.data)

    elif request.method == 'PUT':
        itemSerializer = ItemSerializer(item, data=request.data)
        if itemSerializer.is_valid():
            itemSerializer.save()
            return Response(itemSerializer.data)
        return Response(itemSerializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['POST'])
def login(request):
    if request.method == 'POST':
        mailId = request.data['mailId']
        pwd = request.data['pwd']
        try:
            account = Account.objects.get(mailId=mailId)
        except Account.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        return Response({'msg': pwd == account.pwd})


@api_view(['POST'])
def signup(request):
    if request.method == 'POST':
        mailId = request.data['mailId']
        name = request.data['name']
        pwd = request.data['pwd']
        accountSerializer = AccountSerializer(data=request.data)
        if accountSerializer.is_valid():
            accountSerializer.save()
        return Response(accountSerializer.data)


@api_view(['POST'])
def item_pair(request):
    if request.method == 'POST':
        itemPairSerializer = ItemPairSerializer(data=request.data)
        if itemPairSerializer.is_valid():
            itemPairSerializer.save()
            return Response(itemPairSerializer.data, status=status.HTTP_201_CREATED)
        return Response(itemPairSerializer.errors, status=status.HTTP_400_BAD_REQUEST)
