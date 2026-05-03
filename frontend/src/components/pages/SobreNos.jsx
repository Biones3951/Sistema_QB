import { useEffect } from 'react'
import { useIsMobile } from '../../hooks/useIsMobile'

const WHATSAPP_NUMBER = '5511999999999'

function SobreNos({ onNavigate }) {
  const isMobile = useIsMobile()

  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `
    document.head.appendChild(style)
    return () => { document.head.removeChild(style) }
  }, [])

  const handleWhatsApp = () => {
    const message = encodeURIComponent('Olá! Vim pelo site da QB Home e gostaria de saber mais sobre vocês. 😊')
    window.open('https://wa.me/' + WHATSAPP_NUMBER + '?text=' + message, '_blank')
  }

  const values = [
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0D9488" strokeWidth="1.5">
          <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
          <line x1="7" y1="7" x2="7.01" y2="7"/>
        </svg>
      ),
      title: 'Qualidade',
      desc: 'Selecionamos apenas produtos originais com garantia de fábrica.',
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0D9488" strokeWidth="1.5">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          <path d="M9 12l2 2 4-4"/>
        </svg>
      ),
      title: 'Confiança',
      desc: 'Emitimos NF-e em todas as compras e rastreamento de pedido.',
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0D9488" strokeWidth="1.5">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
        </svg>
      ),
      title: 'Praticidade',
      desc: 'Pedido pelo WhatsApp, sem cadastro complexo, sem burocracia.',
    },
  ]

  const metrics = [
    { value: '500+', label: 'Clientes satisfeitos' },
    { value: '1000+', label: 'Produtos entregues' },
    { value: '2+', label: 'Anos no mercado' },
  ]

  const steps = [
    { num: '1', title: 'Escolha o produto', desc: 'Navegue pelo catálogo' },
    { num: '2', title: 'Fale pelo WhatsApp', desc: 'Tire suas dúvidas' },
    { num: '3', title: 'Confirme o pedido', desc: 'Pagamento seguro' },
    { num: '4', title: 'Receba em casa', desc: 'Envio imediato' },
  ]

  return (
    <div style={styles.page}>
      {/* Hero */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <button onClick={() => onNavigate('home')} style={styles.backButton}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Voltar
          </button>
          <h1 style={styles.heroTitle}>Conheça a QB Home</h1>
          <p style={styles.heroSubtitle}>
            Transformamos casas em lares com produtos de qualidade, confiança e praticidade.
          </p>
        </div>
      </section>

      {/* Nossa História */}
      <section style={styles.section}>
        <div style={{
          ...styles.container,
          ...(isMobile ? { padding: '0 1rem' } : {}),
        }}>
          <div style={{
            ...styles.historyGrid,
            ...(isMobile ? { flexDirection: 'column' } : {}),
          }}>
            <div style={styles.historyText}>
              <span style={styles.sectionBadge}>NOSSA HISTÓRIA</span>
              <h2 style={styles.sectionTitle}>De onde viemos, para onde vamos</h2>
              <p style={styles.historyPara}>
                A QB Home nasceu de uma ideia simples: oferecer produtos de qualidade para o lar, com atendimento humanizado e preços acessíveis. Começamos pequeno, mas com muita vontade de fazer a diferença na vida das pessoas.
              </p>
              <p style={styles.historyPara}>
                Hoje, atendemos clientes em todo o Brasil, entregando mais do que produtos — entregamos confiança, segurança e a certeza de que cada compra foi feita com cuidado. Nosso compromisso é continuar evoluindo, trazendo sempre o melhor para sua casa.
              </p>
            </div>
            <div style={styles.historyVisual}>
              <svg width="100%" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" style={styles.historySvg}>
                <rect width="400" height="300" fill="#F0FDF4" rx="16"/>
                <rect x="100" y="60" width="200" height="140" rx="12" fill="#0D9488" opacity="0.15"/>
                <rect x="130" y="90" width="140" height="80" rx="8" fill="#0D9488" opacity="0.25"/>
                <text x="200" y="135" textAnchor="middle" fill="#0D9488" fontSize="24" fontWeight="800" fontFamily="sans-serif">QB Home</text>
                <text x="200" y="155" textAnchor="middle" fill="#0D9488" fontSize="12" fontFamily="sans-serif">Casa & Decoração</text>
                <rect x="120" y="220" width="60" height="8" rx="4" fill="#0D9488" opacity="0.2"/>
                <rect x="170" y="220" width="40" height="8" rx="4" fill="#0D9488" opacity="0.2"/>
                <rect x="240" y="220" width="50" height="8" rx="4" fill="#0D9488" opacity="0.2"/>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section style={{...styles.section, background: '#F8FAFC'}}>
        <div style={{
          ...styles.container,
          ...(isMobile ? { padding: '0 1rem' } : {}),
        }}>
          <div style={styles.headerCenter}>
            <span style={styles.sectionBadge}>NOSSOS VALORES</span>
            <h2 style={styles.sectionTitle}>O que nos move</h2>
          </div>
          <div style={{
            ...styles.valuesGrid,
            ...(isMobile ? { gridTemplateColumns: '1fr', gap: '1rem' } : {}),
          }}>
            {values.map((v, i) => (
              <div key={i} style={styles.valueCard}>
                <div style={styles.valueIcon}>{v.icon}</div>
                <h3 style={styles.valueTitle}>{v.title}</h3>
                <p style={styles.valueDesc}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Números */}
      <section style={styles.metricsSection}>
        <div style={{
          ...styles.container,
          ...(isMobile ? { padding: '0 1rem' } : {}),
        }}>
          <div style={{
            ...styles.metricsGrid,
            ...(isMobile ? { flexDirection: 'column', gap: '1.5rem' } : {}),
          }}>
            {metrics.map((m, i) => (
              <div key={i} style={styles.metricItem}>
                <div style={styles.metricValue}>{m.value}</div>
                <div style={styles.metricLabel}>{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section style={styles.section}>
        <div style={{
          ...styles.container,
          ...(isMobile ? { padding: '0 1rem' } : {}),
        }}>
          <div style={styles.headerCenter}>
            <span style={styles.sectionBadge}>COMO FUNCIONA</span>
            <h2 style={styles.sectionTitle}>Simples, rápido e seguro</h2>
          </div>
          <div style={{
            ...styles.stepsGrid,
            ...(isMobile ? { flexDirection: 'column', gap: '1rem' } : {}),
          }}>
            {steps.map((s, i) => (
              <div key={i} style={styles.stepItem}>
                <div style={styles.stepNum}>{s.num}</div>
                <h4 style={styles.stepTitle}>{s.title}</h4>
                <p style={styles.stepDesc}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={styles.ctaSection}>
        <div style={styles.ctaContent}>
          <h2 style={styles.ctaTitle}>Quer saber mais?</h2>
          <p style={styles.ctaSubtitle}>Fale com a nossa equipe. Estamos prontos para te atender!</p>
          <button onClick={handleWhatsApp} style={styles.ctaButton}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.347-.72.598-.822.719a10.64 10.64 0 01-2.107.44c-.267.11-.535.15-.795.15a.91.91 0 01-.67-.372c-.125-.198-1.317-1.156-1.433-2.285-.114-.568-.06-.97.075-1.116.134-.145.299-.174.46-.174h.41c.2 0 .52-.032.746-.213.226-.181.548-.477.623-.646.075-.168.037-.31-.02-.43-.058-.125-.168-.37-.23-.5-.061-.129-.308-.206-.424-.206h-.52c-.135 0-.32.045-.488.213.103.32.294.62.504.839.209.22.478.388.778.479.3.092.628.107.904.107.276 0 .631-.06.908-.232.276-.173.454-.437.546-.72.092-.283.103-.59.103-.885.003-.295-.031-.65-.154-1.065l-.422-.717c-.142-.238-.285-.42-.447-.644a2.33 2.33 0 01.086-.782c.046-.181.023-.36-.02-.53-.044-.17-.164-.36-.328-.495l-.515-.432c-.21-.174-.446-.285-.688-.313-.241-.028-.49-.035-.742-.011a6.57 6.57 0 01-1.02.074c-.279.035-.59.02-.853.043-.264.024-.536.11-.757.22-.22.108-.387.257-.545.404-.158.147-.285.318-.39.515a4.33 4.33 0 01-.176.82c-.038.204-.037.43.015.649.053.22.16.425.276.62z"/>
            </svg>
            Falar no WhatsApp
          </button>
        </div>
      </section>
    </div>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    background: '#FFFFFF',
  },
  /* Hero */
  hero: {
    background: 'linear-gradient(135deg, #0D9488 0%, #0891B2 100%)',
    padding: '5rem 0 4rem',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  heroContent: {
    position: 'relative',
    zIndex: 1,
    maxWidth: '700px',
    margin: '0 auto',
    padding: '0 1.5rem',
  },
  backButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.375rem',
    padding: '0.5rem 1rem',
    background: 'rgba(255,255,255,0.15)',
    border: '1px solid rgba(255,255,255,0.25)',
    borderRadius: '0.5rem',
    color: 'white',
    fontSize: '0.875rem',
    fontWeight: '500',
    cursor: 'pointer',
    marginBottom: '1.5rem',
  },
  heroTitle: {
    fontSize: 'clamp(2rem, 4vw, 3rem)',
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: '1rem',
  },
  heroSubtitle: {
    fontSize: '1.125rem',
    color: 'rgba(255,255,255,0.85)',
    lineHeight: 1.7,
  },
  /* Sections */
  section: {
    padding: '4rem 0',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 2rem',
  },
  sectionBadge: {
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
  sectionTitle: {
    fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: '0.5rem',
  },
  headerCenter: {
    textAlign: 'center',
    marginBottom: '3rem',
  },
  /* História */
  historyGrid: {
    display: 'flex',
    gap: '3rem',
    alignItems: 'center',
  },
  historyText: {
    flex: '1',
  },
  historyPara: {
    fontSize: '1rem',
    color: '#475569',
    lineHeight: 1.8,
    marginBottom: '1.25rem',
  },
  historyVisual: {
    flex: '1',
  },
  historySvg: {
    width: '100%',
    height: 'auto',
    borderRadius: '1rem',
  },
  /* Valores */
  valuesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '1.5rem',
  },
  valueCard: {
    padding: '2rem 1.5rem',
    background: 'white',
    borderRadius: '1rem',
    textAlign: 'center',
    boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
    border: '1px solid #F1F5F9',
  },
  valueIcon: {
    marginBottom: '1rem',
  },
  valueTitle: {
    fontSize: '1.125rem',
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: '0.5rem',
  },
  valueDesc: {
    fontSize: '0.9375rem',
    color: '#64748B',
    lineHeight: 1.6,
  },
  /* Métricas */
  metricsSection: {
    background: '#0F172A',
    padding: '4rem 0',
  },
  metricsGrid: {
    display: 'flex',
    justifyContent: 'space-around',
    textAlign: 'center',
  },
  metricItem: {},
  metricValue: {
    fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
    fontWeight: '800',
    color: '#0D9488',
    marginBottom: '0.25rem',
  },
  metricLabel: {
    fontSize: '1rem',
    color: '#94A3B8',
  },
  /* Passos */
  stepsGrid: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '1.5rem',
  },
  stepItem: {
    flex: '1',
    textAlign: 'center',
  },
  stepNum: {
    width: '48px',
    height: '48px',
    background: 'linear-gradient(135deg, #0D9488 0%, #0891B2 100%)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '1.25rem',
    fontWeight: '700',
    margin: '0 auto 1rem',
  },
  stepTitle: {
    fontSize: '1.0625rem',
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: '0.375rem',
  },
  stepDesc: {
    fontSize: '0.875rem',
    color: '#64748B',
  },
  /* CTA */
  ctaSection: {
    background: 'linear-gradient(135deg, #f0fdfa 0%, #e0f7f7 100%)',
    padding: '4rem 0',
    textAlign: 'center',
  },
  ctaContent: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '0 1.5rem',
  },
  ctaTitle: {
    fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: '0.75rem',
  },
  ctaSubtitle: {
    fontSize: '1.0625rem',
    color: '#475569',
    marginBottom: '1.5rem',
  },
  ctaButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '1rem 1.875rem',
    background: '#25D366',
    border: 'none',
    borderRadius: '0.75rem',
    color: 'white',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    boxShadow: '0 12px 35px rgba(37,211,102,0.3)',
  },
}

export default SobreNos