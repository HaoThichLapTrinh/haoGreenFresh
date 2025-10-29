import Home from '../pages/Home/Home'
import Products from '../pages/Products/Products'
import About from '../pages/About/About'
import News from '../pages/News/News'
import Contact from '../pages/Contact/Contact'
import Cart from '../pages/Cart/Cart'
import UserPage from '../pages/User/UserPage'

export const publicRoutes = [
  { index: true, element: <Home /> },
  { path: 'products', element: <Products /> },
  { path: 'about', element: <About /> },
  { path: 'news', element: <News /> },
  { path: 'contact', element: <Contact /> },
  { path: 'cart', element: <Cart /> },
  { path: 'user', element: <UserPage /> },
]
