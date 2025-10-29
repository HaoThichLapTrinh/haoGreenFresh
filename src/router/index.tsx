import { createBrowserRouter } from 'react-router-dom'
import Layout from '../components/Layout/Layout'
import { publicRoutes } from './publicRoutes'
import { authRoutes } from './authRoutes'
import { adminRoutes } from './adminRoutes'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      ...publicRoutes,
      ...adminRoutes, // gộp luôn admin route (nếu cùng layout)
    ],
  },
  ...authRoutes, // login/register nằm ngoài layout
])

export default router
