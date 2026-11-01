from rest_framework import generics, status, viewsets
from rest_framework.permissions import AllowAny, IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from apps.products.models import Category, Product
from apps.products.serializers import CategorySerializer, ProductSerializer


class ProductViewSet(viewsets.ModelViewSet):
    """Catalogo de produtos: leitura publica, escrita apenas autenticada."""

    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        queryset = Product.objects.filter(active=True).select_related('category')
        params = self.request.query_params

        category = params.get('category')
        if category:
            queryset = queryset.filter(category_id=category)
        if params.get('is_featured'):
            queryset = queryset.filter(is_featured=True)
        if params.get('is_offer'):
            queryset = queryset.filter(is_offer=True)

        return queryset

    def destroy(self, request, *args, **kwargs):
        """Produto nao e apagado: so sai do site."""
        product = self.get_object()
        product.active = False
        product.save(update_fields=['active', 'updated_at'])
        return Response(status=status.HTTP_204_NO_CONTENT)


class OfferListAPIView(generics.ListAPIView):
    """Produtos marcados como oferta, para a secao "Ofertas da Semana"."""

    serializer_class = ProductSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return Product.objects.filter(active=True, is_offer=True).select_related('category')


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
