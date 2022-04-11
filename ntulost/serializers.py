# This code is used to covert data to JSON
from rest_framework import serializers
from .models import Order, OrderItem, Item


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
        fields = ("id", "foundOrLoss", "status", "accountId",
                  "lossDatetime", "itemPlace", "preservePlace", "itemType",
                  "itemDesc", "img", "closeDatetime", "itemOwnerId", "editDatetime")


class FilterItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ('id', "lossDatetime", "preservePlace",
                  'status', "itemPlace", "itemType", "img")
