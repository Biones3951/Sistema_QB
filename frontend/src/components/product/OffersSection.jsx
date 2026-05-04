import { useState, useEffect } from 'react'
import { productService } from '../../services/api'
import ProductCard from './ProductCard'
import { useIsMobile } from '../../hooks/useIsMobile'

function OffersSection({ onSelectProduct }) {
  const [offers, setOffers] = useState([])
  const [loading, setLoading] = useState(true)
  const isMobile = useIsMobile()

  useEffect(() => {
    const load = async () => {
      try {
        const data = await productService.getOffers()
        setOffers(data)
      } catch (err) {
        console.error('Erro ao carregar ofertas:', err)
      } finally {
        setLoading(false)
      }
    }
    load()

    const style = document.createElement('style')
    style.textContent = `
      @keyframes pulse-red {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.4; transform: scale(1.8); }
      }
    `
    document.head.appendChild(style)
    return () => { document.head.removeChild(style) }
  }, [])

  if (loading) return null
  if (offers.length === 0) return null

  return (
    <section style={styles.section}>
      <div style={{
        ...styles.container,
        ...(isMobile ? { padding: '0 1rem' } : {}),
      }}>
        <div style={styles.header}>
          <div style={styles.titleRow}>
            <h2 style={styles.title}>🔥 Ofertas da Semana</h2>
            <span style={styles.pulseDot} />
          </div>
          <p style={styles.subtitle}>Aproveite antes que acabe!</p>
        </div>

        <div style={{
          ...styles.grid,
          ...(isMobile ? { gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' } : {}),
        }}>
          {offers.map((product) => (
            <div key={product.id} style={styles.offerCard}>
              <ProductCard product={product} isMobile={isMobile} onSelectProduct={onSelectProduct} />
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
    background: 'linear-gradient(135deg, #FFF5F5 0%, #FEF2F2 100%)',
    overflowX: 'hidden',
  },
  container: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 2rem',
  },
  header: {
    marginBottom: '2rem',
  },
  titleRow: {
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
    animation: 'pulse-red 1.5s infinite',
  },
  subtitle: {
    fontSize: '1rem',
    color: '#64748B',
    margin: '0.25rem 0 0',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '1.5rem',
  },
  offerCard: {
    position: 'relative',
  },
}

export default OffersSection