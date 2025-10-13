import { Link } from 'react-router-dom'
import { useCartStore } from '../store/useCartStore'
import { useState } from 'react'

export interface ProductCardProps {
  id: number
  name: string
  price: number
  image: string
}

export default function ProductCard({ id, name, price, image }: ProductCardProps) {
  const { addToCart } = useCartStore()
  const [addedMessage, setAddedMessage] = useState('')

  const handleAddToCart = () => {
    addToCart({ id, name, price, image, quantity: 1 })
    setAddedMessage('✅ Đã thêm vào giỏ hàng!')
    setTimeout(() => setAddedMessage(''), 1500)
  }

  return (
    <div className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-2xl transition-transform transform hover:-translate-y-1">
      {/* Link đến trang chi tiết sản phẩm */}
      <Link to={`/products/${id}`} className="block relative">
        <img
          src={image}
          alt={name}
          className="w-full h-56 object-cover rounded-t-2xl transition-transform duration-300 hover:scale-105"
        />
      </Link>

      <div className="p-4 flex flex-col items-center">
        <h3 className="text-lg font-semibold text-center mb-2">{name}</h3>
        <p className="text-green-600 font-bold mb-3 text-center">
          {price.toLocaleString()}₫
        </p>

        <div className="flex gap-3 w-full">
          <Link
            to={`/products/${id}`}
            className="flex-1 border border-green-600 text-green-600 py-2 rounded-lg text-center hover:bg-green-600 hover:text-white transition"
          >
            Xem chi tiết
          </Link>
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
          >
            Thêm giỏ
          </button>
        </div>

        {addedMessage && (
          <p className="text-green-600 text-sm mt-2 text-center animate-fadeIn">
            {addedMessage}
          </p>
        )}
      </div>
    </div>
  )
}
