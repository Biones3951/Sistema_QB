import { formatPrice } from '../../utils/formatters'

function CartItem({ item, onUpdateQuantity, onRemove }) {
  return (
    <div style={styles.item}>
      <img 
        src={item.image_url || 'https://placehold.co/80'} 
        alt={item.name}
        style={styles.image}
      />
      <div style={styles.info}>
        <h4 style={styles.name}>{item.name}</h4>
        <p style={styles.price}>{formatPrice(item.price)}</p>
      </div>
      <div style={styles.quantity}>
        <button 
          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
          style={styles.qtyButton}
        >
          -
        </button>
        <span style={styles.qtyValue}>{item.quantity}</span>
        <button 
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          style={styles.qtyButton}
        >
          +
        </button>
      </div>
      <div style={styles.subtotal}>
        {formatPrice(item.price * item.quantity)}
      </div>
      <button 
        onClick={() => onRemove(item.id)}
        style={styles.removeButton}
      >
        ×
      </button>
    </div>
  )
}

const styles = {
  item: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '16px',
    backgroundColor: '#f8fafc',
    borderRadius: '8px',
  },
  image: {
    width: '60px',
    height: '60px',
    objectFit: 'cover',
    borderRadius: '8px',
    backgroundColor: '#f1f5f9',
  },
  info: {
    flex: 1,
  },
  name: {
    margin: '0 0 4px',
    fontSize: '14px',
    fontWeight: '600',
  },
  price: {
    margin: 0,
    fontSize: '14px',
    color: '#64748b',
  },
  quantity: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  qtyButton: {
    width: '28px',
    height: '28px',
    border: '1px solid #e2e8f0',
    borderRadius: '6px',
    backgroundColor: '#fff',
    cursor: 'pointer',
    fontSize: '16px',
  },
  qtyValue: {
    minWidth: '24px',
    textAlign: 'center',
  },
  subtotal: {
    minWidth: '80px',
    textAlign: 'right',
    fontWeight: '600',
  },
  removeButton: {
    width: '28px',
    height: '28px',
    border: 'none',
    borderRadius: '6px',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    fontSize: '18px',
    color: '#94a3b8',
  },
}

export default CartItem