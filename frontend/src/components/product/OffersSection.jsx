import { useState, useEffect } from 'react'
import { productService } from '../../services/api'
import ProductCard from './ProductCard'
import { useIsMobile } from '../../hooks/useIsMobile'

function OffersSection({ onSelectProduct }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const isMobile = useIsMobile()

  useEffect(() => {
    loadOffers()
  }, [])

  const loadOffers = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await productService.getAll()
      const offers = data.filter(p => p.is_offer)
      setProducts(offers)
    } catch (err) {
      setError(err.message)
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

  if (error) return null
  if (products.length === 0) return null

  return (
    <section style={styles.section}>
      <div style={{
        ...styles.container,
        ...(isMobile ? { padding: '0 1rem' } : {}),
      }}>
        <div style={styles.header}>
          <h2 style={{
            ...styles.title,
            ...(isMobile ? { fontSize: '1.375rem' } : {}),
          }}>🔥 Ofertas Especiais</h2>
        </div>

        <div style={{
          ...styles.grid,
          ...(isMobile ? { gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' } : {}),
        }}>
          {products.map((product) => (
            <div key={product.id} style={styles.offerCard}>
              <ProductCard product={product} isMobile={isMobile} onSelectProduct={onSelectProduct} />
              <div style={styles.offerOverlay}>
                {product.original_price && (
                  <span style={{
                    ...styles.discountBadge,
                    ...(isMobile ? { fontSize: '10px', padding: '0.125rem 0.375rem' } : {}),
                  }}>
                    {Math.round((1 - parseFloat(product.price) / parseFloat(product.original_price)) * 100)}% OFF
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const styles = {
  section: {
    padding: '4rem 0',
    background: '#FFFBEB',
    overflowX: 'hidden',
  },
  container: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 2rem',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '2rem',
  },
  title: {
    fontSize: '1.75rem',
    fontWeight: '700',
    color: '#0F172A',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '1.5rem',
  },
  offerCard: {
    position: 'relative',
  },
  offerOverlay: {
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    display: 'flex',
    justifyContent: 'flex-start',
    zIndex: 10,
    pointerEvents: 'none',
  },
  discountBadge: {
    background: '#DC2626',
    color: 'white',
    padding: '0.25rem 0.5rem',
    fontSize: '0.6875rem',
    fontWeight: '700',
    borderRadius: '0.375rem',
    marginLeft: '0.5rem',
    marginTop: '0.5rem',
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    padding: '4rem 0',
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '3px solid #FDE68A',
    borderTopColor: '#F59E0B',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
  },
}

export default OffersSection