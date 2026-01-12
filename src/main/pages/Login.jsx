/*import { useState } from "react"
import axios from "axios"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const login = async () => {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/admin/login`,
      { email, password }
    )
    localStorage.setItem("adminToken", res.data.token)
    window.location.href = "/"
  }

  return (
  <div style={{
    height: '100vh', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center',
    background: '#111'
  }}>
    <div className="admin-card" style={{width: '100%', maxWidth: '400px'}}>
      <h2 style={{textAlign: 'center'}}>JAVEN ADMIN</h2>
      <p style={{textAlign: 'center', color: '#666', marginBottom: '1.5rem'}}>Please sign in to continue</p>
      
      <input placeholder="Admin Email" onChange={e => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />
      
      <button className="btn-primary" onClick={login}>Enter Dashboard</button>
    </div>
  </div>
)
}
*/
import { useState } from "react"
import axios from "axios"
import Loader from "../components/Loader"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const login = async () => {
    if (!email || !password) return alert("Credentials required.");
    
    setLoading(true)
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/admin/login`,
        { email, password }
      )
      localStorage.setItem("adminToken", res.data.token)
      window.location.href = "/"
    } catch (error) {
      console.error("Login Error:", error);
      alert(error.response?.data?.message || "Access Denied.");
      setLoading(false) // Reset loading only on error
    }
  }

  return (
    <div style={containerStyle}>
      <div className="admin-card" style={cardStyle}>
        <h2 style={logoStyle}>JAVEN <span style={{fontWeight: '300', color: '#ccc'}}>ADMIN</span></h2>
        <p style={subtitleStyle}>Security Portal / Authorization Required</p>
        
        {loading ? (
          <Loader />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
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
              onClick={login}
            >

              Enter Dashboard
            </button>

<p style={registerLinkStyle}>
  New administrator? <a href="/register" style={linkStyle}>Register Identity</a>
</p>
          </div>
        )}
      </div>
    </div>
  )
}

/* --- REFINED STYLES --- */
/* --- REFINED STYLES --- */

const containerStyle = {
  height: '100vh', 
  display: 'flex', 
  alignItems: 'center', 
  justifyContent: 'center',
  background: '#000' 
}

const cardStyle = {
  width: '100%', 
  maxWidth: '380px',
  background: '#fff',
  padding: '50px 40px',
  borderRadius: '2px',
  boxShadow: '0 25px 50px -12px rgba(255, 255, 255, 0.05)'
}

const logoStyle = {
  textAlign: 'center',
  fontSize: '24px',
  fontWeight: '900',
  letterSpacing: '4px',
  margin: '0 0 10px 0'
}

const subtitleStyle = {
  textAlign: 'center', 
  color: '#999', 
  fontSize: '9px', 
  fontWeight: '700',
  letterSpacing: '2px',
  textTransform: 'uppercase',
  marginBottom: '30px'
}

const inputStyle = {
  width: '100%',
  padding: '14px',
  background: '#f9f9f9',
  border: '1px solid #eee',
  fontSize: '13px',
  outline: 'none',
  marginBottom: '5px'
}

const buttonStyle = {
  width: '100%',
  padding: '16px',
  background: '#000',
  color: '#fff',
  border: 'none',
  fontSize: '11px',
  fontWeight: '900',
  textTransform: 'uppercase',
  letterSpacing: '2px',
  cursor: 'pointer',
  marginTop: '10px',
  transition: 'all 0.3s ease'
}

// MAKE SURE THESE TWO ARE ADDED BELOW:
const registerLinkStyle = {
  textAlign: 'center',
  fontSize: '10px',
  color: '#999',
  marginTop: '20px',
  textTransform: 'uppercase',
  letterSpacing: '1px'
}

const linkStyle = {
  color: '#000',
  fontWeight: '900',
  textDecoration: 'none',
  marginLeft: '5px',
  borderBottom: '1px solid #000'
}