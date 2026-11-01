import { useCallback, useState } from 'react'
import { CartProvider } from './context/CartProvider'
import { useCart } from './hooks/useCart'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Cart from './components/product/Cart'
import ProductDetail from './components/product/ProductDetail'
import Home from './pages/Home'
import SobreNos from './pages/SobreNos'

function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  )
}

function AppContent() {
  const [currentPage, setCurrentPage] = useState('home')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const { addItem } = useCart()

  const navigate = useCallback((page) => {
    setCurrentPage(page)
    setSelectedProduct(null)
    setSelectedCategory(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <div style={styles.app}>
      <Header currentPage={currentPage} onNavigate={navigate} />

      <main style={styles.main}>
        {selectedProduct ? (
          <ProductDetail
            product={selectedProduct}
            onBack={() => setSelectedProduct(null)}
            onAddToCart={addItem}
          />
        ) : currentPage === 'sobre' ? (
          <SobreNos onNavigate={navigate} />
        ) : (
          <Home
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            onSelectProduct={setSelectedProduct}
          />
        )}
      </main>

      <Footer />
      <Cart />
    </div>
  )
}

const styles = {
  app: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    background: 'var(--background)',
  },
  main: {
    flex: 1,
  },
}

export default App
