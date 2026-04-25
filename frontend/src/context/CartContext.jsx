import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

const CART_STORAGE_KEY = 'qb_cart'

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem(CART_STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const addItem = (product, quantity = 1) => {
    setItems(prev => {
      const existing = prev.find(item => item.id === product.id)
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      return [...prev, { ...product, quantity }]
    })
  }

  const removeItem = (productId) => {
    setItems(prev => prev.filter(item => item.id !== productId))
  }

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) {
      removeItem(productId)
      return
    }
    setItems(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const getTotal = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const getItemCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0)
  }

  return (
    <CartContext.Provider value={{
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      getTotal,
      getItemCount
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}