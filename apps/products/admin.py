from django.contrib import admin
from django.utils.html import format_html
from apps.products.models import Category, Product


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'product_count']
    search_fields = ['name']

    @admin.display(description='Produtos')
    def product_count(self, obj):
        count = obj.products.count()
        return format_html('<strong>{}</strong>', count)


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'price_formatted', 'stock', 'is_featured', 'is_offer', 'active', 'created_at']
    list_display_links = ['name']
    list_filter = ['active', 'is_offer', 'is_featured', 'category', 'created_at']
    list_editable = ['is_offer']
    search_fields = ['name', 'description']
    list_per_page = 25
    date_hierarchy = 'created_at'

    fieldsets = [
        ('Informações principais', {
            'fields': ('name', 'description', 'category')
        }),
        ('Preço e Estoque', {
            'fields': ('price', 'stock')
        }),
        ('Destaque', {
            'fields': ('is_active', 'is_offer', 'original_price')
        }),
        ('Imagem', {
            'fields': ('image_url',),
            'classes': ('collapse',)
        }),
    ]

    @admin.display(description='Preço', ordering='price')
    def price_formatted(self, obj):
        return format_html('<strong>R$ {}</strong>', obj.price)

    @admin.display(boolean=True, description='Ativo')
    def active(self, obj):
        return obj.active