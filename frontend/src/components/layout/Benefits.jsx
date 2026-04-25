function Benefits() {
  const benefits = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0D9EA9" strokeWidth="2">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      ),
      title: 'Entrega rápida',
      description: 'Entregamos em todo o Brasil',
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0D9EA9" strokeWidth="2">
          <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
          <line x1="7" y1="7" x2="7.01" y2="7"/>
        </svg>
      ),
      title: 'Produtos originais',
      description: 'Garantia de qualidade',
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0D9EA9" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2"/>
          <path d="M3 9h18"/>
          <path d="M9 21V9"/>
        </svg>
      ),
      title: 'Pedido fácil',
      description: 'Compra em poucos cliques',
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0D9EA9" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
      ),
      title: 'Compra segura',
      description: 'Pagamento protegido',
    },
  ]

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <div style={styles.grid}>
          {benefits.map((benefit, index) => (
            <div key={index} style={styles.card}>
              <div style={styles.iconBox}>{benefit.icon}</div>
              <h3 style={styles.title}>{benefit.title}</h3>
              <p style={styles.description}>{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const styles = {
  section: {
    padding: '3rem 0',
    background: '#F8FAFC',
    borderTop: '1px solid #E2E8F0',
    borderBottom: '1px solid #E2E8F0',
  },
  container: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 2rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '1.5rem',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    padding: '1.5rem',
  },
  iconBox: {
    width: '48px',
    height: '48px',
    border: '1px solid #E2E8F0',
    borderRadius: '0.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '0.75rem',
  },
  title: {
    fontSize: '1rem',
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: '0.25rem',
  },
  description: {
    fontSize: '0.875rem',
    color: '#64748B',
  },
}

export default Benefits