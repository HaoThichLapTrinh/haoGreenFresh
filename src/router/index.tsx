// src/router/index.tsx
import { createBrowserRouter } from 'react-router-dom'
import Layout from '../components/Layout/Layout'
import Home from '../pages/Home/Home'
import Products from '../pages/Products/Products'
import About from '../pages/About/About'
import News from '../pages/News/News'
import Contact from '../pages/Contact/Contact'
import Cart from '../pages/Cart/Cart'
import Login from '../pages/Auth/Login'
import Register from '../pages/Auth/Register'
import UserPage from '../pages/User/UserPage'
import Orders from '../pages/admin/Orders/Orders'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'products', element: <Products /> },
      { path: 'about', element: <About /> },
      { path: 'news', element: <News /> },
      { path: 'contact', element: <Contact /> },
      { path: 'cart', element: <Cart /> },
      { path: 'user', element: <UserPage /> }, // ✅ thêm dòng này
      { path: "orders", element: <Orders /> },

    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
])

export default router
