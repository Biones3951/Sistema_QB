import { useEffect } from 'react'
import heroImg from '../../assets/Logo_Produtos.png'

const WHATSAPP_NUMBER = '5511999999999'

function HeroSection() {
  const handleWhatsApp = () => {
    const message = encodeURIComponent('Olá! Vim pelo site da QB Home e gostaria de fazer um pedido. ')
    window.open('https://wa.me/' + WHATSAPP_NUMBER + '?text=' + message, '_blank')
  }

  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      @keyframes pulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.5; transform: scale(1.2); }
      }
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-12px); }
      }
      @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0px); }
      }
    `
    document.head.appendChild(style)
    return () => { document.head.removeChild(style) }
  }, [])

  return (
    <section style={styles.section}>
      <div style={styles.wave}></div>
      
      <div style={styles.container}>
        <div style={styles.content}>
          <div style={styles.badge}>
            <div style={styles.pulseDot}></div>
            QUALIDADE QUE VOCÊ CONFIA
          </div>
          
          <h1 style={styles.title}>
            <span style={styles.titleDark}>Tudo para sua casa,</span><br />
            <span style={styles.titleTeal}>com praticidade e economia!</span>
          </h1>
          
          <p style={styles.subtitle}>
            Produtos domésticos e de limpeza selecionados especialmente para você.
          </p>

          <div style={styles.miniBadges}>
            <span style={styles.miniBadge}>✓ Entrega rápida</span>
            <span style={styles.miniBadge}>🔒 Compra segura</span>
            <span style={styles.miniBadge}>⭐ Produtos originais</span>
          </div>

          <button onClick={handleWhatsApp} style={styles.button}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={styles.buttonIcon}>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.347-.72.598-.822.719a10.64 10.64 0 01-2.107.44c-.267.11-.535.15-.795.15a.91.91 0 01-.67-.372c-.125-.198-1.317-1.156-1.433-2.285-.114-.568-.06-.97.075-1.116.134-.145.299-.174.46-.174h.41c.2 0 .52-.032.746-.213.226-.181.548-.477.623-.646.075-.168.037-.31-.02-.43-.058-.125-.168-.37-.23-.5-.061-.129-.308-.206-.424-.206h-.52c-.135 0-.32.045-.488.213.103.32.294.62.504.839.209.22.478.388.778.479.3.092.628.107.904.107.276 0 .631-.06.908-.232.276-.173.454-.437.546-.72.092-.283.103-.59.103-.885.003-.295-.031-.65-.154-1.065l-.422-.717c-.142-.238-.285-.42-.447-.644a2.33 2.33 0 01.086-.782c.046-.181.023-.36-.02-.53-.044-.17-.164-.36-.328-.495l-.515-.432c-.21-.174-.446-.285-.688-.313-.241-.028-.49-.035-.742-.011a6.57 6.57 0 01-1.02.074c-.279.035-.59.02-.853.043-.264.024-.536.11-.757.22-.22.108-.387.257-.545.404-.158.147-.285.318-.39.515a4.33 4.33 0 01-.176.82c-.038.204-.037.43.015.649.053.22.16.425.276.62z"/>
            </svg>
            FAZER PEDIDO PELO WHATSAPP
          </button>
        </div>

        <div style={styles.visual}>
          <div style={styles.decoCircle}></div>
          <img 
            src={heroImg} 
            alt="QB Home - Produtos" 
            style={styles.heroImage}
          />
        </div>
      </div>
    </section>
  )
}

const styles = {
  section: {
    position: 'relative',
    minHeight: '480px',
    display: 'flex',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #f0fafa 0%, #d4f1f1 50%, #b8e8e8 100%)',
    overflow: 'hidden',
    padding: '4rem 0',
  },
  wave: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '80px',
    background: '#FFFFFF',
    clipPath: 'ellipse(60% 100% at 50% 100%)',
  },
  container: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 2rem',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '4rem',
    alignItems: 'center',
    width: '100%',
  },
  content: {
    maxWidth: '600px',
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.625rem',
    padding: '0.5rem 1rem',
    border: '2px solid #0D9EA9',
    borderRadius: '0.5rem',
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#0D9EA9',
    marginBottom: '1.5rem',
    letterSpacing: '0.05em',
  },
  pulseDot: {
    width: '8px',
    height: '8px',
    background: '#0D9EA9',
    borderRadius: '50%',
    animation: 'pulse 2s infinite',
  },
  title: {
    fontSize: 'clamp(2.25rem, 4vw, 3.5rem)',
    fontWeight: '800',
    lineHeight: 1.15,
    marginBottom: '1.25rem',
  },
  titleDark: {
    color: '#0F172A',
  },
  titleTeal: {
    background: 'linear-gradient(135deg, #0D9EA9, #0891B2)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  subtitle: {
    fontSize: '1.125rem',
    color: '#475569',
    lineHeight: 1.7,
    marginBottom: '1.25rem',
  },
  miniBadges: {
    display: 'flex',
    gap: '1.5rem',
    fontSize: '0.8125rem',
    color: '#475569',
    fontWeight: '600',
    marginBottom: '1.75rem',
  },
  miniBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.375rem',
  },
  button: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.625rem',
    padding: '1rem 2rem',
    background: '#0D9EA9',
    border: 'none',
    borderRadius: '0.75rem',
    color: 'white',
    fontSize: '0.9375rem',
    fontWeight: '600',
    cursor: 'pointer',
    boxShadow: '0 12px 35px rgba(13,158,169,0.40)',
    transition: 'all 0.3s ease',
  },
  buttonIcon: {
    flexShrink: 0,
  },
  visual: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  decoCircle: {
    position: 'absolute',
    width: '500px',
    height: '500px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(13,158,169,0.15) 0%, transparent 70%)',
    zIndex: 0,
  },
  heroImage: {
    width: '100%',
    maxWidth: '650px',
    objectFit: 'contain',
    objectPosition: 'bottom',
    filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.15))',
    animation: 'float 4s ease-in-out infinite',
    position: 'relative',
    zIndex: 1,
  },
}

export default HeroSection