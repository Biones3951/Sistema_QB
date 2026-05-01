import { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import Header from './components/layout/Header'
import HeroSection from './components/layout/HeroSection'
import Categories from './components/layout/Categories'
import ProductList from './components/product/ProductList'
import Benefits from './components/layout/Benefits'
import Footer from './components/layout/Footer'
import Cart from './components/product/Cart'

function App() {
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
      <BrowserRouter>
        <div style={styles.app}>
          <Header />
          <main style={styles.main}>
            <HeroSection />
            <Categories />
            <ProductList />
            <Benefits />
          </main>
          <Footer />
          <Cart />
        </div>
      </BrowserRouter>
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