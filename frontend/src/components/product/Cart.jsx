import { useState, useEffect, useRef } from 'react'
import { useCart } from '../../context/CartContext'
import { formatPrice } from '../../utils/formatters'
import { generateWhatsAppMessage, createWhatsAppLink } from '../../utils/whatsapp'
import { useIsMobile } from '../../hooks/useIsMobile'

const WHATSAPP_NUMBER = '5511999999999'

function Cart() {
  const { items, removeItem, updateQuantity, getTotal, getItemCount, clearCart } = useCart()
  const isMobile = useIsMobile()
  const [isOpen, setIsOpen] = useState(false)
  const modalRef = useRef(null)

  useEffect(() => {
    const handleToggle = () => setIsOpen(prev => !prev)
    window.addEventListener('toggleCart', handleToggle)
    return () => window.removeEventListener('toggleCart', handleToggle)
  }, [])

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEsc)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const total = getTotal()
  const itemCount = getItemCount()

  const handleWhatsApp = () => {
    const message = generateWhatsAppMessage(items, total)
    const url = createWhatsAppLink(WHATSAPP_NUMBER, message)
    window.open(url, '_blank')
  }

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) setIsOpen(false)
  }

  return (
    <>
      {/* Floating Cart Button */}
      <button 
        onClick={() => setIsOpen(true)}
        style={{
          ...styles.floatingButton,
          ...(isMobile ? styles.floatingButtonMobile : {}),
          ...(itemCount > 0 ? {} : styles.emptyCartBtn),
        }}
      >
        <div style={styles.cartBtnIcon}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
          {itemCount > 0 && <span style={styles.cartBtnBadge}>{itemCount}</span>}
        </div>
        {!isMobile && (
          <span style={styles.cartBtnText}>
            {itemCount > 0 ? `Ver Carrinho (${itemCount})` : 'Carrinho'}
          </span>
        )}
      </button>

      {/* Cart Modal */}
      {isOpen && (
        <div style={styles.overlay} onClick={handleOverlayClick}>
          <div style={{
            ...styles.modal,
            ...(isMobile ? styles.modalMobile : {}),
          }} ref={modalRef}>
            {/* Header */}
            <div style={styles.modalHeader}>
              <div style={styles.modalTitle}>
                <div style={styles.modalIconBg}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0D9EA9" strokeWidth="2">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                    <line x1="3" y1="6" x2="21" y2="6"/>
                    <path d="M16 10a4 4 0 0 1-8 0"/>
                  </svg>
                </div>
                <div>
                  <h2 style={styles.modalTitleText}>Seu Carrinho</h2>
                  <span style={styles.modalSubtitle}>
                    {itemCount} {itemCount === 1 ? 'item' : 'itens'} no carrinho
                  </span>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} style={styles.closeBtn}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2">
                  <line x1="18" y1="6" x2="6"/><line x1="18" y1="18" x2="6"/>
                </svg>
              </button>
            </div>

            {/* Content */}
            <div style={styles.modalContent}>
              {items.length === 0 ? (
                <div style={styles.emptyCart}>
                  <div style={styles.emptyCartIcon}>
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#CBD5E1" strokeWidth="1">
                      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                      <line x1="3" y1="6" x2="21" y2="6"/>
                      <path d="M16 10a4 4 0 0 1-8 0"/>
                    </svg>
                  </div>
                  <h3 style={styles.emptyCartTitle}>Seu carrinho está vazio</h3>
                  <p style={styles.emptyCartDesc}>
                    Adicione produtos para continuar com sua compra
                  </p>
                  <a href="#produtos" style={styles.continueBtn} onClick={() => setIsOpen(false)}>
                    Ver Produtos
                  </a>
                </div>
              ) : (
                <div style={styles.cartItems}>
                  {items.map(item => (
                    <div key={item.id} style={{
                      ...styles.cartItem,
                      ...(isMobile ? styles.cartItemMobile : {}),
                    }}>
                      <img 
                        src={item.image_url || 'https://placehold.co/80'} 
                        alt={item.name}
                        style={{
                          ...styles.cartItemImg,
                          ...(isMobile ? { width: '56px', height: '56px' } : {}),
                        }}
                      />
                      <div style={{
                        ...styles.cartItemInfo,
                        ...(isMobile ? styles.cartItemInfoMobile : {}),
                      }}>
                        <h4 style={{
                          ...styles.cartItemName,
                          ...(isMobile ? { fontSize: '0.8125rem' } : {}),
                        }}>{item.name}</h4>
                        <span style={{
                          ...styles.cartItemPrice,
                          ...(isMobile ? { fontSize: '0.875rem' } : {}),
                        }}>{formatPrice(item.price)}</span>
                      </div>
                      <div style={{
                        ...styles.qtyControl,
                        ...(isMobile ? { gap: '0.25rem' } : {}),
                      }}>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          style={{
                            ...styles.qtyBtn,
                            ...(isMobile ? { width: '28px', height: '28px', fontSize: '0.875rem' } : {}),
                          }}
                        >
                          −
                        </button>
                        <span style={{
                          ...styles.qtyValue,
                          ...(isMobile ? { fontSize: '0.8125rem', width: '28px' } : {}),
                        }}>{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          style={{
                            ...styles.qtyBtn,
                            ...(isMobile ? { width: '28px', height: '28px', fontSize: '0.875rem' } : {}),
                          }}
                        >
                          +
                        </button>
                      </div>
                      <span style={styles.cartItemSubtotal}>
                        {formatPrice(item.price * item.quantity)}
                      </span>
                      <button 
                        onClick={() => removeItem(item.id)}
                        style={{
                          ...styles.removeBtn,
                          ...(isMobile ? { width: '28px', height: '28px' } : {}),
                        }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2">
                          <polyline points="3 6 5 6 21 6"/>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div style={styles.modalFooter}>
                <div style={styles.summary}>
                  <div style={styles.summaryRow}>
                    <span>Subtotal</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                  <div style={styles.summaryRow}>
                    <span>Frete</span>
                    <span style={styles.free}>Grátis</span>
                  </div>
                  <div style={styles.divider}></div>
                  <div style={{...styles.summaryRow, ...styles.totalRow}}>
                    <span>Total</span>
                    <span style={styles.totalValue}>{formatPrice(total)}</span>
                  </div>
                </div>
                
                <button onClick={handleWhatsApp} style={styles.whatsappBtn}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.347-.72.598-.822.719a10.64 10.64 0 01-2.107.44c-.267.11-.535.15-.795.15a.91.91 0 01-.67-.372c-.125-.198-1.317-1.156-1.433-2.285-.114-.568-.06-.97.075-1.116.134-.145.299-.174.46-.174h.41c.2 0 .52-.032.746-.213.226-.181.548-.477.623-.646.075-.168.037-.31-.02-.43-.058-.125-.168-.37-.23-.5-.061-.129-.308-.206-.424-.206h-.52c-.135 0-.32.045-.488.213.103.32.294.62.504.839.209.22.478.388.778.479.3.092.628.107.904.107.276 0 .631-.06.908-.232.276-.173.454-.437.546-.72.092-.283.103-.59.103-.885.003-.295-.031-.65-.154-1.065l-.422-.717c-.142-.238-.285-.42-.447-.644a2.33 2.33 0 01.086-.782c.046-.181.023-.36-.02-.53-.044-.17-.164-.36-.328-.495l-.515-.432c-.21-.174-.446-.285-.688-.313-.241-.028-.49-.035-.742-.011a6.57 6.57 0 01-1.02.074c-.279.035-.59.02-.853.043-.264.024-.536.11-.757.22-.22.108-.387.257-.545.404-.158.147-.285.318-.39.515a4.33 4.33 0 01-.176.82c-.038.204-.037.43.015.649.053.22.16.425.276.62z"/>
                  </svg>
                  Pedir via WhatsApp
                </button>
                
                <button onClick={clearCart} style={styles.clearBtn}>
                  Limpar Carrinho
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

const styles = {
  floatingButton: {
    position: 'fixed',
    bottom: '2rem',
    right: '2rem',
    padding: '0.875rem 1.5rem',
    background: 'linear-gradient(135deg, #0D9EA9 0%, #06B6D4 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '9999px',
    fontSize: '0.9375rem',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.625rem',
    boxShadow: '0 10px 40px -10px rgba(13, 158, 169, 0.45)',
    zIndex: 1000,
    transition: 'all 0.3s ease',
  },
  floatingButtonMobile: {
    bottom: '1.25rem',
    right: '1.25rem',
    padding: '0.875rem',
  },
  emptyCartBtn: {
    background: '#64748B',
  },
  cartBtnIcon: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartBtnBadge: {
    position: 'absolute',
    top: '-8px',
    right: '-8px',
    minWidth: '18px',
    height: '18px',
    padding: '0 5px',
    background: 'white',
    borderRadius: '9999px',
    color: '#0D9EA9',
    fontSize: '0.6875rem',
    fontWeight: '700',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartBtnText: {
    fontWeight: '600',
  },
  overlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(15, 23, 42, 0.6)',
    backdropFilter: 'blur(4px)',
    display: 'flex',
    justifyContent: 'flex-end',
    zIndex: 1001,
    animation: 'fadeIn 0.2s ease',
  },
  modal: {
    width: '100%',
    maxWidth: '440px',
    background: 'white',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    animation: 'slideInRight 0.3s ease',
  },
  modalMobile: {
    maxWidth: '100%',
  },
  modalHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1.5rem',
    borderBottom: '1px solid #F1F5F9',
  },
  modalTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.875rem',
  },
  modalIconBg: {
    width: '44px',
    height: '44px',
    background: 'linear-gradient(135deg, rgba(13, 158, 169, 0.1) 0%, rgba(6, 182, 212, 0.1) 100%)',
    borderRadius: '0.75rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTitleText: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: '#0F172A',
    margin: 0,
  },
  modalSubtitle: {
    fontSize: '0.8125rem',
    color: '#64748B',
  },
  closeBtn: {
    width: '36px',
    height: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#F8FAFC',
    border: 'none',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    transition: 'background 0.2s',
  },
  modalContent: {
    flex: 1,
    overflowY: 'auto',
    padding: '1.5rem',
  },
  emptyCart: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4rem 1rem',
    textAlign: 'center',
  },
  emptyCartIcon: {
    width: '100px',
    height: '100px',
    background: '#F8FAFC',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '1.5rem',
  },
  emptyCartTitle: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: '0.5rem',
  },
  emptyCartDesc: {
    fontSize: '0.9375rem',
    color: '#64748B',
    marginBottom: '1.5rem',
  },
  continueBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '0.875rem 1.5rem',
    background: 'linear-gradient(135deg, #0D9EA9 0%, #06B6D4 100%)',
    borderRadius: '0.5rem',
    color: 'white',
    textDecoration: 'none',
    fontSize: '0.9375rem',
    fontWeight: '600',
  },
  cartItems: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  cartItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.875rem',
    padding: '1rem',
    background: '#F8FAFC',
    borderRadius: '0.75rem',
  },
  cartItemMobile: {
    padding: '0.75rem',
    gap: '0.5rem',
  },
  cartItemImg: {
    width: '64px',
    height: '64px',
    objectFit: 'cover',
    borderRadius: '0.5rem',
    background: '#E2E8F0',
  },
  cartItemInfo: {
    flex: 1,
    minWidth: 0,
  },
  cartItemInfoMobile: {
    flex: '1 1 auto',
  },
  cartItemName: {
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: '0.125rem',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  cartItemPrice: {
    fontSize: '0.8125rem',
    color: '#64748B',
  },
  qtyControl: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
  },
  qtyBtn: {
    width: '28px',
    height: '28px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'white',
    border: '1px solid #E2E8F0',
    borderRadius: '0.375rem',
    fontSize: '1rem',
    cursor: 'pointer',
    color: '#0F172A',
    transition: 'background 0.2s',
  },
  qtyValue: {
    minWidth: '24px',
    textAlign: 'center',
    fontSize: '0.875rem',
    fontWeight: '600',
  },
  cartItemSubtotal: {
    minWidth: '70px',
    textAlign: 'right',
    fontSize: '0.875rem',
    fontWeight: '700',
    color: '#0D9EA9',
  },
  removeBtn: {
    width: '28px',
    height: '28px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    color: '#94A3B8',
    transition: 'color 0.2s',
  },
  modalFooter: {
    padding: '1.5rem',
    borderTop: '1px solid #F1F5F9',
    background: 'white',
  },
  summary: {
    marginBottom: '1.25rem',
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0.5rem 0',
    fontSize: '0.9375rem',
    color: '#64748B',
  },
  free: {
    color: '#10B981',
    fontWeight: '600',
  },
  divider: {
    height: '1px',
    background: '#E2E8F0',
    margin: '0.5rem 0',
  },
  totalRow: {
    fontSize: '1.0625rem',
    fontWeight: '700',
    color: '#0F172A',
  },
  totalValue: {
    fontSize: '1.25rem',
    fontWeight: '800',
    color: '#0D9EA9',
  },
  whatsappBtn: {
    width: '100%',
    padding: '1rem',
    background: 'linear-gradient(135deg, #25D366 0%, #20BD5A 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '0.625rem',
    fontSize: '0.9375rem',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    marginBottom: '0.75rem',
    boxShadow: '0 4px 15px rgba(37, 211, 102, 0.3)',
    transition: 'all 0.3s ease',
  },
  clearBtn: {
    width: '100%',
    padding: '0.75rem',
    background: 'transparent',
    color: '#64748B',
    border: 'none',
    fontSize: '0.875rem',
    cursor: 'pointer',
    marginTop: '0.5rem',
  },
}

export default Cart