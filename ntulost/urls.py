from django.urls import path
from . import views, api


urlpatterns = [
    path("", views.api_overview, name="api_overview"),
    path('item/', api.item_list),
    path('item/<int:pk>', api.item_detail),
]
