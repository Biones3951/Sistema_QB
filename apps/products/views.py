from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from apps.products.models import Category, Product
from apps.products.serializers import CategorySerializer, ProductSerializer


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.filter(active=True)
    serializer_class = ProductSerializer

    def get_permissions(self):
        if self.request.method in ['GET']:
            return [AllowAny()]
        return [IsAuthenticated()]

    def get_queryset(self):
        queryset = super().get_queryset()
        category = self.request.query_params.get('category')
        if category:
            queryset = queryset.filter(category_id=category)
        return queryset

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.active = False
        instance.save()
        return Response(status=status.HTTP_204_NO_CONTENT)


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]

    def get_permissions(self):
        if self.request.method == 'GET':
            return [AllowAny()]
        return [IsAuthenticated()]