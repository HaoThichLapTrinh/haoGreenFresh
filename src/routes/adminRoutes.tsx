import { Navigate } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import AdminLayout from "../pages/admin";
import Dashboard from "../pages/admin/Dashboard/Dashboard";
import AdminProducts from "../pages/admin/Products/Products";
import Orders from "../pages/admin/Orders/Orders";
import ContactsAdmin from "../pages/admin/Contacts/Contacts";
import Users from "../pages/admin/Users/Users";

export const AdminRoutes = [
  {
    path: "/admin",
    element: (
      <ProtectedRoute requireAdmin>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="dashboard" /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "products", element: <AdminProducts /> },
      { path: "orders", element: <Orders /> },
      { path: "contacts", element: <ContactsAdmin /> },
      { path: "users", element: <Users /> },
      { path: "*", element: <Navigate to="/admin/dashboard" /> },
    ],
  },
];
