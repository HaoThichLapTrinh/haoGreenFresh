import Login from '../pages/Auth/Login'
import Register from '../pages/Auth/Register'

export const authRoutes = [
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
]
