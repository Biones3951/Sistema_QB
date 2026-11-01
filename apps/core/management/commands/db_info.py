"""Mostra em qual banco o projeto esta falando e se a conexao funciona.

Util ao apontar o backend para o Supabase:

    python manage.py db_info
"""

from django.conf import settings
from django.core.management.base import BaseCommand
from django.db import connection


class Command(BaseCommand):
    help = 'Mostra a configuracao do banco em uso e testa a conexao.'

    def handle(self, *args, **options):
        config = settings.DATABASES['default']
        engine = config['ENGINE'].rsplit('.', 1)[-1]
        host = config.get('HOST') or '(local)'

        self.stdout.write(self.style.MIGRATE_HEADING('Banco configurado'))
        self.stdout.write(f'  engine .... {engine}')
        self.stdout.write(f'  host ...... {host}')
        self.stdout.write(f'  porta ..... {config.get("PORT") or "-"}')
        self.stdout.write(f'  database .. {config.get("NAME")}')
        self.stdout.write(f'  usuario ... {config.get("USER") or "-"}')
        self.stdout.write(f'  ssl ....... {config.get("OPTIONS", {}).get("sslmode", "-")}')

        if 'supabase' in str(host):
            porta = str(config.get('PORT'))
            modo = 'transaction pooler' if porta == '6543' else 'session pooler / direto'
            self.stdout.write(f'  supabase .. {modo}')
            if porta == '6543' and not settings.DISABLE_SERVER_SIDE_CURSORS:
                self.stdout.write(self.style.WARNING(
                    '  atencao ... porta 6543 pede DISABLE_SERVER_SIDE_CURSORS=True'
                ))

        self.stdout.write('')
        try:
            with connection.cursor() as cursor:
                cursor.execute('SELECT 1')
                cursor.fetchone()
        except Exception as exc:
            raise SystemExit(self.style.ERROR(f'Conexao falhou: {exc}'))

        self.stdout.write(self.style.SUCCESS('Conexao OK'))

        from apps.products.models import Category, Product

        self.stdout.write(
            f'  {Product.objects.count()} produto(s), '
            f'{Category.objects.count()} categoria(s)'
        )
