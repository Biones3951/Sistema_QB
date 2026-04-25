import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import HeroSection from './components/layout/HeroSection'
import Categories from './components/layout/Categories'
import Benefits from './components/layout/Benefits'
import ProductList from './components/product/ProductList'

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <div style={styles.app}>
          <Header />
          <main style={styles.main}>
            <HeroSection />
            <Categories />
            <Benefits />
            <ProductList />
          </main>
          <Footer />
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