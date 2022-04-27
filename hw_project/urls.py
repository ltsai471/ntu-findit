from django.conf.urls.static import static
from django.conf import settings
from django.contrib import admin
from django.urls import path
from django.conf.urls import include
from django.views.generic import RedirectView
from rest_framework import routers
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token, verify_jwt_token
from ntulost import views

# 跟Item有關的url
itemRouter = routers.DefaultRouter()
itemRouter.register(r'item', views.ItemViewSet, 'item')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(itemRouter.urls)),
    path('api/test/', views.TestView.as_view(), name='test'),
    path('ntulost/', include('ntulost.urls')),
    path('', RedirectView.as_view(url='/ntulost/')),
    # path('api-token-auth/', obtain_jwt_token),
    # path('api-token-verify/', verify_jwt_token),
    # path('api-token-refresh/', refresh_jwt_token),
]


urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
