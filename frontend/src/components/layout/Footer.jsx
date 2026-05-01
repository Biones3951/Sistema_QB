import { useIsMobile } from '../../hooks/useIsMobile'
import logo from '../../assets/logo.jpg'

function Footer() {
  const isMobile = useIsMobile()

  return (
    <footer style={styles.footer} id="contato">
      <div style={{
        ...styles.container,
        ...(isMobile ? { padding: '0 1rem' } : {}),
      }}>
        <div style={{
          ...styles.grid,
          ...(isMobile ? {
            gridTemplateColumns: '1fr',
            gap: '2rem',
            marginBottom: '2rem',
          } : {}),
        }}>
          {/* Brand & Description */}
          <div style={styles.col}>
            <a href="#" style={styles.logo}>
              <img src={logo} alt="QB Home" style={styles.logoImg} />
            </a>
            <p style={styles.desc}>
              Sua loja online de produtos para casa e decoração. Qualidade e praticidade para seu lar.
            </p>
          </div>

          {/* Institucional */}
          <div style={styles.col}>
            <h4 style={styles.title}>Institucional</h4>
            <a href="#sobre" style={styles.link}>Sobre nós</a>
            <a href="#" style={styles.link}>Política de Privacidade</a>
            <a href="#" style={styles.link}>Trocas e Devoluções</a>
            <a href="#" style={styles.link}>Termos de Uso</a>
          </div>

          {/* Atendimento */}
          <div style={styles.col}>
            <h4 style={styles.title}>Atendimento</h4>
            <p style={styles.info}>Seg - Sex: 08h às 18h</p>
            <a href="https://wa.me/5511999999999" style={styles.link}>WhatsApp</a>
            <a href="mailto:contato@qbhome.com.br" style={styles.link}>contato@qbhome.com.br</a>
          </div>

          {/* Siga-nos */}
          <div style={styles.col}>
            <h4 style={styles.title}>Siga-nos</h4>
            <div style={styles.social}>
              <a href="https://instagram.com" target="_blank" style={{...styles.socialBtn, background: '#E1306C'}}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.012-3.584.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.947.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.947-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="https://wa.me/5511999999999" target="_blank" style={{...styles.socialBtn, background: '#25D366'}}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.347-.72.598-.822.719a10.64 10.64 0 01-2.107.44c-.267.11-.535.15-.795.15a.91.91 0 01-.67-.372c-.125-.198-1.317-1.156-1.433-2.285-.114-.568-.06-.97.075-1.116.134-.145.299-.174.46-.174h.41c.2 0 .52-.032.746-.213.226-.181.548-.477.623-.646.075-.168.037-.31-.02-.43-.058-.125-.168-.37-.23-.5-.061-.129-.308-.206-.424-.206h-.52c-.135 0-.32.045-.488.213.103.32.294.62.504.839.209.22.478.388.778.479.3.092.628.107.904.107.276 0 .631-.06.908-.232.276-.173.454-.437.546-.72.092-.283.103-.59.103-.885.003-.295-.031-.65-.154-1.065l-.422-.717c-.142-.238-.285-.42-.447-.644a2.33 2.33 0 01.086-.782c.046-.181.023-.36-.02-.53-.044-.17-.164-.36-.328-.495l-.515-.432c-.21-.174-.446-.285-.688-.313-.241-.028-.49-.035-.742-.011a6.57 6.57 0 01-1.02.074c-.279.035-.59.02-.853.043-.264.024-.536.11-.757.22-.22.108-.387.257-.545.404-.158.147-.285.318-.39.515a4.33 4.33 0 01-.176.82c-.038.204-.037.43.015.649.053.22.16.425.276.62z"/>
                </svg>
              </a>
            </div>
            <a href="http://localhost:8000/panel/login/" target="_blank" style={styles.adminLink}>Área Restrita</a>
          </div>
        </div>

        <div style={styles.bottom}>
          <p style={styles.copyright}>© 2024 QB Home. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

const styles = {
  footer: {
    background: '#0F172A',
    color: 'white',
    padding: '4rem 0 2rem',
  },
  container: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 2rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1.5fr 1fr 1fr 1fr',
    gap: '3rem',
    marginBottom: '3rem',
  },
  col: {},
  logo: {
    display: 'block',
    textDecoration: 'none',
    marginBottom: '1rem',
  },
  logoImg: {
    height: '44px',
    width: 'auto',
  },
  desc: {
    fontSize: '0.875rem',
    color: '#94A3B8',
    lineHeight: 1.6,
  },
  title: {
    fontSize: '0.875rem',
    fontWeight: '700',
    color: 'white',
    marginBottom: '1rem',
  },
  link: {
    display: 'block',
    fontSize: '0.875rem',
    color: '#94A3B8',
    textDecoration: 'none',
    marginBottom: '0.5rem',
  },
  info: {
    fontSize: '0.875rem',
    color: '#94A3B8',
    marginBottom: '0.5rem',
  },
  social: {
    display: 'flex',
    gap: '0.75rem',
    marginBottom: '1rem',
  },
  socialBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    borderRadius: '0.5rem',
    textDecoration: 'none',
  },
  adminLink: {
    fontSize: '0.75rem',
    color: '#64748B',
    textDecoration: 'none',
    opacity: 0.6,
  },
  bottom: {
    paddingTop: '2rem',
    borderTop: '1px solid #1E293B',
  },
  copyright: {
    fontSize: '0.8125rem',
    color: '#64748B',
    textAlign: 'center',
  },
}

export default Footer