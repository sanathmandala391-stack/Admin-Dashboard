/*import { Link, useNavigate } from "react-router-dom"

export default function Navbar() {
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem("adminToken")
    navigate("/login")
  }

  return (
    <nav style={navStyle}>
      <h2>JAVEN Admin</h2>

      <div style={{ display: "flex", gap: "30px"}}>
        <Link to="/">Dashboard</Link>
        <Link to="/heroes">Heroes</Link>
        <Link to="/brands">Brands</Link>
        <Link to="/featured">Featured</Link>
        <Link to="/products">Products</Link>
        <button onClick={logout}>Logout</button>
      </div>
    </nav>
  )
}

const navStyle = {
  padding: "15px 20px",
  background: "#111",
  color: "#fff",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}*/
import { backOut, hover } from "framer-motion"
import { Link, useNavigate } from "react-router-dom"

export default function Navbar() {
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem("adminToken")
    navigate("/login")
  }

  return (
    <nav style={navStyle}>
      <h2 style={logoStyle}>JAVEN ADMIN</h2>

      <div style={linkContainerStyle}>
        <Link to="/" style={linkStyle}>Dashboard</Link>
        <Link to="/heroes" style={linkStyle}>Heroes</Link>
        <Link to="/brands" style={linkStyle}>Brands</Link>
        <Link to="/featured" style={linkStyle}>Featured</Link>
        <Link to="/products" style={linkStyle}>Products</Link>
        
        <button onClick={logout} style={logoutButtonStyle}>
          LOGOUT
        </button>
      </div>
    </nav>
  )
}

// --- STYLES ---

const navStyle = {
  padding: "20px 40px",
  background: "#000000", // Pure black for a premium feel
  color: "#fff",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  fontFamily: "'Inter', sans-serif", // Clean, modern font
}

const logoStyle = {
  margin: 0,
  fontSize: "20px",
  fontWeight: "900",
  letterSpacing: "2px",
}

const linkContainerStyle = {
  display: "flex",
  gap: "30px",
  alignItems: "center",
}

const linkStyle = {
  color: "white", // Soft gray color (zinc-400)
  textDecoration: "none", // REMOVES UNDERLINE
  fontSize: "13px",
  fontWeight: "600",
  textTransform: "uppercase",
  letterSpacing: "1px",
  transition: "color 0.3s ease",
}


// Add a hover effect to make the links turn white when you touch them
linkStyle[':hover'] = {
  color: "#ffffff",
}

const logoutButtonStyle = {
  padding: "8px 20px",
  background: "#fff",
  color: "#000",
  border: "none",
  borderRadius: "4px",
  fontSize: "11px",
  fontWeight: "800",
  cursor: "pointer",
  letterSpacing: "1px",
  marginLeft: "10px"
}