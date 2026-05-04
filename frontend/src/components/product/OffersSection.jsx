import { useState, useEffect } from 'react'
import { productService } from '../../services/api'
import ProductCard from './ProductCard'
import { useIsMobile } from '../../hooks/useIsMobile'

function OffersSection({ onSelectProduct }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const isMobile = useIsMobile()

  useEffect(() => {
    loadOffers()
    const style = document.createElement('style')
    style.textContent = `
      @keyframes pulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.4; transform: scale(1.8); }
      }
    `
    document.head.appendChild(style)
    return () => { document.head.removeChild(style) }
  }, [])

  const loadOffers = async () => {
    try {
      setLoading(true)
      const data = await productService.getAll()
      const offers = data.filter(p => p.is_offer)
      setProducts(offers)
    } catch (err) {
      console.error('Erro ao carregar ofertas:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section style={styles.section}>
        <div style={styles.container}>
          <div style={styles.loading}>
            <div style={styles.spinner}></div>
          </div>
        </div>
      </section>
    )
  }

  if (products.length === 0) return null

  return (
    <section style={styles.section}>
      <div style={{
        ...styles.container,
        ...(isMobile ? { padding: '0 1rem' } : {}),
      }}>
        <div style={styles.header}>
          <div style={styles.headerText}>
            <h2 style={{
              ...styles.title,
              ...(isMobile ? { fontSize: '1.375rem' } : {}),
            }}>
              🔥 Ofertas Especiais
            </h2>
            <span style={styles.pulseDot} />
          </div>
          <p style={{
            ...styles.subtitle,
            ...(isMobile ? { fontSize: '0.875rem' } : {}),
          }}>Aproveite antes que acabe!</p>
        </div>

        <div style={{
          ...styles.grid,
          ...(isMobile ? { gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' } : {}),
        }}>
          {products.map((product) => (
            <OfferCard key={product.id} product={product} isMobile={isMobile} onSelectProduct={onSelectProduct} />
          ))}
        </div>
      </div>
    </section>
  )
}

function OfferCard({ product, isMobile, onSelectProduct }) {
  const [imageError, setImageError] = useState(false)

  const placeholderImg = 'data:image/svg+xml,' + encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300">
      <rect fill="#FFF5F5" width="300" height="300"/>
      <rect x="75" y="75" width="150" height="150" rx="12" fill="#FCA5A5"/>
      <circle cx="150" cy="175" r="8" fill="#DC2626"/>
    </svg>
  `)

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  const discount = product.original_price
    ? Math.round((1 - parseFloat(product.price) / parseFloat(product.original_price)) * 100)
    : 0

  const productImage = product.image || product.imagem || product.image_url || placeholderImg

  return (
    <div style={styles.card} onClick={() => onSelectProduct?.(product)}>
      <div style={styles.imageContainer}>
        <img
          src={imageError ? placeholderImg : productImage}
          alt={product.name}
          style={styles.image}
          onError={() => setImageError(true)}
        />
        <div style={styles.badgeWrap}>
          {discount > 0 && (
            <span style={{
              ...styles.discountBadge,
              ...(isMobile ? { fontSize: '10px', padding: '0.125rem 0.375rem' } : {}),
            }}>
              {discount}% OFF
            </span>
          )}
        </div>
      </div>

      <div style={styles.content}>
        <h3 style={{
          ...styles.name,
          ...(isMobile ? { fontSize: '0.8125rem' } : {}),
        }}>
          {product.name}
        </h3>

        <div style={styles.priceGroup}>
          {product.original_price && (
            <span style={{
              ...styles.originalPrice,
              ...(isMobile ? { fontSize: '0.6875rem' } : {}),
            }}>
              {formatPrice(product.original_price)}
            </span>
          )}
          <span style={{
            ...styles.price,
            ...(isMobile ? { fontSize: '1.0625rem' } : {}),
          }}>
            {formatPrice(product.price)}
          </span>
        </div>
      </div>
    </div>
  )
}

const styles = {
  section: {
    padding: '4rem 0',
    background: '#FFF5F5',
    overflowX: 'hidden',
  },
  container: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 2rem',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
    marginBottom: '2rem',
  },
  headerText: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  title: {
    fontSize: '1.75rem',
    fontWeight: '700',
    color: '#0F172A',
    margin: 0,
  },
  pulseDot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    background: '#DC2626',
    animation: 'pulse 1.5s infinite',
  },
  subtitle: {
    fontSize: '1rem',
    color: '#64748B',
    margin: 0,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '1.5rem',
  },
  card: {
    background: '#FFFFFF',
    borderRadius: '0.75rem',
    overflow: 'hidden',
    border: '1px solid #FCA5A5',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(220, 38, 38, 0.06)',
  },
  imageContainer: {
    background: '#FFF5F5',
    aspectRatio: '1',
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  badgeWrap: {
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    padding: '0.5rem',
    pointerEvents: 'none',
  },
  discountBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '0.25rem 0.5rem',
    background: '#DC2626',
    color: 'white',
    fontSize: '0.6875rem',
    fontWeight: '700',
    borderRadius: '0.375rem',
  },
  content: {
    padding: '1rem',
  },
  name: {
    fontSize: '0.9375rem',
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: '0.5rem',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  priceGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.125rem',
  },
  price: {
    fontSize: '1.25rem',
    fontWeight: '800',
    color: '#0D9488',
  },
  originalPrice: {
    fontSize: '0.8125rem',
    color: '#94A3B8',
    textDecoration: 'line-through',
    fontWeight: '500',
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    padding: '4rem 0',
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '3px solid #FCA5A5',
    borderTopColor: '#DC2626',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
  },
}

export default OffersSection