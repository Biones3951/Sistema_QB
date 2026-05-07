import { useState, useEffect } from 'react'
import { productService } from '../../services/api'
import ProductCard from './ProductCard'
import { useIsMobile } from '../../hooks/useIsMobile'

function ProductList({ onSelectProduct }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const isMobile = useIsMobile()

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await productService.getAll()
      const featured = data.filter(p => p.is_featured)
      // Fallback: if no featured products, show all
      setProducts(featured.length > 0 ? featured : data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section style={styles.section} id="mais-vendidos">
        <div style={styles.container}>
          <div style={styles.loading}>
            <div style={styles.spinner}></div>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section style={styles.section}>
        <div style={styles.container}>
          <p style={styles.error}>Erro ao carregar produtos: {error}</p>
        </div>
      </section>
    )
  }

  return (
    <section style={styles.section} id="mais-vendidos">
      <div style={{
        ...styles.container,
        ...(isMobile ? { padding: '0 1rem' } : {}),
      }}>
        <div style={styles.header}>
          <h2 style={{
            ...styles.title,
            ...(isMobile ? { fontSize: '1.375rem' } : {}),
          }}> Mais Vendidos</h2>
        </div>

        {products.length === 0 ? (
          <p style={styles.empty}>Nenhum produto em destaque no momento</p>
        ) : (
          <div style={{
            ...styles.grid,
            ...(isMobile ? { gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' } : {}),
          }}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} isMobile={isMobile} onSelectProduct={onSelectProduct} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

const styles = {
  section: {
    padding: '4rem 0',
    background: '#FFFFFF',
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
  loading: {
    display: 'flex',
    justifyContent: 'center',
    padding: '4rem 0',
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '3px solid #E2E8F0',
    borderTopColor: '#0D9EA9',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
  },
  error: {
    textAlign: 'center',
    color: '#EF4444',
    padding: '4rem 0',
  },
  empty: {
    textAlign: 'center',
    color: '#64748B',
    padding: '4rem 0',
  },
}

export default ProductList