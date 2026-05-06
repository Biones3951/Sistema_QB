from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.views import View
import json
from apps.products.models import Product, Category


def admin_login(request):
    if request.user.is_authenticated:
        return redirect('admin_dashboard')
    
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None and user.is_staff:
            login(request, user)
            return redirect('admin_dashboard')
        else:
            messages.error(request, 'Credenciais inválidas ou acesso negado.')
    
    return render(request, 'admin_panel/login.html')


@login_required(login_url='admin_login')
def admin_logout(request):
    logout(request)
    return redirect('admin_login')


@login_required(login_url='admin_login')
def admin_dashboard(request):
    total_products = Product.objects.count()
    active_products = Product.objects.filter(active=True).count()
    inactive_products = Product.objects.filter(active=False).count()
    out_of_stock = Product.objects.filter(stock=0).count()
    categories = Category.objects.count()
    
    context = {
        'total_products': total_products,
        'active_products': active_products,
        'inactive_products': inactive_products,
        'out_of_stock': out_of_stock,
        'categories': categories,
    }
    return render(request, 'admin_panel/dashboard.html', context)


@login_required(login_url='admin_login')
def admin_products(request):
    products = Product.objects.select_related('category').order_by('-created_at')
    categories = Category.objects.all()
    
    context = {
        'products': products,
        'categories': categories,
    }
    return render(request, 'admin_panel/products.html', context)


@login_required(login_url='admin_login')
def admin_product_create(request):
    categories = Category.objects.all()
    
    if request.method == 'POST':
        name = request.POST.get('name')
        description = request.POST.get('description')
        price = request.POST.get('price')
        stock = request.POST.get('stock')
        category_id = request.POST.get('category')
        image_url = request.POST.get('image_url')
        active = request.POST.get('active') == 'on'
        featured = request.POST.get('featured') == 'on'
        
        product = Product.objects.create(
            name=name,
            description=description,
            price=price,
            stock=stock,
            category_id=category_id if category_id else None,
            image_url=image_url,
            active=active,
            is_featured=featured
        )
        messages.success(request, f'Produto "{product.name}" criado com sucesso!')
        return redirect('admin_products')
    
    return render(request, 'admin_panel/product_form.html', {'categories': categories, 'product': None})


@login_required(login_url='admin_login')
def admin_product_edit(request, product_id):
    product = Product.objects.get(id=product_id)
    categories = Category.objects.all()
    
    if request.method == 'POST':
        product.name = request.POST.get('name')
        product.description = request.POST.get('description')
        product.price = request.POST.get('price')
        product.stock = request.POST.get('stock')
        product.category_id = request.POST.get('category') or None
        product.image_url = request.POST.get('image_url')
        product.active = request.POST.get('active') == 'on'
        product.is_featured = request.POST.get('featured') == 'on'
        product.save()
        messages.success(request, f'Produto "{product.name}" atualizado!')
        return redirect('admin_products')
    
    return render(request, 'admin_panel/product_form.html', {
        'categories': categories, 
        'product': product
    })


@login_required(login_url='admin_login')
def admin_product_delete(request, product_id):
    product = Product.objects.get(id=product_id)
    product.delete()
    messages.success(request, 'Produto removido!')
    return redirect('admin_products')


@login_required(login_url='admin_login')
def admin_categories(request):
    categories = Category.objects.all()
    
    if request.method == 'POST':
        name = request.POST.get('name')
        Category.objects.create(name=name)
        messages.success(request, 'Categoria criada!')
        return redirect('admin_categories')
    
    return render(request, 'admin_panel/categories.html', {'categories': categories})


@login_required(login_url='admin_login')
def admin_category_delete(request, category_id):
    category = Category.objects.get(id=category_id)
    category.delete()
    messages.success(request, 'Categoria removida!')
    return redirect('admin_categories')


@login_required(login_url='admin_login')
def admin_api_products(request):
    products = Product.objects.select_related('category').order_by('-created_at')
    data = []
    for p in products:
        data.append({
            'id': p.id,
            'name': p.name,
            'description': p.description,
            'price': str(p.price),
            'stock': p.stock,
            'category': p.category.name if p.category else None,
            'image_url': p.image_url,
            'active': p.active,
            'is_featured': p.is_featured,
            'created_at': p.created_at.isoformat(),
        })
    return JsonResponse(data, safe=False)


@login_required(login_url='admin_login')
def admin_api_stats(request):
    return JsonResponse({
        'total_products': Product.objects.count(),
        'active_products': Product.objects.filter(active=True).count(),
        'out_of_stock': Product.objects.filter(stock=0).count(),
        'categories': Category.objects.count(),
    })