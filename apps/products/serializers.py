from rest_framework import serializers
from apps.products.models import Category, Product


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']


class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(),
        source='category',
        write_only=True,
        required=False,
        allow_null=True
    )

    class Meta:
        model = Product
        fields = [
            'id', 'name', 'description', 'price', 'stock',
            'category', 'category_id', 'image_url',
            'active', 'created_at', 'updated_at'
        ]
        read_only_fields = ['created_at', 'updated_at']