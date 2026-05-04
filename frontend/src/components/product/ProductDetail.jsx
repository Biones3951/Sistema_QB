import { useState } from 'react'
import { useIsMobile } from '../../hooks/useIsMobile'

const WHATSAPP_NUMBER = '5511999999999'

function ProductDetail({ product, onBack, onAddToCart }) {
  const isMobile = useIsMobile()
  const [qty, setQty] = useState(1)
  const [imageError, setImageError] = useState(false)
  const [isAdding, setIsAdding] = useState(false)

  if (!product) return null

  const placeholderImg = 'data:image/svg+xml,' + encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
      <rect fill="#F1F5F9" width="600" height="600"/>
      <rect x="200" y="200" width="200" height="200" rx="16" fill="#E2E8F0"/>
      <circle cx="300" cy="300" r="20" fill="#CBD5E1"/>
    </svg>
  `)

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

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
    { text: 'Produto original', icon: '✅' },
    { text: 'Entrega rápida', icon: '⚡' },
    { text: 'Nota fiscal', icon: '🧾' },
    { text: 'Garantia', icon: '🛡️' },
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
            <h1 style={styles.title}>{product.name}</h1>

            {product.stock > 0 ? (
              <span style={styles.stockBadge}>Em estoque</span>
            ) : (
              <span style={{...styles.stockBadge, background: '#FEE2E2', color: '#DC2626'}}>Sem estoque</span>
            )}

            <div style={styles.priceSection}>
              <span style={styles.price}>{formatPrice(product.price)}</span>
            </div>

            <p style={styles.description}>{product.description || 'Produto de qualidade'}</p>

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
              style={{
                ...styles.addToCartButton,
                ...(isAdding ? styles.addToCartButtonActive : {}),
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

            <button onClick={handleBuyWhatsApp} style={styles.whatsappButton}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.347-.72.598-.822.719a10.64 10.64 0 01-2.107.44c-.267.11-.535.15-.795.15a.91.91 0 01-.67-.372c-.125-.198-1.317-1.156-1.433-2.285-.114-.568-.06-.97.075-1.116.134-.145.299-.174.46-.174h.41c.2 0 .52-.032.746-.213.226-.181.548-.477.623-.646.075-.168.037-.31-.02-.43-.058-.125-.168-.37-.23-.5-.061-.129-.308-.206-.424-.206h-.52c-.135 0-.32.045-.488.213.103.32.294.62.504.839.209.22.478.388.778.479.3.092.628.107.904.107.276 0 .631-.06.908-.232.276-.173.454-.437.546-.72.092-.283.103-.59.103-.885.003-.295-.031-.65-.154-1.065l-.422-.717c-.142-.238-.285-.42-.447-.644a2.33 2.33 0 01.086-.782c.046-.181.023-.36-.02-.53-.044-.17-.164-.36-.328-.495l-.515-.432c-.21-.174-.446-.285-.688-.313-.241-.028-.49-.035-.742-.011a6.57 6.57 0 01-1.02.074c-.279.035-.59.02-.853.043-.264.024-.536.11-.757.22-.22.108-.387.257-.545.404-.158.147-.285.318-.39.515a4.33 4.33 0 01-.176.82c-.038.204-.037.43.015.649.053.22.16.425.276.62z"/>
              </svg>
              COMPRAR PELO WHATSAPP
            </button>
          </div>
        </div>

        {/* Benefícios */}
        <div style={styles.benefitsStrip}>
          {benefits.map((b, i) => (
            <div key={i} style={styles.benefitItem}>
              <span style={styles.benefitIcon}>{b.icon}</span>
              <span style={styles.benefitText}>{b.text}</span>
            </div>
          ))}
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
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 2rem',
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
  },
  mainImage: {
    width: '100%',
    maxHeight: '400px',
    objectFit: 'contain',
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  title: {
    fontSize: '24px',
    fontWeight: '800',
    color: '#0F172A',
    margin: 0,
    lineHeight: 1.3,
  },
  stockBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '0.25rem 0.75rem',
    background: '#DCFCE7',
    color: '#16A34A',
    fontSize: '0.8125rem',
    fontWeight: '600',
    borderRadius: '9999px',
    width: 'fit-content',
  },
  priceSection: {
    padding: '1rem 0',
    borderTop: '1px solid #E2E8F0',
    borderBottom: '1px solid #E2E8F0',
  },
  price: {
    fontSize: '32px',
    fontWeight: '800',
    color: '#0D9488',
  },
  description: {
    fontSize: '15px',
    color: '#475569',
    lineHeight: '1.7',
    margin: 0,
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
    borderRadius: '0.5rem',
    overflow: 'hidden',
  },
  qtyButton: {
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'transparent',
    border: 'none',
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#0F172A',
    cursor: 'pointer',
  },
  qtyButtonDisabled: {
    color: '#CBD5E1',
    cursor: 'not-allowed',
  },
  qtyValue: {
    width: '48px',
    textAlign: 'center',
    fontSize: '1rem',
    fontWeight: '600',
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
    borderRadius: '0.75rem',
    color: 'white',
    fontSize: '1rem',
    fontWeight: '700',
    letterSpacing: '0.025em',
    cursor: 'pointer',
    boxShadow: '0 12px 35px rgba(13,148,136,0.3)',
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
    borderRadius: '0.75rem',
    color: 'white',
    fontSize: '1rem',
    fontWeight: '700',
    letterSpacing: '0.025em',
    cursor: 'pointer',
    boxShadow: '0 12px 35px rgba(37,211,102,0.3)',
  },
  benefitsStrip: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '2.5rem',
    padding: '16px',
    background: '#F8FAFC',
    borderRadius: '12px',
  },
  benefitItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    flex: '1',
    justifyContent: 'center',
  },
  benefitIcon: {
    fontSize: '1rem',
  },
  benefitText: {
    fontSize: '0.8125rem',
    fontWeight: '500',
    color: '#475569',
  },
}

export default ProductDetail