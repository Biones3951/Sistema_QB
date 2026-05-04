import { useState, useEffect } from 'react'
import { productService } from '../../services/api'
import ProductCard from './ProductCard'
import { useIsMobile } from '../../hooks/useIsMobile'

function ProductList({ onSelectProduct, selectedCategory, onClearCategory, featured = false }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const isMobile = useIsMobile()

  useEffect(() => {
    loadProducts()
  }, [selectedCategory, featured])

  const loadProducts = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await productService.getAll(selectedCategory?.id || null)
      let filtered = data
      if (featured) {
        filtered = data.filter(p => p.is_featured)
      }
      setProducts(filtered)
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

  if (error) {
    return (
      <section style={styles.section}>
        <div style={styles.container}>
          <p style={styles.error}>Erro ao carregar produtos: {error}</p>
        </div>
      </section>
    )
  }

  const isCategoryView = !!selectedCategory
  const sectionTitle = isCategoryView ? `Produtos em: ${selectedCategory.name}` : (featured ? '⭐ Mais vendidos' : 'Todos os produtos')

  const handleViewAll = () => {
    onClearCategory?.()
  }

  return (
    <section style={styles.section} id="produtos">
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
          <h2 style={{
            ...styles.title,
            ...(isMobile ? { fontSize: '1.375rem' } : {}),
          }}>{sectionTitle}</h2>
          {isCategoryView && (
            <button onClick={onClearCategory} style={{
              ...styles.clearBtn,
              ...(isMobile ? { width: '100%' } : {}),
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
              Limpar filtro
            </button>
          )}
          {!isCategoryView && featured && (
            <a href="#produtos" onClick={(e) => { e.preventDefault(); handleViewAll(); }} style={styles.viewAll}>Ver todos os produtos →</a>
          )}
        </div>

        {products.length === 0 ? (
          <p style={styles.empty}>{isCategoryView ? 'Nenhum produto nesta categoria' : (featured ? 'Nenhum produto em destaque no momento' : 'Nenhum produto encontrado')}</p>
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
  clearBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.375rem',
    padding: '0.5rem 1rem',
    background: '#F1F5F9',
    border: 'none',
    borderRadius: '0.5rem',
    color: '#64748B',
    fontSize: '0.875rem',
    fontWeight: '500',
    cursor: 'pointer',
  },
  viewAll: {
    color: '#0D9EA9',
    textDecoration: 'none',
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

export default ProductList