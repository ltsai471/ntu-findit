from django.urls import path
from . import views, api


urlpatterns = [
    path("", views.api_overview, name="api_overview"),
    path('login/', api.login),
    path('signup/',api.signup),
    path('item/', api.item_list),
    path('item/<int:pk>', api.item_detail),
    path('itempair/', api.item_pair),
]
