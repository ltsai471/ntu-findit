from django.contrib import admin
from .models import *

class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'customer')


admin.site.register(Order, OrderAdmin)
admin.site.register(Item)
admin.site.register(ItemTypeLevel1)
admin.site.register(ItemTypeLevel2)
admin.site.register(Account)