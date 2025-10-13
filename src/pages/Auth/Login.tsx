import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/useAuthStore'

export default function Login() {
  const { login } = useAuthStore()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password) {
      setError('Vui lòng nhập đầy đủ thông tin.')
      return
    }

    // ✅ Giả lập xác thực (có thể thay bằng API sau này)
    if (email === 'admin@gmail.com' && password === '123456') {
      login({ username: 'Admin', email })
      navigate('/')
    } else {
      setError('Sai email hoặc mật khẩu!')
    }
  }

  return (
    <div className="flex justify-center items-center h-[80vh]">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-xl p-8 w-full max-w-sm border"
      >
        <h2 className="text-2xl font-bold text-center mb-4 text-green-600">
          Đăng nhập
        </h2>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

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

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
        >
          Đăng nhập
        </button>

        <p className="text-sm text-center mt-4">
          Chưa có tài khoản?{' '}
          <Link to="/register" className="text-green-600 hover:underline">
            Đăng ký ngay
          </Link>
        </p>
      </form>
    </div>
  )
}
