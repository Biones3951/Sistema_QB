import { useState, useEffect } from 'react'
import { useCart } from '../../context/CartContext'
import { useIsMobile } from '../../hooks/useIsMobile'

function Header() {
  const { getItemCount, getTotal } = useCart()
  const isMobile = useIsMobile()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const itemCount = getItemCount()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  return (
    <header style={styles.wrapper}>
      {isMobile ? (
        <>
          {/* Mobile Topbar */}
          <div style={styles.mobileTopbar}>
            <a href="#" style={styles.mobileLogo}>
              <img src="/src/assets/logo.jpg" alt="QB Home" style={styles.mobileLogoImg} />
            </a>
            <div style={styles.mobileActions}>
              <button 
                onClick={() => window.dispatchEvent(new CustomEvent('toggleCart'))}
                style={styles.mobileCartBtn}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
                {itemCount > 0 && <span style={styles.cartBadge}>{itemCount}</span>}
              </button>
              <button onClick={() => setMenuOpen(!menuOpen)} style={styles.hamburger}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  {menuOpen ? (
                    <>
                      <line x1="18" y1="6" x2="6" />
                      <line x1="18" y1="18" x2="6" />
                    </>
                  ) : (
                    <>
                      <line x1="3" y1="12" x2="21" />
                      <line x1="3" y1="6" x2="21" />
                      <line x1="3" y1="18" x2="21" />
                    </>
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu Overlay */}
          {menuOpen && (
            <div style={styles.mobileOverlay} onClick={() => setMenuOpen(false)}>
              <nav style={styles.mobileNav} onClick={(e) => e.stopPropagation()}>
                <a href="#" onClick={() => setMenuOpen(false)} style={styles.mobileLink}>Início</a>
                <a href="#produtos" onClick={() => setMenuOpen(false)} style={styles.mobileLink}>Produtos</a>
                <a href="#categorias" onClick={() => setMenuOpen(false)} style={styles.mobileLink}>Categorias</a>
                <a href="#sobre" onClick={() => setMenuOpen(false)} style={styles.mobileLink}>Sobre nós</a>
                <a href="#contato" onClick={() => setMenuOpen(false)} style={styles.mobileLink}>Contato</a>
              </nav>
            </div>
          )}
        </>
      ) : (
        <>
          {/* Desktop Topbar */}
          <div style={styles.topbar}>
            <div style={styles.topbarContent}>
              <div style={styles.topbarLeft}>
                <span style={styles.topbarItem}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                  Entrega rápida
                </span>
                <span style={styles.topbarDivider}>|</span>
                <span style={styles.topbarItem}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
                  </svg>
                  Produtos de qualidade
                </span>
                <span style={styles.topbarDivider}>|</span>
                <span style={styles.topbarItem}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                  </svg>
                  Atendimento via WhatsApp
                </span>
              </div>
              <div style={styles.topbarRight}>
                <span style={styles.topbarSchedule}>Seg - Sex: 08h às 18h</span>
                <a href="https://wa.me/5511999999999" target="_blank" style={styles.whatsappIcon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.347-.72.598-.822.719a10.64 10.64 0 01-2.107.44c-.267.11-.535.15-.795.15a.91.91 0 01-.67-.372c-.125-.198-1.317-1.156-1.433-2.285-.114-.568-.06-.97.075-1.116.134-.145.299-.174.46-.174h.41c.2 0 .52-.032.746-.213.226-.181.548-.477.623-.646.075-.168.037-.31-.02-.43-.058-.125-.168-.37-.23-.5-.061-.129-.308-.206-.424-.206h-.52c-.135 0-.32.045-.488.213.103.32.294.62.504.839.209.22.478.388.778.479.3.092.628.107.904.107.276 0 .631-.06.908-.232.276-.173.454-.437.546-.72.092-.283.103-.59.103-.885.003-.295-.031-.65-.154-1.065l-.422-.717c-.142-.238-.285-.42-.447-.644a2.33 2.33 0 01.086-.782c.046-.181.023-.36-.02-.53-.044-.17-.164-.36-.328-.495l-.515-.432c-.21-.174-.446-.285-.688-.313-.241-.028-.49-.035-.742-.011a6.57 6.57 0 01-1.02.074c-.279.035-.59.02-.853.043-.264.024-.536.11-.757.22-.22.108-.387.257-.545.404-.158.147-.285.318-.39.515a4.33 4.33 0 01-.176.82c-.038.204-.037.43.015.649.053.22.16.425.276.62z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Desktop Main Header */}
          <div style={{...styles.mainHeader, ...(scrolled ? styles.scrolled : {})}}>
            <div style={styles.headerContent}>
              <a href="#" style={styles.logo}>
                <img src="/src/assets/logo.jpg" alt="QB Home" style={styles.logoImg} />
              </a>

              <nav style={styles.nav}>
                <a href="#" style={{...styles.navLink, ...styles.navLinkActive}}>Início</a>
                <a href="#produtos" style={styles.navLink}>Produtos</a>
                <a href="#categorias" style={styles.navLink}>Categorias</a>
                <a href="#sobre" style={styles.navLink}>Sobre nós</a>
                <a href="#contato" style={styles.navLink}>Contato</a>
              </nav>

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
            </div>
          </div>
        </>
      )}
    </header>
  )
}

const styles = {
  wrapper: {
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  /* Desktop styles */
  topbar: {
    background: '#0F172A',
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
    flexWrap: 'wrap',
  },
  topbarRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
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
  topbarSchedule: {
    color: '#CBD5E1',
    fontSize: '0.75rem',
  },
  whatsappIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    background: '#25D366',
    color: 'white',
    textDecoration: 'none',
  },
  mainHeader: {
    background: 'white',
    borderBottom: '1px solid #F1F5F9',
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
    textDecoration: 'none',
  },
  logoImg: {
    height: '44px',
    width: 'auto',
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
  },
  navLink: {
    padding: '0.625rem 1rem',
    color: '#64748B',
    textDecoration: 'none',
    fontSize: '0.9375rem',
    fontWeight: '500',
    borderRadius: '0.5rem',
  },
  navLinkActive: {
    color: '#0D9EA9',
    fontWeight: '600',
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
    marginLeft: '0.25rem',
  },
  cartTotal: {
    color: '#0D9EA9',
    fontWeight: '700',
    marginLeft: '0.25rem',
  },
  /* Mobile styles */
  mobileTopbar: {
    background: 'white',
    padding: '0.75rem 1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
  },
  mobileLogo: {
    textDecoration: 'none',
  },
  mobileLogoImg: {
    height: '36px',
    width: 'auto',
  },
  mobileActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  mobileCartBtn: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    color: '#0F172A',
  },
  hamburger: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    color: '#0F172A',
  },
  mobileOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.4)',
    zIndex: 999,
  },
  mobileNav: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '280px',
    height: '100%',
    background: 'white',
    padding: '2rem 1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  mobileLink: {
    padding: '0.875rem 1rem',
    color: '#0F172A',
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: '500',
    borderRadius: '0.5rem',
  },
}

export default Header