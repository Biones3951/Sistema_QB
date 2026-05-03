import { useEffect, useState, useCallback } from 'react'
import { CartProvider } from './context/CartContext'
import Header from './components/layout/Header'
import HeroSection from './components/layout/HeroSection'
import Categories from './components/layout/Categories'
import ProductList from './components/product/ProductList'
import Benefits from './components/layout/Benefits'
import Footer from './components/layout/Footer'
import Cart from './components/product/Cart'
import SobreNos from './components/pages/SobreNos'

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  const navigate = useCallback((page) => {
    setCurrentPage(page)
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
    <CartProvider>
      <div style={styles.app}>
        <Header currentPage={currentPage} onNavigate={navigate} />
        {currentPage === 'home' ? (
          <main style={styles.main}>
            <HeroSection />
            <Categories />
            <ProductList />
            <Benefits />
          </main>
        ) : (
          <main style={styles.main}>
            <SobreNos onNavigate={navigate} />
          </main>
        )}
        <Footer />
        <Cart />
      </div>
    </CartProvider>
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