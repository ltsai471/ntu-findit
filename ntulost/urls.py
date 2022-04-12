from django.urls import path
from . import views, api


urlpatterns = [
    path("", views.api_overview, name="api_overview"),
<<<<<<< HEAD
    # path('item/', views.item_list),
    # path('item/<int:pk>', views.item_detail),
    path('login/', api.login),
    path('signup/',api.signup),
=======
>>>>>>> master
    path('item/', api.item_list),
    path('item/<int:pk>', api.item_detail),
]
