import { useParams, useNavigate } from 'react-router-dom'
import { useCartStore } from '../../store/useCartStore'
import { useState } from 'react'
import { productsData } from '../../data/products'


interface Product {
  id: number
  name: string
  price: number
  category: string
  image?: string
  description?: string
}

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCartStore()
  const [message, setMessage] = useState('')

  // Ép kiểu dữ liệu đúng cho product list
  const product = (productsData as Product[]).find(
    (p) => p.id === Number(id)
  )

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-6">
        <p>Không tìm thấy sản phẩm.</p>
      </div>
    )
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      // Nếu không có ảnh thì gán ảnh mặc định
      image: product.image || '/src/assets/images/default.jpg',
      quantity: 1,
    })
    setMessage('🛒 Thêm vào giỏ hàng thành công!')
    setTimeout(() => setMessage(''), 2000)
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <button
        onClick={() => navigate(-1)}
        className="text-green-600 hover:underline mb-4"
      >
        ← Quay lại
      </button>

      <div className="grid md:grid-cols-2 gap-6">
        <img
          src={product.image || '/src/assets/images/default.jpg'}
          alt={product.name}
          className="w-full rounded-xl shadow-md object-cover"
        />
        <div>
          <h1 className="text-3xl font-bold mb-3">{product.name}</h1>
          <p className="text-gray-700 mb-4">
            {product.description ||
              'Sản phẩm chất lượng cao, tươi ngon mỗi ngày.'}
          </p>
          <p className="text-2xl font-semibold text-green-600 mb-6">
            {product.price.toLocaleString()}₫
          </p>
          <button
            onClick={handleAddToCart}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Thêm vào giỏ hàng
          </button>

          {message && (
            <p className="mt-4 text-green-600 font-medium animate-fadeIn">
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
