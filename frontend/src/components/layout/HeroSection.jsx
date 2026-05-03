import { useEffect } from 'react'
import heroImg from '../../assets/Logo_Produtos.png'
import { useIsMobile } from '../../hooks/useIsMobile'

const WHATSAPP_NUMBER = '5511999999999'

function HeroSection() {
  const isMobile = useIsMobile()

  const handleWhatsApp = () => {
    const message = encodeURIComponent('Olá! Vim pelo site da QB Home e gostaria de fazer um pedido. 😊')
    window.open('https://wa.me/' + WHATSAPP_NUMBER + '?text=' + message, '_blank')
  }

  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
      }
      @keyframes pulseDot {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.6; transform: scale(1.3); }
      }
      .whatsapp-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 16px 40px rgba(13,158,169,0.50) !important;
      }
    `
    document.head.appendChild(style)
    return () => { document.head.removeChild(style) }
  }, [])

  return (
    <section style={styles.section}>
      <svg style={styles.waveSvg} viewBox="0 0 1440 500" preserveAspectRatio="none">
        <path style={styles.wave1} d="M0,200 C180,320 360,80 540,180 C720,280 900,100 1080,200 C1260,300 1350,160 1440,220 L1440,500 L0,500 Z" />
        <path style={styles.wave2} d="M0,280 C200,180 400,360 600,280 C800,200 1000,340 1200,260 C1320,210 1400,300 1440,280 L1440,500 L0,500 Z" />
        <path style={styles.wave3} d="M0,380 C240,320 480,440 720,390 C960,340 1200,420 1440,380 L1440,500 L0,500 Z" />
      </svg>

      <div style={{
        ...styles.heroContainer,
        ...(isMobile ? styles.heroContainerMobile : {}),
      }}>
        <div style={{
          ...styles.content,
          ...(isMobile ? styles.contentMobile : {}),
        }}>
          <div style={{
            ...styles.badge,
            ...(isMobile ? { fontSize: '0.6875rem', padding: '0.375rem 0.625rem' } : {}),
          }}>
            <div style={styles.pulseDot}></div>
            <span>QUALIDADE QUE VOCÊ CONFIA</span>
          </div>
          
          <h1 style={{
            ...styles.title,
            ...(isMobile ? { fontSize: 'clamp(1.5rem, 6vw, 2.25rem)' } : {}),
          }}>
            <span style={styles.titleDark}>Tudo para sua casa, </span>
            <span style={styles.titleTeal}>com praticidade e economia!</span>
          </h1>
          
          <p style={{
            ...styles.subtitle,
            ...(isMobile ? { fontSize: '0.9375rem', marginBottom: '0.75rem' } : {}),
          }}>
            Produtos domésticos e de limpeza selecionados especialmente para você.
          </p>

          <div style={{
            ...styles.miniBadges,
            ...(isMobile ? styles.miniBadgesMobile : {}),
          }}>
            <div style={{
              ...styles.miniBadge,
              ...(isMobile ? styles.miniBadgeMobile : {}),
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0D9EA9" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
              <span>Entrega rápida</span>
            </div>
            <div style={{
              ...styles.miniBadge,
              ...(isMobile ? styles.miniBadgeMobile : {}),
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0D9EA9" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              <span>Compra segura</span>
            </div>
            <div style={{
              ...styles.miniBadge,
              ...(isMobile ? styles.miniBadgeMobile : {}),
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0D9EA9" strokeWidth="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
              <span>Produtos originais</span>
            </div>
          </div>

          <button onClick={handleWhatsApp} className="whatsapp-btn" style={{
            ...styles.button,
            ...(isMobile ? { width: '100%', maxWidth: '100%', padding: '0.75rem 1.25rem', fontSize: '0.8125rem' } : {}),
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.347-.72.598-.822.719a10.64 10.64 0 01-2.107.44c-.267.11-.535.15-.795.15a.91.91 0 01-.67-.372c-.125-.198-1.317-1.156-1.433-2.285-.114-.568-.06-.97.075-1.116.134-.145.299-.174.46-.174h.41c.2 0 .52-.032.746-.213.226-.181.548-.477.623-.646.075-.168.037-.31-.02-.43-.058-.125-.168-.37-.23-.5-.061-.129-.308-.206-.424-.206h-.52c-.135 0-.32.045-.488.213.103.32.294.62.504.839.209.22.478.388.778.479.3.092.628.107.904.107.276 0 .631-.06.908-.232.276-.173.454-.437.546-.72.092-.283.103-.59.103-.885.003-.295-.031-.65-.154-1.065l-.422-.717c-.142-.238-.285-.42-.447-.644a2.33 2.33 0 01.086-.782c.046-.181.023-.36-.02-.53-.044-.17-.164-.36-.328-.495l-.515-.432c-.21-.174-.446-.285-.688-.313-.241-.028-.49-.035-.742-.011a6.57 6.57 0 01-1.02.074c-.279.035-.59.02-.853.043-.264.024-.536.11-.757.22-.22.108-.387.257-.545.404-.158.147-.285.318-.39.515a4.33 4.33 0 01-.176.82c-.038.204-.037.43.015.649.053.22.16.425.276.62z"/>
            </svg>
            FAZER PEDIDO PELO WHATSAPP
          </button>
        </div>

        {/* Imagem como elemento flex normal, dentro do hero */}
        <img 
          src={heroImg} 
          alt="QB Home - Produtos" 
          style={{
            ...styles.heroImage,
            ...(isMobile ? styles.heroImageMobile : styles.heroImageDesktop),
          }}
        />
      </div>
    </section>
  )
}

const styles = {
  section: {
    position: 'relative',
    background: 'linear-gradient(135deg, #f8fffe 0%, #e6f7f7 35%, #d0efef 70%, #c2e8e8 100%)',
    overflow: 'hidden',
  },
  waveSvg: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 0,
  },
  wave1: {
    fill: 'rgba(13,158,169,0.08)',
  },
  wave2: {
    fill: 'rgba(13,158,169,0.12)',
  },
  wave3: {
    fill: '#FFFFFF',
    fillOpacity: '0.9',
  },
  heroContainer: {
    position: 'relative',
    zIndex: 1,
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '2rem',
    alignItems: 'center',
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '3rem 2rem',
  },
  heroContainerMobile: {
    display: 'flex',
    flexDirection: 'column',
    gridTemplateColumns: 'unset',
    alignItems: 'center',
    gap: '0',
    padding: '2.5rem 1.25rem 2.5rem',
    minHeight: '620px',
  },
  content: {
    maxWidth: '600px',
  },
  contentMobile: {
    maxWidth: '100%',
    textAlign: 'center',
    width: '100%',
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.625rem',
    padding: '0.5rem 1rem',
    background: 'rgba(13,158,169,0.05)',
    border: '2px solid #0D9EA9',
    borderRadius: '0.5rem',
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#0D9EA9',
    marginBottom: '1.25rem',
    letterSpacing: '0.05em',
    maxWidth: '100%',
  },
  pulseDot: {
    width: '8px',
    height: '8px',
    background: '#0D9EA9',
    borderRadius: '50%',
    animation: 'pulseDot 2s infinite',
    flexShrink: 0,
  },
  title: {
    fontSize: 'clamp(2rem, 3.5vw, 3.125rem)',
    fontWeight: '800',
    lineHeight: 1.2,
    marginBottom: '1rem',
  },
  titleDark: {
    color: '#0F172A',
  },
  titleTeal: {
    color: '#0D9EA9',
  },
  subtitle: {
    fontSize: '1.125rem',
    color: '#475569',
    lineHeight: 1.7,
    marginBottom: '1rem',
  },
  miniBadges: {
    display: 'flex',
    gap: '1.25rem',
    fontSize: '0.8125rem',
    fontWeight: '600',
    color: '#334155',
    marginBottom: '1.5rem',
  },
  miniBadgesMobile: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '1rem',
  },
  miniBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.375rem',
  },
  miniBadgeMobile: {
    justifyContent: 'center',
  },
  button: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '1rem 1.875rem',
    background: '#0D9EA9',
    border: 'none',
    borderRadius: '0.75rem',
    color: 'white',
    fontSize: '0.9375rem',
    fontWeight: '600',
    cursor: 'pointer',
    boxShadow: '0 12px 35px rgba(13,158,169,0.40)',
    transition: 'all 0.3s ease',
    justifyContent: 'center',
  },
  heroImage: {
    objectFit: 'contain',
    objectPosition: 'bottom',
    zIndex: 1,
  },
  heroImageDesktop: {
    width: '520px',
    maxWidth: '520px',
    filter: 'drop-shadow(0 30px 50px rgba(0,0,0,0.12))',
    animation: 'float 4s ease-in-out infinite',
  },
  heroImageMobile: {
    width: '280px',
    filter: 'drop-shadow(0 15px 30px rgba(0,0,0,0.10))',
    animation: 'none',
    margin: '0 auto',
  },
}

export default HeroSection