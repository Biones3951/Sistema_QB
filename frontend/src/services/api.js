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