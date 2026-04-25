from django.urls import path
from apps.admin_panel import views

urlpatterns = [
    path('login/', views.admin_login, name='admin_login'),
    path('logout/', views.admin_logout, name='admin_logout'),
    path('dashboard/', views.admin_dashboard, name='admin_dashboard'),
    path('products/', views.admin_products, name='admin_products'),
    path('products/new/', views.admin_product_create, name='admin_product_create'),
    path('products/<int:product_id>/edit/', views.admin_product_edit, name='admin_product_edit'),
    path('products/<int:product_id>/delete/', views.admin_product_delete, name='admin_product_delete'),
    path('categories/', views.admin_categories, name='admin_categories'),
    path('categories/<int:category_id>/delete/', views.admin_category_delete, name='admin_category_delete'),
    path('api/products/', views.admin_api_products, name='admin_api_products'),
    path('api/stats/', views.admin_api_stats, name='admin_api_stats'),
]