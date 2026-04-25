import { useState, useEffect } from 'react'
import { productService } from '../../services/api'
import ProductCard from './ProductCard'

function ProductList() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await productService.getAll()
      setProducts(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section style={styles.section} id="produtos">
        <div style={styles.container}>
          <div style={styles.loadingContainer}>
            <div style={styles.spinner}></div>
            <p style={styles.loadingText}>Carregando produtos...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section style={styles.section} id="produtos">
        <div style={styles.container}>
          <div style={styles.errorContainer}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <p style={styles.errorTitle}>Erro ao carregar produtos</p>
            <p style={styles.errorDetail}>{error}</p>
            <button onClick={loadProducts} style={styles.retryButton}>
              Tentar novamente
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section style={styles.section} id="produtos">
      <div style={styles.container}>
        {/* Section Header */}
        <div style={styles.sectionHeader}>
          <div style={styles.headerContent}>
            <span style={styles.sectionBadge}>CATÁLOGO</span>
            <h2 style={styles.sectionTitle}>Nossos Produtos</h2>
            <p style={styles.sectionSubtitle}>
              Explore nossa coleção completa de produtos selecionados especialmente paraVocê
            </p>
          </div>
        </div>

        {products.length === 0 ? (
          <div style={styles.emptyContainer}>
            <div style={styles.emptyIcon}>
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#CBD5E1" strokeWidth="1">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            <h3 style={styles.emptyTitle}>Nenhum produto encontrado</h3>
            <p style={styles.emptyDetail}>Em breve novidade no catálogo</p>
          </div>
        ) : (
          <>
            {/* Products Grid */}
            <div style={styles.productsGrid}>
              {products.map((product, index) => (
                <div key={product.id} style={{
                  ...styles.productItem,
                  animationDelay: `${index * 0.05}s`
                }}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>

            {/* Categories Section */}
            <div style={styles.categoriesSection} id="categorias">
              <div style={styles.categoriesHeader}>
                <h3 style={styles.categoriesTitle}>
                  <span style={styles.categoriesIcon}>🏠</span>
                  Navegue por Categorias
                </h3>
              </div>
              <div style={styles.categoriesGrid}>
                <a href="#" style={styles.categoryCard}>
                  <div style={styles.categoryIconBg}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0D9EA9" strokeWidth="1.5">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                      <polyline points="9 22 9 12 15 12 15 22"/>
                    </svg>
                  </div>
                  <span style={styles.categoryName}>Decoração</span>
                  <span style={styles.categoryCount}>24 produtos</span>
                </a>
                <a href="#" style={styles.categoryCard}>
                  <div style={styles.categoryIconBg}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0D9EA9" strokeWidth="1.5">
                      <rect x="3" y="3" width="18" height="18" rx="2"/>
                      <path d="M3 9h18"/>
                      <path d="M9 21V9"/>
                    </svg>
                  </div>
                  <span style={styles.categoryName}>Móveis</span>
                  <span style={styles.categoryCount}>18 produtos</span>
                </a>
                <a href="#" style={styles.categoryCard}>
                  <div style={styles.categoryIconBg}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0D9EA9" strokeWidth="1.5">
                      <path d="M9 18h6"/>
                      <path d="M10 22h4"/>
                      <path d="M15.09 14h.18a2 2 0 0 1 1.92 2.56l-1.33 8a2 2 0 0 1-1.92 1.44h-4.27a2 2 0 0 1-1.92-1.44l-1.33-8a2 2 0 0 1 1.92-2.56h.18"/>
                    </svg>
                  </div>
                  <span style={styles.categoryName}>Iluminação</span>
                  <span style={styles.categoryCount}>12 produtos</span>
                </a>
                <a href="#" style={styles.categoryCard}>
                  <div style={styles.categoryIconBg}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0D9EA9" strokeWidth="1.5">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                      <polyline points="14 2 14 8 20 8"/>
                      <line x1="16" y1="13" x2="8" y2="13"/>
                      <line x1="16" y1="17" x2="8" y2="17"/>
                    </svg>
                  </div>
                  <span style={styles.categoryName}>Utensílios</span>
                  <span style={styles.categoryCount}>32 produtos</span>
                </a>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  )
}

const styles = {
  section: {
    padding: '6rem 0',
    background: '#FFFFFF',
  },
  container: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 2rem',
  },
  sectionHeader: {
    textAlign: 'center',
    marginBottom: '4rem',
  },
  headerContent: {
    maxWidth: '600px',
    margin: '0 auto',
  },
  sectionBadge: {
    display: 'inline-block',
    padding: '0.375rem 0.875rem',
    background: 'linear-gradient(135deg, rgba(13, 158, 169, 0.1) 0%, rgba(6, 182, 212, 0.1) 100%)',
    borderRadius: '9999px',
    fontSize: '0.6875rem',
    fontWeight: '700',
    color: '#0D9EA9',
    letterSpacing: '0.1em',
    marginBottom: '1rem',
  },
  sectionTitle: {
    fontSize: '2.5rem',
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: '1rem',
  },
  sectionSubtitle: {
    fontSize: '1.0625rem',
    color: '#64748B',
    lineHeight: 1.7,
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '6rem 0',
  },
  spinner: {
    width: '48px',
    height: '48px',
    border: '3px solid #F1F5F9',
    borderTopColor: '#0D9EA9',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
  },
  loadingText: {
    marginTop: '1.25rem',
    color: '#64748B',
    fontSize: '0.9375rem',
  },
  errorContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '6rem 0',
    textAlign: 'center',
  },
  errorTitle: {
    marginTop: '1.25rem',
    fontSize: '1.125rem',
    fontWeight: '600',
    color: '#0F172A',
  },
  errorDetail: {
    marginTop: '0.5rem',
    fontSize: '0.875rem',
    color: '#64748B',
  },
  retryButton: {
    marginTop: '1.5rem',
    padding: '0.75rem 1.5rem',
    background: '#0D9EA9',
    color: 'white',
    border: 'none',
    borderRadius: '0.5rem',
    fontSize: '0.875rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'opacity 0.2s',
  },
  emptyContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '6rem 0',
    textAlign: 'center',
  },
  emptyIcon: {
    width: '100px',
    height: '100px',
    background: '#F8FAFC',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '1.5rem',
  },
  emptyTitle: {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#0F172A',
  },
  emptyDetail: {
    marginTop: '0.5rem',
    fontSize: '0.9375rem',
    color: '#64748B',
  },
  productsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
    gap: '1.5rem',
  },
  productItem: {
    animation: 'fadeInUp 0.5s ease forwards',
    opacity: 0,
  },
  categoriesSection: {
    marginTop: '5rem',
    paddingTop: '5rem',
    borderTop: '1px solid #F1F5F9',
  },
  categoriesHeader: {
    textAlign: 'center',
    marginBottom: '3rem',
  },
  categoriesTitle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.75rem',
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#0F172A',
  },
  categoriesIcon: {
    fontSize: '1.25rem',
  },
  categoriesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '1.5rem',
  },
  categoryCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '2rem 1.5rem',
    background: '#F8FAFC',
    borderRadius: '1rem',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
  },
  categoryIconBg: {
    width: '56px',
    height: '56px',
    background: 'linear-gradient(135deg, rgba(13, 158, 169, 0.1) 0%, rgba(6, 182, 212, 0.1) 100%)',
    borderRadius: '0.75rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '1rem',
  },
  categoryName: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: '0.25rem',
  },
  categoryCount: {
    fontSize: '0.8125rem',
    color: '#64748B',
  },
}

export default ProductList