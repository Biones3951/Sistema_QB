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
    list_display = ['name', 'category', 'price_formatted', 'stock', 'active', 'created_at']
    list_display_links = ['name']
    list_filter = ['active', 'category', 'created_at']
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
        ('Imagem', {
            'fields': ('image_url',),
            'classes': ('collapse',)
        }),
        ('Status', {
            'fields': ('active',)
        }),
    ]

    @admin.display(description='Preço', ordering='price')
    def price_formatted(self, obj):
        return format_html('<strong>R$ {}</strong>', obj.price)

    @admin.display(boolean=True)
    def active(self, obj):
        return obj.active