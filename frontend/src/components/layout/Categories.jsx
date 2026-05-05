import { useState } from 'react'
import { useIsMobile } from '../../hooks/useIsMobile'

function Categories({ onSelectCategory, selectedCategory }) {
  const isMobile = useIsMobile()
  const isSmallMobile = window.innerWidth < 480
  const [hovered, setHovered] = useState(null)

  const categories = [
    { id: null, name: 'Todos', icon: 'spray' },
    { id: 1, name: 'Limpeza', icon: 'spray' },
    { id: 2, name: 'Utilidades Domésticas', icon: 'home' },
    { id: 3, name: 'Lavanderia', icon: 'washing' },
    { id: 4, name: 'Cozinha', icon: 'cup' },
    { id: 5, name: 'Organização', icon: 'box' },
    { id: 6, name: 'Pet', icon: 'paw' },
  ]

  const icons = {
    spray: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0D9EA9" strokeWidth="1.5">
        <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44A2.5 2.5 0 0 1 2 9.5V4.5A2.5 2.5 0 0 1 4.5 2h5z"/>
        <path d="M9.5 2h5"/>
      </svg>
    ),
    home: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0D9EA9" strokeWidth="1.5">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
    washing: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0D9EA9" strokeWidth="1.5">
        <rect x="2" y="4" width="20" height="16" rx="2"/>
        <path d="M6 8h.01"/>
        <path d="M10 8h.01"/>
        <path d="M14 8h.01"/>
        <path d="M18 8h.01"/>
      </svg>
    ),
    cup: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0D9EA9" strokeWidth="1.5">
        <path d="M17 8h1a4 4 0 1 1 0 8h-1"/>
        <path d="M3 8a9 9 0 0 1 18 0v3a2 2 0 0 1-2 2h-1"/>
        <line x1="5" y1="10" x2="19" y2="10"/>
      </svg>
    ),
    box: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0D9EA9" strokeWidth="1.5">
        <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
        <line x1="12" y1="22.08" x2="12" y2="12"/>
      </svg>
    ),
    paw: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0D9EA9" strokeWidth="1.5">
        <circle cx="12" cy="19" r="2"/>
        <circle cx="18" cy="15" r="2"/>
        <circle cx="6" cy="15" r="2"/>
        <circle cx="10" cy="9" r="2"/>
        <circle cx="14" cy="9" r="2"/>
      </svg>
    ),
  }

  const handleClick = (cat) => {
    if (cat.id === null) {
      onSelectCategory(null)
    } else {
      onSelectCategory(cat)
    }
    // Scroll to AllProductsSection
    setTimeout(() => {
      document.getElementById('todos-produtos')?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  return (
    <section style={styles.section} id="categorias">
      <div style={{
        ...styles.container,
        ...(isMobile ? { padding: '0 1rem' } : {}),
      }}>
        <h2 style={{
          ...styles.title,
          ...(isMobile ? { fontSize: '1.5rem', marginBottom: '1.5rem' } : {}),
        }}>Categorias</h2>

        <div style={{
          ...styles.grid,
          ...(isMobile && isSmallMobile ? { gridTemplateColumns: 'repeat(2, 1fr)' } : {}),
          ...(isMobile && !isSmallMobile ? { gridTemplateColumns: 'repeat(3, 1fr)' } : {}),
        }}>
          {categories.map((cat, index) => {
            const isSelected = selectedCategory?.id === cat.id
            return (
              <div
                key={index}
                onClick={() => handleClick(cat)}
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  ...styles.card,
                  ...(isSelected ? styles.cardSelected : {}),
                  ...(hovered === index && !isSelected ? styles.cardHover : {}),
                }}
              >
                <div style={{
                  ...styles.cardIcon,
                  ...(isMobile ? { marginBottom: '0.5rem' } : {}),
                }}>
                  {icons[cat.icon]}
                </div>
                <h3 style={{
                  ...styles.cardName,
                  ...(isMobile ? { fontSize: '0.8125rem' } : {}),
                }}>
                  {cat.name}
                </h3>
              </div>
            )
          })}
        </div>
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
  title: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#0F172A',
    textAlign: 'center',
    marginBottom: '2.5rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(6, 1fr)',
    gap: '1.25rem',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '1.5rem 1rem',
    border: '1px solid #E2E8F0',
    borderRadius: '0.5rem',
    textAlign: 'center',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  cardHover: {
    background: '#F0FDF9',
    borderColor: '#99F6E4',
    boxShadow: '0 4px 12px rgba(13, 148, 136, 0.1)',
  },
  cardSelected: {
    background: '#F0FDF9',
    border: '2px solid #0D9488',
    boxShadow: '0 4px 12px rgba(13, 148, 136, 0.15)',
  },
  cardIcon: {
    marginBottom: '0.75rem',
  },
  cardName: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: '0.5rem',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}

export default Categories