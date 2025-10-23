import { useEffect } from "react";
import { useAuthStore } from "../../../store/useAuthStore";

export default function Users() {
  const { users, user, setUserActive, setUserInactive } = useAuthStore(); // ✅ user thay vì currentUser

  useEffect(() => {
    if (user?.email) {
      setUserActive(user.email);
      return () => setUserInactive(user.email);
    }
  }, [user?.email, setUserActive, setUserInactive]);

  const toggleRole = (email: string) => {
    useAuthStore.setState((state) => ({
      users: state.users.map((u) =>
        u.email === email
          ? { ...u, role: u.role === "admin" ? "user" : "admin" }
          : u
      ),
    }));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-green-700">
        Quản lý người dùng
      </h1>
      <table className="w-full bg-white shadow rounded overflow-hidden">
        <thead>
          <tr className="bg-green-600 text-white">
            <th className="p-2 text-left">Tên</th>
            <th className="text-left">Email</th>
            <th className="text-left">Điện thoại</th>
            <th className="text-left">Quyền</th>
            <th className="text-left">Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center p-4 text-gray-500">
                Chưa có người dùng nào.
              </td>
            </tr>
          ) : (
            users.map((u) => (
              <tr key={u.email} className="border-b hover:bg-gray-50">
                <td className="p-2">{u.username}</td>
                <td>{u.email}</td>
                <td>{u.phone || "-"}</td>
                <td>
                  <button
                    onClick={() => toggleRole(u.email)}
                    className={`px-3 py-1 rounded text-sm ${
                      u.role === "admin"
                        ? "bg-green-600 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {u.role === "admin" ? "Admin" : "User"}
                  </button>
                </td>
                <td>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      u.active
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {u.active ? "Đang hoạt động" : "Không hoạt động"}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
