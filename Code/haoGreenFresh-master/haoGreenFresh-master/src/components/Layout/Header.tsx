import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { useCartStore } from "../../store/useCartStore";
import { useState } from "react";

export default function Header() {
  const { user, logout } = useAuthStore();
  const totalItems = useCartStore(
    (state) => state.items.reduce((sum, item) => sum + item.quantity, 0)
  );


  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="bg-green-600 text-white py-4 shadow">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to="/" className="text-2xl font-bold tracking-wide">
          🌿 GreenFresh
        </Link>

        <nav className="hidden md:flex items-center space-x-6 font-medium">
          <Link to="/" className="hover:text-green-200 transition">
            Trang chủ
          </Link>
          <Link to="/products" className="hover:text-green-200 transition">
            Sản phẩm
          </Link>
          <Link to="/about" className="hover:text-green-200 transition">
            Giới thiệu
          </Link>
          <Link to="/news" className="hover:text-green-200 transition">
            Tin tức
          </Link>
          <Link to="/contact" className="hover:text-green-200 transition">
            Liên hệ
          </Link>

          {/* 🛒 Giỏ hàng có badge hiển thị tổng số sản phẩm */}
          <Link to="/cart" className="relative hover:text-green-200 transition">
            🛒 Giỏ hàng
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            )}
          </Link>

          {user ? (
            <div className="flex items-center space-x-3">
              <span>👋 {user.username}</span>
              <button
                onClick={handleLogout}
                className="bg-white text-green-600 px-3 py-1 rounded hover:bg-green-100 transition"
              >
                Đăng xuất
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <Link
                to="/login"
                className="bg-white text-green-600 px-3 py-1 rounded hover:bg-green-100 transition"
              >
                Đăng nhập
              </Link>
              <Link
                to="/register"
                className="bg-white text-green-600 px-3 py-1 rounded hover:bg-green-100 transition"
              >
                Đăng ký
              </Link>
            </div>
          )}
        </nav>

        {/* Nút menu cho mobile */}
        <button
          className="md:hidden text-3xl focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <div className="md:hidden bg-green-700 px-4 py-3 space-y-3">
          <Link to="/" onClick={() => setMenuOpen(false)} className="block">
            Trang chủ
          </Link>
          <Link
            to="/products"
            onClick={() => setMenuOpen(false)}
            className="block"
          >
            Sản phẩm
          </Link>
          <Link to="/about" onClick={() => setMenuOpen(false)} className="block">
            Giới thiệu
          </Link>
          <Link to="/news" onClick={() => setMenuOpen(false)} className="block">
            Tin tức
          </Link>
          <Link
            to="/contact"
            onClick={() => setMenuOpen(false)}
            className="block"
          >
            Liên hệ
          </Link>

          <Link
            to="/cart"
            onClick={() => setMenuOpen(false)}
            className="relative block"
          >
            🛒 Giỏ hàng
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      )}
    </header>
  );
}
