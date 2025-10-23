import { useEffect, useState } from "react";

export default function ContactsAdmin() {
  const [contacts, setContacts] = useState<any[]>([]);

  useEffect(() => {
    const savedContacts = JSON.parse(localStorage.getItem("contacts") || "[]");
    setContacts(savedContacts);
  }, []);

  const handleDelete = (id: number) => {
    if (!window.confirm("Bạn có chắc muốn xóa liên hệ này không?")) return;

    const updated = contacts.filter((item) => item.id !== id);
    setContacts(updated);
    localStorage.setItem("contacts", JSON.stringify(updated));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-green-700 mb-6">📋 Danh sách liên hệ</h2>

      {contacts.length === 0 ? (
        <p className="text-gray-600">Chưa có liên hệ nào.</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-lg rounded-2xl">
          <table className="min-w-full border-collapse">
            <thead className="bg-green-100">
              <tr>
                <th className="px-6 py-3 text-left font-semibold text-gray-700 border-b">Họ tên</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700 border-b">Email</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700 border-b">Nội dung</th>
                <th className="px-6 py-3 text-center font-semibold text-gray-700 border-b">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((c) => (
                <tr
                  key={c.id}
                  className="hover:bg-green-50 transition"
                >
                  <td className="px-6 py-4 border-b">{c.name}</td>
                  <td className="px-6 py-4 border-b">{c.email}</td>
                  <td className="px-6 py-4 border-b">{c.message}</td>
                  <td className="px-6 py-4 border-b text-center">
                    <button
                      onClick={() => handleDelete(c.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-sm transition"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
