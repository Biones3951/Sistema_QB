from django.urls import path, include
from rest_framework.routers import DefaultRouter
from apps.products.views import ProductViewSet, CategoryViewSet, OffersAPIView

router = DefaultRouter()
router.register(r'products', ProductViewSet, basename='products')
router.register(r'categories', CategoryViewSet, basename='categories')
router.register(r'offers', OffersAPIView, basename='offers')

urlpatterns = [
    path('', include(router.urls)),
]