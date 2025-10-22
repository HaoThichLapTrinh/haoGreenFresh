// src/pages/Checkout/Checkout.tsx
import { useCartStore } from "../../store/useCartStore";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useOrderStore } from "../../store/useOrderStore"; // ✅ thêm dòng này ở đầu file


export default function Checkout() {
  const { items, getTotalPrice, clearCart } = useCartStore();
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const { addOrder } = useOrderStore(); // ✅ lấy hàm thêm đơn hàng


  // 🧾 Thông tin người mua
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    payment: "cod",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePayment = () => {
  if (items.length === 0) return alert("Giỏ hàng trống!");
  if (!form.name || !form.phone || !form.address)
    return alert("Vui lòng nhập đầy đủ thông tin giao hàng!");

  // 🧾 Lưu đơn hàng vào store (✅ thêm items)
  addOrder({
    customerName: form.name,
    email: "",
    phone: form.phone,
    address: form.address,
    items, // ✅ thêm danh sách sản phẩm
    total: getTotalPrice(),
  });

  setSuccess(true);
  clearCart();

  // ⏳ chuyển sang trang admin sau 2 giây
  setTimeout(() => navigate("/admin/orders"), 2000);
};




  if (items.length === 0 && !success) {
    return (
      <div className="container mx-auto px-4 py-10 text-center">
        <p className="text-xl text-gray-700">Giỏ hàng của bạn đang trống 😢</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-green-600 mb-6 text-center">
        Thanh Toán
      </h1>

      {success ? (
        <div className="bg-green-100 text-green-700 p-4 rounded mb-6 text-center font-medium">
          🎉 Thanh toán thành công! Cảm ơn bạn đã mua hàng.
        </div>
      ) : (
        <>
          {/* 🛍 Danh sách sản phẩm */}
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

          {/* 🧾 Form thông tin người mua */}
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <h2 className="text-xl font-semibold mb-4 text-green-700">
              Thông tin giao hàng
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Họ và tên"
                value={form.name}
                onChange={handleChange}
                className="border border-gray-300 p-3 rounded w-full"
              />
              <input
                type="text"
                name="phone"
                placeholder="Số điện thoại"
                value={form.phone}
                onChange={handleChange}
                className="border border-gray-300 p-3 rounded w-full"
              />
              <input
                type="text"
                name="address"
                placeholder="Địa chỉ giao hàng"
                value={form.address}
                onChange={handleChange}
                className="border border-gray-300 p-3 rounded w-full col-span-2"
              />
              <select
                name="payment"
                value={form.payment}
                onChange={handleChange}
                className="border border-gray-300 p-3 rounded w-full col-span-2"
              >
                <option value="cod">Thanh toán khi nhận hàng (COD)</option>
                <option value="bank">Chuyển khoản ngân hàng</option>
              </select>
            </div>
          </div>

          {/* 💰 Tổng tiền + nút xác nhận */}
          <div className="flex justify-between items-center mb-6">
            <span className="text-xl font-semibold">Tổng tiền:</span>
            <span className="text-2xl font-bold text-green-600">
              {getTotalPrice().toLocaleString()}₫
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
  );
}
