import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

export default function Register() {
  const { register } = useAuthStore();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!username || !email || !password || !confirm) {
      setError("⚠️ Vui lòng điền đầy đủ thông tin!");
      return;
    }

    if (password !== confirm) {
      setError("❌ Mật khẩu xác nhận không khớp!");
      return;
    }

    // ✅ Thực hiện đăng ký
    const success = register({
      username,
      email,
      password,
      role: "user",
      active: false,
    });

    if (success) {
      setSuccess("🎉 Đăng ký thành công! Chuyển sang đăng nhập...");
      setTimeout(() => navigate("/login"), 1500);
    } else {
      setError("⚠️ Email đã tồn tại! Vui lòng chọn email khác.");
    }
  };

  return (
    <div className="flex justify-center items-center h-[85vh] bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-8 w-full max-w-sm border"
      >
        <h2 className="text-2xl font-bold text-center mb-4 text-green-600">
          Đăng ký
        </h2>

        {error && <p className="text-red-500 text-sm mb-3 text-center">{error}</p>}
        {success && (
          <p className="text-green-600 text-sm mb-3 text-center">{success}</p>
        )}

        <input
          type="text"
          placeholder="Họ và tên"
          className="border w-full p-2 mb-3 rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="border w-full p-2 mb-3 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Mật khẩu"
          className="border w-full p-2 mb-3 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Xác nhận mật khẩu"
          className="border w-full p-2 mb-4 rounded"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded transition"
        >
          Đăng ký
        </button>

        <p className="text-sm text-center mt-4">
          Đã có tài khoản?{" "}
          <Link to="/login" className="text-green-600 hover:underline">
            Đăng nhập
          </Link>
        </p>
      </form>
    </div>
  );
}
