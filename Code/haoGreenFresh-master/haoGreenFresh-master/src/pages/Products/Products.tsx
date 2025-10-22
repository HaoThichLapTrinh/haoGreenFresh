import { useState, useMemo } from 'react'
import { productsData } from '../../data/products'
import ProductCard from '../../components/product/ProductCard'
import ProductFilter from '../../components/product/ProductFilter'

export default function Products() {
  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    sort: 'none',
  })
  const [page, setPage] = useState(1)
  const itemsPerPage = 12

  const handleChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
    setPage(1)
  }

  const filteredProducts = useMemo(() => {
    let result = [...productsData]

    if (filters.search) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(filters.search.toLowerCase())
      )
    }

    if (filters.category !== 'all') {
      result = result.filter((p) => p.category === filters.category)
    }

    if (filters.sort === 'asc') {
      result.sort((a, b) => a.price - b.price)
    } else if (filters.sort === 'desc') {
      result.sort((a, b) => b.price - a.price)
    }

    return result
  }, [filters])

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const displayedProducts = filteredProducts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  )

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-extrabold text-green-700 mb-6 text-center tracking-tight">
        🌾 Danh sách sản phẩm tươi sạch 🌿
      </h1>

      <ProductFilter
        search={filters.search}
        category={filters.category}
        sort={filters.sort}
        onChange={handleChange}
      />

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {displayedProducts.map((p) => (
          <ProductCard key={p.id} {...p} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-10 space-x-4">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300 transition"
        >
          ← Trước
        </button>
        <span className="font-semibold text-green-700">
          Trang {page} / {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300 transition"
        >
          Sau →
        </button>
      </div>
    </div>
  )
}
