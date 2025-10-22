import { useState } from "react";
import { useProductStore } from "../../../store/useProductStore";
import { Edit, Trash2, ImagePlus } from "lucide-react";

export default function AdminProducts() {
  const { products, addProduct, removeProduct, updateProduct } = useProductStore();

  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [showConfirm, setShowConfirm] = useState<{ id: number | null; name: string }>({
  id: null,
  name: "",
});


  // Dữ liệu form
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
  });
  const [preview, setPreview] = useState<string>(""); // ảnh preview

  const filteredProducts = products.filter(
    (p) =>
      (filter === "All" || p.category === filter) &&
      p.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
      setFormData({ ...formData, image: URL.createObjectURL(file) });
    }
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.price) {
      alert("⚠️ Vui lòng nhập đầy đủ thông tin sản phẩm!");
      return;
    }

    const newData = {
      ...formData,
      price: Number(formData.price),
      image: preview || formData.image || "https://via.placeholder.com/80",
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, { ...editingProduct, ...newData });
      setEditingProduct(null);
    } else {
      addProduct(newData);
    }

    setFormData({ name: "", price: "", category: "", image: "" });
    setPreview("");
  };

  const handleEdit = (p: any) => {
    setEditingProduct(p);
    setFormData({
      name: p.name,
      price: p.price.toString(),
      category: p.category,
      image: p.image,
    });
    setPreview(p.image);
  };

 const handleDelete = (id: number, name: string) => {
  setShowConfirm({ id, name });
};


  const confirmDelete = () => {
    if (showConfirm.id) removeProduct(showConfirm.id);
    setShowConfirm({ id: null, name: "" });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h1 className="text-3xl font-bold text-green-700 mb-4 sm:mb-0">
          🛍️ Quản lý sản phẩm
        </h1>
        <div className="flex gap-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border rounded px-3 py-2 text-sm"
          >
            <option value="All">Hiển thị tất cả</option>
            <option value="Trái cây">Trái cây</option>
            <option value="Rau củ">Rau củ</option>
            <option value="Khác">Khác</option>
          </select>

          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded px-3 py-2 text-sm w-60"
          />
        </div>
      </div>

      {/* Form thêm / sửa */}
      <div className="mb-6 bg-white p-4 rounded-md shadow-sm flex flex-wrap items-center gap-3">
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:items-center">
          <input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Tên sản phẩm"
            className="border p-2 rounded w-full sm:w-48"
          />
          <input
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            placeholder="Giá"
            className="border p-2 rounded w-full sm:w-32"
          />
          <input
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            placeholder="Danh mục"
            className="border p-2 rounded w-full sm:w-40"
          />
          <input
            type="text"
            value={formData.image}
            onChange={(e) => {
              setFormData({ ...formData, image: e.target.value });
              setPreview(e.target.value);
            }}
            placeholder="Link ảnh (hoặc chọn file)"
            className="border p-2 rounded w-full sm:w-60"
          />
          <label className="flex items-center gap-2 cursor-pointer bg-gray-100 border px-3 py-2 rounded hover:bg-gray-200">
            <ImagePlus size={18} className="text-green-700" />
            <span className="text-sm">Tải ảnh</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>

          <button
            onClick={handleSubmit}
            className={`${
              editingProduct
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-green-600 hover:bg-green-700"
            } text-white px-4 py-2 rounded`}
          >
            {editingProduct ? "💾 Cập nhật" : "➕ Thêm"}
          </button>
          {editingProduct && (
            <button
              onClick={() => {
                setEditingProduct(null);
                setFormData({ name: "", price: "", category: "", image: "" });
                setPreview("");
              }}
              className="text-gray-600 hover:text-gray-900"
            >
              ❌ Hủy
            </button>
          )}
        </div>

        {/* Ảnh xem trước */}
        {preview && (
          <div className="mt-3">
            <img
              src={preview}
              alt="Preview"
              className="w-24 h-24 object-cover rounded border"
            />
          </div>
        )}
      </div>

      {/* Bảng sản phẩm */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-green-100 text-left text-gray-700 uppercase text-xs font-semibold">
            <tr>
              <th className="px-4 py-3">Ảnh</th>
              <th className="px-4 py-3">Tên</th>
              <th className="px-4 py-3">Danh mục</th>
              <th className="px-4 py-3 text-right">Giá</th>
              <th className="px-4 py-3 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-500">
                  Không có sản phẩm nào.
                </td>
              </tr>
            ) : (
              filteredProducts.map((p) => (
                <tr
                  key={p.id}
                  className="border-t hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-3">
                    <img
                      src={p.image || "https://via.placeholder.com/60"}
                      alt={p.name}
                      className="w-14 h-14 object-cover rounded"
                    />
                  </td>
                  <td className="px-4 py-3 font-medium">{p.name}</td>
                  <td className="px-4 py-3">{p.category || "—"}</td>
                  <td className="px-4 py-3 text-right text-green-700 font-semibold">
                    {p.price.toLocaleString()}₫
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => handleEdit(p)}
                        className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                      >
                        <Edit size={16} /> Sửa
                      </button>
                      <button
                        onClick={() => handleDelete(p.id, p.name)}
                        className="flex items-center gap-1 text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={16} /> Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal xác nhận xóa */}
      {showConfirm.id && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-lg shadow-md text-center w-80">
            <h2 className="text-lg font-semibold mb-3">
              Bạn có chắc muốn xóa sản phẩm này?
            </h2>
            <p className="text-gray-600 mb-5">{showConfirm.name}</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmDelete}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
              >
                Xóa
              </button>
              <button
                onClick={() => setShowConfirm({ id: null, name: "" })}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
