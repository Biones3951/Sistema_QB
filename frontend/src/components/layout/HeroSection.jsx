function HeroSection() {
  return (
    <section style={styles.section}>
      {/* Background */}
      <div style={styles.bgPattern}></div>
      <div style={styles.bgGlow1}></div>
      <div style={styles.bgGlow2}></div>
      
      {/* Floating Shapes */}
      <div style={styles.float1}></div>
      <div style={styles.float2}></div>
      <div style={styles.float3}></div>

      <div style={styles.container}>
        {/* Left Content */}
        <div style={styles.content}>
          <div style={styles.badge}>
            <span style={styles.badgeDot}></span>
            ✨ Tudo para sua casa
          </div>
          
          <h1 style={styles.title}>
            Tudo para sua casa, com <span style={styles.highlight}>praticidade</span> e <span style={styles.highlight}>economia</span>!
          </h1>
          
          <p style={styles.subtitle}>
            Transformamos sua casa em um lar perfeito com produtos selecionados, 
            design moderno e preços que cabem no seu orçamento.
          </p>

          <div style={styles.ctas}>
            <a href="#produtos" style={styles.ctaPrimary}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.347-.72.598-.822.719a10.64 10.64 0 01-2.107.44c-.267.11-.535.15-.795.15a.91.91 0 01-.67-.372c-.125-.198-1.317-1.156-1.433-2.285-.114-.568-.06-.97.075-1.116.134-.145.299-.174.46-.174h.41c.2 0 .52-.032.746-.213.226-.181.548-.477.623-.646.075-.168.037-.31-.02-.43-.058-.125-.168-.37-.23-.5-.061-.129-.308-.206-.424-.206h-.52c-.135 0-.32.045-.488.213.103.32.294.62.504.839.209.22.478.388.778.479.3.092.628.107.904.107.276 0 .631-.06.908-.232.276-.173.454-.437.546-.72.092-.283.103-.59.103-.885.003-.295-.031-.65-.154-1.065l-.422-.717c-.142-.238-.285-.42-.447-.644a2.33 2.33 0 01.086-.782c.046-.181.023-.36-.02-.53-.044-.17-.164-.36-.328-.495l-.515-.432c-.21-.174-.446-.285-.688-.313-.241-.028-.49-.035-.742-.011a6.57 6.57 0 01-1.02.074c-.279.035-.59.02-.853.043-.264.024-.536.11-.757.22-.22.108-.387.257-.545.404-.158.147-.285.318-.39.515a4.33 4.33 0 01-.176.82c-.038.204-.037.43.015.649.053.22.16.425.276.62z"/>
              </svg>
              Pedir no WhatsApp
            </a>
            <a href="#produtos" style={styles.ctaSecondary}>
              Ver Catálogo
            </a>
          </div>

          <div style={styles.benefits}>
            <div style={styles.benefitItem}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
              <span>Entrega rápida</span>
            </div>
            <div style={styles.benefitItem}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              <span>Compra 100% segura</span>
            </div>
            <div style={styles.benefitItem}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
              </svg>
              <span>Atendimento humanizado</span>
            </div>
          </div>
        </div>

        {/* Right Visual */}
        <div style={styles.visual}>
          <div style={styles.visualWrapper}>
            {/* Product Cards */}
            <div style={styles.productCard1}>
              <div style={styles.productImage1}></div>
              <div style={styles.productInfo}>
                <span style={styles.productName}>Decoração</span>
                <span style={styles.productPrice}>R$ 189,90</span>
              </div>
            </div>
            
            <div style={styles.productCard2}>
              <div style={styles.productImage2}></div>
              <div style={styles.productInfo}>
                <span style={styles.productName}>Móveis</span>
                <span style={styles.productPrice}>R$ 599,90</span>
              </div>
            </div>
            
            <div style={styles.productCard3}>
              <div style={styles.productImage3}></div>
              <div style={styles.productInfo}>
                <span style={styles.productName}>Iluminação</span>
                <span style={styles.productPrice}>R$ 129,90</span>
              </div>
            </div>

            {/* Floating Badge */}
            <div style={styles.floatingBadge}>
              <div style={styles.floatingBadgeIcon}>✓</div>
              <div>
                <span style={styles.floatingBadgeTitle}>Frete Grátis</span>
                <span style={styles.floatingBadgeSubtitle}>Acima de R$ 199</span>
              </div>
            </div>

            {/* Decorative Elements */}
            <div style={styles.decoCircle1}></div>
            <div style={styles.decoCircle2}></div>
          </div>
        </div>
      </div>
    </section>
  )
}

const styles = {
  section: {
    position: 'relative',
    padding: '6rem 0',
    background: 'linear-gradient(180deg, #FAFCFD 0%, #F1F5F9 100%)',
    overflow: 'hidden',
  },
  bgPattern: {
    position: 'absolute',
    inset: 0,
    backgroundImage: 'radial-gradient(circle at 1px 1px, #E2E8F0 1px, transparent 1px)',
    backgroundSize: '32px 32px',
    opacity: 0.5,
  },
  bgGlow1: {
    position: 'absolute',
    top: '-30%',
    left: '-10%',
    width: '600px',
    height: '600px',
    background: 'radial-gradient(circle, rgba(13, 158, 169, 0.12) 0%, transparent 70%)',
    borderRadius: '50%',
  },
  bgGlow2: {
    position: 'absolute',
    bottom: '-20%',
    right: '-10%',
    width: '500px',
    height: '500px',
    background: 'radial-gradient(circle, rgba(6, 182, 212, 0.08) 0%, transparent 70%)',
    borderRadius: '50%',
  },
  float1: {
    position: 'absolute',
    top: '10%',
    left: '5%',
    width: '200px',
    height: '200px',
    background: 'linear-gradient(135deg, rgba(13, 158, 169, 0.1) 0%, transparent 70%)',
    borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
    animation: 'float 8s ease-in-out infinite',
  },
  float2: {
    position: 'absolute',
    bottom: '15%',
    right: '20%',
    width: '150px',
    height: '150px',
    background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.08) 0%, transparent 70%)',
    borderRadius: '50%',
    animation: 'float 6s ease-in-out infinite reverse',
  },
  float3: {
    position: 'absolute',
    top: '40%',
    right: '5%',
    width: '100px',
    height: '100px',
    background: 'linear-gradient(135deg, rgba(13, 158, 169, 0.08) 0%, transparent 70%)',
    borderRadius: '30% 70% 70% 30%',
    animation: 'float 7s ease-in-out infinite',
  },
  container: {
    position: 'relative',
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 2rem',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '4rem',
    alignItems: 'center',
    zIndex: 1,
  },
  content: {
    maxWidth: '620px',
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 1rem',
    background: 'rgba(13, 158, 169, 0.08)',
    borderRadius: '9999px',
    fontSize: '0.8125rem',
    fontWeight: '600',
    color: '#0D9EA9',
    marginBottom: '1.5rem',
  },
  badgeDot: {
    width: '6px',
    height: '6px',
    background: '#0D9EA9',
    borderRadius: '50%',
  },
  title: {
    fontSize: '3.5rem',
    fontWeight: '800',
    lineHeight: 1.1,
    color: '#0F172A',
    marginBottom: '1.5rem',
    letterSpacing: '-0.03em',
  },
  highlight: {
    background: 'linear-gradient(135deg, #0D9EA9 0%, #06B6D4 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  subtitle: {
    fontSize: '1.125rem',
    color: '#64748B',
    lineHeight: 1.7,
    marginBottom: '2rem',
  },
  ctas: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '3rem',
  },
  ctaPrimary: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.625rem',
    padding: '1rem 1.75rem',
    background: 'linear-gradient(135deg, #25D366 0%, #20BD5A 100%)',
    borderRadius: '0.75rem',
    color: 'white',
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: '600',
    boxShadow: '0 8px 30px rgba(37, 211, 102, 0.3)',
    transition: 'all 0.3s ease',
  },
  ctaSecondary: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '1rem 1.75rem',
    background: 'white',
    border: '1px solid #E2E8F0',
    borderRadius: '0.75rem',
    color: '#0F172A',
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: '600',
    transition: 'all 0.3s ease',
  },
  benefits: {
    display: 'flex',
    gap: '2rem',
  },
  benefitItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.875rem',
    color: '#64748B',
  },
  visual: {
    display: 'flex',
    justifyContent: 'center',
  },
  visualWrapper: {
    position: 'relative',
    width: '500px',
    height: '500px',
  },
  productCard1: {
    position: 'absolute',
    top: '5%',
    left: '5%',
    width: '180px',
    padding: '0.75rem',
    background: 'white',
    borderRadius: '1rem',
    boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.15)',
    zIndex: 2,
  },
  productImage1: {
    width: '100%',
    height: '140px',
    background: 'linear-gradient(135deg, #E0F7FA 0%, #B2EBF2 100%)',
    borderRadius: '0.5rem',
    marginBottom: '0.75rem',
  },
  productCard2: {
    position: 'absolute',
    top: '25%',
    right: '2%',
    width: '160px',
    padding: '0.75rem',
    background: 'white',
    borderRadius: '1rem',
    boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.15)',
    zIndex: 3,
  },
  productImage2: {
    width: '100%',
    height: '120px',
    background: 'linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%)',
    borderRadius: '0.5rem',
    marginBottom: '0.75rem',
  },
  productCard3: {
    position: 'absolute',
    bottom: '15%',
    left: '20%',
    width: '170px',
    padding: '0.75rem',
    background: 'white',
    borderRadius: '1rem',
    boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.15)',
    zIndex: 2,
  },
  productImage3: {
    width: '100%',
    height: '130px',
    background: 'linear-gradient(135deg, #FFF3E0 0%, #FFE0B2 100%)',
    borderRadius: '0.5rem',
    marginBottom: '0.75rem',
  },
  productInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
  },
  productName: {
    fontSize: '0.8125rem',
    fontWeight: '600',
    color: '#0F172A',
  },
  productPrice: {
    fontSize: '0.9375rem',
    fontWeight: '700',
    color: '#0D9EA9',
  },
  floatingBadge: {
    position: 'absolute',
    bottom: '25%',
    right: '15%',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.875rem 1rem',
    background: 'white',
    borderRadius: '0.75rem',
    boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.12)',
    zIndex: 4,
  },
  floatingBadgeIcon: {
    width: '32px',
    height: '32px',
    background: 'linear-gradient(135deg, #0D9EA9 0%, #06B6D4 100%)',
    borderRadius: '0.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: '700',
  },
  floatingBadgeTitle: {
    display: 'block',
    fontSize: '0.8125rem',
    fontWeight: '600',
    color: '#0F172A',
  },
  floatingBadgeSubtitle: {
    display: 'block',
    fontSize: '0.6875rem',
    color: '#64748B',
  },
  decoCircle1: {
    position: 'absolute',
    top: '-5%',
    right: '-5%',
    width: '250px',
    height: '250px',
    border: '2px dashed rgba(13, 158, 169, 0.15)',
    borderRadius: '50%',
  },
  decoCircle2: {
    position: 'absolute',
    bottom: '-10%',
    left: '-10%',
    width: '150px',
    height: '150px',
    border: '2px dashed rgba(6, 182, 212, 0.1)',
    borderRadius: '50%',
  },
}

export default HeroSection