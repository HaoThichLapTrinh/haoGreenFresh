// src/pages/Checkout.tsx
import { useCartStore } from '../../store/useCartStore'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCartStore()
  const navigate = useNavigate()
  const [success, setSuccess] = useState(false)

  const handlePayment = () => {
    if (items.length === 0) return
    // Ở đây bạn có thể tích hợp API thanh toán thực tế
    setSuccess(true)
    clearCart()
    setTimeout(() => {
      navigate('/')
    }, 3000) // Chuyển về trang chủ sau 3s
  }

  if (items.length === 0 && !success) {
    return (
      <div className="container mx-auto px-4 py-10 text-center">
        <p className="text-xl text-gray-700">Giỏ hàng của bạn đang trống 😢</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-green-600 mb-6 text-center">
        Thanh Toán
      </h1>

      {success && (
        <div className="bg-green-100 text-green-700 p-4 rounded mb-6 text-center font-medium">
          🎉 Thanh toán thành công! Cảm ơn bạn đã mua hàng.
        </div>
      )}

      {!success && (
        <>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full bg-white rounded-lg shadow">
              <thead>
                <tr className="bg-green-100 text-left">
                  <th className="px-4 py-2">Sản phẩm</th>
                  <th className="px-4 py-2">Đơn giá</th>
                  <th className="px-4 py-2">Số lượng</th>
                  <th className="px-4 py-2">Tổng</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="px-4 py-2 flex items-center gap-3">
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                      )}
                      {item.name}
                    </td>
                    <td className="px-4 py-2">{item.price.toLocaleString()}₫</td>
                    <td className="px-4 py-2">{item.quantity}</td>
                    <td className="px-4 py-2 font-semibold">
                      {(item.price * item.quantity).toLocaleString()}₫
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center mb-6">
            <span className="text-xl font-semibold">Tổng tiền:</span>
            <span className="text-2xl font-bold text-green-600">
              {totalPrice.toLocaleString()}₫
            </span>
          </div>

          <div className="text-center">
            <button
              onClick={handlePayment}
              className="bg-green-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition"
            >
              Xác nhận thanh toán
            </button>
          </div>
        </>
      )}
    </div>
  )
}
