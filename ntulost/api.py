from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import OrderSerializer, ItemSerializer, AccountSerializer
from .models import Order, Item, Account


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


@api_view(['GET', 'POST'])
def item_list(request):
    if request.method == 'GET':
        items = Item.objects.all()
        serializer = ItemSerializer(items, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = ItemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def item_detail(request, pk):
    try:
        item = Item.objects.get(pk=pk)
    except Item.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ItemSerializer(item)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = ItemSerializer(item, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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

        return Response({'msg':pwd == account.pwd})


@api_view(['POST'])
def signup(request):
    if request.method == 'POST':
        mailId = request.data['mailId']
        name = request.data['name']
        pwd = request.data['pwd']
        accountSerializer = AccountSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)
