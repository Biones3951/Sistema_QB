import { useState, useEffect } from 'react'
import { useIsMobile } from '../../hooks/useIsMobile'

const WHATSAPP_NUMBER = '5511999999999'

function ProductDetail({ product, onBack, onAddToCart }) {
  const isMobile = useIsMobile()
  const [qty, setQty] = useState(1)
  const [imageError, setImageError] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const [hoverCart, setHoverCart] = useState(false)
  const [hoverWpp, setHoverWpp] = useState(false)

  if (!product) return null

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    const style = document.createElement('style')
    style.textContent = `
      @keyframes pulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.5; transform: scale(1.5); }
      }
    `
    document.head.appendChild(style)
    return () => { document.head.removeChild(style) }
  }, [])

  const placeholderImg = 'data:image/svg+xml,' + encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
      <rect fill="#F8FAFC" width="600" height="600"/>
      <rect x="200" y="180" width="200" height="160" rx="16" fill="#E2E8F0"/>
      <path d="M250 300 L300 240 L350 300" stroke="#94A3B8" stroke-width="3" fill="none" stroke-linecap="round"/>
      <circle cx="300" cy="300" r="8" fill="#CBD5E1"/>
      <text x="300" y="400" text-anchor="middle" fill="#94A3B8" font-size="18" font-family="sans-serif">Imagem em breve</text>
    </svg>
  `)

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  const originalPrice = product.price * 1.5

  const increment = () => {
    if (qty < (product.stock || 99)) {
      setQty(prev => prev + 1)
    }
  }

  const decrement = () => {
    if (qty > 1) {
      setQty(prev => prev - 1)
    }
  }

  const handleAddToCart = () => {
    if (!product.stock || product.stock < 1) return
    setIsAdding(true)
    onAddToCart(product, qty)
    setTimeout(() => setIsAdding(false), 600)
  }

  const handleBuyWhatsApp = () => {
    const message = encodeURIComponent(
      `Olá! Tenho interesse no produto *${product.name}*.\nPreço: ${formatPrice(product.price)}\nQuantidade: ${qty}\nPoderia me ajudar?`
    )
    window.open('https://wa.me/' + WHATSAPP_NUMBER + '?text=' + message, '_blank')
  }

  const benefits = [
    { title: 'Produto original', subtitle: 'Autenticidade garantida', icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0D9488" strokeWidth="1.5">
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
        <line x1="7" y1="7" x2="7.01" y2="7"/>
      </svg>
    )},
    { title: 'Entrega rápida', subtitle: 'Envio imediato', icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0D9488" strokeWidth="1.5">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    )},
    { title: 'Nota fiscal', subtitle: 'Emitida em todas as compras', icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0D9488" strokeWidth="1.5">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
      </svg>
    )},
    { title: 'Garantia', subtitle: 'Contra defeitos de fábrica', icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0D9488" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <path d="M9 12l2 2 4-4"/>
      </svg>
    )},
  ]

  const productImage = product.image || product.imagem || product.image_url || placeholderImg

  return (
    <div style={styles.page}>
      <div style={{
        ...styles.container,
        ...(isMobile ? { padding: '0 1rem' } : {}),
      }}>
        <button onClick={onBack} style={styles.backButton}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Voltar para produtos
        </button>

        <div style={{
          ...styles.grid,
          ...(isMobile ? { gridTemplateColumns: '1fr' } : {}),
        }}>
          {/* Galeria */}
          <div style={styles.gallery}>
            <img
              src={imageError ? placeholderImg : (productImage || placeholderImg)}
              alt={product.name}
              style={styles.mainImage}
              onError={() => setImageError(true)}
            />
          </div>

          {/* Info */}
          <div style={styles.info}>
            <span style={styles.breadcrumb}>Produtos {'>'} Lavanderia</span>

            <h1 style={styles.title}>{product.name}</h1>

            <div style={styles.badgesRow}>
              {product.stock > 0 ? (
                <span style={styles.stockBadge}>
                  <span style={styles.pulseDot} />
                  Em estoque
                </span>
              ) : (
                <span style={{...styles.stockBadge, background: '#FEE2E2', color: '#DC2626'}}>Sem estoque</span>
              )}
              <span style={styles.offerBadge}>OFERTA</span>
            </div>

            <div style={styles.priceSection}>
              <span style={styles.originalPrice}>{formatPrice(originalPrice)}</span>
              <span style={styles.price}>{formatPrice(product.price)}</span>
              <span style={styles.installments}>✓ Em até 3x sem juros no cartão</span>
            </div>

            <hr style={styles.separator} />

            <div style={styles.quantitySection}>
              <span style={styles.quantityLabel}>Quantidade:</span>
              <div style={styles.quantityControl}>
                <button
                  onClick={decrement}
                  disabled={qty <= 1}
                  style={{
                    ...styles.qtyButton,
                    ...(qty <= 1 ? styles.qtyButtonDisabled : {}),
                  }}
                >
                  −
                </button>
                <span style={styles.qtyValue}>{qty}</span>
                <button
                  onClick={increment}
                  disabled={qty >= (product.stock || 99)}
                  style={{
                    ...styles.qtyButton,
                    ...(qty >= (product.stock || 99) ? styles.qtyButtonDisabled : {}),
                  }}
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={!product.stock || product.stock < 1 || isAdding}
              onMouseEnter={() => setHoverCart(true)}
              onMouseLeave={() => setHoverCart(false)}
              style={{
                ...styles.addToCartButton,
                ...(isAdding ? styles.addToCartButtonActive : {}),
                ...(hoverCart && !isAdding ? { background: '#0B7A70' } : {}),
              }}
            >
              {isAdding ? (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  ADICIONADO!
                </>
              ) : (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                    <line x1="3" y1="6" x2="21" y2="6"/>
                    <path d="M16 10a4 4 0 0 1-8 0"/>
                  </svg>
                  ADICIONAR AO CARRINHO
                </>
              )}
            </button>

            <button
              onClick={handleBuyWhatsApp}
              onMouseEnter={() => setHoverWpp(true)}
              onMouseLeave={() => setHoverWpp(false)}
              style={{
                ...styles.whatsappButton,
                ...(hoverWpp ? { background: '#20BA5A' } : {}),
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.347-.72.598-.822.719a10.64 10.64 0 01-2.107.44c-.267.11-.535.15-.795.15a.91.91 0 01-.67-.372c-.125-.198-1.317-1.156-1.433-2.285-.114-.568-.06-.97.075-1.116.134-.145.299-.174.46-.174h.41c.2 0 .52-.032.746-.213.226-.181.548-.477.623-.646.075-.168.037-.31-.02-.43-.058-.125-.168-.37-.23-.5-.061-.129-.308-.206-.424-.206h-.52c-.135 0-.32.045-.488.213.103.32.294.62.504.839.209.22.478.388.778.479.3.092.628.107.904.107.276 0 .631-.06.908-.232.276-.173.454-.437.546-.72.092-.283.103-.59.103-.885.003-.295-.031-.65-.154-1.065l-.422-.717c-.142-.238-.285-.42-.447-.644a2.33 2.33 0 01.086-.782c.046-.181.023-.36-.02-.53-.044-.17-.164-.36-.328-.495l-.515-.432c-.21-.174-.446-.285-.688-.313-.241-.028-.49-.035-.742-.011a6.57 6.57 0 01-1.02.074c-.279.035-.59.02-.853.043-.264.024-.536.11-.757.22-.22.108-.387.257-.545.404-.158.147-.285.318-.39.515a4.33 4.33 0 01-.176.82c-.038.204-.037.43.015.649.053.22.16.425.276.62z"/>
              </svg>
              COMPRAR PELO WHATSAPP
            </button>
          </div>
        </div>

        {/* Benefícios */}
        <div style={{
          ...styles.benefitsStrip,
          ...(isMobile ? { gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' } : {}),
        }}>
          {benefits.map((b, i) => (
            <div key={i} style={styles.benefitItem}>
              <div style={styles.benefitIconWrap}>{b.icon}</div>
              <span style={styles.benefitTitle}>{b.title}</span>
              <span style={styles.benefitSubtitle}>{b.subtitle}</span>
            </div>
          ))}
        </div>

        {/* Descrição */}
        <div style={styles.descriptionSection}>
          <h2 style={styles.descTitle}>Sobre este produto</h2>
          <div style={styles.descCard}>
            <p style={styles.descText}>{product.description || 'Produto de qualidade com garantia e procedência. Compra segura e entrega rápida para todo o Brasil.'}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    background: '#FFFFFF',
    padding: '1.5rem 0 4rem',
  },
  container: {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '32px 20px',
  },
  backButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.375rem',
    padding: '0.5rem 0',
    background: 'transparent',
    border: 'none',
    color: '#64748B',
    fontSize: '0.875rem',
    fontWeight: '500',
    cursor: 'pointer',
    marginBottom: '1.5rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '40px',
    alignItems: 'flex-start',
  },
  gallery: {
    background: '#F8F8F8',
    borderRadius: '16px',
    padding: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
    border: '1px solid #E2E8F0',
  },
  mainImage: {
    width: '100%',
    maxHeight: '400px',
    objectFit: 'contain',
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  breadcrumb: {
    fontSize: '13px',
    color: '#94A3B8',
    fontWeight: '500',
  },
  title: {
    fontSize: '28px',
    fontWeight: '800',
    color: '#0F172A',
    margin: 0,
    lineHeight: 1.3,
  },
  badgesRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  stockBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.375rem',
    padding: '0.25rem 0.75rem',
    background: '#DCFCE7',
    color: '#16A34A',
    fontSize: '0.8125rem',
    fontWeight: '600',
    borderRadius: '9999px',
  },
  pulseDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: '#22C55E',
    animation: 'pulse 2s infinite',
  },
  offerBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '0.25rem 0.625rem',
    background: '#CCFBF1',
    color: '#0D9488',
    fontSize: '0.75rem',
    fontWeight: '700',
    borderRadius: '9999px',
    letterSpacing: '0.05em',
  },
  priceSection: {
    padding: '1rem 0',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
  },
  originalPrice: {
    fontSize: '14px',
    color: '#94A3B8',
    textDecoration: 'line-through',
    fontWeight: '500',
  },
  price: {
    fontSize: '32px',
    fontWeight: '800',
    color: '#0D9488',
  },
  installments: {
    fontSize: '13px',
    color: '#64748B',
    fontWeight: '500',
  },
  separator: {
    border: 'none',
    borderTop: '1px solid #F1F5F9',
    margin: '0.25rem 0',
  },
  quantitySection: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  quantityLabel: {
    fontSize: '0.9375rem',
    fontWeight: '600',
    color: '#0F172A',
  },
  quantityControl: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #E2E8F0',
    borderRadius: '8px',
    overflow: 'hidden',
  },
  qtyButton: {
    width: '36px',
    height: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'transparent',
    border: 'none',
    fontSize: '1.125rem',
    fontWeight: '600',
    color: '#0F172A',
    cursor: 'pointer',
  },
  qtyButtonDisabled: {
    color: '#CBD5E1',
    cursor: 'not-allowed',
  },
  qtyValue: {
    width: '40px',
    textAlign: 'center',
    fontSize: '1rem',
    fontWeight: '700',
    color: '#0F172A',
    borderLeft: '1px solid #E2E8F0',
    borderRight: '1px solid #E2E8F0',
    padding: '0.5rem 0',
  },
  addToCartButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    width: '100%',
    padding: '1rem',
    background: '#0D9488',
    border: 'none',
    borderRadius: '12px',
    color: 'white',
    fontSize: '15px',
    fontWeight: '700',
    letterSpacing: '0.025em',
    cursor: 'pointer',
    boxShadow: '0 12px 35px rgba(13,148,136,0.3)',
    transition: 'all 0.2s',
  },
  addToCartButtonActive: {
    background: '#16A34A',
    boxShadow: '0 12px 35px rgba(22,163,74,0.3)',
  },
  whatsappButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    width: '100%',
    padding: '1rem',
    background: '#25D366',
    border: 'none',
    borderRadius: '12px',
    color: 'white',
    fontSize: '15px',
    fontWeight: '700',
    letterSpacing: '0.025em',
    cursor: 'pointer',
    boxShadow: '0 12px 35px rgba(37,211,102,0.3)',
    transition: 'all 0.2s',
  },
  benefitsStrip: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '1rem',
    marginTop: '2.5rem',
    padding: '20px',
    background: '#F8FAFC',
    borderRadius: '16px',
    border: '1px solid #E2E8F0',
  },
  benefitItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.375rem',
    textAlign: 'center',
  },
  benefitIconWrap: {
    width: '48px',
    height: '48px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'white',
    borderRadius: '12px',
    border: '1px solid #E2E8F0',
  },
  benefitTitle: {
    fontSize: '0.8125rem',
    fontWeight: '700',
    color: '#0F172A',
  },
  benefitSubtitle: {
    fontSize: '0.6875rem',
    color: '#64748B',
  },
  descriptionSection: {
    marginTop: '2.5rem',
  },
  descTitle: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: '1rem',
    borderLeft: '4px solid #0D9488',
    paddingLeft: '12px',
  },
  descCard: {
    background: 'white',
    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
    borderRadius: '16px',
    padding: '28px',
    border: '1px solid #F1F5F9',
  },
  descText: {
    fontSize: '15px',
    color: '#475569',
    lineHeight: '1.8',
    margin: 0,
  },
}

export default ProductDetail