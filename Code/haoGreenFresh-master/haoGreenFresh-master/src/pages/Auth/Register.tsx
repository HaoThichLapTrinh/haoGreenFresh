import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/useAuthStore'

export default function Register() {
  const { register } = useAuthStore()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<'admin' | 'user'>('user') // ✅ Mặc định là người dùng
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!username || !email || !password) {
      setError('Vui lòng nhập đầy đủ thông tin.')
      return
    }

    // ✅ Lưu thông tin tài khoản kèm vai trò
    register({ username, email, role })

    // ✅ Chuyển hướng dựa vào vai trò
    if (role === 'admin') navigate('/admin')
    else navigate('/user')
  }

  return (
    <div className="flex justify-center items-center h-[80vh]">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-xl p-8 w-full max-w-sm border"
      >
        <h2 className="text-2xl font-bold text-center mb-4 text-green-600">
          Đăng ký
        </h2>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <input
          type="text"
          placeholder="Tên người dùng"
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

        {/* ✅ Chọn vai trò */}
        <select
          value={role}
          onChange={(e) => setRole(e.target.value as 'admin' | 'user')} // ✅ ép kiểu để fix lỗi
          className="border w-full p-2 mb-4 rounded"
        >
          <option value="user">Người dùng</option>
          <option value="admin">Quản trị viên</option>
        </select>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
        >
          Đăng ký
        </button>

        <p className="text-sm text-center mt-4">
          Đã có tài khoản?{' '}
          <Link to="/login" className="text-green-600 hover:underline">
            Đăng nhập
          </Link>
        </p>
      </form>
    </div>
  )
}
