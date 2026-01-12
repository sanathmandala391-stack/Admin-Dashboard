import Navbar from "../components/Navbar"
import { Link } from "react-router-dom"

export default function Dashboard() {
  return (
    <>
      <Navbar />
      <div className="admin-container">
        <h2 className="text-2xl font-bold mb-6">System Overview</h2>
        <div className="admin-grid">
          {/* ✅ NEW ORDERS CARD */}
          <Link to="/admin/orders" className="stat-card">
            <h3 className="font-bold">Orders</h3>
            <p>Customer Sales & Status</p>
          </Link>

          <Link to="/heroes" className="stat-card">
            <h3>Heroes</h3>
            <p>Manage main sliders</p>
          </Link>
          <Link to="/brands" className="stat-card">
            <h3>Brands</h3>
            <p>Partners & Logos</p>
          </Link>
          <Link to="/products" className="stat-card">
            <h3>Inventory</h3>
            <p>Products & Stock</p>
          </Link>
          <Link to="/featured" className="stat-card">
            <h3>Featured</h3>
            <p>Curated collections</p>
          </Link>
        </div>
      </div>
    </>
  )
}