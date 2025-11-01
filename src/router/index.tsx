// src/router/index.tsx
import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Home from "../pages/Home/Home";
import Products from "../pages/Products/Products";
import About from "../pages/About/About";
import News from "../pages/News/News";
import Contact from "../pages/Contact/Contact";
import Cart from "../pages/Cart/Cart";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import UserPage from "../pages/User/UserPage";
import Orders from "../pages/admin/Orders/Orders";
import ProductDetail from "../pages/Products/ProductDetail";

// Import các file admin
import AdminLayout from "../pages/admin";
import Dashboard from "../pages/admin/Dashboard/Dashboard";
import AdminProducts from "../pages/admin/Products/Products";
import ContactsAdmin from "../pages/admin/Contacts/Contacts";
import Users from "../pages/admin/Users/Users";
import { ProtectedRoute } from "../routes/ProtectedRoute";

const router = createBrowserRouter([
  // --- ROUTE NGƯỜI DÙNG ---
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "products", element: <Products /> },
      { path: "products/:id", element: <ProductDetail /> },
      { path: "about", element: <About /> },
      { path: "news", element: <News /> },
      { path: "contact", element: <Contact /> },
      { path: "cart", element: <Cart /> },
      { path: "user", element: <UserPage /> },
      { path: "orders", element: <Orders /> },
    ],
  },

  // --- ROUTE ADMIN ---
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "products", element: <AdminProducts /> },
      { path: "orders", element: <Orders /> },
      { path: "contacts", element: <ContactsAdmin /> },
      { path: "users", element: <Users /> },
    ],
  },

  // --- ĐĂNG NHẬP / ĐĂNG KÝ ---
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
]);

export default router;
