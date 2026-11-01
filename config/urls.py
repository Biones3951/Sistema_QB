from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('panel/', include('apps.admin_panel.urls')),
    path('api/', include('apps.products.urls')),
]
