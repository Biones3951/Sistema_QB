function Benefits() {
  const benefits = [
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      ),
      title: 'Entrega Rápida',
      description: 'Entregamos em todo o Brasil com rapidez e segurança',
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
          <line x1="7" y1="7" x2="7.01" y2="7"/>
        </svg>
      ),
      title: 'Produtos Originais',
      description: 'Todos os produtos com garantia de qualidade',
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2"/>
          <path d="M3 9h18"/>
          <path d="M9 21V9"/>
        </svg>
      ),
      title: 'Pedido Fácil',
      description: 'Interface simples para encontrar o que precisa',
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
      ),
      title: 'Compra Segura',
      description: 'Pagamento seguro e protegido',
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
    padding: '4rem 0',
    background: '#FAFCFD',
  },
  container: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 2rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '2rem',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '2rem',
    background: 'white',
    borderRadius: '1rem',
    textAlign: 'center',
  },
  iconBox: {
    width: '56px',
    height: '56px',
    background: 'linear-gradient(135deg, rgba(13, 158, 169, 0.1) 0%, rgba(6, 182, 212, 0.1) 100%)',
    borderRadius: '0.75rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#0D9EA9',
    marginBottom: '1rem',
  },
  title: {
    fontSize: '1.0625rem',
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: '0.5rem',
  },
  description: {
    fontSize: '0.875rem',
    color: '#64748B',
    lineHeight: 1.6,
  },
}

export default Benefits