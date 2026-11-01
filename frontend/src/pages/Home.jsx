import HeroSection from '../components/layout/HeroSection'
import Categories from '../components/layout/Categories'
import Benefits from '../components/layout/Benefits'
import ProductList from '../components/product/ProductList'
import OffersSection from '../components/product/OffersSection'
import AllProductsSection from '../components/product/AllProductsSection'

function Home({ selectedCategory, onSelectCategory, onSelectProduct }) {
  return (
    <>
      <HeroSection />
      <Categories
        selectedCategory={selectedCategory}
        onSelectCategory={onSelectCategory}
      />
      <ProductList onSelectProduct={onSelectProduct} />
      <OffersSection onSelectProduct={onSelectProduct} />
      <AllProductsSection
        selectedCategory={selectedCategory}
        onClearCategory={() => onSelectCategory(null)}
        onSelectProduct={onSelectProduct}
      />
      <Benefits />
    </>
  )
}

export default Home
