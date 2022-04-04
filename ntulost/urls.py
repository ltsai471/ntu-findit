from django.urls import path
from . import views
from ntulost.views import MainViewset
from rest_framework import routers
from ntulost import views
mainrouter=routers.DefaultRouter()
mainrouter.register(r'main', MainViewset, basename='main')
mainlist=MainViewset.as_view({
    "post": 'filter',
    "get": 'show'

    })

urlpatterns = [
    # path('', views.index, name='index'),
    # path('order/', views.OrderListView.as_view(), name='books'),
    # path('order/<int:pk>', views.OrderDetailView.as_view(), name='order-detail'),
    path('main/', mainlist, name='main'),
]

# urlpatterns = mainrouter.urls
