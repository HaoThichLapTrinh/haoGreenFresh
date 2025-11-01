// src/pages/Cart/Cart.tsx
import { useState } from "react";
import { useCartStore } from "../../store/useCartStore";
import { useOrderStore } from "../../store/useOrderStore"; // ✅ Thêm store quản lý đơn hàng
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { items, removeFromCart, updateQuantity, clearCart, getTotalPrice } =
    useCartStore();
  const { addOrder } = useOrderStore(); // ✅ Lấy hàm thêm đơn hàng
  const navigate = useNavigate();

  const [isCheckout, setIsCheckout] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [payment, setPayment] = useState("COD");
  const [message, setMessage] = useState<{ type: "success" | "error" | ""; text: string }>({
    type: "",
    text: "",
  });

  const totalPrice = getTotalPrice();

  const handleCheckout = () => {
    if (items.length === 0) {
      setMessage({ type: "error", text: "❌ Giỏ hàng trống!" });
      return;
    }
    setIsCheckout(true);
  };

  const handleOrder = () => {
    if (!name || !address || !phone) {
      setMessage({ type: "error", text: "⚠️ Vui lòng nhập đầy đủ thông tin!" });
      return;
    }

    // ✅ Lưu đơn hàng vào store (LocalStorage)
    addOrder({
      customerName: name,
      email: "guest@gmail.com", // có thể thay bằng user.email nếu có login
      phone,
      address,
      items,
      total: totalPrice,
    });

    // ✅ Hiển thị thông báo và reset form
    setMessage({
      type: "success",
      text: `🎉 Thanh toán thành công! Cảm ơn bạn đã mua sắm bằng hình thức ${payment}.`,
    });

    clearCart();
    setIsCheckout(false);
    setName("");
    setAddress("");
    setPhone("");

    // ✅ Sau 2 giây, chuyển sang trang admin orders
    setTimeout(() => {
      setMessage({ type: "", text: "" });
      navigate("/admin/orders");
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-6 mt-24">
      <h1 className="text-2xl font-bold mb-4">🛒 Giỏ hàng</h1>

      {/* Thông báo */}
      {message.text && (
        <div
          className={`mb-4 p-3 rounded text-white font-medium ${
            message.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {message.text}
        </div>
      )}

      {!isCheckout ? (
        <>
          {items.length === 0 ? (
            <p>Giỏ hàng trống.</p>
          ) : (
            <>
              {/* Danh sách sản phẩm */}
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center border-b pb-3"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image || "/images/default.png"}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg border"
                      />
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-gray-600">
                          {item.price.toLocaleString()}₫
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min={1}
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(item.id, Number(e.target.value))
                        }
                        className="w-16 border rounded text-center"
                      />
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-600 hover:underline"
                      >
                        Xóa
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Tổng tiền + nút thanh toán */}
              <div className="mt-6 flex justify-between items-center">
                <p className="text-lg font-bold">
                  Tổng cộng: {totalPrice.toLocaleString()}₫
                </p>
                <button
                  onClick={handleCheckout}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                >
                  💳 Thanh toán
                </button>
              </div>
            </>
          )}
        </>
      ) : (
        /* Form thanh toán */
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">📝 Thông tin đặt hàng</h2>

          <div className="space-y-3">
            <input
              type="text"
              placeholder="Họ và tên"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
            <input
              type="text"
              placeholder="Địa chỉ giao hàng"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
            <input
              type="tel"
              placeholder="Số điện thoại"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />

            {/* Phương thức thanh toán */}
            <div>
              <label className="block font-semibold mb-2">
                Phương thức thanh toán:
              </label>
              <select
                value={payment}
                onChange={(e) => setPayment(e.target.value)}
                className="w-full border rounded px-3 py-2"
              >
                <option value="COD">Thanh toán khi nhận hàng (COD)</option>
                <option value="Momo">Ví MoMo</option>
                <option value="Bank">Chuyển khoản ngân hàng</option>
              </select>
            </div>

            {/* Nút hành động */}
            <div className="flex justify-between mt-4">
              <button
                onClick={() => setIsCheckout(false)}
                className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
              >
                ← Quay lại
              </button>

              <button
                onClick={handleOrder}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                ✅ Xác nhận thanh toán
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
