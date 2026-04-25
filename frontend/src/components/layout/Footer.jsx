function Footer() {
  return (
    <footer style={styles.footer} id="contato">
      {/* Main Footer */}
      <div style={styles.footerMain}>
        <div style={styles.container}>
          <div style={styles.grid}>
            {/* Brand Column */}
            <div style={styles.brandCol}>
              <a href="#" style={styles.logo}>
                <div style={styles.logoIcon}>
                  <span style={styles.logoLetter}>Q</span>
                </div>
                <div style={styles.logoText}>
                  <span style={styles.logoName}>QB Home</span>
                  <span style={styles.logoTagline}>Casa & Decoração</span>
                </div>
              </a>
              <p style={styles.brandDesc}>
                Sua loja de confiança para produtos de qualidade para o lar. 
                Entregamos em todo o Brasil com segurança e rapidez.
              </p>
              <div style={styles.socialLinks}>
                <a href="#" style={styles.socialLink} aria-label="WhatsApp">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.347-.72.598-.822.719a10.64 10.64 0 01-2.107.44c-.267.11-.535.15-.795.15a.91.91 0 01-.67-.372c-.125-.198-1.317-1.156-1.433-2.285-.114-.568-.06-.97.075-1.116.134-.145.299-.174.46-.174h.41c.2 0 .52-.032.746-.213.226-.181.548-.477.623-.646.075-.168.037-.31-.02-.43-.058-.125-.168-.37-.23-.5-.061-.129-.308-.206-.424-.206h-.52c-.135 0-.32.045-.488.213.103.32.294.62.504.839.209.22.478.388.778.479.3.092.628.107.904.107.276 0 .631-.06.908-.232.276-.173.454-.437.546-.72.092-.283.103-.59.103-.885.003-.295-.031-.65-.154-1.065l-.422-.717c-.142-.238-.285-.42-.447-.644a2.33 2.33 0 01.086-.782c.046-.181.023-.36-.02-.53-.044-.17-.164-.36-.328-.495l-.515-.432c-.21-.174-.446-.285-.688-.313-.241-.028-.49-.035-.742-.011a6.57 6.57 0 01-1.02.074c-.279.035-.59.02-.853.043-.264.024-.536.11-.757.22-.22.108-.387.257-.545.404-.158.147-.285.318-.39.515a4.33 4.33 0 01-.176.82c-.038.204-.037.43.015.649.053.22.16.425.276.62z"/>
                  </svg>
                </a>
                <a href="#" style={styles.socialLink} aria-label="Instagram">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.012-3.584.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.947.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.947-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="#" style={styles.socialLink} aria-label="Facebook">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Links Column 1 */}
            <div style={styles.linksCol}>
              <h4 style={styles.linksTitle}>Navegação</h4>
              <a href="#" style={styles.link}>Início</a>
              <a href="#produtos" style={styles.link}>Produtos</a>
              <a href="#categorias" style={styles.link}>Categorias</a>
              <a href="#contato" style={styles.link}>Contato</a>
              <a href="http://localhost:8000/panel/login/" target="_blank" style={styles.linkFooter}>Área Restrita</a>
            </div>

            {/* Links Column 2 */}
            <div style={styles.linksCol}>
              <h4 style={styles.linksTitle}>Categorias</h4>
              <a href="#" style={styles.link}>Decoração</a>
              <a href="#" style={styles.link}>Móveis</a>
              <a href="#" style={styles.link}>Iluminação</a>
              <a href="#" style={styles.link}>Utensílios</a>
              <a href="#" style={styles.link}>Cortinas</a>
            </div>

            {/* Contact Column */}
            <div style={styles.contactCol}>
              <h4 style={styles.linksTitle}>Fale Conosco</h4>
              <div style={styles.contactItem}>
                <div style={styles.contactIcon}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div>
                  <span style={styles.contactLabel}>Endereço</span>
                  <span style={styles.contactValue}>São Paulo, SP - Brasil</span>
                </div>
              </div>
              <div style={styles.contactItem}>
                <div style={styles.contactIcon}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.31 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.31.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </div>
                <div>
                  <span style={styles.contactLabel}>Telefone</span>
                  <a href="tel:+5511999999999" style={styles.contactValue}>(11) 99999-9999</a>
                </div>
              </div>
              <div style={styles.contactItem}>
                <div style={styles.contactIcon}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <div>
                  <span style={styles.contactLabel}>Email</span>
                  <span style={styles.contactValue}>contato@qbhome.com.br</span>
                </div>
              </div>
              <div style={styles.contactItem}>
                <div style={styles.contactIcon}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                </div>
                <div>
                  <span style={styles.contactLabel}>Horário</span>
                  <span style={styles.contactValue}>Seg a Sáb: 8h às 20h</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={styles.footerBottom}>
        <div style={styles.container}>
          <div style={styles.bottomContent}>
            <p style={styles.copyright}>
              © 2026 QB Home. Todos os direitos reservados.
            </p>
            <div style={styles.legalLinks}>
              <a href="#" style={styles.legalLink}>Termos de Uso</a>
              <a href="#" style={styles.legalLink}>Política de Privacidade</a>
              <a href="#" style={styles.legalLink}>Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

const styles = {
  footer: {
    background: '#0F172A',
    color: 'white',
  },
  footerMain: {
    padding: '5rem 0 3rem',
    borderBottom: '1px solid #1E293B',
  },
  container: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 2rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1.5fr 1fr 1fr 1.5fr',
    gap: '4rem',
  },
  brandCol: {
    maxWidth: '300px',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    textDecoration: 'none',
    marginBottom: '1.25rem',
  },
  logoIcon: {
    width: '44px',
    height: '44px',
    background: 'linear-gradient(135deg, #0D9EA9 0%, #06B6D4 100%)',
    borderRadius: '0.75rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoLetter: {
    color: 'white',
    fontSize: '1.5rem',
    fontWeight: '800',
  },
  logoText: {
    display: 'flex',
    flexDirection: 'column',
  },
  logoName: {
    fontSize: '1.375rem',
    fontWeight: '700',
    color: 'white',
    lineHeight: 1.2,
  },
  logoTagline: {
    fontSize: '0.6875rem',
    color: '#94A3B8',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
  },
  brandDesc: {
    fontSize: '0.9375rem',
    color: '#94A3B8',
    lineHeight: 1.7,
    marginBottom: '1.5rem',
  },
  socialLinks: {
    display: 'flex',
    gap: '0.75rem',
  },
  socialLink: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '36px',
    height: '36px',
    background: '#1E293B',
    borderRadius: '0.5rem',
    color: '#94A3B8',
    transition: 'all 0.2s',
  },
  linksCol: {},
  linksTitle: {
    fontSize: '0.8125rem',
    fontWeight: '700',
    color: 'white',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    marginBottom: '1.5rem',
  },
  link: {
    display: 'block',
    fontSize: '0.9375rem',
    color: '#94A3B8',
    textDecoration: 'none',
    padding: '0.5rem 0',
    transition: 'color 0.2s',
  },
  linkFooter: {
    display: 'block',
    fontSize: '0.8125rem',
    color: '#64748B',
    textDecoration: 'none',
    padding: '0.5rem 0',
    opacity: 0.6,
    transition: 'all 0.2s',
    borderTop: '1px solid #1E293B',
    marginTop: '0.5rem',
    paddingTop: '1rem',
  },
  contactCol: {},
  contactItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.75rem',
    padding: '0.625rem 0',
  },
  contactIcon: {
    width: '32px',
    height: '32px',
    background: 'rgba(13, 158, 169, 0.15)',
    borderRadius: '0.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#0D9EA9',
    flexShrink: 0,
  },
  contactLabel: {
    display: 'block',
    fontSize: '0.6875rem',
    color: '#64748B',
    marginBottom: '0.125rem',
  },
  contactValue: {
    display: 'block',
    fontSize: '0.875rem',
    color: '#CBD5E1',
  },
  footerBottom: {
    padding: '1.5rem 0',
  },
  bottomContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  copyright: {
    fontSize: '0.8125rem',
    color: '#64748B',
  },
  legalLinks: {
    display: 'flex',
    gap: '1.5rem',
  },
  legalLink: {
    fontSize: '0.8125rem',
    color: '#64748B',
    textDecoration: 'none',
    transition: 'color 0.2s',
  },
}

export default Footer