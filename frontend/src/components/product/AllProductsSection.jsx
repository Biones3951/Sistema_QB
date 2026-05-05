import { useState, useEffect } from 'react'
import { productService } from '../../services/api'
import ProductCard from './ProductCard'
import { useIsMobile } from '../../hooks/useIsMobile'

function AllProductsSection({ selectedCategory, onClearCategory, onSelectProduct }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const isMobile = useIsMobile()

  useEffect(() => {
    loadProducts()
  }, [selectedCategory])

  const loadProducts = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = selectedCategory
        ? await productService.getAll(selectedCategory.id)
        : await productService.getAll()
      setProducts(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const sectionTitle = selectedCategory
    ? `📦 ${selectedCategory.name}`
    : '🛍️ Todos os Produtos'

  if (loading) {
    return (
      <section style={styles.section} id="todos-produtos">
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
      <section style={styles.section} id="todos-produtos">
        <div style={styles.container}>
          <p style={styles.error}>Erro ao carregar produtos: {error}</p>
        </div>
      </section>
    )
  }

  return (
    <section style={styles.section} id="todos-produtos">
      <div style={{
        ...styles.container,
        ...(isMobile ? { padding: '0 1rem' } : {}),
      }}>
        <div style={{
          ...styles.header,
          ...(isMobile ? {
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '0.5rem',
            marginBottom: '1.25rem',
          } : {}),
        }}>
          <div style={styles.titleRow}>
            <h2 style={{
              ...styles.title,
              ...(isMobile ? { fontSize: '1.375rem' } : {}),
            }}>{sectionTitle}</h2>
            {selectedCategory && (
              <button onClick={onClearCategory} style={{
                ...styles.clearBtn,
                ...(isMobile ? { width: '100%', justifyContent: 'center' } : {}),
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
                Limpar filtro
              </button>
            )}
          </div>
          {!selectedCategory && (
            <span style={styles.viewAll}>Ver todos os produtos</span>
          )}
        </div>

        {products.length === 0 ? (
          <p style={styles.empty}>{selectedCategory ? 'Nenhum produto nesta categoria' : 'Nenhum produto encontrado'}</p>
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
  titleRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    flexWrap: 'wrap',
  },
  title: {
    fontSize: '1.75rem',
    fontWeight: '700',
    color: '#0F172A',
  },
  clearBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.375rem',
    padding: '4px 10px',
    background: '#F1F5F9',
    border: 'none',
    borderRadius: '0.5rem',
    color: '#64748B',
    fontSize: '12px',
    fontWeight: '500',
    cursor: 'pointer',
  },
  viewAll: {
    color: '#0D9EA9',
    fontSize: '1rem',
    fontWeight: '500',
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

export default AllProductsSection