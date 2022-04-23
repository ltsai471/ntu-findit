# This code is used to covert data to JSON
from rest_framework import serializers
from .models import Order, OrderItem, Item, Account



class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ('id', 'item_name')


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)

    class Meta:
        model = Order
        fields = ('id', 'customer', 'items')


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item

        fields = ('id', 'foundOrLoss', 'status', 'accountId',
         'lossDatetime', 'itemPlace', 'preservePlace', 'itemType',
         'itemDesc', 'img', 'closeDatetime', 'itemOwnerId', 'editDatetime')


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ('mailId','pwd','name')

        fields = ("id", "foundOrLoss", "status", "accountId",
                  "lossDatetime", "itemPlace", "preservePlace", "itemType",
                  "itemDesc", "img", "closeDatetime", "itemOwnerId", "editDatetime")


class FilterItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ("id", "status", "lossDatetime", "itemPlace", 
                  "preservePlace", "itemType", 'itemDesc', "img")

