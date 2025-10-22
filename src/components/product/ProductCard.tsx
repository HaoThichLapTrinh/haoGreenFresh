import { Link } from 'react-router-dom'
import { useCartStore } from '../../store/useCartStore'
import { useState } from 'react'

export default function ProductCard({ id, name, price, image }: any) {
  const { addToCart } = useCartStore()
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    addToCart({ id, name, price, image, quantity: 1 })
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <div className="group bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition-all transform hover:-translate-y-1 flex flex-col">
      <Link to={`/products/${id}`} className="relative overflow-hidden">
        <img src={image} alt={name} className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"/>
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all"/>
      </Link>

      <div className="p-4 flex flex-col items-center text-center">
        <h3 className="text-lg font-semibold mb-1">{name}</h3>
        <p className="text-green-600 font-bold mb-3">{price.toLocaleString()}₫</p>
        <button onClick={handleAdd} className="bg-green-600 text-white py-2 px-4 rounded-lg w-full hover:bg-green-700 active:scale-95 transition-transform duration-150">
          🛒 Thêm giỏ hàng
        </button>
        {added && <p className="text-green-500 text-sm mt-2 animate-fadeIn">✅ Đã thêm vào giỏ hàng!</p>}
      </div>
    </div>
  )
}
