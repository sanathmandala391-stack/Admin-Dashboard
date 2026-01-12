import { useState } from "react"
import axios from "axios"
import Loader from "../components/Loader"

export default function Register() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const register = async () => {
    if (!name || !email || !password) return alert("All fields are required.");
    
    setLoading(true)
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/admin/register`, // Ensure this matches your route
        { name, email, password }
      )
      localStorage.setItem("adminToken", res.data.token)
      alert("Admin Account Created Successfully")
      window.location.href = "/" 
    } catch (error) {
      console.error("Registration Error:", error);
      alert(error.response?.data?.message || "Registration Failed.");
      setLoading(false)
    }
  }

  return (
    <div style={containerStyle}>
      <div className="admin-card" style={cardStyle}>
        <h2 style={logoStyle}>JAVEN <span style={{fontWeight: '300', color: '#ccc'}}>ADMIN</span></h2>
        <p style={subtitleStyle}>Creation Portal / New Admin Identity</p>
        
        {loading ? (
          <Loader />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <input 
              style={inputStyle} 
              placeholder="Full Name" 
              onChange={e => setName(e.target.value)} 
            />
            <input 
              style={inputStyle} 
              placeholder="Admin Email" 
              onChange={e => setEmail(e.target.value)} 
            />
            <input 
              style={inputStyle} 
              placeholder="Password" 
              type="password" 
              onChange={e => setPassword(e.target.value)} 
            />
            <button 
              className="btn-primary" 
              style={buttonStyle} 
              onClick={register}
            >
              Create Account
            </button>
            
            <p style={{textAlign: 'center', fontSize: '10px', marginTop: '10px'}}>
               <a href="/login" style={{color: '#999', textDecoration: 'none'}}>Already have an account? Login</a>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

/* --- STYLES (Keep identical to your Login for consistency) --- */
const containerStyle = { height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000' }
const cardStyle = { width: '100%', maxWidth: '380px', background: '#fff', padding: '50px 40px', borderRadius: '2px', boxShadow: '0 25px 50px -12px rgba(255, 255, 255, 0.05)' }
const logoStyle = { textAlign: 'center', fontSize: '24px', fontWeight: '900', letterSpacing: '4px', margin: '0 0 10px 0' }
const subtitleStyle = { textAlign: 'center', color: '#999', fontSize: '9px', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '30px' }
const inputStyle = { width: '100%', padding: '14px', background: '#f9f9f9', border: '1px solid #eee', fontSize: '13px', outline: 'none' }
const buttonStyle = { width: '100%', padding: '16px', background: '#000', color: '#fff', border: 'none', fontSize: '11px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '2px', cursor: 'pointer', marginTop: '10px', transition: 'all 0.3s ease' }