import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError("Vui lòng nhập email của bạn.");
      setMessage("");
      return;
    }

    // ✅ Giả lập gửi mail reset
    setError("");
    setMessage(`📩 Đã gửi link đặt lại mật khẩu đến ${email}`);
    setEmail("");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-50 to-green-100 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-sm border border-green-100"
      >
        <h2 className="text-3xl font-bold text-center mb-5 text-green-700">
          Quên mật khẩu
        </h2>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 p-2 rounded mb-3 text-sm text-center">
            {error}
          </div>
        )}

        {message && (
          <div className="bg-green-50 border border-green-200 text-green-700 p-2 rounded mb-3 text-sm text-center">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Email đăng ký
            </label>
            <input
              type="email"
              placeholder="Nhập email của bạn..."
              className="border border-gray-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition-all duration-200"
          >
            Gửi link đặt lại
          </button>
        </form>

        <p className="text-sm text-center mt-5 text-gray-600">
          Quay lại{" "}
          <Link to="/login" className="text-green-600 hover:underline">
            Đăng nhập
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
