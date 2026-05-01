import { useState } from 'react'
import { useCart } from '../../context/CartContext'

function ProductCard({ product, isMobile = false }) {
  const { addItem } = useCart()
  const [isAdding, setIsAdding] = useState(false)
  const [imageError, setImageError] = useState(false)

  const placeholderImg = 'data:image/svg+xml,' + encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300">
      <rect fill="#F1F5F9" width="300" height="300"/>
      <rect x="75" y="75" width="150" height="150" rx="12" fill="#E2E8F0"/>
      <path d="M100 175 L150 125 L200 175" stroke="#94A3B8" stroke-width="4" fill="none" stroke-linecap="round"/>
      <circle cx="150" cy="175" r="8" fill="#CBD5E1"/>
    </svg>
  `)

  const handleAdd = () => {
    if (product.stock < 1) return
    setIsAdding(true)
    addItem(product)
    setTimeout(() => setIsAdding(false), 600)
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  return (
    <div style={styles.card}>
      <div style={styles.imageContainer}>
        <img 
          src={imageError ? placeholderImg : (product.image_url || placeholderImg)}
          alt={product.name}
          style={styles.image}
          onError={() => setImageError(true)}
        />
      </div>

      <div style={{
        ...styles.content,
        ...(isMobile ? { padding: '0.75rem' } : {}),
      }}>
        <h3 style={{
          ...styles.name,
          ...(isMobile ? { fontSize: '0.875rem', marginBottom: '0.25rem' } : {}),
        }}>
          {product.name}
        </h3>
        <p style={{
          ...styles.description,
          ...(isMobile ? { 
            fontSize: '0.6875rem', 
            marginBottom: '0.5rem',
            WebkitLineClamp: '1',
          } : {}),
        }}>
          {product.description?.slice(0, isMobile ? 40 : 60) || 'Produto de qualidade'}
          {(product.description?.length || 0) > (isMobile ? 40 : 60) && '...'}
        </p>
        <div style={{
          ...styles.footer,
          ...(isMobile ? { flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-start' } : {}),
        }}>
          <span style={{
            ...styles.price,
            ...(isMobile ? { fontSize: '1rem' } : {}),
          }}>{formatPrice(product.price)}</span>
          <button 
            onClick={handleAdd}
            disabled={product.stock < 1 || isAdding}
            style={{
              ...styles.button,
              ...(isMobile ? { width: '100%', justifyContent: 'center', padding: '0.5rem' } : {}),
              ...(isAdding ? styles.buttonActive : {}),
            }}
          >
            {isAdding ? (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                OK
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
                ADICIONAR
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

const styles = {
  card: {
    background: 'white',
    borderRadius: '0.5rem',
    overflow: 'hidden',
    border: '1px solid #E2E8F0',
  },
  imageContainer: {
    background: '#F8FAFC',
    aspectRatio: '1',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  content: {
    padding: '1rem',
  },
  name: {
    fontSize: '1rem',
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: '0.375rem',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  description: {
    fontSize: '0.8125rem',
    color: '#64748B',
    marginBottom: '0.75rem',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    fontSize: '1.125rem',
    fontWeight: '700',
    color: '#0D9EA9',
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.375rem',
    padding: '0.5rem 0.75rem',
    background: '#0D9EA9',
    border: 'none',
    borderRadius: '0.375rem',
    color: 'white',
    fontSize: '0.75rem',
    fontWeight: '600',
    cursor: 'pointer',
    flexShrink: 0,
  },
  buttonActive: {
    background: '#10B981',
  },
}

export default ProductCard