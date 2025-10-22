import { useEffect, useState } from "react";

export default function Users() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/users")
      .then((res) => res.json())
      .then((data) =>
        setUsers(data.map((u: any) => ({ ...u, role: "Customer" })))
      );
  }, []);

  const toggleRole = (id: number) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id
          ? { ...u, role: u.role === "Admin" ? "Customer" : "Admin" }
          : u
      )
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-green-700">Quản lý người dùng</h1>
      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-green-600 text-white">
            <th className="p-2">Tên</th>
            <th>Email</th>
            <th>Điện thoại</th>
            <th>Quyền</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-b hover:bg-gray-50">
              <td className="p-2">{u.name.firstname} {u.name.lastname}</td>
              <td>{u.email}</td>
              <td>{u.phone}</td>
              <td>
                <button onClick={() => toggleRole(u.id)} className={`px-3 py-1 rounded ${u.role === "Admin" ? "bg-green-600 text-white" : "bg-gray-200"}`}>
                  {u.role}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
