import { useEffect, useState, useCallback } from 'react'
import { CartProvider, useCart } from './context/CartContext'
import Header from './components/layout/Header'
import HeroSection from './components/layout/HeroSection'
import Categories from './components/layout/Categories'
import ProductList from './components/product/ProductList'
import OffersSection from './components/product/OffersSection'
import AllProductsSection from './components/product/AllProductsSection'
import Benefits from './components/layout/Benefits'
import Footer from './components/layout/Footer'
import Cart from './components/product/Cart'
import SobreNos from './components/pages/SobreNos'
import ProductDetail from './components/product/ProductDetail'

function App() {
  return (
    <CartProvider>
      <AppInner />
    </CartProvider>
  )
}

function AppInner() {
  const [currentPage, setCurrentPage] = useState('home')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(null)

  const navigate = useCallback((page) => {
    setCurrentPage(page)
    setSelectedProduct(null)
    setSelectedCategory(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    document.body.style.margin = '0'
    document.body.style.padding = '0'
    document.body.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'

    const style = document.createElement('style')
    style.textContent = `
      * { box-sizing: border-box; }
      html { scroll-behavior: smooth; }
      body { overflow-x: hidden; margin: 0; }
    `
    document.head.appendChild(style)
    return () => { document.head.removeChild(style) }
  }, [])

  return (
    <div style={styles.app}>
      <Header currentPage={currentPage} onNavigate={navigate} />
      <SelectedProductView
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        currentPage={currentPage}
        navigate={navigate}
      />
      <Footer />
      <Cart />
    </div>
  )
}

function SelectedProductView({ selectedProduct, setSelectedProduct, selectedCategory, setSelectedCategory, currentPage, navigate }) {
  const { addItem } = useCart()

  const addToCart = useCallback((product, quantity = 1) => {
    addItem(product, quantity)
  }, [addItem])

  return (
    <>
      {selectedProduct ? (
        <main style={styles.main}>
          <ProductDetail
            product={selectedProduct}
            onBack={() => setSelectedProduct(null)}
            onAddToCart={addToCart}
          />
        </main>
      ) : currentPage === 'home' ? (
        <main style={styles.main}>
          <HeroSection />
          <Categories
            onSelectCategory={setSelectedCategory}
            selectedCategory={selectedCategory}
          />
          <ProductList onSelectProduct={setSelectedProduct} />
          <OffersSection onSelectProduct={setSelectedProduct} />
          <AllProductsSection
            id="todos-produtos"
            selectedCategory={selectedCategory}
            onClearCategory={() => setSelectedCategory(null)}
            onSelectProduct={setSelectedProduct}
          />
          <Benefits />
        </main>
      ) : currentPage === 'sobre' ? (
        <main style={styles.main}>
          <SobreNos onNavigate={navigate} />
        </main>
      ) : null}
    </>
  )
}

const styles = {
  app: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    background: '#FAFCFD',
  },
  main: {
    flex: 1,
  },
}

export default App