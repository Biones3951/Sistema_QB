from django.urls import include, path
from rest_framework.routers import DefaultRouter
from apps.products.views import CategoryViewSet, OfferListAPIView, ProductViewSet

router = DefaultRouter()
router.register(r'products', ProductViewSet, basename='products')
router.register(r'categories', CategoryViewSet, basename='categories')

urlpatterns = [
    path('offers/', OfferListAPIView.as_view(), name='offers'),
    path('', include(router.urls)),
]
