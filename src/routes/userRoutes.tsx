import { useRoutes, Navigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Home from "../pages/Home/Home";
import Products from "../pages/Products/Products";
import ProductDetail from "../pages/Products/ProductDetail";
import About from "../pages/About/About";
import News from "../pages/News/News";
import Contact from "../pages/Contact/Contact";
import Cart from "../pages/Cart/Cart";
import Checkout from "../pages/Checkout/Checkout";

export function UserRoutes() {
  const element = useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        //Route mặc định trang chủ
        { index: true, element: <Home /> },

        //Các trang con
        { path: "products", element: <Products /> },
        { path: "products/:id", element: <ProductDetail /> },
        { path: "about", element: <About /> },
        { path: "news", element: <News /> },
        { path: "contact", element: <Contact /> },
        { path: "cart", element: <Cart /> },
        { path: "checkout", element: <Checkout /> },

        //Route fallback: nếu vào đường dẫn sai → quay về trang chủ
        { path: "*", element: <Navigate to="/" replace /> },
      ],
    },
  ]);

  return element;
}
