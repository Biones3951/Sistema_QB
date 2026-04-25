function Categories() {
  const categories = [
    { name: 'Limpeza', icon: 'spray' },
    { name: 'Utilidades Domésticas', icon: 'home' },
    { name: 'Lavanderia', icon: 'washing' },
    { name: 'Cozinha', icon: 'cup' },
    { name: 'Organização', icon: 'box' },
    { name: 'Pet', icon: 'paw' },
  ]

  const icons = {
    spray: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0D9EA9" strokeWidth="1.5">
        <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44A2.5 2.5 0 0 1 2 9.5V4.5A2.5 2.5 0 0 1 4.5 2h5z"/>
        <path d="M9.5 2h5"/>
        <path d="M5.67 6H9.5"/>
        <path d="M14.5 2A2.5 2.5 0 0 1 17 4.5v15a2.5 2.5 0 0 1-4.96.44A2.5 2.5 0 0 1 7 9.5V4.5A2.5 2.5 0 0 1 9.5 2h5z"/>
        <path d="M14.5 2h5"/>
        <path d="M10.67 6h5"/>
      </svg>
    ),
    home: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0D9EA9" strokeWidth="1.5">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
    washing: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0D9EA9" strokeWidth="1.5">
        <rect x="2" y="4" width="20" height="16" rx="2"/>
        <path d="M6 8h.01"/>
        <path d="M10 8h.01"/>
        <path d="M14 8h.01"/>
        <path d="M18 8h.01"/>
        <circle cx="7" cy="14" r="1"/>
        <circle cx="12" cy="14" r="1"/>
      </svg>
    ),
    cup: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0D9EA9" strokeWidth="1.5">
        <path d="M17 8h1a4 4 0 1 1 0 8h-1"/>
        <path d="M3 8a9 9 0 0 1 18 0v3a2 2 0 0 1-2 2h-1"/>
        <line x1="5" y1="10" x2="19" y2="10"/>
      </svg>
    ),
    box: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0D9EA9" strokeWidth="1.5">
        <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
        <line x1="12" y1="22.08" x2="12" y2="12"/>
      </svg>
    ),
    paw: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0D9EA9" strokeWidth="1.5">
        <circle cx="12" cy="19" r="2"/>
        <circle cx="18" cy="15" r="2"/>
        <circle cx="6" cy="15" r="2"/>
        <circle cx="10" cy="9" r="2"/>
        <circle cx="14" cy="9" r="2"/>
        <path d="M12 2a3 3 0 0 0-3 3c0 1.3.8 2 2 2.5-.3 1.4-1 2.5-2 3.5h6c-1-1-1.7-2.1-2-3.5 1.2-.5 2-1.2 2-2.5a3 3 0 0 0-3-3z"/>
      </svg>
    ),
  }

  return (
    <section style={styles.section} id="categorias">
      <div style={styles.container}>
        <h2 style={styles.title}>Categorias</h2>

        <div style={styles.grid}>
          {categories.map((cat, index) => (
            <div key={index} style={styles.card}>
              <div style={styles.cardIcon}>{icons[cat.icon]}</div>
              <h3 style={styles.cardName}>{cat.name}</h3>
              <a href="#produtos" style={styles.cardLink}>Ver produtos</a>
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
    background: '#FFFFFF',
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
    gap: '1.5rem',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '1.5rem',
    border: '1px solid #E2E8F0',
    borderRadius: '0.5rem',
    textAlign: 'center',
  },
  cardIcon: {
    marginBottom: '0.75rem',
  },
  cardName: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: '0.5rem',
  },
  cardLink: {
    fontSize: '0.875rem',
    color: '#0D9EA9',
    textDecoration: 'none',
  },
}

export default Categories