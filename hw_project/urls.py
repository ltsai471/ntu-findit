"""hw_project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.conf.urls import include
from django.views.generic import RedirectView
from rest_framework import routers
from ntulost import views

router = routers.DefaultRouter()
router.register(r'orders', views.OrderView, 'order')

# mainRouter=routers.DefaultRouter()
mainList=views.MainViewset.as_view({
    "post": 'filter', #post
    "get": 'show'
    })
# mainRouter.register(r'item', views.MainViewset, 'item')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/main/', mainList, name='main'),
    # path('item', include(mainrouter.urls)),
    path('api/test/', views.TestView.as_view(), name='test'),
    path('ntulost/', include('ntulost.urls')),
    path('', RedirectView.as_view(url='/api/main/')),

]


from django.conf import settings
from django.conf.urls.static import static

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)