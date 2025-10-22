// src/pages/admin/Products/Products.tsx

import { useState } from "react"; // ✅ Đã xóa 'React,'
import { useProductStore } from "../../../store/useProductStore";

export default function Products() {
  // ✅ Đã xóa 'updateProduct' vì chưa sử dụng
  const { products, addProduct, removeProduct } = useProductStore(); 
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  const handleAdd = () => {
    if (!name || !price) return alert("Vui lòng nhập đầy đủ thông tin!");
    addProduct({ name, price, category, image });
    setName("");
    setPrice(0);
    setCategory("");
    setImage("");
  };

  return (
    <div className="p-6 bg-white rounded shadow-md">
      <h1 className="text-2xl font-bold text-green-600 mb-4">
        🛍️ Quản lý sản phẩm
      </h1>

      {/* Form thêm sản phẩm */}
      <div className="mb-4 flex gap-2 flex-wrap">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tên sản phẩm"
          className="border p-2 rounded"
        />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          placeholder="Giá"
          className="border p-2 rounded w-32"
        />
        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Danh mục"
          className="border p-2 rounded"
        />
        <input
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Ảnh (URL)"
          className="border p-2 rounded"
        />
        <button
          onClick={handleAdd}
          className="bg-green-600 text-white px-3 py-2 rounded"
        >
          Thêm
        </button>
      </div>

      {/* Danh sách sản phẩm */}
      {products.length === 0 ? (
        <p>Chưa có sản phẩm nào.</p>
      ) : (
        <table className="w-full border text-sm">
          <thead>
            <tr className="bg-green-100">
              <th className="p-2 border">Tên</th>
              <th className="p-2 border">Giá</th>
              <th className="p-2 border">Danh mục</th>
              <th className="p-2 border">Ảnh</th>
              <th className="p-2 border">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td className="p-2 border">{p.name}</td>
                <td className="p-2 border text-right">{p.price.toLocaleString()}₫</td>
                <td className="p-2 border">{p.category}</td>
                <td className="p-2 border">
                  {p.image ? (
                    <img src={p.image} alt={p.name} className="w-16 h-16 object-cover rounded" />
                  ) : (
                    "—"
                  )}
                </td>
                <td className="p-2 border text-center">
                  <button
                    onClick={() => removeProduct(p.id)}
                    className="text-red-600 hover:underline"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}