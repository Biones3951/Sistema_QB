import { useState } from 'react'
import { useCart } from '../../context/CartContext'
import { formatPrice } from '../../utils/formatters'

function ProductCard({ product }) {
  const { addItem } = useCart()
  const [isAdding, setIsAdding] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
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
    setIsAdding(true)
    addItem(product)
    setTimeout(() => setIsAdding(false), 600)
  }

  return (
    <div 
      style={{
        ...styles.card,
        ...(isHovered ? styles.cardHover : {})
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div style={styles.imageContainer}>
        <img 
          src={imageError ? placeholderImg : (product.image_url || placeholderImg)}
          alt={product.name}
          style={{
            ...styles.image,
            ...(isHovered ? styles.imageHover : {})
          }}
          onError={() => setImageError(true)}
        />
        
        {/* Badges */}
        <div style={styles.badges}>
          {product.stock > 0 ? (
            <span style={styles.stockBadge}>
              <span style={styles.stockDot}></span>
              Disponível
            </span>
          ) : (
            <span style={styles.outOfStockBadge}>Indisponível</span>
          )}
        </div>

        {/* Quick Add Button */}
        <button 
          onClick={handleAdd}
          disabled={product.stock < 1 || isAdding}
          style={{
            ...styles.addButton,
            ...(isAdding ? styles.addingButton : {}),
            ...(isHovered ? styles.addButtonHover : {})
          }}
        >
          {isAdding ? (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              Adicionado
            </>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              Adicionar ao carrinho
            </>
          )}
        </button>
      </div>

      {/* Content */}
      <div style={styles.content}>
        {/* Category */}
        {product.category && (
          <span style={styles.category}>
            {product.category.name}
          </span>
        )}

        {/* Name */}
        <h3 style={styles.name}>{product.name}</h3>

        {/* Description */}
        <p style={styles.description}>
          {product.description?.slice(0, 70) || 'Produto de qualidade premium'}
          {(product.description?.length || 0) > 70 && '...'}
        </p>

        {/* Footer */}
        <div style={styles.footer}>
          <div style={styles.priceContainer}>
            <span style={styles.price}>
              {formatPrice(product.price)}
            </span>
            {product.stock > 0 && (
              <span style={styles.stock}>
                {product.stock} disponíveis
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const styles = {
  card: {
    position: 'relative',
    background: 'white',
    borderRadius: '1rem',
    overflow: 'hidden',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    border: '1px solid #F1F5F9',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.04)',
  },
  cardHover: {
    transform: 'translateY(-8px)',
    boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.12)',
    borderColor: '#E2E8F0',
  },
  imageContainer: {
    position: 'relative',
    background: '#F8FAFC',
    aspectRatio: '1',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  imageHover: {
    transform: 'scale(1.08)',
  },
  badges: {
    position: 'absolute',
    top: '1rem',
    left: '1rem',
    display: 'flex',
    gap: '0.5rem',
    zIndex: 2,
  },
  stockBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.375rem',
    padding: '0.375rem 0.75rem',
    background: 'rgba(16, 185, 129, 0.12)',
    borderRadius: '9999px',
    fontSize: '0.6875rem',
    fontWeight: '600',
    color: '#10B981',
  },
  stockDot: {
    width: '5px',
    height: '5px',
    background: '#10B981',
    borderRadius: '50%',
  },
  outOfStockBadge: {
    display: 'flex',
    alignItems: 'center',
    padding: '0.375rem 0.75rem',
    background: 'rgba(239, 68, 68, 0.12)',
    borderRadius: '9999px',
    fontSize: '0.6875rem',
    fontWeight: '600',
    color: '#EF4444',
  },
  addButton: {
    position: 'absolute',
    bottom: '1rem',
    left: '1rem',
    right: '1rem',
    padding: '0.875rem',
    background: '#0F172A',
    border: 'none',
    borderRadius: '0.625rem',
    color: 'white',
    fontSize: '0.8125rem',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    opacity: 0,
    transform: 'translateY(10px)',
    transition: 'all 0.3s ease',
    boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.25)',
  },
  addButtonHover: {
    opacity: 1,
    transform: 'translateY(0)',
  },
  addingButton: {
    background: '#0D9EA9',
  },
  content: {
    padding: '1.25rem',
  },
  category: {
    display: 'inline-block',
    padding: '0.25rem 0.625rem',
    background: 'linear-gradient(135deg, rgba(13, 158, 169, 0.08) 0%, rgba(6, 182, 212, 0.08) 100%)',
    borderRadius: '9999px',
    fontSize: '0.6875rem',
    fontWeight: '600',
    color: '#0D9EA9',
    marginBottom: '0.625rem',
  },
  name: {
    fontSize: '1rem',
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: '0.5rem',
    lineHeight: 1.4,
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
  description: {
    fontSize: '0.8125rem',
    color: '#64748B',
    lineHeight: 1.6,
    marginBottom: '1rem',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: '0.75rem',
    borderTop: '1px solid #F1F5F9',
  },
  priceContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.125rem',
  },
  price: {
    fontSize: '1.25rem',
    fontWeight: '800',
    color: '#0D9EA9',
  },
  stock: {
    fontSize: '0.6875rem',
    color: '#94A3B8',
  },
}

export default ProductCard