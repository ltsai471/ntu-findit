from django.shortcuts import render,get_object_or_404,get_list_or_404
from django.views import View
from django.http import JsonResponse
from rest_framework import viewsets
from .serializers import OrderSerializer ,FilterItemSerializer
from .models import Order,Item,ItemTypeLevel2,ItemTypeLevel1
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

#之後主頁面的功能可以統一放這
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
        #取得request.Post 的 data

        itemPlace=request.POST.get("itemPlace")
        itemTypeLevel1=request.POST.get("itemTypeLevel1")
        itemTypeLevel2=request.POST.get("itemTypeLevel2")
        print(itemTypeLevel2)
        startDatetime=request.POST.get("startDatetime")
        endDatetime=request.POST.get("endDatetime")
        if itemPlace==None:
            itemPlace=""
        # 分類
        if itemTypeLevel1 not in ["",None]  and itemTypeLevel2 not in ["",None]:
            # print("大項細項都有")

            itemTypeLevel2_list=[itemTypeLevel2]
            print("細項:")
            print(itemTypeLevel2_list)

        if itemTypeLevel1!="" and itemTypeLevel2=="":
            print("只有大項")
            itemTypeLevel1_id=[]
            for itemtypelevel1 in ItemTypeLevel1.objects.filter(name=itemTypeLevel1):
                itemTypeLevel1_id.append(itemtypelevel1.level1Id)
            itemTypeLevel2_list=[]
            for itemTypeLevel2 in get_list_or_404(ItemTypeLevel2,level1Id__in=itemTypeLevel1_id):
                itemTypeLevel2_list.append(itemTypeLevel2.name)
            print("細項:")
            print(itemTypeLevel2_list)
        if itemTypeLevel1 in ["",None] and itemTypeLevel2 in ["",None]:
            print("大項細項都沒有")
            itemTypeLevel1_id=[]
            for itemtypelevel1 in ItemTypeLevel1.objects.all():
                itemTypeLevel1_id.append(itemtypelevel1.level1Id)
            itemTypeLevel2_list=[]
            for itemTypeLevel2 in get_list_or_404(ItemTypeLevel2,level1Id__in=itemTypeLevel1_id):
                itemTypeLevel2_list.append(itemTypeLevel2.name)
            print("細項:")
            print(itemTypeLevel2_list)
            # itemTypeLevel2=ItemTypeLevel2.objects.filter(level1Id__in=itemTypeLevel1_id).name
        #時間範圍搜尋
        if startDatetime in ["",None]  :
            startDatetime=datetime.datetime(2020,7,1,1,30)
        if endDatetime in ["",None] :
            endDatetime=datetime.datetime(2022,7,1,1,30)



        filtereditem = get_list_or_404(
        Item,
        itemPlace__icontains=itemPlace,itemType__in=itemTypeLevel2_list,
        lossDatetime__range=(startDatetime,endDatetime)
        )

        serializer = FilterItemSerializer(filtereditem, many=True)


        # return Response({'items':filtereditem}) #類似傳一個context到template.html
        return JsonResponse(serializer.data,safe=False)
        queryset=Item.objects.all()
        serializer = FilterItemSerializer(queryset, many=True)
        # json = JSONRenderer().render(serializer.data)

        return JsonResponse(serializer.data,safe=False)
    # @action(detail=True, methods=['get'],name='show')
    def show(self, request):
        queryset=Item.objects.all()
        serializer = FilterItemSerializer(queryset, many=True)

        # return Response({'items': queryset})
        return queryset
    # def list(self, request):
    #     queryset = Item.objects.all()
    #     serializer = FilterItemSerializer(queryset, many=True)
    #     return render(request,"test.html")



