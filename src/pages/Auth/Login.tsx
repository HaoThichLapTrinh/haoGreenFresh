import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { FcGoogle } from "react-icons/fc";
import { motion, AnimatePresence } from "framer-motion";

export default function Login() {
  const { login, users } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showForgot, setShowForgot] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    if (!email || !password) {
      setError("⚠️ Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    // Tìm user hợp lệ
    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      login(foundUser);
      navigate(foundUser.role === "admin" ? "/admin" : "/");
    } else {
      setError("❌ Sai email hoặc mật khẩu!");
    }
  };

  const handleGoogleLogin = () => {
    setSuccessMsg("👉 Đăng nhập bằng Google (mô phỏng)");
    login({
      username: "Google User",
      email: "gguser@gmail.com",
      password: "google",
      role: "user",
    });
    setTimeout(() => navigate("/"), 800);
  };

  const handleForgotPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail) return;
    setSuccessMsg(`📩 Link đặt lại mật khẩu đã gửi tới ${resetEmail}`);
    setShowForgot(false);
    setResetEmail("");
  };

  return (
    <div className="flex justify-center items-center h-[85vh] bg-gray-50 relative">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-8 w-full max-w-sm border"
      >
        <h2 className="text-2xl font-bold text-center mb-4 text-green-600">
          Đăng nhập
        </h2>

        {error && <p className="text-red-500 text-sm mb-3 text-center">{error}</p>}
        {successMsg && (
          <p className="text-green-600 text-sm mb-3 text-center">{successMsg}</p>
        )}

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
          className="border w-full p-2 mb-4 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="flex justify-between text-sm mb-4">
          <Link to="/register" className="text-green-600 hover:underline">
            Đăng ký tài khoản
          </Link>
          <button
            type="button"
            onClick={() => setShowForgot(true)}
            className="text-green-600 hover:underline"
          >
            Quên mật khẩu?
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded transition"
        >
          Đăng nhập
        </button>

        <div className="text-center mt-4">
          <p className="text-gray-500 text-sm mb-2">Hoặc đăng nhập bằng</p>
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="flex items-center justify-center w-full border py-2 rounded hover:bg-gray-100 transition"
          >
            <FcGoogle className="mr-2 text-xl" /> Google
          </button>
        </div>
      </form>

      {/*  Popup Quên mật khẩu */}
      <AnimatePresence>
        {showForgot && (
          <motion.div
            className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl shadow-lg p-6 w-80 text-center"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              <h3 className="text-lg font-semibold mb-3 text-green-700">
                Quên mật khẩu
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Nhập email của bạn để nhận liên kết đặt lại mật khẩu.
              </p>

              <form onSubmit={handleForgotPasswordSubmit}>
                <input
                  type="email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  placeholder="Nhập email..."
                  className="border w-full p-2 mb-4 rounded focus:ring-2 focus:ring-green-400"
                />
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setShowForgot(false)}
                    className="px-3 py-1 border rounded text-gray-600 hover:bg-gray-100"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Gửi link
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
