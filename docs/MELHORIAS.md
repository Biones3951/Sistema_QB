# O que ainda falta — QB Home

Atualizado em 01/11/2026. A ordem é por impacto no objetivo de **colocar o link do
catálogo no Instagram**, não por dificuldade.

---

## Bloqueado em decisão sua

Nada disso dá para resolver no código sozinho:

| O que | Por que travou |
|---|---|
| **Número do WhatsApp** | o site usa o placeholder `5511999999999`. Já está centralizado: é só definir `VITE_WHATSAPP_NUMBER` na Vercel |
| **Projeto no Supabase** | precisa ser criado na sua conta; o backend já lê `DATABASE_URL` |
| **Onde hospedar o backend** | Render grátis hiberna (ver abaixo); as opções estão no README |
| **Domínio próprio** | `qbhome.com.br` deixa o link do Instagram com cara de loja; sem ele fica `*.vercel.app` |

---

## Prioridade 1 — antes de divulgar no Instagram

### 1. Link que abre direto no produto
Hoje a navegação é por estado em memória (`currentPage`, `selectedProduct`), sem URL.
Na prática: **não existe link de produto para mandar para o cliente**. Quem abre o site
sempre cai na home, e o botão "voltar" do celular sai do site em vez de voltar para a
lista. O `react-router-dom` já está instalado e não é usado. Isso é o que mais dói num
catálogo divulgado por rede social.

### 2. Foto do produto pelo painel
O produto só aceita `image_url` — um link de fora. Se o link quebrar, o produto fica sem
foto, e cadastrar exige hospedar a imagem em outro lugar antes. O Supabase Storage
resolve: upload no painel, URL salva automaticamente.

### 3. Prévia do link (Open Graph)
As tags já estão no `index.html`, mas `og:image` e `og:url` precisam da URL absoluta do
domínio final para o WhatsApp e o Instagram montarem o card com imagem.

### 4. Hibernação do backend
No plano grátis do Render, o primeiro cliente depois de 15 min de inatividade espera de
30 a 60 segundos. Para tráfego de Instagram, que vem em picos, isso derruba a visita.
Saídas: plano pago (~US$ 7/mês), Railway, ou ler os produtos direto do Supabase pelo
frontend e aposentar o servidor Django do ar.

### 5. Busca de produtos
Com o catálogo crescendo, filtro por categoria não basta. Falta um campo de busca por
nome (`?search=` na API + input no header).

---

## Prioridade 2 — operação do dia a dia

### 6. O pedido não fica registrado
O carrinho vira mensagem de WhatsApp e desaparece. Não existe histórico: nada de "quanto
vendi essa semana", "qual produto sai mais", nem recuperação de um pedido perdido na
conversa. Um model `Order` + `OrderItem` salvando no momento do clique resolveria, sem
mudar a experiência do cliente.

### 7. Estoque não baixa
O campo `stock` existe e é exibido, mas nada o decrementa — o número envelhece sozinho e
pode vender o que não tem.

### 8. Dashboard com informação de venda
Hoje mostra contagem de produtos. Com os pedidos salvos (item 6), passa a mostrar
faturamento, mais vendidos e pedidos do dia.

### 9. Paginação na API
`/api/products/` devolve o catálogo inteiro de uma vez. Passando de ~100 produtos, a
home fica pesada no celular.

---

## Prioridade 3 — técnico

### 10. Estilos inline
Cada componente carrega um objeto `styles` de 100 a 300 linhas, com os breakpoints
resolvidos em JavaScript (`useIsMobile`). Funciona, mas torna qualquer ajuste visual
lento e impede media queries de verdade. CSS Modules ou Tailwind seriam o caminho.

### 11. CI no GitHub Actions
Os 12 testes só rodam se alguém lembrar. Um workflow rodando `manage.py test` e
`npm run lint` a cada push pegaria regressões antes do deploy.

### 12. Imagem do hero
`Logo_Produtos.png` tem 215 KB para um PNG — convertido para WebP cai para algo em torno
de 30 KB, o que no 4G do cliente é a diferença mais sentida.

### 13. Cobertura de testes do frontend
O backend tem testes; o frontend não tem nenhum. Vitest + Testing Library no carrinho e
na montagem da mensagem do WhatsApp cobririam o que mais importa.

### 14. Esqueleto de carregamento
Spinner no meio da tela em vez de um esqueleto dos cards: a página "pisca" ao carregar.

---

## Já resolvido

- Django admin voltou a abrir o formulário de produto (campo `is_active` inexistente)
- Painel `/panel/` ganhou "oferta" e "preço original"; o checkbox "ativo" não reativa
  mais produto desativado sozinho
- Número do WhatsApp e URL da API centralizados em `src/config.js`
- Favicon apontava para `/src/assets/...` e não existia no site publicado
- Keyframes CSS duplicados e injetados em runtime consolidados no `index.css`
- `apps/__init__.py` faltando: nenhum teste era descoberto pelo Django
- Estrutura do frontend com `pages/`, `hooks/` e contexto separados
- `requirements.txt`, `Procfile`, `build.sh`, `render.yaml` e `.env.example` para deploy
- 12 testes cobrindo a API e o painel
