# This code is used to covert data to JSON
from rest_framework import serializers
from .models import Item, Account, ItemPair


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item

        fields = ('id', 'foundOrLoss', 'status', 'accountId',
                  'lossDatetime', 'itemPlace', 'preservePlace', 'itemType',
                  'itemDesc', 'img', 'closeDatetime', 'itemOwnerId', 'editDatetime')


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ('mailId', 'pwd', 'name')

        fields = ("id", "foundOrLoss", "status", "accountId",
                  "lossDatetime", "itemPlace", "preservePlace", "itemType",
                  "itemDesc", "img", "closeDatetime", "itemOwnerId", "editDatetime")


class FilterItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ("id", "status", "lossDatetime", "itemPlace", "preservePlace",
                  "itemType", 'itemDesc', "img", "closeDatetime")


class ItemPairSerializer(serializers.ModelSerializer):
    class Meta:
        model = ItemPair
        fields = ("foundItemId", "lossItemId")
