from django.shortcuts import get_list_or_404
from .models import ItemTypeLevel1, ItemTypeLevel2
import datetime

def getItemPlace(request):
    itemPlace = request.data.get("itemPlace")
    if itemPlace in ["", None]:
        itemPlace = ""
    return itemPlace

def getItemTypeList(request):
    itemTypeLevel1 = request.data.get("itemTypeLevel1")
    itemTypeLevel2 = request.data.get("itemTypeLevel2")
    if itemTypeLevel2 not in ["", None]:
        itemTypeLevel2List = [itemTypeLevel2]
    else:
        itemTypeLevel1IdList = []
        if itemTypeLevel1 not in ["", None]:
            for itemtypelevel1 in ItemTypeLevel1.objects.filter(name=itemTypeLevel1):
                itemTypeLevel1IdList.append(itemtypelevel1.level1Id)
        else:
            for itemtypelevel1 in ItemTypeLevel1.objects.all():
                itemTypeLevel1IdList.append(itemtypelevel1.level1Id)
        itemTypeLevel2List = []
        for itemTypeLevel2 in get_list_or_404(ItemTypeLevel2, level1Id__in=itemTypeLevel1IdList):
            itemTypeLevel2List.append(itemTypeLevel2.name)
    return itemTypeLevel2List

def getDatetimeRange(request):
    startDatetime = request.data.get("startDatetime")
    endDatetime = request.data.get("endDatetime")
    if startDatetime in ["", None]:
        startDatetime = datetime.datetime(2019, 7, 1, 1, 30)
    if endDatetime in ["", None]:
        endDatetime = datetime.datetime(2022, 7, 1, 1, 30)
    return (startDatetime, endDatetime)

def getItemStatus(request):
    itemStatus = request.data.get("status")
    if itemStatus in ["", None]:
        itemStatus = "contact"
    return itemStatus

def getUserId(request):
    return "1"#jwt("mailId")