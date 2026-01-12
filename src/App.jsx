import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./main/pages/Login.jsx"
import Register from "./main/pages/Register.jsx"
import Dashboard from "./main/pages/Dashboard"
import Heroes from "./main/pages/Heroes"
import Brands from "./main/pages/Brands"
import Featured from "./main/pages/Featured"
import Products from "./main/pages/Products"
import AdminProtectedRoute from "./main/auth/AdminProtectedRoute"
import AdminOrders from "./main/pages/AdminOrders.js" // Renamed for clarity
import AdminUsers from "./main/pages/AdminUsers.js"
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login />} />

        <Route path="/" element={
          <AdminProtectedRoute>
            <Dashboard />
          </AdminProtectedRoute>
        } />
        <Route path="/admin/users" element={<AdminUsers/>}/>
        <Route path="/heroes" element={<AdminProtectedRoute><Heroes /></AdminProtectedRoute>} />
        <Route path="/brands" element={<AdminProtectedRoute><Brands /></AdminProtectedRoute>} />
        <Route path="/featured" element={<AdminProtectedRoute><Featured /></AdminProtectedRoute>} />
        <Route path="/products" element={<AdminProtectedRoute><Products /></AdminProtectedRoute>} />
        <Route path="/admin/orders" element={<AdminProtectedRoute><AdminOrders/></AdminProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  )
}
