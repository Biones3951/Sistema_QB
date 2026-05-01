import { useEffect } from 'react'
import { useIsMobile } from '../../hooks/useIsMobile'

function Benefits() {
  const isMobile = useIsMobile()

  const handleWhatsApp = () => {
    const message = encodeURIComponent('Olá! Vim pelo site da QB Home e quero saber mais sobre os benefícios. 😊')
    window.open('https://wa.me/5511999999999?text=' + message, '_blank')
  }

  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      .benefit-card:hover {
        transform: translateY(-6px) !important;
      }
    `
    document.head.appendChild(style)
    return () => { document.head.removeChild(style) }
  }, [])

  const benefits = [
    {
      emoji: '✅',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0D9488" strokeWidth="2">
          <path d="M9 12l2 2 4-4"/>
          <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"/>
        </svg>
      ),
      title: 'Produtos 100% Originais',
      desc: 'Cada item é original de fábrica, sem réplicas. Pode confiar!',
      badge: 'Autenticidade garantida',
      gradient: 'linear-gradient(135deg, #CCFBF1 0%, #99F6E4 100%)',
      shadow: '0 12px 30px rgba(13, 148, 136, 0.2)',
    },
    {
      emoji: '🛡️',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          <path d="M9 12l2 2 4-4"/>
        </svg>
      ),
      title: 'Garantia de Fábrica',
      desc: 'Todos os produtos têm garantia total. Aqui você está protegido!',
      badge: 'Cobertura completa',
      gradient: 'linear-gradient(135deg, #EDE9FE 0%, #C4B5FD 100%)',
      shadow: '0 12px 30px rgba(124, 58, 237, 0.2)',
    },
    {
      emoji: '🧾',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <path d="M14 2v6h6"/>
          <path d="M16 13H8"/>
          <path d="M16 17H8"/>
          <path d="M10 9H8"/>
        </svg>
      ),
      title: 'Nota Fiscal',
      desc: 'Emitimos NF-e para todas as compras. Tudo certinho e documentado!',
      badge: 'NF-e garantida',
      gradient: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)',
      shadow: '0 12px 30px rgba(217, 119, 6, 0.2)',
    },
    {
      emoji: '⚡',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
        </svg>
      ),
      title: 'Envio Imediato',
      desc: 'Pediu hoje, envia hoje! Rapidinho, sem aquela espera chata.',
      badge: 'Mesmo dia',
      gradient: 'linear-gradient(135deg, #DBEAFE 0%, #93C5FD 100%)',
      shadow: '0 12px 30px rgba(37, 99, 235, 0.2)',
    },
    {
      emoji: '📦',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#DB2777" strokeWidth="2">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
          <path d="M3.27 6.96 12 12.01 20.73 6.96"/>
          <path d="M12 22.08 12 12"/>
        </svg>
      ),
      title: 'Produtos em Estoque',
      desc: 'Temos tudo a pronta entrega. Nada de esperar semanas!',
      badge: 'Pronto envio',
      gradient: 'linear-gradient(135deg, #FCE7F3 0%, #F9A8D4 100%)',
      shadow: '0 12px 30px rgba(219, 39, 119, 0.2)',
    },
    {
      emoji: '📍',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0891B2" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 6v6l4 2"/>
        </svg>
      ),
      title: 'Rastreamento',
      desc: 'Acompanhe seu pedido passo a passo. Sem mistério, tudo transparente!',
      badge: 'Em tempo real',
      gradient: 'linear-gradient(135deg, #CFFAFE 0%, #67E8F9 100%)',
      shadow: '0 12px 30px rgba(8, 145, 178, 0.2)',
    },
  ]

  return (
    <section style={styles.section}>
      <div style={{
        ...styles.container,
        ...(isMobile ? { padding: '0 1rem' } : {}),
      }}>
        <div style={{
          ...styles.header,
          ...(isMobile ? { marginBottom: '2rem' } : {}),
        }}>
          <span style={styles.headerBadge}>POR QUE ESCOLHER A QB HOME?</span>
          <h2 style={{
            ...styles.title,
            ...(isMobile ? { fontSize: '1.5rem' } : {}),
          }}>
            <span style={styles.titleTeal}>Comprar </span>
            na QB Home é diferente
          </h2>
          <p style={{
            ...styles.subtitle,
            ...(isMobile ? { fontSize: '0.9375rem' } : {}),
          }}>
            Veja por que milhares de clientes confiam na gente para equipar suas casas.
          </p>
        </div>

        <div style={{
          ...styles.grid,
          ...(isMobile ? { gridTemplateColumns: '1fr', gap: '1rem' } : {}),
        }}>
          {benefits.map((item, index) => (
            <div 
              key={index} 
              className="benefit-card"
              style={{
                ...styles.card,
                background: item.gradient,
                boxShadow: item.shadow,
                ...(isMobile ? { padding: '1.25rem' } : {}),
              }}
            >
              <div style={styles.cardHeader}>
                <span style={{
                  ...styles.cardEmoji,
                  ...(isMobile ? { fontSize: '1.25rem' } : {}),
                }}>{item.emoji}</span>
                <span style={styles.cardBadge}>{item.badge}</span>
              </div>
              <div style={{
                ...styles.cardIcon,
                ...(isMobile ? { width: '40px', height: '40px', marginBottom: '0.75rem' } : {}),
              }}>{item.icon}</div>
              <h3 style={{
                ...styles.cardTitle,
                ...(isMobile ? { fontSize: '0.9375rem' } : {}),
              }}>{item.title}</h3>
              <p style={{
                ...styles.cardDesc,
                ...(isMobile ? { fontSize: '0.8125rem' } : {}),
              }}>{item.desc}</p>
            </div>
          ))}
        </div>

        <div style={styles.cta}>
          <div style={{
            ...styles.ctaContent,
            ...(isMobile ? { padding: '1.5rem' } : {}),
          }}>
            <h3 style={{
              ...styles.ctaTitle,
              ...(isMobile ? { fontSize: '1.25rem' } : {}),
            }}>Ainda tem dúvidas?</h3>
            <p style={{
              ...styles.ctaText,
              ...(isMobile ? { fontSize: '0.875rem', marginBottom: '1rem' } : {}),
            }}>Fala com a gente no WhatsApp! Nossa equipe está pronta para te ajudar.</p>
            <button onClick={handleWhatsApp} style={{
              ...styles.ctaButton,
              ...(isMobile ? { width: '100%', justifyContent: 'center', padding: '0.75rem 1.25rem' } : {}),
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.347-.72.598-.822.719a10.64 10.64 0 01-2.107.44c-.267.11-.535.15-.795.15a.91.91 0 01-.67-.372c-.125-.198-1.317-1.156-1.433-2.285-.114-.568-.06-.97.075-1.116.134-.145.299-.174.46-.174h.41c.2 0 .52-.032.746-.213.226-.181.548-.477.623-.646.075-.168.037-.31-.02-.43-.058-.125-.168-.37-.23-.5-.061-.129-.308-.206-.424-.206h-.52c-.135 0-.32.045-.488.213.103.32.294.62.504.839.209.22.478.388.778.479.3.092.628.107.904.107.276 0 .631-.06.908-.232.276-.173.454-.437.546-.72.092-.283.103-.59.103-.885.003-.295-.031-.65-.154-1.065l-.422-.717c-.142-.238-.285-.42-.447-.644a2.33 2.33 0 01.086-.782c.046-.181.023-.36-.02-.53-.044-.17-.164-.36-.328-.495l-.515-.432c-.21-.174-.446-.285-.688-.313-.241-.028-.49-.035-.742-.011a6.57 6.57 0 01-1.02.074c-.279.035-.59.02-.853.043-.264.024-.536.11-.757.22-.22.108-.387.257-.545.404-.158.147-.285.318-.39.515a4.33 4.33 0 01-.176.82c-.038.204-.037.43.015.649.053.22.16.425.276.62z"/>
              </svg>
              Falar no WhatsApp
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

const styles = {
  section: {
    padding: '5rem 0',
    background: '#F8FAFC',
    overflowX: 'hidden',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1.5rem',
  },
  header: {
    textAlign: 'center',
    marginBottom: '3rem',
  },
  headerBadge: {
    display: 'inline-block',
    padding: '0.375rem 0.875rem',
    background: 'rgba(13, 148, 136, 0.1)',
    color: '#0D9488',
    fontSize: '0.75rem',
    fontWeight: '600',
    borderRadius: '9999px',
    letterSpacing: '0.05em',
    marginBottom: '0.75rem',
  },
  title: {
    fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: '0.75rem',
  },
  titleTeal: {
    background: 'linear-gradient(135deg, #0D9488 0%, #0891B2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  subtitle: {
    fontSize: '1.0625rem',
    color: '#64748B',
    maxWidth: '500px',
    margin: '0 auto',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '1.5rem',
    marginBottom: '4rem',
  },
  card: {
    padding: '1.5rem',
    borderRadius: '1rem',
    transition: 'all 0.3s ease',
    cursor: 'default',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '1rem',
  },
  cardEmoji: {
    fontSize: '1.5rem',
  },
  cardBadge: {
    padding: '0.25rem 0.625rem',
    background: 'rgba(255,255,255,0.7)',
    color: '#475569',
    fontSize: '0.6875rem',
    fontWeight: '600',
    borderRadius: '9999px',
  },
  cardIcon: {
    width: '48px',
    height: '48px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'white',
    borderRadius: '0.75rem',
    marginBottom: '0.875rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  cardTitle: {
    fontSize: '1.0625rem',
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: '0.375rem',
  },
  cardDesc: {
    fontSize: '0.875rem',
    color: '#475569',
    lineHeight: 1.5,
  },
  cta: {
    background: '#0F172A',
    borderRadius: '1rem',
    overflow: 'hidden',
  },
  ctaContent: {
    padding: '2.5rem',
    textAlign: 'center',
  },
  ctaTitle: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: 'white',
    marginBottom: '0.5rem',
  },
  ctaText: {
    fontSize: '1rem',
    color: '#94A3B8',
    marginBottom: '1.5rem',
  },
  ctaButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.875rem 1.5rem',
    background: '#25D366',
    border: 'none',
    borderRadius: '0.625rem',
    color: 'white',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    boxShadow: '0 8px 25px rgba(37, 211, 102, 0.3)',
  },
}

export default Benefits