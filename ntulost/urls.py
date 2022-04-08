from django.urls import path
from . import views


urlpatterns = [
    path("", views.api_overview, name="api_overview"),
    path('item/', views.item_list),
    path('item/<int:pk>', views.item_detail),
    # path('', views.index, name='index'),
    # path('order/', views.OrderListView.as_view(), name='books'),
    # path('order/<int:pk>', views.OrderDetailView.as_view(), name='order-detail'),
]
