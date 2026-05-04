const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export const productService = {
  async getAll(category = null) {
    const url = category 
      ? `${API_URL}/api/products/?category=${category}`
      : `${API_URL}/api/products/`
    const res = await fetch(url)
    if (!res.ok) throw new Error('Failed to fetch products')
    return res.json()
  },

  async getFeatured() {
    const url = `${API_URL}/api/products/?is_featured=true`
    const res = await fetch(url)
    if (!res.ok) throw new Error('Failed to fetch featured products')
    return res.json()
  },

  async getOffers() {
    const url = `${API_URL}/api/products/?is_offer=true`
    const res = await fetch(url)
    if (!res.ok) throw new Error('Failed to fetch offers')
    return res.json()
  },

  async getById(id) {
    const res = await fetch(`${API_URL}/api/products/${id}/`)
    if (!res.ok) throw new Error('Product not found')
    return res.json()
  },

  async getCategories() {
    const res = await fetch(`${API_URL}/api/categories/`)
    if (!res.ok) throw new Error('Failed to fetch categories')
    return res.json()
  }
}