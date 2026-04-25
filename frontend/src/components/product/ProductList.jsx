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
          <div style={styles.loading}>
            <div style={styles.spinner}></div>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section style={styles.section} id="produtos">
        <div style={styles.container}>
          <p style={styles.error}>Erro ao carregar produtos: {error}</p>
        </div>
      </section>
    )
  }

  return (
    <section style={styles.section} id="produtos">
      <div style={styles.container}>
        <div style={styles.header}>
          <h2 style={styles.title}>Mais vendidos</h2>
          <a href="#produtos" style={styles.viewAll}>Ver todos →</a>
        </div>

        {products.length === 0 ? (
          <p style={styles.empty}>Nenhum produto encontrado</p>
        ) : (
          <div style={styles.grid}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
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