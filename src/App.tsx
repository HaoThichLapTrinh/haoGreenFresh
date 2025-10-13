import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Products from './pages/Products/Products'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Layout from './components/Layout/Layout'
import Cart from './pages/Cart/Cart'
import Contact from './pages/Contact/Contact'
import About from './pages/About/About'
import News from './pages/News/News'
import ProductDetail from './pages/Products/ProductDetail'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/news" element={<News />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
    </Routes>
  )
}

export default App
