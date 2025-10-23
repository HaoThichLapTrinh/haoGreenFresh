import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!password || !confirm) {
      setError("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    if (password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự!");
      return;
    }

    if (password !== confirm) {
      setError("Mật khẩu xác nhận không khớp!");
      return;
    }

    // ✅ Giả lập thành công
    setSuccess("✅ Mật khẩu của bạn đã được đặt lại thành công!");
    setError("");

    setTimeout(() => navigate("/login"), 1500);
  };

  return (
    <div className="flex justify-center items-center h-[85vh] bg-gray-50">
      <motion.form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-8 w-full max-w-sm border"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-2xl font-bold text-center mb-4 text-green-600">
          Đặt lại mật khẩu
        </h2>

        <p className="text-gray-600 text-sm text-center mb-5">
          Nhập mật khẩu mới để tiếp tục.
        </p>

        {error && <p className="text-red-500 text-sm mb-3 text-center">{error}</p>}
        {success && (
          <p className="text-green-600 text-sm mb-3 text-center">{success}</p>
        )}

        <input
          type="password"
          placeholder="Mật khẩu mới"
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
          Xác nhận
        </button>
      </motion.form>
    </div>
  );
}
