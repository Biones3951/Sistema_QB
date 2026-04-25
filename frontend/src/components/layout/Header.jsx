import { useState, useEffect } from 'react'
import { useCart } from '../../context/CartContext'

function Header() {
  const { getItemCount, getTotal } = useCart()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const itemCount = getItemCount()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  return (
    <header style={styles.wrapper}>
      {/* Topbar */}
      <div style={styles.topbar}>
        <div style={styles.topbarContent}>
          <div style={styles.topbarLeft}>
            <span style={styles.topbarItem}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
              Entrega rápida para todo Brasil
            </span>
            <span style={styles.topbarDivider}>|</span>
            <span style={styles.topbarItem}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
              </svg>
              Produtos de qualidade
            </span>
          </div>
          <div style={styles.topbarRight}>
            <a href="https://wa.me/5511999999999" target="_blank" style={styles.topbarItem}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.347-.72.598-.822.719a10.64 10.64 0 01-2.107.44c-.267.11-.535.15-.795.15a.91.91 0 01-.67-.372c-.125-.198-1.317-1.156-1.433-2.285-.114-.568-.06-.97.075-1.116.134-.145.299-.174.46-.174h.41c.2 0 .52-.032.746-.213.226-.181.548-.477.623-.646.075-.168.037-.31-.02-.43-.058-.125-.168-.37-.23-.5-.061-.129-.308-.206-.424-.206h-.52c-.135 0-.32.045-.488.213.103.32.294.62.504.839.209.22.478.388.778.479.3.092.628.107.904.107.276 0 .631-.06.908-.232.276-.173.454-.437.546-.72.092-.283.103-.59.103-.885.003-.295-.031-.65-.154-1.065l-.422-.717c-.142-.238-.285-.42-.447-.644a2.33 2.33 0 01.086-.782c.046-.181.023-.36-.02-.53-.044-.17-.164-.36-.328-.495l-.515-.432c-.21-.174-.446-.285-.688-.313-.241-.028-.49-.035-.742-.011a6.57 6.57 0 01-1.02.074c-.279.035-.59.02-.853.043-.264.024-.536.11-.757.22-.22.108-.387.257-.545.404-.158.147-.285.318-.39.515a4.33 4.33 0 01-.176.82c-.038.204-.037.43.015.649.053.22.16.425.276.62z"/>
              </svg>
              Atendimento WhatsApp
            </a>
            <span style={styles.topbarDivider}>|</span>
            <span style={styles.topbarItem}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
              Seg a Sáb: 8h às 20h
            </span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div style={{...styles.mainHeader, ...(scrolled ? styles.scrolled : {})}}>
        <div style={styles.headerContent}>
          {/* Logo */}
          <a href="#" style={styles.logo}>
            <div style={styles.logoIcon}>Q</div>
            <div style={styles.logoText}>
              <span style={styles.logoName}>QB Home</span>
              <span style={styles.logoTagline}>Casa & Decoração</span>
            </div>
          </a>

          {/* Nav */}
          <nav style={{...styles.nav, ...(menuOpen ? styles.navOpen : {})}}>
            <a href="#" style={styles.navLink}>Início</a>
            <a href="#produtos" style={styles.navLink}>Produtos</a>
            <a href="#categorias" style={styles.navLink}>Categorias</a>
            <a href="#sobre" style={styles.navLink}>Sobre nós</a>
            <a href="#contato" style={styles.navLink}>Contato</a>
          </nav>

          {/* Cart */}
          <button 
            onClick={() => window.dispatchEvent(new CustomEvent('toggleCart'))}
            style={styles.cartButton}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            <span style={styles.cartText}>Carrinho</span>
            {itemCount > 0 && <span style={styles.cartBadge}>{itemCount}</span>}
            <span style={styles.cartTotal}>{formatPrice(getTotal())}</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button style={styles.menuToggle} onClick={() => setMenuOpen(!menuOpen)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {menuOpen ? <><line x1="18" y1="6" x2="6"/><line x1="18" y1="18" x2="6"/></> : <><line x1="3" y1="12" x2="21"/><line x1="3" y1="6" x2="21"/><line x1="3" y1="18" x2="21"/></>}
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}

const styles = {
  wrapper: {
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  topbar: {
    background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
    padding: '0.5rem 0',
  },
  topbarContent: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topbarLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  topbarRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  topbarItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: '#CBD5E1',
    fontSize: '0.75rem',
    textDecoration: 'none',
  },
  topbarDivider: {
    color: '#334155',
  },
  mainHeader: {
    background: 'white',
    borderBottom: '1px solid #F1F5F9',
    transition: 'all 0.3s ease',
  },
  scrolled: {
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
  },
  headerContent: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '1rem 2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    textDecoration: 'none',
  },
  logoIcon: {
    width: '44px',
    height: '44px',
    background: 'linear-gradient(135deg, #0D9EA9 0%, #06B6D4 100%)',
    borderRadius: '0.75rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
    color: '#0F172A',
    lineHeight: 1.2,
  },
  logoTagline: {
    fontSize: '0.6875rem',
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
  },
  navOpen: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    background: 'white',
    padding: '1rem',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  },
  navLink: {
    padding: '0.625rem 1rem',
    color: '#64748B',
    textDecoration: 'none',
    fontSize: '0.9375rem',
    fontWeight: '500',
    borderRadius: '0.5rem',
    transition: 'all 0.2s',
  },
  cartButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.625rem 1rem',
    background: '#F1F5F9',
    border: 'none',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    color: '#0F172A',
    fontSize: '0.875rem',
    fontWeight: '600',
  },
  cartText: {
    color: '#64748B',
  },
  cartBadge: {
    background: '#0D9EA9',
    color: 'white',
    padding: '0.125rem 0.5rem',
    borderRadius: '9999px',
    fontSize: '0.6875rem',
    fontWeight: '700',
  },
  cartTotal: {
    color: '#0D9EA9',
    fontWeight: '700',
  },
  menuToggle: {
    display: 'none',
    padding: '0.5rem',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
  },
}

export default Header