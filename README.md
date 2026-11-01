# Sistema QB — QB Home

Catálogo online de produtos de limpeza e utilidades domésticas. O cliente navega pelo
catálogo, monta o carrinho e finaliza o pedido pelo **WhatsApp** (não há checkout/pagamento
no site).

- **Backend:** Django 6 + Django REST Framework (API + painel administrativo próprio)
- **Frontend:** React 19 + Vite (SPA)
- **Banco:** PostgreSQL no Supabase (SQLite no desenvolvimento local)

---

## Estrutura

```
Sistema_QB/
├── apps/
│   ├── products/        # models Product e Category, API REST, testes
│   ├── admin_panel/     # painel próprio em /panel/ (login, CRUD, dashboard)
│   └── core/            # comandos de manutenção (manage.py db_info)
├── config/              # settings, urls, wsgi
├── frontend/
│   └── src/
│       ├── components/
│       │   ├── layout/  # Header, Footer, Hero, Categories, Benefits
│       │   └── product/ # cards, listas, detalhe, carrinho
│       ├── pages/       # Home, SobreNos
│       ├── context/     # CartContext + CartProvider
│       ├── hooks/       # useCart, useAsyncData, useIsMobile
│       ├── services/    # chamadas à API
│       ├── utils/       # formatação, mensagem do WhatsApp
│       ├── config.js    # número do WhatsApp e URL da API
│       └── index.css    # variáveis de cor, animações, reset
├── fixtures/            # dados iniciais para carregar no Supabase
├── docs/MELHORIAS.md    # o que ainda falta, por prioridade
├── build.sh             # build do backend na plataforma de deploy
├── Procfile             # comando de start (gunicorn)
├── render.yaml          # configuração do Render
└── requirements.txt
```

O frontend usa estilos inline por componente (`const styles = {}`), com as cores,
animações e o reset no `index.css`. Componentes não injetam `<style>` em runtime:
toda animação nova entra no `index.css`.

## API

| Método | Rota | Descrição |
|---|---|---|
| GET | `/api/products/` | Lista produtos ativos. Filtros: `?category=`, `?is_featured=1`, `?is_offer=1` |
| GET | `/api/products/<id>/` | Detalhe do produto |
| GET | `/api/categories/` | Lista categorias |
| GET | `/api/offers/` | Produtos em oferta |
| — | `/panel/` | Painel administrativo (login de staff) |
| — | `/admin/` | Django admin |

Escrita (POST/PUT/DELETE) exige usuário autenticado. `DELETE` faz desativação (soft delete).

---

## Rodando localmente

### Backend

```bash
python -m venv venv
venv\Scripts\activate          # Windows  (Linux/Mac: source venv/bin/activate)
pip install -r requirements.txt
copy .env.example .env         # e preencha SECRET_KEY
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

Backend em http://localhost:8000 · painel em http://localhost:8000/panel/

### Frontend

```bash
cd frontend
npm install
copy .env.example .env
npm run dev
```

Site em http://localhost:5173

### Comandos úteis

```bash
python manage.py db_info     # mostra em qual banco está falando e testa a conexão
python manage.py test        # roda a suíte de testes (API + painel)
cd frontend && npm run lint  # checa o código do frontend
```

---

## Deploy

São **três serviços**, cada um com um papel:

| Serviço | O que hospeda | Custo |
|---|---|---|
| **Supabase** | o banco de dados PostgreSQL | gratuito |
| **Render** (ou Railway) | o backend Django (API + painel) | gratuito com limitações |
| **Vercel** | o site React | gratuito |

> O Supabase hospeda **o banco**, não o Django. O backend precisa de um servidor próprio —
> por isso o Render entra na jogada.

### 1. Banco no Supabase

1. No painel do Supabase, **New project** — região **South America (São Paulo)**, para
   reduzir a latência. Guarde a senha do banco que você definir.
2. Em **Connect** (topo do projeto) → aba **ORMs / URI**, copie a connection string do
   **Session pooler** (porta `5432`). Ela se parece com:
   `postgresql://postgres.abcdefgh:SENHA@aws-0-sa-east-1.pooler.supabase.com:5432/postgres`
3. Troque `[YOUR-PASSWORD]` pela senha real. Essa string é o `DATABASE_URL`.

> Se usar o **Transaction pooler** (porta `6543`), defina também
> `DISABLE_SERVER_SIDE_CURSORS=True`.

Para popular o banco pela primeira vez, com o `DATABASE_URL` no `.env` local:

```bash
python manage.py migrate
python manage.py createsuperuser
python manage.py loaddata fixtures/dados_iniciais.json
```

### 2. Backend no Render

1. **New → Web Service** e conecte o repositório `Biones3951/Sistema_QB`.
2. Runtime **Python**, Build Command `./build.sh`, Start Command
   `gunicorn config.wsgi:application`. (O `render.yaml` já traz tudo isso pronto.)
3. Variáveis de ambiente:

| Variável | Valor |
|---|---|
| `DEBUG` | `False` |
| `SECRET_KEY` | chave longa e aleatória |
| `USE_SQLITE` | `False` |
| `DATABASE_URL` | a string do Supabase |
| `ALLOWED_HOSTS` | `sistema-qb-api.onrender.com` |
| `CORS_ALLOWED_ORIGINS` | `https://seu-site.vercel.app` |
| `CSRF_TRUSTED_ORIGINS` | `https://seu-site.vercel.app,https://sistema-qb-api.onrender.com` |

O `build.sh` roda `collectstatic` e `migrate` a cada deploy.

> **Atenção ao plano gratuito do Render:** o serviço hiberna após ~15 minutos sem acesso e
> a primeira visita depois disso leva de 30 a 60 segundos para responder. Para um link no
> Instagram, isso significa cliente vendo tela de carregamento. As saídas são o plano pago
> (US$ 7/mês), o Railway, ou ler os produtos direto do Supabase pelo frontend
> (veja "Alternativa sem servidor" abaixo).

### 3. Frontend na Vercel

No projeto da Vercel, em **Settings → Environment Variables**:

| Variável | Valor |
|---|---|
| `VITE_API_URL` | `https://sistema-qb-api.onrender.com` |
| `VITE_WHATSAPP_NUMBER` | `55` + DDD + número, só dígitos |

Redeploy depois de salvar — o Vite congela essas variáveis no momento do build.

### Alternativa sem servidor

Como o site só **lê** produtos, dá para o React consultar o Supabase diretamente
(`@supabase/supabase-js` + RLS liberando `SELECT` público) e dispensar o Render por
completo: sem hibernação, sem custo e uma peça a menos para manter. O Django continuaria
rodando só na sua máquina, para administrar o catálogo. Vale considerar se o tempo de
resposta no Instagram incomodar.

---

## Administração do catálogo

Pelo painel em `/panel/` (ou pelo `/admin/` do Django):

- **⭐ Mais Vendido** (`is_featured`) → seção "Mais Vendidos" da home
- **🔥 Oferta da Semana** (`is_offer`) → seção "Ofertas da Semana" (só aparece se houver
  pelo menos um produto marcado)
- **Preço original "de"** (`original_price`) → mostra o preço riscado no card
- **Produto ativo** → desmarcado, some do site sem ser apagado

## Variáveis de ambiente

Backend: veja [`.env.example`](.env.example) · Frontend: veja [`frontend/.env.example`](frontend/.env.example)

## O que ainda falta

A lista de pendências e melhorias, por prioridade, está em
[`docs/MELHORIAS.md`](docs/MELHORIAS.md).
