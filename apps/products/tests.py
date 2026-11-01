from django.contrib.auth.models import User
from django.test import TestCase
from django.urls import reverse

from apps.products.models import Category, Product


class ProductAPITests(TestCase):
    """Contrato que o frontend consome em /api/."""

    @classmethod
    def setUpTestData(cls):
        cls.limpeza = Category.objects.create(name='Limpeza')
        cls.cozinha = Category.objects.create(name='Cozinha')

        cls.destaque = Product.objects.create(
            name='Rodo Flex', price='10.97', stock=10,
            category=cls.limpeza, is_featured=True,
        )
        cls.oferta = Product.objects.create(
            name='Amaciante', price='9.99', original_price='12.50', stock=5,
            category=cls.limpeza, is_offer=True,
        )
        cls.inativo = Product.objects.create(
            name='Produto fora do ar', price='1.00', stock=0, active=False,
        )

    def test_lista_so_produtos_ativos(self):
        response = self.client.get('/api/products/')
        self.assertEqual(response.status_code, 200)
        nomes = [p['name'] for p in response.json()]
        self.assertIn('Rodo Flex', nomes)
        self.assertNotIn('Produto fora do ar', nomes)

    def test_filtro_por_categoria(self):
        response = self.client.get('/api/products/', {'category': self.cozinha.id})
        self.assertEqual(response.json(), [])

    def test_filtro_de_destaques(self):
        response = self.client.get('/api/products/', {'is_featured': 1})
        self.assertEqual([p['name'] for p in response.json()], ['Rodo Flex'])

    def test_endpoint_de_ofertas(self):
        response = self.client.get('/api/offers/')
        self.assertEqual(response.status_code, 200)
        dados = response.json()
        self.assertEqual([p['name'] for p in dados], ['Amaciante'])
        self.assertEqual(dados[0]['original_price'], '12.50')

    def test_categoria_serializada_dentro_do_produto(self):
        response = self.client.get(f'/api/products/{self.destaque.id}/')
        self.assertEqual(response.json()['category']['name'], 'Limpeza')

    def test_escrita_exige_autenticacao(self):
        response = self.client.post('/api/products/', {'name': 'X', 'price': '1.00'})
        self.assertIn(response.status_code, (401, 403))

    def test_delete_apenas_desativa(self):
        self.client.force_login(
            User.objects.create_user('staff', password='x', is_staff=True)
        )
        response = self.client.delete(f'/api/products/{self.destaque.id}/')
        self.assertEqual(response.status_code, 204)
        self.destaque.refresh_from_db()
        self.assertFalse(self.destaque.active)
        self.assertTrue(Product.objects.filter(id=self.destaque.id).exists())


class CategoryModelTests(TestCase):
    def test_nome_sem_espacos_sobrando(self):
        categoria = Category.objects.create(name='  Cozinha  ')
        self.assertEqual(categoria.name, 'Cozinha')


class AdminPanelTests(TestCase):
    """O painel em /panel/ precisa abrir e salvar os campos de destaque."""

    def setUp(self):
        self.staff = User.objects.create_user('dono', password='senha-de-teste', is_staff=True)
        self.client.force_login(self.staff)
        self.categoria = Category.objects.create(name='Limpeza')
        self.produto = Product.objects.create(
            name='Vassoura', price='9.79', stock=100, category=self.categoria,
        )

    def test_paginas_abrem(self):
        for nome in ['admin_dashboard', 'admin_products', 'admin_categories', 'admin_product_create']:
            self.assertEqual(self.client.get(reverse(nome)).status_code, 200, nome)

    def test_formulario_salva_oferta_e_preco_original(self):
        url = reverse('admin_product_edit', args=[self.produto.id])
        response = self.client.post(url, {
            'name': 'Vassoura', 'description': '', 'price': '9.79',
            'original_price': '12.00', 'stock': '100',
            'category': self.categoria.id, 'image_url': '',
            'active': 'on', 'is_offer': 'on',
        })
        self.assertEqual(response.status_code, 302)
        self.produto.refresh_from_db()
        self.assertTrue(self.produto.is_offer)
        self.assertEqual(str(self.produto.original_price), '12.00')

    def test_desmarcar_ativo_desativa_o_produto(self):
        url = reverse('admin_product_edit', args=[self.produto.id])
        self.client.post(url, {
            'name': 'Vassoura', 'description': '', 'price': '9.79',
            'stock': '100', 'category': self.categoria.id, 'image_url': '',
        })
        self.produto.refresh_from_db()
        self.assertFalse(self.produto.active)

    def test_admin_do_django_abre_formulario_de_produto(self):
        self.staff.is_superuser = True
        self.staff.save()
        response = self.client.get(f'/admin/products/product/{self.produto.id}/change/')
        self.assertEqual(response.status_code, 200)
