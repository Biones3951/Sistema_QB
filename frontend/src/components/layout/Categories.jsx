function Categories() {
  const categories = [
    { name: 'Decoração', icon: '🏠', count: 24 },
    { name: 'Móveis', icon: '🛋️', count: 18 },
    { name: 'Iluminação', icon: '💡', count: 15 },
    { name: 'Utensílios', icon: '🍳', count: 32 },
    { name: 'Cortinas', icon: '🪟', count: 12 },
    { name: 'Tapetes', icon: '🧵', count: 8 },
  ]

  return (
    <section style={styles.section} id="categorias">
      <div style={styles.container}>
        <div style={styles.header}>
          <h2 style={styles.title}>Navegue por Categorias</h2>
          <p style={styles.subtitle}>Encontre exatamente o que precisa para sua casa</p>
        </div>

        <div style={styles.grid}>
          {categories.map((cat, index) => (
            <a key={index} href="#produtos" style={styles.card}>
              <div style={styles.cardIcon}>{cat.icon}</div>
              <h3 style={styles.cardName}>{cat.name}</h3>
              <p style={styles.cardCount}>{cat.count} produtos</p>
              <div style={styles.cardArrow}>→</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

const styles = {
  section: {
    padding: '6rem 0',
    background: 'white',
  },
  container: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 2rem',
  },
  header: {
    textAlign: 'center',
    marginBottom: '3rem',
  },
  title: {
    fontSize: '2.25rem',
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: '0.75rem',
  },
  subtitle: {
    fontSize: '1rem',
    color: '#64748B',
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
    padding: '2rem 1rem',
    background: '#FAFCFD',
    borderRadius: '1rem',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    border: '1px solid transparent',
  },
  cardIcon: {
    fontSize: '2.5rem',
    marginBottom: '1rem',
  },
  cardName: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: '0.25rem',
  },
  cardCount: {
    fontSize: '0.8125rem',
    color: '#64748B',
    marginBottom: '0.75rem',
  },
  cardArrow: {
    fontSize: '1.25rem',
    color: '#0D9EA9',
    opacity: 0,
    transform: 'translateX(-10px)',
    transition: 'all 0.3s ease',
  },
}

export default Categories